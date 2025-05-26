import pandas as pd

# GWP factors (AR5):
GWP_CH4 = 28
GWP_N2O = 265

# Emission factors per km (WRI India, kg/km, tailpipe, for diesel trucks)
# Values are approximate, for illustration. Adjust as per your reference if needed.
EMISSION_FACTORS = {
    'LGV': {'CO2': 0.305, 'CH4': 0.00002, 'N2O': 0.00002},
    'MGV': {'CO2': 0.59,  'CH4': 0.00003, 'N2O': 0.00003},
    'HGV': {'CO2': 0.73,  'CH4': 0.00004, 'N2O': 0.00004},
}

# 10% uplift for real-world conditions
def uplift(val):
    return round(val * 1.1, 6)

def get_type_factor(veh_type):
    if 'LGV' in veh_type:
        return 'LGV'
    elif 'MGV' in veh_type:
        return 'MGV'
    elif 'HGV' in veh_type:
        return 'HGV'
    else:
        return None

# Load CSVs
df_trip = pd.read_csv('PRL-GreenkoReport-24-25.csv', low_memory=False, encoding='utf-8')
df_veh = pd.read_csv('PRLGreenko.vahans.csv', low_memory=False, encoding='utf-8')

results = []
for _, row in df_trip.iterrows():
    trip_id = row['Assignment UID']
    veh_no = row['Current Vehicle No.']
    # --- Force vehicle type/fuel for specific vehicles ---
    if str(veh_no) == 'RJ06FC0709':
        veh_type = 'HGV'
        fuel_type = 'DIESEL'
        type_key = 'HGV'
    elif str(veh_no) == 'MH03ES1467':
        veh_type = 'MGV'
        fuel_type = 'DIESEL'
        type_key = 'MGV'
    else:
        veh_info = df_veh[df_veh['regNo'] == str(veh_no)]
        if not veh_info.empty:
            veh_type = veh_info.iloc[0]['details.rc_vch_catg']
            fuel_type = veh_info.iloc[0]['details.rc_fuel_desc']
            if 'LGV' in veh_type:
                type_key = 'LGV'
            elif 'MGV' in veh_type:
                type_key = 'MGV'
            elif 'HGV' in veh_type:
                type_key = 'HGV'
            else:
                type_key = None
        else:
            veh_type = ''
            fuel_type = ''
            type_key = None
    try:
        running_distance = float(row['Distance Covered'])
    except:
        running_distance = ''
    try:
        total_distance = float(row['Total Distance'])
    except:
        total_distance = ''
    route_efficiency = round(running_distance / total_distance, 3) if running_distance != '' and total_distance != '' and total_distance != 0 else ''
    if type_key and running_distance != '':
        ef = EMISSION_FACTORS[type_key]
        co2 = uplift(ef['CO2']) * running_distance
        ch4 = uplift(ef['CH4']) * running_distance
        n2o = uplift(ef['N2O']) * running_distance
        co2e = co2 + ch4 * GWP_CH4 + n2o * GWP_N2O
        co2 = round(co2, 2)
        ch4 = round(ch4, 5)
        n2o = round(n2o, 5)
        co2e = round(co2e, 2)
        ef_co2 = uplift(ef['CO2'])
        ef_ch4 = uplift(ef['CH4'])
        ef_n2o = uplift(ef['N2O'])
    else:
        co2 = ch4 = n2o = co2e = ef_co2 = ef_ch4 = ef_n2o = ''
    results.append({
        'Trip ID': trip_id,
        'Vehicle No.': veh_no,
        'Vehicle Type': veh_type,
        'Fuel Type': fuel_type,
        'Running Distance (km)': running_distance,
        'Total Distance (km)': total_distance,
        'Route Efficiency (Running/Total)': route_efficiency,
        'EF_CO2 (kg/km)': ef_co2,
        'EF_CH4 (kg/km)': ef_ch4,
        'EF_N2O (kg/km)': ef_n2o,
        'CO2 (kg)': co2,
        'CH4 (kg)': ch4,
        'N2O (kg)': n2o,
        'CO2e (kg)': co2e
    })
df_results = pd.DataFrame(results)

# Define desired column order
column_order = [
    'Trip ID', 'Vehicle No.', 'Vehicle Type', 'Fuel Type',
    'Running Distance (km)', 'Total Distance (km)', 'Route Efficiency (Running/Total)',
    'EF_CO2 (kg/km)', 'EF_CH4 (kg/km)', 'EF_N2O (kg/km)',
    'CO2 (kg)', 'CH4 (kg)', 'N2O (kg)', 'CO2e (kg)'
]
df_results = df_results[column_order]

df_results.drop_duplicates(subset=['Trip ID'], keep='first', inplace=True) # Remove duplicates based on Trip ID
df_results.to_csv('RESULTS.csv', index=False)

with pd.ExcelWriter('RESULTS_T.xlsx') as writer:
    df_trip.to_excel(writer, sheet_name='trip data', index=False)
    df_veh.to_excel(writer, sheet_name='vehicle information', index=False)
    df_results.to_excel(writer, sheet_name='results', index=False)
