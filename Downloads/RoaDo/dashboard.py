import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load data
df = pd.read_csv('RESULTS.csv')

st.set_page_config(page_title="PRL-Greenko Carbon Emissions Dashboard", layout="wide")
st.title("PRL-Greenko Transport Carbon Emissions Dashboard")

# --- I. Overall Carbon Footprint & Summary ---
st.header("Overall Carbon Footprint")
total_emissions = df['CO2e (kg)'].sum()
avg_emissions_trip = df['CO2e (kg)'].mean()
avg_emissions_km = df['CO2e (kg)'].sum() / df['Running Distance (km)'].sum()

col1, col2, col3 = st.columns(3)
col1.metric("Total CO₂e (kg)", f"{total_emissions:,.0f}")
col2.metric("Avg CO₂e per Trip (kg)", f"{avg_emissions_trip:,.1f}")
col3.metric("Avg CO₂e per km", f"{avg_emissions_km:.3f}")

# --- Breakdown by Vehicle Type ---
st.subheader("Emissions by Vehicle (Number Plate)")

# Load vehicle reference data
veh_df = pd.read_csv('PRLGreenko.vahans.csv')
vehicle_details = veh_df.set_index('regNo').to_dict('index')

def get_vehicle_info(veh_no):
    if str(veh_no) == 'RJ06FC0709':
        return {'Type': 'HGV', 'Fuel': 'DIESEL'}
    if str(veh_no) == 'MH03ES1467':
        return {'Type': 'MGV', 'Fuel': 'DIESEL'}
    info = vehicle_details.get(str(veh_no), {})
    return {
        'Type': info.get('details.rc_vch_catg', ''),
        'Fuel': info.get('details.rc_fuel_desc', ''),
    }

# Fill missing vehicle type/fuel/model in df
for idx, row in df.iterrows():
    if str(row['Vehicle No.']) == 'RJ06FC0709':
        df.at[idx, 'Vehicle Type'] = 'HGV'
        df.at[idx, 'Fuel Type'] = 'DIESEL'
    elif str(row['Vehicle No.']) == 'MH03ES1467':
        df.at[idx, 'Vehicle Type'] = 'MGV'
        df.at[idx, 'Fuel Type'] = 'DIESEL'
    elif pd.isna(row['Vehicle Type']) or row['Vehicle Type'] == '':
        info = get_vehicle_info(row['Vehicle No.'])
        df.at[idx, 'Vehicle Type'] = info['Type']
        df.at[idx, 'Fuel Type'] = info['Fuel']

# Calculate CO2e for missing trips using reference factors
EMISSION_FACTORS = {'LGV': 0.34, 'MGV': 0.65, 'HGV': 0.81}
def get_type_factor(veh_type, veh_no=None):
    if str(veh_no) == 'RJ06FC0709':
        return 'HGV'
    if str(veh_no) == 'MH03ES1467':
        return 'MGV'
    if pd.isna(veh_type):
        return None
    if 'LGV' in veh_type:
        return 'LGV'
    elif 'MGV' in veh_type:
        return 'MGV'
    elif 'HGV' in veh_type:
        return 'HGV'
    else:
        return None
for idx, row in df.iterrows():
    if pd.isna(row['CO2e (kg)']) or row['CO2e (kg)'] == '' or row['CO2e (kg)'] == 0:
        veh_type = row['Vehicle Type']
        running_distance = row['Running Distance (km)']
        type_key = get_type_factor(veh_type, row['Vehicle No.'])
        if type_key and not pd.isna(running_distance) and running_distance != '':
            df.at[idx, 'CO2e (kg)'] = running_distance * EMISSION_FACTORS[type_key]

# Group by vehicle number and show details (remove make, model, body, unladen wt, GVW)
vehicle_group = df.groupby('Vehicle No.')
vehicle_perf = []
for veh_no, group in vehicle_group:
    info = get_vehicle_info(veh_no)
    total_emissions = group['CO2e (kg)'].sum()
    avg_emissions = group['CO2e (kg)'].mean()
    trips = group['Trip ID'].count()
    total_distance = group['Running Distance (km)'].sum()
    avg_efficiency = group['Route Efficiency (Running/Total)'].mean()
    vehicle_perf.append({
        'Vehicle No.': veh_no,
        'Type': info['Type'],
        'Fuel': info['Fuel'],
        'Trips': trips,
        'Total Distance (km)': total_distance,
        'Total CO2e (kg)': total_emissions,
        'Avg CO2e/trip (kg)': avg_emissions,
        'Avg Route Efficiency': avg_efficiency
    })
vehicle_perf_df = pd.DataFrame(vehicle_perf)
st.dataframe(vehicle_perf_df.style.format({
    'Total Distance (km)': '{:,.1f}',
    'Total CO2e (kg)': '{:,.1f}',
    'Avg CO2e/trip (kg)': '{:,.1f}',
    'Avg Route Efficiency': '{:.2f}'
}))

# Per-trip emissions for each vehicle (table only, no bar chart)
st.subheader("Per-Trip Emissions by Vehicle")
for veh_no, group in vehicle_group:
    st.markdown(f"**Vehicle: {veh_no}**")
    info = get_vehicle_info(veh_no)
    st.write(f"Type: {info['Type']}, Fuel: {info['Fuel']}")
    st.dataframe(group[['Trip ID', 'Running Distance (km)', 'Total Distance (km)', 'Route Efficiency (Running/Total)', 'CO2e (kg)']].style.format({
        'Running Distance (km)': '{:,.1f}',
        'Total Distance (km)': '{:,.1f}',
        'Route Efficiency (Running/Total)': '{:.2f}',
        'CO2e (kg)': '{:,.1f}'
    }))

# --- II. Trip Performance & Efficiency ---
# (Section removed as per user request)

# --- Trip Table (sortable) ---
st.subheader("Trip Table (sortable)")
st.dataframe(df[['Trip ID', 'Vehicle No.', 'Vehicle Type', 'Running Distance (km)', 'Total Distance (km)', 'Route Efficiency (Running/Total)', 'CO2e (kg)']].sort_values('CO2e (kg)', ascending=False).style.format({
    'Running Distance (km)': '{:,.1f}',
    'Total Distance (km)': '{:,.1f}',
    'Route Efficiency (Running/Total)': '{:.2f}',
    'CO2e (kg)': '{:,.1f}'
}))

# --- III. Vehicle Performance & Benchmarking ---
st.header("Vehicle Performance & Benchmarking")
benchmarks = {'HGV': 0.81, 'MGV': 0.65, 'LGV': 0.34}
perf = df.groupby('Vehicle No.').agg({
    'Trip ID': 'count',
    'Running Distance (km)': 'sum',
    'CO2e (kg)': 'sum',
    'EF_CO2 (kg/km)': 'mean',
    'Route Efficiency (Running/Total)': 'mean',
    'Vehicle Type': 'first'
}).rename(columns={'Trip ID': 'Trips', 'CO2e (kg)': 'Total CO2e', 'Running Distance (km)': 'Total Distance', 'EF_CO2 (kg/km)': 'Avg EF_CO2 (kg/km)', 'Route Efficiency (Running/Total)': 'Avg Route Efficiency'})
perf['Benchmark EF_CO2 (kg/km)'] = perf['Vehicle Type'].map(benchmarks)
perf['Performance vs Benchmark (%)'] = 100 * (perf['Avg EF_CO2 (kg/km)'] / perf['Benchmark EF_CO2 (kg/km)'])
perf = perf.sort_values('Avg EF_CO2 (kg/km)', ascending=False)
st.dataframe(perf[['Trips', 'Total Distance', 'Total CO2e', 'Avg EF_CO2 (kg/km)', 'Benchmark EF_CO2 (kg/km)', 'Performance vs Benchmark (%)', 'Avg Route Efficiency']].style.format({
    'Total Distance': '{:,.1f}',
    'Total CO2e': '{:,.1f}',
    'Avg EF_CO2 (kg/km)': '{:.3f}',
    'Benchmark EF_CO2 (kg/km)': '{:.3f}',
    'Performance vs Benchmark (%)': '{:.1f}',
    'Avg Route Efficiency': '{:.2f}'
}))

# Modern, professional bar chart for average CO2 emissions by vehicle
fig, ax = plt.subplots(figsize=(max(8, len(perf)*0.7), 5))
sns.barplot(
    data=perf.reset_index(),
    x='Vehicle No.', y='Avg EF_CO2 (kg/km)',
    palette='crest', ax=ax
)
ax.set_ylabel('Average CO₂e Emissions (kg/km)', fontsize=13)
ax.set_xlabel('Vehicle Number', fontsize=13)
ax.set_title('Average CO₂e Emissions per km by Vehicle', fontsize=15, fontweight='bold')
ax.grid(axis='y', linestyle='--', alpha=0.7)
ax.set_xticklabels(ax.get_xticklabels(), rotation=30, ha='right', fontsize=11)
for p in ax.patches:
    ax.annotate(f'{p.get_height():.2f}', (p.get_x() + p.get_width() / 2, p.get_height()),
                ha='center', va='bottom', fontsize=10, color='black')
st.pyplot(fig)

# --- IV. Driver Performance (if possible) ---
# If you want to add driver performance, you need to merge with trip data that includes driver info.

# --- V. Benchmarking ---
st.header("Benchmarking")
st.write("""
- HGV: 0.81 kg CO₂e/km (WRI+GLEC uplift)
- MGV: 0.65 kg CO₂e/km
- LGV: 0.34 kg CO₂e/km
""")
st.write("Compare your fleet's average with these benchmarks above.")

st.success("Dashboard generated using Streamlit. For more features, consider exporting to Power BI or Tableau.")
