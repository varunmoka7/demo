import dash
from dash import dcc, html, dash_table
from dash.dependencies import Input, Output
import plotly.express as px
import pandas as pd
import numpy as np
import sys

# --- 1. Load Data ---
try:
    vahans_df = pd.read_csv('PRLGreenko.vahans.csv')
    report_df = pd.read_csv('PRL-GreenkoReport-24-25.csv', low_memory=False)
    results_df = pd.read_csv('RESULTS.csv')
except FileNotFoundError as e:
    print(f"Error loading CSV files: {e}")
    print("Please ensure all CSV files are in the same directory.")
    sys.exit()

# --- 2. Create WRI DataFrame ---
wri_data = {
    'Vehicle_Type': ['HGV', 'MGV', 'LCV'],
    'Emission_Factor': [133.53, 168.32, 308.23]  # gCO2e/tonne-km
}
wri_df = pd.DataFrame(wri_data)

# --- 3. Merge Vehicle and Report Data ---
# Ensure merge columns exist
if 'Current Vehicle No.' not in report_df.columns:
    raise KeyError("'Current Vehicle No.' column missing in report_df")
if 'regNo' not in vahans_df.columns:
    raise KeyError("'regNo' column missing in vahans_df")

df = pd.merge(report_df, vahans_df, left_on='Current Vehicle No.', right_on='regNo', how='left')

# --- 3A. Merge with RESULTS.csv for reference emissions ---
# Standardize vehicle number column names for join
results_df.rename(columns={'Vehicle No.': 'Current Vehicle No.', 'Trip ID': 'Trip ID Results'}, inplace=True)
df = pd.merge(df, results_df, on=['Current Vehicle No.'], how='left', suffixes=('', '_results'))

# --- 4. Estimate Consignment Weights ---
avg_weights = {
    'GENERATOR': 50000,
    'ABB GENERATOR': 15000,
    'GEAR BOX': 20000,
    'TRANSFORMER': 10000,
    'SKY LIFT': 15000,
    'MODULE': 10,
    'CONTACTOR': 5,
    'IGBT': 1,
    'ISOLATOR': 3,
    'INTERFACE': 2,
    'ELECTRICITY': 50000,
}

def estimate_weight(consignment):
    if pd.isna(consignment):
        return 0
    total_weight = 0
    consignment_str = str(consignment).upper()
    quantity = 1
    try:
        parts = consignment_str.split(' ')
        for i, part in enumerate(parts):
            if 'NOS' in part and i > 0:
                 if parts[i-1].isdigit():
                    quantity = int(parts[i-1])
                    break
                 elif any(char.isdigit() for char in part):
                     num_str = ''.join(filter(str.isdigit, part))
                     if num_str:
                         quantity = int(num_str)
                         break
    except Exception:
         quantity = 1

    found = False
    for key, weight_val in avg_weights.items():
        if key in consignment_str:
            total_weight += weight_val * quantity
            found = True
            break
    if not found:
        return 500
    return total_weight

df['Estimated Consignment Weight (kg)'] = df['Consignment'].apply(estimate_weight)

# --- 4A. Force vehicle type for specific vehicles ---
# Ensure 'details.rc_vch_catg' exists or create it
if 'details.rc_vch_catg' not in df.columns:
    df['details.rc_vch_catg'] = np.nan

def force_vehicle_type(row):
    if str(row['Current Vehicle No.']) == 'RJ06FC0709':
        return 'HGV'
    elif str(row['Current Vehicle No.']) == 'MH03ES1467':
        return 'MGV'
    else:
        return row['details.rc_vch_catg']

df['details.rc_vch_catg'] = df.apply(force_vehicle_type, axis=1)

# --- 5. Merge with WRI Data ---
# Ensure 'details.rc_unld_wt' exists or create it
if 'details.rc_unld_wt' not in df.columns:
    df['details.rc_unld_wt'] = 0

df['details.rc_unld_wt'] = pd.to_numeric(df['details.rc_unld_wt'], errors='coerce').fillna(0)
df['Vehicle_Type_WRI'] = df['details.rc_vch_catg'].replace({'LGV': 'LCV'})
df = pd.merge(df, wri_df, left_on='Vehicle_Type_WRI', right_on='Vehicle_Type', how='left')

# --- 6. Calculate Carbon Emissions ---
df['Total Weight (tonnes)'] = (df['details.rc_unld_wt'] + df['Estimated Consignment Weight (kg)']) / 1000
if 'Distance Covered' not in df.columns:
    df['Distance Covered'] = 0
df['Distance Covered'] = pd.to_numeric(df['Distance Covered'], errors='coerce').fillna(0)
df['Emission_Factor'] = df['Emission_Factor'].fillna(0)
df['Total Weight (tonnes)'] = df['Total Weight (tonnes)'].fillna(0)
df['Carbon Emissions (kg)'] = (df['Distance Covered'] * df['Total Weight (tonnes)'] * df['Emission_Factor']) / 1000

# --- 6A. Add reference emissions from RESULTS.csv if available ---
if 'CO2e (kg)_results' not in df.columns:
    df['CO2e (kg)_results'] = np.nan

df['Reference CO2e (kg)'] = df['CO2e (kg)'].fillna(df['CO2e (kg)_results'])

# --- 7. Create Dash App ---
app = dash.Dash(__name__)

app.layout = html.Div(
    [
        html.Div(
            [
                html.Img(
                    src='/assets/roado%20logo.png',  # Updated path and encoded space
                    style={
                        'display': 'block',
                        'marginLeft': 'auto',
                        'marginRight': 'auto',
                        'height': '80px',
                        'marginBottom': '10px',
                        'marginTop': '10px'
                    }
                ),
                html.H1(
                    "Roado Carbon Emission Calculator",
                    style={
                        'textAlign': 'center',
                        'color': '#1B5E20',
                        'marginBottom': '30px',
                        'fontWeight': 'bold',
                        'fontFamily': 'Roboto, Arial, sans-serif',
                        'fontSize': '2.5rem',
                        'letterSpacing': '1px',
                        'textShadow': '0 2px 8px #b2dfdb'
                    }
                ),
                html.Div(
                    [
                        html.Label(
                            "Select Consignor:",
                            style={'fontWeight': 'bold', 'fontSize': '18px', 'color': '#1B5E20', 'marginBottom': '8px'}
                        ),
                        dcc.Dropdown(
                            id='consignor-dropdown',
                            options=[
                                {'label': i, 'value': i}
                                for i in df['Consignor'].unique() if pd.notna(i)
                            ],
                            value=(
                                df['Consignor'].dropna().unique()[0]
                                if not df['Consignor'].dropna().empty else None
                            ),
                            placeholder="Select a consignor...",
                            style={
                                'width': '100%',
                                'backgroundColor': '#e8f5e9',
                                'color': '#1B5E20',
                                'borderRadius': '8px',
                                'border': '2px solid #388e3c',
                                'fontSize': '17px',
                                'fontFamily': 'Roboto, Arial, sans-serif',
                                'marginBottom': '10px'
                            }
                        ),
                    ],
                    style={'marginBottom': '30px', 'width': '60%', 'margin': '0 auto'}
                ),
                dcc.Graph(id='emission-graph', style={'backgroundColor': '#e8f5e9', 'borderRadius': '14px', 'padding': '18px', 'boxShadow': '0 2px 12px #b2dfdb'}),
                html.Br(),
                html.H3(
                    "Trip Details Table",
                    style={'color': '#1B5E20', 'fontWeight': 'bold', 'marginTop': '30px', 'textAlign': 'center', 'fontSize': '1.5rem'}
                ),
                html.Div(id='trip-table', style={'marginBottom': '30px'}),
                html.Br(),
                html.Div(
                    [
                        html.H4(
                            "Calculation Methodology & Assumptions",
                            style={'color': '#1B5E20', 'fontWeight': 'bold'}
                        ),
                        html.P(
                            "Note: The original data does NOT contain actual consignment weights. All carbon emission values are based on the following methodology:",
                            style={'color': '#1B5E20'}
                        ),
                        html.Ul(
                            [
                                html.Li("Distance used: The distance for each trip is taken from the 'Distance Covered' column in the trip data. This is the actual distance the vehicle traveled, measured by GPS or odometer."),
                                html.Li("Emission factors used: We use standard values from WRI India 2015 to estimate how much carbon dioxide is produced per tonne of goods moved per kilometer. These are: HGV (Heavy Goods Vehicle) = 133.53, MGV (Medium Goods Vehicle) = 168.32, LCV (Light Commercial Vehicle) = 308.23 (all in grams of CO2 per tonne-km)."),
                                html.Li("Estimated consignment weights: Since the actual weight of the goods is not available, we make a rough guess based on keywords in the consignment description. For example, if the consignment mentions 'GENERATOR', we use an average weight for a generator. If we can't guess, we use a default weight of 500 kg. These are only estimates and may not reflect the real weight."),
                                html.Li("How carbon emissions are calculated: For each trip, we multiply the distance traveled (in km) by the estimated total weight (in tonnes) and the emission factor (in grams of CO2 per tonne-km), then divide by 1000 to get the result in kilograms. Formula: Carbon Emissions (kg) = Distance Covered (km) × Estimated Total Weight (tonnes) × Emission Factor (gCO2e/tonne-km) / 1000."),
                                html.Li("Reference CO2e (kg): This is a comparison value for carbon emissions. If our calculated value is available, we show that. If not, we use a value from another file (if available). This helps you see both our estimate and any reference value side by side, making it easier to compare.") ,
                                html.Li("Important: All results are rough estimates for general understanding only. They should NOT be used for official, regulatory, or audit purposes.")
                            ],
                            style={'fontSize': '15px', 'color': '#1B5E20'}
                        ),
                    ],
                    style={
                        'backgroundColor': '#e8f5e9',
                        'padding': '20px',
                        'borderRadius': '10px',
                        'marginBottom': '30px',
                        'boxShadow': '0 2px 8px #b2dfdb',
                        'width': '90%',
                        'margin': '0 auto'
                    }
                ),
                html.Div(
                    [
                        html.P(
                            "Disclaimer: These emissions are *estimates* based on standardized factors and highly uncertain weight estimations. Actual emissions may vary significantly.",
                            style={
                                'color': '#fff',
                                'backgroundColor': '#388e3c',
                                'padding': '12px',
                                'borderRadius': '8px',
                                'fontWeight': 'bold',
                                'fontSize': '16px',
                                'textAlign': 'center',
                                'marginTop': '20px',
                                'boxShadow': '0 2px 8px #b2dfdb',
                                'fontFamily': 'Roboto, Arial, sans-serif'
                            }
                        )
                    ]
                ),
            ],
            style={
                'backgroundColor': '#fff',
                'padding': '40px 30px 30px 30px',
                'borderRadius': '18px',
                'maxWidth': '1100px',
                'margin': '40px auto',
                'boxShadow': '0 4px 24px #b2dfdb'
            }
        )
    ],
    style={'backgroundColor': '#e0f2f1', 'minHeight': '100vh'}
)

# --- 8. Define Callbacks ---
@app.callback(
    [Output('emission-graph', 'figure'), Output('trip-table', 'children')],
    [Input('consignor-dropdown', 'value')]
)
def update_graph_and_table(selected_consignor):
    print('Selected consignor:', selected_consignor)
    filtered_df = df[df['Consignor'] == selected_consignor]
    print('Filtered columns:', filtered_df.columns)
    print('Filtered DataFrame head:')
    print(filtered_df.head())

    table_columns = [
        {'name': 'Trip ID', 'id': 'Trip ID'},
        {'name': 'Vehicle No.', 'id': 'Current Vehicle No.'},
        {'name': 'Consignor', 'id': 'Consignor'},
        {'name': 'Consignment', 'id': 'Consignment'},
        {'name': 'Distance Covered (km)', 'id': 'Distance Covered'},
        {'name': 'Estimated Consignment Weight (kg)', 'id': 'Estimated Consignment Weight (kg)'},
        {'name': 'Carbon Emissions (kg)', 'id': 'Carbon Emissions (kg)'},
        {'name': 'Reference CO2e (kg)', 'id': 'Reference CO2e (kg)'}
    ]

    if not selected_consignor:
        empty_fig = px.bar()
        empty_fig.update_layout(
            title_text="Please select a consignor",
            xaxis={'visible': False},
            yaxis={'visible': False},
            annotations=[{
                "text": "Please select a consignor to view data.",
                "xref": "paper", "yref": "paper",
                "showarrow": False, "font": {"size": 16}
            }]
        )
        # Return empty table with columns but no data
        empty_table = dash_table.DataTable(
            columns=table_columns,
            data=[],
            sort_action='native',
            page_size=10,
            style_table={'overflowX': 'auto', 'background': '#002147', 'borderRadius': '10px', 'boxShadow': '0 2px 8px #e3e8ee'},
            style_cell={'textAlign': 'center', 'padding': '8px', 'fontFamily': 'Roboto', 'fontSize': '15px', 'backgroundColor': '#002147', 'color': '#F39200'},
            style_header={'backgroundColor': '#F39200', 'color': '#002147', 'fontWeight': 'bold', 'fontSize': '16px'},
        )
        return empty_fig, empty_table

    filtered_df = df[df['Consignor'] == selected_consignor]
    if filtered_df.empty:
        empty_fig = px.bar()
        empty_fig.update_layout(
            title_text=f"No data for {selected_consignor}",
            xaxis={'visible': False},
            yaxis={'visible': False},
            annotations=[{
                "text": f"No data available for {selected_consignor}.",
                "xref": "paper", "yref": "paper",
                "showarrow": False, "font": {"size": 16}
            }]
        )
        empty_table = dash_table.DataTable(
            columns=table_columns,
            data=[],
            sort_action='native',
            page_size=10,
            style_table={'overflowX': 'auto', 'background': '#002147', 'borderRadius': '10px', 'boxShadow': '0 2px 8px #e3e8ee'},
            style_cell={'textAlign': 'center', 'padding': '8px', 'fontFamily': 'Roboto', 'fontSize': '15px', 'backgroundColor': '#002147', 'color': '#F39200'},
            style_header={'backgroundColor': '#F39200', 'color': '#002147', 'fontWeight': 'bold', 'fontSize': '16px'},
        )
        return empty_fig, empty_table

    graph_df = filtered_df.copy()
    graph_df['Graph Vehicle No.'] = graph_df['Current Vehicle No.'].replace({'RJ06GC0709': 'RJ06FC0709'})
    vehicle_emissions = graph_df.groupby('Graph Vehicle No.')['Carbon Emissions (kg)'].sum().reset_index()
    fig = px.bar(
        vehicle_emissions,
        x='Carbon Emissions (kg)',
        y='Graph Vehicle No.',
        orientation='h',
        title=f"Estimated Carbon Emissions per Vehicle for {selected_consignor}",
        labels={
            'Graph Vehicle No.': 'Vehicle Registration Number',
            'Carbon Emissions (kg)': 'Estimated CO2e (kg)'
        },
        color='Carbon Emissions (kg)',
        color_continuous_scale=[
            '#1B5E20',  # Deep green
            '#388e3c',  # Medium green
            '#F9A825',  # Eco yellow
            '#F39200'   # Orange
        ],
        text=vehicle_emissions['Carbon Emissions (kg)'].map(lambda x: f"{x:.1f}")
    )
    fig.update_traces(
        textfont_size=16,
        textangle=0,
        textposition="auto",  # <-- changed from "outside" to "auto"
        cliponaxis=False,
        marker_line_color='#388e3c',
        marker_line_width=2
    )
    fig.update_layout(
        title={
            'text': f"Estimated Carbon Emissions per Vehicle for {selected_consignor}",
            'x': 0.5,
            'xanchor': 'center',
            'font': dict(size=22, color='#1B5E20', family='Roboto, Arial, sans-serif')
        },
        xaxis_tickangle=-15,
        plot_bgcolor='#e8f5e9',
        paper_bgcolor='#e8f5e9',
        font=dict(color='#1B5E20', size=16, family='Roboto, Arial, sans-serif'),
        xaxis=dict(
            gridcolor='#b2dfdb',
            zerolinecolor='#388e3c',
            color='#1B5E20',
            tickfont=dict(size=15, color='#1B5E20', family='Roboto, Arial, sans-serif'),
            title='Vehicle Registration Number',
            title_font=dict(size=18, color='#1B5E20', family='Roboto, Arial, sans-serif'),
            title_standoff=15
        ),
        yaxis=dict(
            gridcolor='#b2dfdb',
            zerolinecolor='#388e3c',
            color='#1B5E20',
            tickfont=dict(size=15, color='#1B5E20', family='Roboto, Arial, sans-serif'),
            title='Estimated CO2e (kg)',
            title_font=dict(size=18, color='#1B5E20', family='Roboto, Arial, sans-serif'),
            title_standoff=15
        ),
        coloraxis_colorbar=dict(
            title=dict(text='CO2e (kg)', font=dict(color='#1B5E20', size=16, family='Roboto, Arial, sans-serif')),
            tickfont=dict(color='#1B5E20', size=14, family='Roboto, Arial, sans-serif'),
            thickness=18,
            len=0.6,
            outlinecolor='#388e3c',
            outlinewidth=1,
            bgcolor='#e8f5e9',
            bordercolor='#388e3c',
            borderwidth=1
        ),
        margin=dict(l=60, r=40, t=80, b=80),
        height=500
    )

    # Use 'Trip ID' if present and not all null, else fallback to 'Trip ID Results'
    if 'Trip ID' in filtered_df.columns and not filtered_df['Trip ID'].isnull().all():
        trip_id_col = 'Trip ID'
    elif 'Trip ID Results' in filtered_df.columns:
        trip_id_col = 'Trip ID Results'
    else:
        trip_id_col = None

    table_columns[0]['id'] = trip_id_col if trip_id_col else 'Trip ID'

    if trip_id_col:
        table_data = filtered_df[
            [trip_id_col, 'Current Vehicle No.', 'Consignor', 'Consignment', 'Distance Covered', 'Estimated Consignment Weight (kg)', 'Carbon Emissions (kg)', 'Reference CO2e (kg)']
        ].copy()
    else:
        table_data = filtered_df[
            ['Current Vehicle No.', 'Consignor', 'Consignment', 'Distance Covered', 'Estimated Consignment Weight (kg)', 'Carbon Emissions (kg)', 'Reference CO2e (kg)']
        ].copy()

    # Format numeric columns to 1 decimal place for consistency
    for col in ['Distance Covered', 'Estimated Consignment Weight (kg)', 'Carbon Emissions (kg)', 'Reference CO2e (kg)']:
        if col in table_data.columns:
            table_data[col] = table_data[col].apply(lambda x: f"{x:.1f}" if pd.notnull(x) else "")
    table_data = table_data.to_dict('records')

    # Format the trip table for full width and wrapped text
    trip_table_component = dash_table.DataTable(
        columns=table_columns,
        data=table_data,
        sort_action='native',
        page_size=10,
        style_table={
            'overflowX': 'auto',
            'background': '#002147',
            'borderRadius': '10px',
            'boxShadow': '0 2px 8px #e3e8ee',
            'width': '98%',
            'margin': '0 auto',
            'maxWidth': '100vw'
        },
        style_cell={
            'textAlign': 'center',
            'padding': '8px',
            'fontFamily': 'Roboto',
            'fontSize': '15px',
            'backgroundColor': '#002147',
            'color': '#F39200',
            'whiteSpace': 'normal',
            'height': 'auto',
            'maxWidth': '250px',
            'overflow': 'hidden',
            'textOverflow': 'ellipsis',
            'wordBreak': 'break-word',
        },
        style_header={
            'backgroundColor': '#F39200',
            'color': '#002147',
            'fontWeight': 'bold',
            'fontSize': '16px',
            'whiteSpace': 'normal',
            'height': 'auto',
            'wordBreak': 'break-word',
        },
        style_data_conditional=[
            {
                'if': {'column_id': c},
                'textAlign': 'left',
                'whiteSpace': 'normal',
                'wordBreak': 'break-word',
            } for c in ['Consignment', 'Consignor']
        ]
    )
    return fig, trip_table_component

# --- 9. Run App ---
if __name__ == '__main__':
    app.run(debug=True, port=8052)