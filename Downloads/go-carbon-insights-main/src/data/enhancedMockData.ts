
export interface Framework {
  name: string;
  status: 'Implemented' | 'In Progress' | 'Planned' | 'Not Started';
  score?: string;
}

export interface EmissionDataPoint {
  year: number;
  scope1: number;
  scope2: number;
  scope3: number;
}

export interface SBTITargets {
  description: string;
  nearTermTarget: string;
  longTermTarget: string;
  baselineYear: number;
  targetYear: number;
  validationStatus: string;
  scope1Reduction: number;
  scope3Reduction: number;
}

export interface PathwayDataPoint {
  year: number;
  emissions: number;
  target: number;
}

export interface EnhancedCompany {
  id: string;
  name: string;
  sector: string;
  industry: string;
  description: string;
  headquarters: string;
  employees: number;
  revenue: number; // in billions USD
  marketCap: number; // in billions USD
  totalEmissions: number; // in tCO2e
  emissionsIntensity: number; // tCO2e per million USD revenue
  carbonFootprint: number;
  energyConsumption: number; // MWh
  wasteGenerated: number; // tons
  renewableEnergyPercentage: number;
  waterUsage: number; // million gallons
  sustainabilityRating: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';
  sbtiCommitted: boolean;
  netZeroTarget: number | null; // target year
  keyInitiatives: string[];
  challenges: string[];
  opportunities: string[];
  reportingFrameworks: string[];
  lastUpdated: string;
  
  // Additional properties needed by the application
  emissionsData: EmissionDataPoint[];
  topCarbonFootprints: string[];
  sbtiTargets?: SBTITargets;
  sbtiProgress?: number;
  frameworks: Framework[];
  pathwayData?: PathwayDataPoint[];
  carbonCredits?: number;
  materialityScore?: number;
  supplierDecarbonization?: number;
}

export const enhancedCompanies: EnhancedCompany[] = [
  // Energy Sector - Oil & Gas
  {
    id: 'saudi_aramco',
    name: 'Saudi Aramco',
    sector: 'Energy',
    industry: 'Oil & Gas',
    description: 'World\'s largest oil company and leading integrated energy and chemicals enterprise',
    headquarters: 'Dhahran, Saudi Arabia',
    employees: 70000,
    revenue: 535.0,
    marketCap: 2100.0,
    totalEmissions: 850000,
    emissionsIntensity: 1588.8,
    carbonFootprint: 850000,
    energyConsumption: 950000,
    wasteGenerated: 12000,
    renewableEnergyPercentage: 5,
    waterUsage: 2800,
    sustainabilityRating: 'C',
    sbtiCommitted: false,
    netZeroTarget: 2060,
    keyInitiatives: ['Carbon capture and storage', 'Methane leak detection', 'Renewable energy projects'],
    challenges: ['Fossil fuel dependency', 'Regulatory pressure', 'Energy transition'],
    opportunities: ['Blue hydrogen production', 'CCUS technology', 'Renewable energy expansion'],
    reportingFrameworks: ['GRI', 'SASB', 'TCFD'],
    lastUpdated: '2024-01-15',
    emissionsData: [
      { year: 2019, scope1: 420000, scope2: 85000, scope3: 345000 },
      { year: 2020, scope1: 415000, scope2: 83000, scope3: 340000 },
      { year: 2021, scope1: 412000, scope2: 82000, scope3: 338000 },
      { year: 2022, scope1: 408000, scope2: 81000, scope3: 335000 },
      { year: 2023, scope1: 405000, scope2: 80000, scope3: 332000 },
      { year: 2024, scope1: 400000, scope2: 78000, scope3: 330000 }
    ],
    topCarbonFootprints: ['Oil extraction and processing', 'Refinery operations', 'Transportation and logistics'],
    frameworks: [
      { name: 'GRI', status: 'Implemented' },
      { name: 'SASB', status: 'Implemented' },
      { name: 'TCFD', status: 'In Progress' },
      { name: 'CDP', status: 'Planned' }
    ],
    carbonCredits: 0,
    materialityScore: 6.2,
    supplierDecarbonization: 25
  },
  {
    id: 'exxonmobil',
    name: 'ExxonMobil',
    sector: 'Energy',
    industry: 'Oil & Gas',
    description: 'American multinational oil and gas corporation',
    headquarters: 'Irving, Texas, USA',
    employees: 62000,
    revenue: 413.7,
    marketCap: 450.0,
    totalEmissions: 560000,
    emissionsIntensity: 1353.1,
    carbonFootprint: 560000,
    energyConsumption: 720000,
    wasteGenerated: 7800,
    renewableEnergyPercentage: 12,
    waterUsage: 2200,
    sustainabilityRating: 'C+',
    sbtiCommitted: false,
    netZeroTarget: 2050,
    keyInitiatives: ['Low-carbon solutions', 'Advanced recycling', 'Carbon capture'],
    challenges: ['Climate litigation', 'Stranded assets', 'Energy transition'],
    opportunities: ['Biofuels development', 'Carbon capture', 'Chemical recycling'],
    reportingFrameworks: ['GRI', 'SASB', 'TCFD', 'CDP'],
    lastUpdated: '2024-01-15',
    emissionsData: [
      { year: 2019, scope1: 280000, scope2: 56000, scope3: 224000 },
      { year: 2020, scope1: 275000, scope2: 55000, scope3: 220000 },
      { year: 2021, scope1: 270000, scope2: 54000, scope3: 216000 },
      { year: 2022, scope1: 265000, scope2: 53000, scope3: 212000 },
      { year: 2023, scope1: 260000, scope2: 52000, scope3: 208000 },
      { year: 2024, scope1: 255000, scope2: 51000, scope3: 204000 }
    ],
    topCarbonFootprints: ['Refining operations', 'Upstream production', 'Product transportation'],
    frameworks: [
      { name: 'GRI', status: 'Implemented' },
      { name: 'SASB', status: 'Implemented' },
      { name: 'TCFD', status: 'Implemented' },
      { name: 'CDP', status: 'Implemented' }
    ],
    carbonCredits: 15000,
    materialityScore: 6.8,
    supplierDecarbonization: 32
  },

  // Technology Sector
  {
    id: 'amazon',
    name: 'Amazon',
    sector: 'Technology',
    industry: 'E-commerce & Cloud',
    description: 'American multinational technology company focusing on e-commerce and cloud computing',
    headquarters: 'Seattle, Washington, USA',
    employees: 1540000,
    revenue: 574.8,
    marketCap: 1650.0,
    totalEmissions: 85000,
    emissionsIntensity: 147.9,
    carbonFootprint: 85000,
    energyConsumption: 180000,
    wasteGenerated: 1800,
    renewableEnergyPercentage: 65,
    waterUsage: 890,
    sustainabilityRating: 'B+',
    sbtiCommitted: true,
    netZeroTarget: 2040,
    keyInitiatives: ['Climate Pledge', 'Electric delivery fleet', 'Renewable energy projects'],
    challenges: ['Logistics emissions', 'Packaging waste', 'Energy-intensive operations'],
    opportunities: ['Clean energy infrastructure', 'Sustainable packaging', 'Carbon-neutral delivery'],
    reportingFrameworks: ['GRI', 'SASB', 'TCFD', 'CDP'],
    lastUpdated: '2024-01-15',
    emissionsData: [
      { year: 2019, scope1: 8500, scope2: 16500, scope3: 60000 },
      { year: 2020, scope1: 8200, scope2: 16000, scope3: 58000 },
      { year: 2021, scope1: 7800, scope2: 15200, scope3: 55000 },
      { year: 2022, scope1: 7500, scope2: 14800, scope3: 52000 },
      { year: 2023, scope1: 7200, scope2: 14300, scope3: 50000 },
      { year: 2024, scope1: 6900, scope2: 13800, scope3: 48000 }
    ],
    topCarbonFootprints: ['Data center operations', 'Logistics and transportation', 'Packaging materials'],
    sbtiTargets: {
      description: 'Net-zero carbon across all operations by 2040, 10 years ahead of the Paris Agreement',
      nearTermTarget: '50% reduction by 2030',
      longTermTarget: 'Net-zero by 2040',
      baselineYear: 2019,
      targetYear: 2040,
      validationStatus: 'Targets Approved',
      scope1Reduction: 50,
      scope3Reduction: 40
    },
    sbtiProgress: 65,
    frameworks: [
      { name: 'GRI', status: 'Implemented' },
      { name: 'SASB', status: 'Implemented' },
      { name: 'TCFD', status: 'Implemented' },
      { name: 'CDP', status: 'Implemented', score: 'A-' }
    ],
    pathwayData: [
      { year: 2019, emissions: 85000, target: 85000 },
      { year: 2020, emissions: 82200, target: 81200 },
      { year: 2021, emissions: 78000, target: 77400 },
      { year: 2022, emissions: 74300, target: 73600 },
      { year: 2023, emissions: 71500, target: 69800 },
      { year: 2024, emissions: 68700, target: 66000 },
      { year: 2030, emissions: 42500, target: 42500 },
      { year: 2040, emissions: 0, target: 0 }
    ],
    carbonCredits: 125000,
    materialityScore: 8.5,
    supplierDecarbonization: 72
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    sector: 'Technology',
    industry: 'Software & Cloud',
    description: 'American multinational technology corporation developing software and cloud services',
    headquarters: 'Redmond, Washington, USA',
    employees: 228000,
    revenue: 230.0,
    marketCap: 2800.0,
    totalEmissions: 18000,
    emissionsIntensity: 78.3,
    carbonFootprint: 18000,
    energyConsumption: 42000,
    wasteGenerated: 420,
    renewableEnergyPercentage: 75,
    waterUsage: 180,
    sustainabilityRating: 'A-',
    sbtiCommitted: true,
    netZeroTarget: 2030,
    keyInitiatives: ['Carbon negative by 2030', 'AI for sustainability', 'Green software'],
    challenges: ['Data center energy use', 'Supply chain emissions', 'Customer product use'],
    opportunities: ['Carbon removal technology', 'Sustainable cloud services', 'Green AI solutions'],
    reportingFrameworks: ['GRI', 'SASB', 'TCFD', 'CDP'],
    lastUpdated: '2024-01-15',
    emissionsData: [
      { year: 2019, scope1: 1800, scope2: 3200, scope3: 13000 },
      { year: 2020, scope1: 1700, scope2: 3000, scope3: 12500 },
      { year: 2021, scope1: 1600, scope2: 2800, scope3: 12000 },
      { year: 2022, scope1: 1500, scope2: 2600, scope3: 11500 },
      { year: 2023, scope1: 1400, scope2: 2400, scope3: 11000 },
      { year: 2024, scope1: 1300, scope2: 2200, scope3: 10500 }
    ],
    topCarbonFootprints: ['Cloud infrastructure', 'Business travel', 'Employee commuting'],
    sbtiTargets: {
      description: 'Carbon negative by 2030 and remove all historical emissions by 2050',
      nearTermTarget: 'Carbon negative by 2030',
      longTermTarget: 'Remove all historical emissions by 2050',
      baselineYear: 2020,
      targetYear: 2030,
      validationStatus: 'Targets Approved',
      scope1Reduction: 75,
      scope3Reduction: 50
    },
    sbtiProgress: 78,
    frameworks: [
      { name: 'GRI', status: 'Implemented' },
      { name: 'SASB', status: 'Implemented' },
      { name: 'TCFD', status: 'Implemented' },
      { name: 'CDP', status: 'Implemented', score: 'A' }
    ],
    pathwayData: [
      { year: 2020, emissions: 17200, target: 17200 },
      { year: 2021, emissions: 16400, target: 15480 },
      { year: 2022, emissions: 15600, target: 13760 },
      { year: 2023, emissions: 14800, target: 12040 },
      { year: 2024, emissions: 14000, target: 10320 },
      { year: 2030, emissions: -5000, target: -5000 }
    ],
    carbonCredits: 85000,
    materialityScore: 9.2,
    supplierDecarbonization: 85
  },
  {
    id: 'tesla',
    name: 'Tesla',
    sector: 'Manufacturing',
    industry: 'Electric Vehicles',
    description: 'American electric vehicle and clean energy company',
    headquarters: 'Austin, Texas, USA',
    employees: 140000,
    revenue: 96.8,
    marketCap: 800.0,
    totalEmissions: 8500,
    emissionsIntensity: 87.8,
    carbonFootprint: 8500,
    energyConsumption: 18000,
    wasteGenerated: 280,
    renewableEnergyPercentage: 85,
    waterUsage: 120,
    sustainabilityRating: 'A',
    sbtiCommitted: true,
    netZeroTarget: 2040,
    keyInitiatives: ['Electric vehicle acceleration', 'Battery recycling', 'Solar energy systems'],
    challenges: ['Battery supply chain', 'Manufacturing scale-up', 'Charging infrastructure'],
    opportunities: ['Battery technology advancement', 'Energy storage systems', 'Autonomous driving'],
    reportingFrameworks: ['GRI', 'SASB', 'TCFD'],
    lastUpdated: '2024-01-15',
    emissionsData: [
      { year: 2019, scope1: 800, scope2: 1500, scope3: 6200 },
      { year: 2020, scope1: 850, scope2: 1600, scope3: 6800 },
      { year: 2021, scope1: 900, scope2: 1700, scope3: 7200 },
      { year: 2022, scope1: 950, scope2: 1800, scope3: 7500 },
      { year: 2023, scope1: 1000, scope2: 1900, scope3: 7800 },
      { year: 2024, scope1: 1050, scope2: 2000, scope3: 8100 }
    ],
    topCarbonFootprints: ['Battery manufacturing', 'Vehicle production', 'Supply chain materials'],
    sbtiTargets: {
      description: 'Achieve carbon neutrality across the entire vehicle lifecycle by 2040',
      nearTermTarget: '50% reduction in manufacturing emissions by 2030',
      longTermTarget: 'Carbon neutral lifecycle by 2040',
      baselineYear: 2020,
      targetYear: 2040,
      validationStatus: 'Under Review',
      scope1Reduction: 50,
      scope3Reduction: 60
    },
    sbtiProgress: 45,
    frameworks: [
      { name: 'GRI', status: 'Implemented' },
      { name: 'SASB', status: 'In Progress' },
      { name: 'TCFD', status: 'Implemented' }
    ],
    pathwayData: [
      { year: 2020, emissions: 8850, target: 8850 },
      { year: 2021, emissions: 9800, target: 8673 },
      { year: 2022, emissions: 10250, target: 8496 },
      { year: 2023, emissions: 10700, target: 8319 },
      { year: 2024, emissions: 11150, target: 8142 },
      { year: 2030, emissions: 5500, target: 4425 },
      { year: 2040, emissions: 0, target: 0 }
    ],
    carbonCredits: 25000,
    materialityScore: 8.8,
    supplierDecarbonization: 68
  },

  // Manufacturing - Automotive
  {
    id: 'toyota',
    name: 'Toyota',
    sector: 'Manufacturing',
    industry: 'Automotive',
    description: 'Japanese multinational automotive manufacturer',
    headquarters: 'Toyota City, Japan',
    employees: 375000,
    revenue: 274.5,
    marketCap: 250.0,
    totalEmissions: 45000,
    emissionsIntensity: 163.9,
    carbonFootprint: 45000,
    energyConsumption: 75000,
    wasteGenerated: 1200,
    renewableEnergyPercentage: 45,
    waterUsage: 420,
    sustainabilityRating: 'B+',
    sbtiCommitted: true,
    netZeroTarget: 2050,
    keyInitiatives: ['Hybrid technology', 'Hydrogen fuel cells', 'Manufacturing efficiency'],
    challenges: ['ICE vehicle transition', 'Supply chain complexity', 'Regional energy grids'],
    opportunities: ['Electric vehicle expansion', 'Hydrogen mobility', 'Circular economy'],
    reportingFrameworks: ['GRI', 'SASB', 'TCFD', 'CDP'],
    lastUpdated: '2024-01-15',
    emissionsData: [
      { year: 2019, scope1: 4500, scope2: 8500, scope3: 32000 },
      { year: 2020, scope1: 4300, scope2: 8200, scope3: 30500 },
      { year: 2021, scope1: 4100, scope2: 7900, scope3: 29000 },
      { year: 2022, scope1: 3900, scope2: 7600, scope3: 27500 },
      { year: 2023, scope1: 3700, scope2: 7300, scope3: 26000 },
      { year: 2024, scope1: 3500, scope2: 7000, scope3: 24500 }
    ],
    topCarbonFootprints: ['Vehicle manufacturing', 'Steel production', 'Global supply chain'],
    frameworks: [
      { name: 'GRI', status: 'Implemented' },
      { name: 'SASB', status: 'Implemented' },
      { name: 'TCFD', status: 'Implemented' },
      { name: 'CDP', status: 'Implemented', score: 'B' }
    ],
    carbonCredits: 45000,
    materialityScore: 7.5,
    supplierDecarbonization: 58
  },

  // Retail
  {
    id: 'walmart',
    name: 'Walmart',
    sector: 'Retail',
    industry: 'Retail',
    description: 'American multinational retail corporation',
    headquarters: 'Bentonville, Arkansas, USA',
    employees: 2100000,
    revenue: 648.1,
    marketCap: 520.0,
    totalEmissions: 28000,
    emissionsIntensity: 43.2,
    carbonFootprint: 28000,
    energyConsumption: 75000,
    wasteGenerated: 2800,
    renewableEnergyPercentage: 45,
    waterUsage: 850,
    sustainabilityRating: 'B',
    sbtiCommitted: true,
    netZeroTarget: 2040,
    keyInitiatives: ['Project Gigaton', 'Renewable energy', 'Sustainable sourcing'],
    challenges: ['Supply chain scope 3', 'Store energy use', 'Packaging waste'],
    opportunities: ['Supplier engagement', 'Electric delivery', 'Circular retail'],
    reportingFrameworks: ['GRI', 'SASB', 'TCFD', 'CDP'],
    lastUpdated: '2024-01-15',
    emissionsData: [
      { year: 2019, scope1: 2800, scope2: 5200, scope3: 20000 },
      { year: 2020, scope1: 2700, scope2: 5000, scope3: 19500 },
      { year: 2021, scope1: 2600, scope2: 4800, scope3: 19000 },
      { year: 2022, scope1: 2500, scope2: 4600, scope3: 18500 },
      { year: 2023, scope1: 2400, scope2: 4400, scope3: 18000 },
      { year: 2024, scope1: 2300, scope2: 4200, scope3: 17500 }
    ],
    topCarbonFootprints: ['Supply chain operations', 'Store energy consumption', 'Transportation logistics'],
    frameworks: [
      { name: 'GRI', status: 'Implemented' },
      { name: 'SASB', status: 'Implemented' },
      { name: 'TCFD', status: 'Implemented' },
      { name: 'CDP', status: 'Implemented', score: 'B+' }
    ],
    carbonCredits: 65000,
    materialityScore: 7.8,
    supplierDecarbonization: 62
  },

  // Add the original companies to maintain compatibility
  {
    id: 'techcorp',
    name: 'TechCorp Solutions',
    sector: 'Technology',
    industry: 'Software Development',
    description: 'Leading software development company focusing on cloud solutions',
    headquarters: 'San Francisco, California, USA',
    employees: 5200,
    revenue: 2.8,
    marketCap: 15.0,
    totalEmissions: 3100,
    emissionsIntensity: 1107.1,
    carbonFootprint: 3100,
    energyConsumption: 12450,
    wasteGenerated: 245,
    renewableEnergyPercentage: 75,
    waterUsage: 85,
    sustainabilityRating: 'A-',
    sbtiCommitted: true,
    netZeroTarget: 2050,
    keyInitiatives: ['100% renewable energy', 'Green software development', 'Remote work optimization'],
    challenges: ['Data center efficiency', 'Employee commuting', 'Supply chain visibility'],
    opportunities: ['Carbon-neutral cloud services', 'Sustainable software practices', 'Digital transformation'],
    reportingFrameworks: ['GRI', 'SASB', 'TCFD', 'CDP'],
    lastUpdated: '2024-01-15',
    emissionsData: [
      { year: 2019, scope1: 550, scope2: 1200, scope3: 8250 },
      { year: 2020, scope1: 520, scope2: 1150, scope3: 7830 },
      { year: 2021, scope1: 480, scope2: 1100, scope3: 7420 },
      { year: 2022, scope1: 450, scope2: 1050, scope3: 7000 },
      { year: 2023, scope1: 420, scope2: 1000, scope3: 6580 },
      { year: 2024, scope1: 390, scope2: 950, scope3: 6160 }
    ],
    topCarbonFootprints: ['Cloud infrastructure', 'Employee commuting', 'Business travel'],
    sbtiTargets: {
      description: 'Achieve net-zero emissions across all operations by 2050 with interim targets',
      nearTermTarget: '50% reduction by 2030',
      longTermTarget: 'Net-zero by 2050',
      baselineYear: 2019,
      targetYear: 2050,
      validationStatus: 'Targets Approved',
      scope1Reduction: 50,
      scope3Reduction: 42
    },
    sbtiProgress: 58,
    frameworks: [
      { name: 'GRI', status: 'Implemented' },
      { name: 'SASB', status: 'Implemented' },
      { name: 'TCFD', status: 'Implemented' },
      { name: 'CDP', status: 'Implemented', score: 'A-' }
    ],
    pathwayData: [
      { year: 2019, emissions: 10000, target: 10000 },
      { year: 2020, emissions: 9500, target: 9500 },
      { year: 2021, emissions: 9000, target: 9000 },
      { year: 2022, emissions: 8500, target: 8500 },
      { year: 2023, emissions: 8000, target: 8000 },
      { year: 2024, emissions: 7500, target: 7500 },
      { year: 2030, emissions: 5000, target: 5000 },
      { year: 2050, emissions: 0, target: 0 }
    ],
    carbonCredits: 12000,
    materialityScore: 8.2,
    supplierDecarbonization: 75
  },

  // Consumer Goods
  {
    id: 'nestle',
    name: 'Nestle',
    sector: 'Consumer Goods',
    industry: 'Food & Beverage',
    description: 'Swiss multinational food and drink corporation',
    headquarters: 'Vevey, Switzerland',
    employees: 273000,
    revenue: 94.4,
    marketCap: 320.0,
    totalEmissions: 18000,
    emissionsIntensity: 190.7,
    carbonFootprint: 18000,
    energyConsumption: 48000,
    wasteGenerated: 850,
    renewableEnergyPercentage: 48,
    waterUsage: 1200,
    sustainabilityRating: 'B+',
    sbtiCommitted: true,
    netZeroTarget: 2050,
    keyInitiatives: ['Regenerative agriculture', 'Sustainable packaging', 'Water stewardship'],
    challenges: ['Agricultural supply chain', 'Packaging waste', 'Water scarcity'],
    opportunities: ['Plant-based products', 'Circular packaging', 'Climate-smart agriculture'],
    reportingFrameworks: ['GRI', 'SASB', 'TCFD', 'CDP'],
    lastUpdated: '2024-01-15',
    emissionsData: [
      { year: 2019, scope1: 1800, scope2: 3400, scope3: 12800 },
      { year: 2020, scope1: 1750, scope2: 3300, scope3: 12500 },
      { year: 2021, scope1: 1700, scope2: 3200, scope3: 12200 },
      { year: 2022, scope1: 1650, scope2: 3100, scope3: 11900 },
      { year: 2023, scope1: 1600, scope2: 3000, scope3: 11600 },
      { year: 2024, scope1: 1550, scope2: 2900, scope3: 11300 }
    ],
    topCarbonFootprints: ['Agricultural supply chain', 'Manufacturing operations', 'Packaging materials'],
    frameworks: [
      { name: 'GRI', status: 'Implemented' },
      { name: 'SASB', status: 'Implemented' },
      { name: 'TCFD', status: 'Implemented' },
      { name: 'CDP', status: 'Implemented', score: 'B' }
    ],
    carbonCredits: 35000,
    materialityScore: 7.2,
    supplierDecarbonization: 55
  },

  // Aerospace
  {
    id: 'boeing',
    name: 'Boeing',
    sector: 'Manufacturing',
    industry: 'Aerospace',
    description: 'American multinational aerospace corporation',
    headquarters: 'Chicago, Illinois, USA',
    employees: 156000,
    revenue: 66.6,
    marketCap: 140.0,
    totalEmissions: 28000,
    emissionsIntensity: 420.4,
    carbonFootprint: 28000,
    energyConsumption: 45000,
    wasteGenerated: 850,
    renewableEnergyPercentage: 35,
    waterUsage: 320,
    sustainabilityRating: 'B-',
    sbtiCommitted: true,
    netZeroTarget: 2050,
    keyInitiatives: ['Sustainable aviation fuels', 'Efficient aircraft design', 'Manufacturing optimization'],
    challenges: ['Aviation industry emissions', 'Long product lifecycles', 'Customer operations'],
    opportunities: ['Electric aircraft', 'Sustainable aviation fuels', 'Advanced materials'],
    reportingFrameworks: ['GRI', 'SASB', 'TCFD', 'CDP'],
    lastUpdated: '2024-01-15',
    emissionsData: [
      { year: 2019, scope1: 2800, scope2: 5200, scope3: 20000 },
      { year: 2020, scope1: 2600, scope2: 4800, scope3: 18500 },
      { year: 2021, scope1: 2400, scope2: 4400, scope3: 17000 },
      { year: 2022, scope1: 2500, scope2: 4600, scope3: 17800 },
      { year: 2023, scope1: 2300, scope2: 4200, scope3: 16500 },
      { year: 2024, scope1: 2200, scope2: 4000, scope3: 16000 }
    ],
    topCarbonFootprints: ['Aircraft manufacturing', 'Material processing', 'Supply chain logistics'],
    frameworks: [
      { name: 'GRI', status: 'Implemented' },
      { name: 'SASB', status: 'Implemented' },
      { name: 'TCFD', status: 'Implemented' },
      { name: 'CDP', status: 'In Progress' }
    ],
    carbonCredits: 18000,
    materialityScore: 6.8,
    supplierDecarbonization: 42
  }
];

// Helper functions for data processing
export const getCompanyById = (id: string): EnhancedCompany | undefined => {
  return enhancedCompanies.find(company => company.id === id);
};

export const getCompaniesBySector = (sector: string): EnhancedCompany[] => {
  return enhancedCompanies.filter(company => company.sector === sector);
};

export const getTopEmitters = (limit: number = 10): EnhancedCompany[] => {
  return enhancedCompanies
    .sort((a, b) => b.totalEmissions - a.totalEmissions)
    .slice(0, limit);
};

export const getTopPerformers = (limit: number = 10): EnhancedCompany[] => {
  const ratingOrder = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];
  return enhancedCompanies
    .sort((a, b) => ratingOrder.indexOf(a.sustainabilityRating) - ratingOrder.indexOf(b.sustainabilityRating))
    .slice(0, limit);
};

export const getSectorBreakdown = () => {
  const sectors = [...new Set(enhancedCompanies.map(c => c.sector))];
  return sectors.map(sector => ({
    sector,
    companies: getCompaniesBySector(sector).length,
    totalEmissions: getCompaniesBySector(sector).reduce((sum, c) => sum + c.totalEmissions, 0),
    avgSustainabilityRating: getCompaniesBySector(sector)[0]?.sustainabilityRating || 'C'
  }));
};

export default enhancedCompanies;
