export interface Company {
  id: string;
  name: string;
  sector: string;
  industry: string;
  reportingYear: string;
  totalEmissions: number;
  emissionsIntensity: number;
  targetAchievement: number;
  carbonFootprint: number;
  energyConsumption: number;
  wasteGenerated: number;
  emissionsData: Array<{
    year: string;
    scope1: number;
    scope2: number;
    scope3: number;
  }>;
  scope1Data: {
    trendData: Array<{ year: string; emissions: number }>;
    sourceData: Array<{ source: string; emissions: number }>;
  };
  scope2Data: {
    trendData: Array<{ year: string; emissions: number }>;
    sourceData: Array<{ source: string; emissions: number }>;
    locationData: Array<{ location: string; emissions: number; percentage: string }>;
  };
  sbtiTargets: {
    nearTerm2030: {
      scope1And2Reduction: number; // percentage
      scope3Reduction: number; // percentage
      baselineYear: string;
      targetYear: string;
    };
    longTerm2050: {
      netZeroTarget: boolean;
      totalReduction: number; // percentage
      targetYear: string;
    };
    currentProgress: {
      scope1And2Achieved: number; // percentage achieved so far
      scope3Achieved: number; // percentage achieved so far
      onTrack: boolean;
    };
  };
  decarbonizationStrategy: {
    carbonLevers: Array<{
      lever: string;
      category: 'scope1and2' | 'scope3';
      reduction: number; // tCO2e
      percentage: number; // percentage of total reduction
      implementation: string;
      status: 'completed' | 'in-progress' | 'planned';
    }>;
    achievements: Array<{
      initiative: string;
      year: string;
      reduction: number;
      description: string;
    }>;
  };
}

export const companies: Company[] = [
  {
    id: 'techcorp',
    name: 'TechCorp Solutions',
    sector: 'Technology',
    industry: 'Software Development',
    reportingYear: '2023',
    totalEmissions: 3100,
    emissionsIntensity: 0.18,
    targetAchievement: 87,
    carbonFootprint: 3100,
    energyConsumption: 12450,
    wasteGenerated: 245,
    emissionsData: [
      { year: '2019', scope1: 1200, scope2: 800, scope3: 2400 },
      { year: '2020', scope1: 1100, scope2: 750, scope3: 2200 },
      { year: '2021', scope1: 1000, scope2: 700, scope3: 2000 },
      { year: '2022', scope1: 950, scope2: 650, scope3: 1800 },
      { year: '2023', scope1: 900, scope2: 600, scope3: 1600 }
    ],
    scope1Data: {
      trendData: [
        { year: '2019', emissions: 1200 },
        { year: '2020', emissions: 1100 },
        { year: '2021', emissions: 1000 },
        { year: '2022', emissions: 950 },
        { year: '2023', emissions: 900 }
      ],
      sourceData: [
        { source: 'Stationary Combustion', emissions: 450 },
        { source: 'Mobile Combustion', emissions: 280 },
        { source: 'Process Emissions', emissions: 120 },
        { source: 'Fugitive Emissions', emissions: 50 }
      ]
    },
    scope2Data: {
      trendData: [
        { year: '2019', emissions: 800 },
        { year: '2020', emissions: 750 },
        { year: '2021', emissions: 700 },
        { year: '2022', emissions: 650 },
        { year: '2023', emissions: 600 }
      ],
      sourceData: [
        { source: 'Electricity', emissions: 450 },
        { source: 'Heating', emissions: 100 },
        { source: 'Cooling', emissions: 50 }
      ],
      locationData: [
        { location: 'San Francisco HQ', emissions: 280, percentage: '46.7%' },
        { location: 'Austin Office', emissions: 150, percentage: '25.0%' },
        { location: 'New York Office', emissions: 120, percentage: '20.0%' },
        { location: 'Remote Facilities', emissions: 50, percentage: '8.3%' }
      ]
    },
    sbtiTargets: {
      nearTerm2030: {
        scope1And2Reduction: 50,
        scope3Reduction: 30,
        baselineYear: '2020',
        targetYear: '2030'
      },
      longTerm2050: {
        netZeroTarget: true,
        totalReduction: 90,
        targetYear: '2050'
      },
      currentProgress: {
        scope1And2Achieved: 35,
        scope3Achieved: 22,
        onTrack: true
      }
    },
    decarbonizationStrategy: {
      carbonLevers: [
        { lever: 'Renewable Energy', category: 'scope1and2', reduction: 400, percentage: 25, implementation: '100% renewable electricity procurement', status: 'completed' },
        { lever: 'Energy Efficiency', category: 'scope1and2', reduction: 200, percentage: 12, implementation: 'Smart building management systems', status: 'in-progress' },
        { lever: 'Sustainable Procurement', category: 'scope3', reduction: 600, percentage: 38, implementation: 'Green supplier requirements', status: 'in-progress' },
        { lever: 'Remote Work', category: 'scope3', reduction: 250, percentage: 15, implementation: 'Hybrid work model reducing commuting', status: 'completed' },
        { lever: 'Cloud Optimization', category: 'scope3', reduction: 150, percentage: 10, implementation: 'Efficient cloud infrastructure', status: 'planned' }
      ],
      achievements: [
        { initiative: '100% Renewable Energy', year: '2022', reduction: 400, description: 'Switched all facilities to renewable energy sources' },
        { initiative: 'Remote Work Policy', year: '2021', reduction: 250, description: 'Implemented permanent hybrid work reducing office emissions' },
        { initiative: 'Green Data Centers', year: '2023', reduction: 180, description: 'Migrated to carbon-neutral cloud providers' }
      ]
    }
  },
  {
    id: 'greenmanuf',
    name: 'Green Manufacturing Co.',
    sector: 'Manufacturing',
    industry: 'Industrial Equipment',
    reportingYear: '2023',
    totalEmissions: 5200,
    emissionsIntensity: 0.35,
    targetAchievement: 72,
    carbonFootprint: 5200,
    energyConsumption: 18750,
    wasteGenerated: 420,
    emissionsData: [
      { year: '2019', scope1: 2100, scope2: 1200, scope3: 3800 },
      { year: '2020', scope1: 1950, scope2: 1150, scope3: 3600 },
      { year: '2021', scope1: 1800, scope2: 1100, scope3: 3400 },
      { year: '2022', scope1: 1700, scope2: 1050, scope3: 3200 },
      { year: '2023', scope1: 1600, scope2: 1000, scope3: 2600 }
    ],
    scope1Data: {
      trendData: [
        { year: '2019', emissions: 2100 },
        { year: '2020', emissions: 1950 },
        { year: '2021', emissions: 1800 },
        { year: '2022', emissions: 1700 },
        { year: '2023', emissions: 1600 }
      ],
      sourceData: [
        { source: 'Stationary Combustion', emissions: 800 },
        { source: 'Mobile Combustion', emissions: 450 },
        { source: 'Process Emissions', emissions: 280 },
        { source: 'Fugitive Emissions', emissions: 70 }
      ]
    },
    scope2Data: {
      trendData: [
        { year: '2019', emissions: 1200 },
        { year: '2020', emissions: 1150 },
        { year: '2021', emissions: 1100 },
        { year: '2022', emissions: 1050 },
        { year: '2023', emissions: 1000 }
      ],
      sourceData: [
        { source: 'Electricity', emissions: 750 },
        { source: 'Heating', emissions: 180 },
        { source: 'Cooling', emissions: 70 }
      ],
      locationData: [
        { location: 'Chicago Plant', emissions: 400, percentage: '40.0%' },
        { location: 'Detroit Facility', emissions: 300, percentage: '30.0%' },
        { location: 'Milwaukee Site', emissions: 200, percentage: '20.0%' },
        { location: 'Other Locations', emissions: 100, percentage: '10.0%' }
      ]
    },
    sbtiTargets: {
      nearTerm2030: {
        scope1And2Reduction: 42,
        scope3Reduction: 25,
        baselineYear: '2019',
        targetYear: '2030'
      },
      longTerm2050: {
        netZeroTarget: true,
        totalReduction: 85,
        targetYear: '2050'
      },
      currentProgress: {
        scope1And2Achieved: 28,
        scope3Achieved: 18,
        onTrack: true
      }
    },
    decarbonizationStrategy: {
      carbonLevers: [
        { lever: 'Process Electrification', category: 'scope1and2', reduction: 800, percentage: 35, implementation: 'Electric heating systems replacing gas', status: 'in-progress' },
        { lever: 'Energy Efficiency', category: 'scope1and2', reduction: 400, percentage: 18, implementation: 'Equipment upgrades and optimization', status: 'completed' },
        { lever: 'Sustainable Materials', category: 'scope3', reduction: 600, percentage: 26, implementation: 'Low-carbon steel and recycled materials', status: 'in-progress' },
        { lever: 'Logistics Optimization', category: 'scope3', reduction: 300, percentage: 13, implementation: 'Electric vehicle fleet and route optimization', status: 'planned' },
        { lever: 'Renewable Energy', category: 'scope1and2', reduction: 200, percentage: 8, implementation: 'On-site solar installation', status: 'completed' }
      ],
      achievements: [
        { initiative: 'Solar Installation', year: '2022', reduction: 200, description: 'Installed 2MW solar capacity at main facility' },
        { initiative: 'Equipment Modernization', year: '2021', reduction: 400, description: 'Upgraded to energy-efficient manufacturing equipment' },
        { initiative: 'Waste Heat Recovery', year: '2023', reduction: 150, description: 'Implemented waste heat recovery systems' }
      ]
    }
  },
  {
    id: 'sustaintech',
    name: 'SustainTech Industries',
    sector: 'Technology',
    industry: 'Clean Energy',
    reportingYear: '2023',
    totalEmissions: 1800,
    emissionsIntensity: 0.12,
    targetAchievement: 94,
    carbonFootprint: 1800,
    energyConsumption: 8200,
    wasteGenerated: 150,
    emissionsData: [
      { year: '2019', scope1: 700, scope2: 400, scope3: 1200 },
      { year: '2020', scope1: 650, scope2: 380, scope3: 1100 },
      { year: '2021', scope1: 600, scope2: 350, scope3: 1000 },
      { year: '2022', scope1: 550, scope2: 320, scope3: 900 },
      { year: '2023', scope1: 500, scope2: 300, scope3: 1000 }
    ],
    scope1Data: {
      trendData: [
        { year: '2019', emissions: 700 },
        { year: '2020', emissions: 650 },
        { year: '2021', emissions: 600 },
        { year: '2022', emissions: 550 },
        { year: '2023', emissions: 500 }
      ],
      sourceData: [
        { source: 'Stationary Combustion', emissions: 250 },
        { source: 'Mobile Combustion', emissions: 150 },
        { source: 'Process Emissions', emissions: 80 },
        { source: 'Fugitive Emissions', emissions: 20 }
      ]
    },
    scope2Data: {
      trendData: [
        { year: '2019', emissions: 400 },
        { year: '2020', emissions: 380 },
        { year: '2021', emissions: 350 },
        { year: '2022', emissions: 320 },
        { year: '2023', emissions: 300 }
      ],
      sourceData: [
        { source: 'Electricity', emissions: 220 },
        { source: 'Heating', emissions: 50 },
        { source: 'Cooling', emissions: 30 }
      ],
      locationData: [
        { location: 'Seattle HQ', emissions: 150, percentage: '50.0%' },
        { location: 'Portland Lab', emissions: 75, percentage: '25.0%' },
        { location: 'Vancouver Office', emissions: 45, percentage: '15.0%' },
        { location: 'Remote Sites', emissions: 30, percentage: '10.0%' }
      ]
    },
    sbtiTargets: {
      nearTerm2030: {
        scope1And2Reduction: 60,
        scope3Reduction: 40,
        baselineYear: '2019',
        targetYear: '2030'
      },
      longTerm2050: {
        netZeroTarget: true,
        totalReduction: 95,
        targetYear: '2050'
      },
      currentProgress: {
        scope1And2Achieved: 45,
        scope3Achieved: 30,
        onTrack: true
      }
    },
    decarbonizationStrategy: {
      carbonLevers: [
        { lever: 'Carbon-Free Energy', category: 'scope1and2', reduction: 350, percentage: 45, implementation: '24/7 carbon-free energy matching', status: 'completed' },
        { lever: 'Green Buildings', category: 'scope1and2', reduction: 150, percentage: 19, implementation: 'LEED Platinum certified facilities', status: 'completed' },
        { lever: 'Sustainable R&D', category: 'scope3', reduction: 200, percentage: 26, implementation: 'Low-carbon technology development', status: 'in-progress' },
        { lever: 'Green Finance', category: 'scope3', reduction: 80, percentage: 10, implementation: 'Sustainable investment portfolio', status: 'planned' }
      ],
      achievements: [
        { initiative: 'Carbon-Free Energy', year: '2021', reduction: 350, description: 'Achieved 100% carbon-free energy across all operations' },
        { initiative: 'Green Building Certification', year: '2020', reduction: 150, description: 'All facilities certified LEED Platinum' },
        { initiative: 'Carbon Negative Products', year: '2023', reduction: 200, description: 'Launched carbon-negative technology solutions' }
      ]
    }
  },
  {
    id: 'retailgiant',
    name: 'Retail Giant Corp',
    sector: 'Retail',
    industry: 'Consumer Goods',
    reportingYear: '2023',
    totalEmissions: 4500,
    emissionsIntensity: 0.28,
    targetAchievement: 68,
    carbonFootprint: 4500,
    energyConsumption: 22000,
    wasteGenerated: 580,
    emissionsData: [
      { year: '2019', scope1: 800, scope2: 1200, scope3: 4200 },
      { year: '2020', scope1: 750, scope2: 1100, scope3: 4000 },
      { year: '2021', scope1: 700, scope2: 1000, scope3: 3800 },
      { year: '2022', scope1: 650, scope2: 950, scope3: 3600 },
      { year: '2023', scope1: 600, scope2: 900, scope3: 3000 }
    ],
    scope1Data: {
      trendData: [
        { year: '2019', emissions: 800 },
        { year: '2020', emissions: 750 },
        { year: '2021', emissions: 700 },
        { year: '2022', emissions: 650 },
        { year: '2023', emissions: 600 }
      ],
      sourceData: [
        { source: 'Stationary Combustion', emissions: 300 },
        { source: 'Mobile Combustion', emissions: 200 },
        { source: 'Process Emissions', emissions: 80 },
        { source: 'Fugitive Emissions', emissions: 20 }
      ]
    },
    scope2Data: {
      trendData: [
        { year: '2019', emissions: 1200 },
        { year: '2020', emissions: 1100 },
        { year: '2021', emissions: 1000 },
        { year: '2022', emissions: 950 },
        { year: '2023', emissions: 900 }
      ],
      sourceData: [
        { source: 'Electricity', emissions: 650 },
        { source: 'Heating', emissions: 150 },
        { source: 'Cooling', emissions: 100 }
      ],
      locationData: [
        { location: 'Distribution Centers', emissions: 450, percentage: '50.0%' },
        { location: 'Retail Stores', emissions: 270, percentage: '30.0%' },
        { location: 'Corporate Offices', emissions: 135, percentage: '15.0%' },
        { location: 'Warehouses', emissions: 45, percentage: '5.0%' }
      ]
    },
    sbtiTargets: {
      nearTerm2030: {
        scope1And2Reduction: 46,
        scope3Reduction: 28,
        baselineYear: '2019',
        targetYear: '2030'
      },
      longTerm2050: {
        netZeroTarget: true,
        totalReduction: 90,
        targetYear: '2050'
      },
      currentProgress: {
        scope1And2Achieved: 32,
        scope3Achieved: 20,
        onTrack: false
      }
    },
    decarbonizationStrategy: {
      carbonLevers: [
        { lever: 'Store Electrification', category: 'scope1and2', reduction: 400, percentage: 30, implementation: 'Electric heating and cooling systems', status: 'in-progress' },
        { lever: 'Renewable Energy', category: 'scope1and2', reduction: 300, percentage: 22, implementation: 'Solar panels on stores and warehouses', status: 'in-progress' },
        { lever: 'Sustainable Products', category: 'scope3', reduction: 500, percentage: 37, implementation: 'Low-carbon product sourcing', status: 'planned' },
        { lever: 'Green Logistics', category: 'scope3', reduction: 150, percentage: 11, implementation: 'Electric delivery vehicles', status: 'in-progress' }
      ],
      achievements: [
        { initiative: 'LED Lighting Retrofit', year: '2021', reduction: 180, description: 'Converted all stores to LED lighting systems' },
        { initiative: 'Solar Installation Program', year: '2022', reduction: 220, description: 'Installed solar panels on 200+ locations' },
        { initiative: 'Electric Vehicle Fleet', year: '2023', reduction: 120, description: 'Deployed electric delivery vehicles in urban areas' }
      ]
    }
  },
  {
    id: 'automaker',
    name: 'AutoMaker Dynamics',
    sector: 'Manufacturing',
    industry: 'Automotive',
    reportingYear: '2023',
    totalEmissions: 7200,
    emissionsIntensity: 0.42,
    targetAchievement: 58,
    carbonFootprint: 7200,
    energyConsumption: 28500,
    wasteGenerated: 750,
    emissionsData: [
      { year: '2019', scope1: 3500, scope2: 1800, scope3: 6800 },
      { year: '2020', scope1: 3200, scope2: 1700, scope3: 6400 },
      { year: '2021', scope1: 2900, scope2: 1600, scope3: 6000 },
      { year: '2022', scope1: 2700, scope2: 1500, scope3: 5600 },
      { year: '2023', scope1: 2500, scope2: 1400, scope3: 3300 }
    ],
    scope1Data: {
      trendData: [
        { year: '2019', emissions: 3500 },
        { year: '2020', emissions: 3200 },
        { year: '2021', emissions: 2900 },
        { year: '2022', emissions: 2700 },
        { year: '2023', emissions: 2500 }
      ],
      sourceData: [
        { source: 'Stationary Combustion', emissions: 1200 },
        { source: 'Mobile Combustion', emissions: 800 },
        { source: 'Process Emissions', emissions: 400 },
        { source: 'Fugitive Emissions', emissions: 100 }
      ]
    },
    scope2Data: {
      trendData: [
        { year: '2019', emissions: 1800 },
        { year: '2020', emissions: 1700 },
        { year: '2021', emissions: 1600 },
        { year: '2022', emissions: 1500 },
        { year: '2023', emissions: 1400 }
      ],
      sourceData: [
        { source: 'Electricity', emissions: 1000 },
        { source: 'Heating', emissions: 250 },
        { source: 'Cooling', emissions: 150 }
      ],
      locationData: [
        { location: 'Main Assembly Plant', emissions: 700, percentage: '50.0%' },
        { location: 'Engine Manufacturing', emissions: 350, percentage: '25.0%' },
        { location: 'Parts Facility', emissions: 210, percentage: '15.0%' },
        { location: 'R&D Centers', emissions: 140, percentage: '10.0%' }
      ]
    },
    sbtiTargets: {
      nearTerm2030: {
        scope1And2Reduction: 50,
        scope3Reduction: 35,
        baselineYear: '2019',
        targetYear: '2030'
      },
      longTerm2050: {
        netZeroTarget: true,
        totalReduction: 95,
        targetYear: '2050'
      },
      currentProgress: {
        scope1And2Achieved: 26,
        scope3Achieved: 15,
        onTrack: false
      }
    },
    decarbonizationStrategy: {
      carbonLevers: [
        { lever: 'Electric Vehicle Production', category: 'scope3', reduction: 2800, percentage: 48, implementation: 'Transition to 80% EV production by 2030', status: 'in-progress' },
        { lever: 'Manufacturing Electrification', category: 'scope1and2', reduction: 1200, percentage: 21, implementation: 'Electric furnaces and heat pumps', status: 'in-progress' },
        { lever: 'Renewable Energy', category: 'scope1and2', reduction: 800, percentage: 14, implementation: 'Wind and solar power purchase agreements', status: 'completed' },
        { lever: 'Sustainable Materials', category: 'scope3', reduction: 600, percentage: 10, implementation: 'Recycled steel and aluminum usage', status: 'planned' },
        { lever: 'Supplier Engagement', category: 'scope3', reduction: 400, percentage: 7, implementation: 'Carbon reduction requirements for suppliers', status: 'in-progress' }
      ],
      achievements: [
        { initiative: 'Renewable Energy Contracts', year: '2021', reduction: 800, description: 'Signed long-term wind and solar PPAs for all facilities' },
        { initiative: 'Electric Platform Launch', year: '2022', reduction: 1500, description: 'Launched dedicated electric vehicle manufacturing platform' },
        { initiative: 'Heat Pump Installation', year: '2023', reduction: 400, description: 'Replaced gas heating with industrial heat pumps' }
      ]
    }
  },
  {
    id: 'pharmalife',
    name: 'PharmaLife Sciences',
    sector: 'Healthcare',
    industry: 'Pharmaceuticals',
    reportingYear: '2023',
    totalEmissions: 2800,
    emissionsIntensity: 0.22,
    targetAchievement: 81,
    carbonFootprint: 2800,
    energyConsumption: 15200,
    wasteGenerated: 320,
    emissionsData: [
      { year: '2019', scope1: 900, scope2: 600, scope3: 1800 },
      { year: '2020', scope1: 850, scope2: 580, scope3: 1700 },
      { year: '2021', scope1: 800, scope2: 550, scope3: 1600 },
      { year: '2022', scope1: 750, scope2: 520, scope3: 1500 },
      { year: '2023', scope1: 700, scope2: 500, scope3: 1600 }
    ],
    scope1Data: {
      trendData: [
        { year: '2019', emissions: 900 },
        { year: '2020', emissions: 850 },
        { year: '2021', emissions: 800 },
        { year: '2022', emissions: 750 },
        { year: '2023', emissions: 700 }
      ],
      sourceData: [
        { source: 'Stationary Combustion', emissions: 350 },
        { source: 'Mobile Combustion', emissions: 200 },
        { source: 'Process Emissions', emissions: 120 },
        { source: 'Fugitive Emissions', emissions: 30 }
      ]
    },
    scope2Data: {
      trendData: [
        { year: '2019', emissions: 600 },
        { year: '2020', emissions: 580 },
        { year: '2021', emissions: 550 },
        { year: '2022', emissions: 520 },
        { year: '2023', emissions: 500 }
      ],
      sourceData: [
        { source: 'Electricity', emissions: 350 },
        { source: 'Heating', emissions: 100 },
        { source: 'Cooling', emissions: 50 }
      ],
      locationData: [
        { location: 'Research Facility', emissions: 200, percentage: '40.0%' },
        { location: 'Manufacturing Plant', emissions: 175, percentage: '35.0%' },
        { location: 'Corporate HQ', emissions: 75, percentage: '15.0%' },
        { location: 'Distribution Centers', emissions: 50, percentage: '10.0%' }
      ]
    },
    sbtiTargets: {
      nearTerm2030: {
        scope1And2Reduction: 42,
        scope3Reduction: 25,
        baselineYear: '2019',
        targetYear: '2030'
      },
      longTerm2050: {
        netZeroTarget: true,
        totalReduction: 90,
        targetYear: '2050'
      },
      currentProgress: {
        scope1And2Achieved: 33,
        scope3Achieved: 18,
        onTrack: true
      }
    },
    decarbonizationStrategy: {
      carbonLevers: [
        { lever: 'Green Chemistry', category: 'scope1and2', reduction: 300, percentage: 35, implementation: 'Low-carbon manufacturing processes', status: 'in-progress' },
        { lever: 'Energy Efficiency', category: 'scope1and2', reduction: 200, percentage: 24, implementation: 'Advanced HVAC and lab equipment', status: 'completed' },
        { lever: 'Sustainable Packaging', category: 'scope3', reduction: 180, percentage: 21, implementation: 'Biodegradable and recycled packaging', status: 'in-progress' },
        { lever: 'Digital Health Solutions', category: 'scope3', reduction: 120, percentage: 14, implementation: 'Reduced physical product needs', status: 'planned' },
        { lever: 'Renewable Energy', category: 'scope1and2', reduction: 50, percentage: 6, implementation: 'On-site solar and wind', status: 'completed' }
      ],
      achievements: [
        { initiative: 'Lab Equipment Upgrade', year: '2021', reduction: 200, description: 'Installed energy-efficient laboratory equipment' },
        { initiative: 'Green Chemistry Initiative', year: '2022', reduction: 150, description: 'Implemented low-carbon synthesis pathways' },
        { initiative: 'Sustainable Packaging', year: '2023', reduction: 100, description: 'Launched biodegradable packaging for key products' }
      ]
    }
  },
  {
    id: 'bankfirst',
    name: 'BankFirst Financial',
    sector: 'Finance',
    industry: 'Banking',
    reportingYear: '2023',
    totalEmissions: 1200,
    emissionsIntensity: 0.08,
    targetAchievement: 92,
    carbonFootprint: 1200,
    energyConsumption: 6800,
    wasteGenerated: 95,
    emissionsData: [
      { year: '2019', scope1: 200, scope2: 400, scope3: 800 },
      { year: '2020', scope1: 180, scope2: 380, scope3: 750 },
      { year: '2021', scope1: 160, scope2: 350, scope3: 700 },
      { year: '2022', scope1: 140, scope2: 320, scope3: 650 },
      { year: '2023', scope1: 120, scope2: 300, scope3: 780 }
    ],
    scope1Data: {
      trendData: [
        { year: '2019', emissions: 200 },
        { year: '2020', emissions: 180 },
        { year: '2021', emissions: 160 },
        { year: '2022', emissions: 140 },
        { year: '2023', emissions: 120 }
      ],
      sourceData: [
        { source: 'Stationary Combustion', emissions: 60 },
        { source: 'Mobile Combustion', emissions: 40 },
        { source: 'Process Emissions', emissions: 15 },
        { source: 'Fugitive Emissions', emissions: 5 }
      ]
    },
    scope2Data: {
      trendData: [
        { year: '2019', emissions: 400 },
        { year: '2020', emissions: 380 },
        { year: '2021', emissions: 350 },
        { year: '2022', emissions: 320 },
        { year: '2023', emissions: 300 }
      ],
      sourceData: [
        { source: 'Electricity', emissions: 220 },
        { source: 'Heating', emissions: 50 },
        { source: 'Cooling', emissions: 30 }
      ],
      locationData: [
        { location: 'Downtown HQ', emissions: 120, percentage: '40.0%' },
        { location: 'Regional Offices', emissions: 90, percentage: '30.0%' },
        { location: 'Branch Network', emissions: 60, percentage: '20.0%' },
        { location: 'Data Centers', emissions: 30, percentage: '10.0%' }
      ]
    },
    sbtiTargets: {
      nearTerm2030: {
        scope1And2Reduction: 55,
        scope3Reduction: 35,
        baselineYear: '2019',
        targetYear: '2030'
      },
      longTerm2050: {
        netZeroTarget: true,
        totalReduction: 95,
        targetYear: '2050'
      },
      currentProgress: {
        scope1And2Achieved: 48,
        scope3Achieved: 25,
        onTrack: true
      }
    },
    decarbonizationStrategy: {
      carbonLevers: [
        { lever: 'Green Finance', category: 'scope3', reduction: 400, percentage: 50, implementation: 'Sustainable investment portfolio', status: 'in-progress' },
        { lever: 'Digital Banking', category: 'scope3', reduction: 200, percentage: 25, implementation: 'Paperless operations and mobile banking', status: 'completed' },
        { lever: 'Green Buildings', category: 'scope1and2', reduction: 120, percentage: 15, implementation: 'LEED certified branches', status: 'in-progress' },
        { lever: 'Renewable Energy', category: 'scope1and2', reduction: 80, percentage: 10, implementation: '100% renewable electricity', status: 'completed' }
      ],
      achievements: [
        { initiative: 'Digital Transformation', year: '2021', reduction: 200, description: 'Eliminated 90% of paper-based processes' },
        { initiative: 'Renewable Energy Procurement', year: '2022', reduction: 80, description: 'Switched to 100% renewable electricity' },
        { initiative: 'Green Bond Issuance', year: '2023', reduction: 150, description: 'Launched $500M green bond for sustainable projects' }
      ]
    }
  },
  {
    id: 'energyco',
    name: 'EnergyCo Power',
    sector: 'Energy',
    industry: 'Utilities',
    reportingYear: '2023',
    totalEmissions: 12500,
    emissionsIntensity: 0.65,
    targetAchievement: 45,
    carbonFootprint: 12500,
    energyConsumption: 45000,
    wasteGenerated: 1200,
    emissionsData: [
      { year: '2019', scope1: 8000, scope2: 500, scope3: 6500 },
      { year: '2020', scope1: 7500, scope2: 480, scope3: 6200 },
      { year: '2021', scope1: 7000, scope2: 450, scope3: 5800 },
      { year: '2022', scope1: 6500, scope2: 420, scope3: 5400 },
      { year: '2023', scope1: 6000, scope2: 400, scope3: 6100 }
    ],
    scope1Data: {
      trendData: [
        { year: '2019', emissions: 8000 },
        { year: '2020', emissions: 7500 },
        { year: '2021', emissions: 7000 },
        { year: '2022', emissions: 6500 },
        { year: '2023', emissions: 6000 }
      ],
      sourceData: [
        { source: 'Stationary Combustion', emissions: 4500 },
        { source: 'Mobile Combustion', emissions: 1000 },
        { source: 'Process Emissions', emissions: 400 },
        { source: 'Fugitive Emissions', emissions: 100 }
      ]
    },
    scope2Data: {
      trendData: [
        { year: '2019', emissions: 500 },
        { year: '2020', emissions: 480 },
        { year: '2021', emissions: 450 },
        { year: '2022', emissions: 420 },
        { year: '2023', emissions: 400 }
      ],
      sourceData: [
        { source: 'Electricity', emissions: 300 },
        { source: 'Heating', emissions: 60 },
        { source: 'Cooling', emissions: 40 }
      ],
      locationData: [
        { location: 'Power Plant 1', emissions: 200, percentage: '50.0%' },
        { location: 'Power Plant 2', emissions: 120, percentage: '30.0%' },
        { location: 'Corporate Office', emissions: 50, percentage: '12.5%' },
        { location: 'Service Centers', emissions: 30, percentage: '7.5%' }
      ]
    },
    sbtiTargets: {
      nearTerm2030: {
        scope1And2Reduction: 65,
        scope3Reduction: 30,
        baselineYear: '2019',
        targetYear: '2030'
      },
      longTerm2050: {
        netZeroTarget: true,
        totalReduction: 95,
        targetYear: '2050'
      },
      currentProgress: {
        scope1And2Achieved: 22,
        scope3Achieved: 12,
        onTrack: false
      }
    },
    decarbonizationStrategy: {
      carbonLevers: [
        { lever: 'Renewable Generation', category: 'scope1and2', reduction: 4000, percentage: 58, implementation: 'Wind and solar farm development', status: 'in-progress' },
        { lever: 'Coal Plant Retirement', category: 'scope1and2', reduction: 2000, percentage: 29, implementation: 'Phased closure of coal facilities', status: 'planned' },
        { lever: 'Grid Modernization', category: 'scope3', reduction: 500, percentage: 7, implementation: 'Smart grid and energy storage', status: 'in-progress' },
        { lever: 'Energy Efficiency Programs', category: 'scope3', reduction: 300, percentage: 4, implementation: 'Customer efficiency incentives', status: 'completed' },
        { lever: 'Carbon Capture', category: 'scope1and2', reduction: 100, percentage: 2, implementation: 'CCUS pilot projects', status: 'planned' }
      ],
      achievements: [
        { initiative: 'Wind Farm Development', year: '2022', reduction: 1500, description: 'Commissioned 500MW wind generation capacity' },
        { initiative: 'Solar Installation', year: '2021', reduction: 800, description: 'Added 300MW solar generation' },
        { initiative: 'Natural Gas Efficiency', year: '2023', reduction: 500, description: 'Upgraded gas turbine efficiency by 15%' }
      ]
    }
  },
  {
    id: 'foodglobal',
    name: 'FoodGlobal Industries',
    sector: 'Consumer Goods',
    industry: 'Food & Beverage',
    reportingYear: '2023',
    totalEmissions: 3800,
    emissionsIntensity: 0.31,
    targetAchievement: 76,
    carbonFootprint: 3800,
    energyConsumption: 19200,
    wasteGenerated: 480,
    emissionsData: [
      { year: '2019', scope1: 1400, scope2: 800, scope3: 2800 },
      { year: '2020', scope1: 1300, scope2: 750, scope3: 2600 },
      { year: '2021', scope1: 1200, scope2: 700, scope3: 2400 },
      { year: '2022', scope1: 1100, scope2: 650, scope3: 2200 },
      { year: '2023', scope1: 1000, scope2: 600, scope3: 2200 }
    ],
    scope1Data: {
      trendData: [
        { year: '2019', emissions: 1400 },
        { year: '2020', emissions: 1300 },
        { year: '2021', emissions: 1200 },
        { year: '2022', emissions: 1100 },
        { year: '2023', emissions: 1000 }
      ],
      sourceData: [
        { source: 'Stationary Combustion', emissions: 500 },
        { source: 'Mobile Combustion', emissions: 300 },
        { source: 'Process Emissions', emissions: 150 },
        { source: 'Fugitive Emissions', emissions: 50 }
      ]
    },
    scope2Data: {
      trendData: [
        { year: '2019', emissions: 800 },
        { year: '2020', emissions: 750 },
        { year: '2021', emissions: 700 },
        { year: '2022', emissions: 650 },
        { year: '2023', emissions: 600 }
      ],
      sourceData: [
        { source: 'Electricity', emissions: 400 },
        { source: 'Heating', emissions: 120 },
        { source: 'Cooling', emissions: 80 }
      ],
      locationData: [
        { location: 'Processing Plant A', emissions: 240, percentage: '40.0%' },
        { location: 'Processing Plant B', emissions: 180, percentage: '30.0%' },
        { location: 'Distribution Centers', emissions: 120, percentage: '20.0%' },
        { location: 'Administrative Offices', emissions: 60, percentage: '10.0%' }
      ]
    },
    sbtiTargets: {
      nearTerm2030: {
        scope1And2Reduction: 50,
        scope3Reduction: 30,
        baselineYear: '2019',
        targetYear: '2030'
      },
      longTerm2050: {
        netZeroTarget: true,
        totalReduction: 90,
        targetYear: '2050'
      },
      currentProgress: {
        scope1And2Achieved: 36,
        scope3Achieved: 22,
        onTrack: true
      }
    },
    decarbonizationStrategy: {
      carbonLevers: [
        { lever: 'Sustainable Agriculture', category: 'scope3', reduction: 900, percentage: 45, implementation: 'Regenerative farming partnerships', status: 'in-progress' },
        { lever: 'Process Electrification', category: 'scope1and2', reduction: 450, percentage: 22, implementation: 'Electric heating and refrigeration', status: 'in-progress' },
        { lever: 'Packaging Innovation', category: 'scope3', reduction: 300, percentage: 15, implementation: 'Plant-based and recyclable packaging', status: 'completed' },
        { lever: 'Renewable Energy', category: 'scope1and2', reduction: 250, percentage: 12, implementation: 'Solar and biogas systems', status: 'completed' },
        { lever: 'Cold Chain Optimization', category: 'scope3', reduction: 120, percentage: 6, implementation: 'Efficient refrigeration logistics', status: 'planned' }
      ],
      achievements: [
        { initiative: 'Renewable Energy Systems', year: '2021', reduction: 250, description: 'Installed solar panels and biogas digesters' },
        { initiative: 'Sustainable Packaging', year: '2022', reduction: 300, description: 'Switched to 80% recyclable packaging materials' },
        { initiative: 'Electric Fleet', year: '2023', reduction: 180, description: 'Electrified 60% of delivery vehicle fleet' }
      ]
    }
  },
  {
    id: 'aerodefense',
    name: 'AeroDefense Systems',
    sector: 'Manufacturing',
    industry: 'Aerospace & Defense',
    reportingYear: '2023',
    totalEmissions: 6800,
    emissionsIntensity: 0.48,
    targetAchievement: 62,
    carbonFootprint: 6800,
    energyConsumption: 32000,
    wasteGenerated: 680,
    emissionsData: [
      { year: '2019', scope1: 2800, scope2: 1500, scope3: 4200 },
      { year: '2020', scope1: 2600, scope2: 1400, scope3: 4000 },
      { year: '2021', scope1: 2400, scope2: 1300, scope3: 3800 },
      { year: '2022', scope1: 2200, scope2: 1200, scope3: 3600 },
      { year: '2023', scope1: 2000, scope2: 1100, scope3: 3700 }
    ],
    scope1Data: {
      trendData: [
        { year: '2019', emissions: 2800 },
        { year: '2020', emissions: 2600 },
        { year: '2021', emissions: 2400 },
        { year: '2022', emissions: 2200 },
        { year: '2023', emissions: 2000 }
      ],
      sourceData: [
        { source: 'Stationary Combustion', emissions: 900 },
        { source: 'Mobile Combustion', emissions: 600 },
        { source: 'Process Emissions', emissions: 400 },
        { source: 'Fugitive Emissions', emissions: 100 }
      ]
    },
    scope2Data: {
      trendData: [
        { year: '2019', emissions: 1500 },
        { year: '2020', emissions: 1400 },
        { year: '2021', emissions: 1300 },
        { year: '2022', emissions: 1200 },
        { year: '2023', emissions: 1100 }
      ],
      sourceData: [
        { source: 'Electricity', emissions: 750 },
        { source: 'Heating', emissions: 220 },
        { source: 'Cooling', emissions: 130 }
      ],
      locationData: [
        { location: 'Manufacturing Complex', emissions: 550, percentage: '50.0%' },
        { location: 'Test Facilities', emissions: 275, percentage: '25.0%' },
        { location: 'Engineering Centers', emissions: 165, percentage: '15.0%' },
        { location: 'Support Facilities', emissions: 110, percentage: '10.0%' }
      ]
    },
    sbtiTargets: {
      nearTerm2030: {
        scope1And2Reduction: 42,
        scope3Reduction: 25,
        baselineYear: '2019',
        targetYear: '2030'
      },
      longTerm2050: {
        netZeroTarget: true,
        totalReduction: 85,
        targetYear: '2050'
      },
      currentProgress: {
        scope1And2Achieved: 28,
        scope3Achieved: 15,
        onTrack: false
      }
    },
    decarbonizationStrategy: {
      carbonLevers: [
        { lever: 'Sustainable Aviation Fuels', category: 'scope3', reduction: 1800, percentage: 42, implementation: 'SAF development and adoption', status: 'in-progress' },
        { lever: 'Advanced Materials', category: 'scope3', reduction: 800, percentage: 19, implementation: 'Lightweight composite materials', status: 'in-progress' },
        { lever: 'Manufacturing Efficiency', category: 'scope1and2', reduction: 600, percentage: 14, implementation: 'Additive manufacturing and automation', status: 'completed' },
        { lever: 'Renewable Energy', category: 'scope1and2', reduction: 500, percentage: 12, implementation: 'On-site renewable generation', status: 'in-progress' },
        { lever: 'Electric Ground Support', category: 'scope1and2', reduction: 300, percentage: 7, implementation: 'Electric test and ground equipment', status: 'planned' },
        { lever: 'Supply Chain Optimization', category: 'scope3', reduction: 300, percentage: 6, implementation: 'Supplier carbon requirements', status: 'planned' }
      ],
      achievements: [
        { initiative: 'Advanced Manufacturing', year: '2021', reduction: 600, description: 'Implemented 3D printing and automated systems' },
        { initiative: 'SAF Partnership', year: '2022', reduction: 800, description: 'Partnered with airlines for sustainable aviation fuel development' },
        { initiative: 'Renewable Energy Installation', year: '2023', reduction: 400, description: 'Installed wind and solar at manufacturing facilities' }
      ]
    }
  }
];

export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

// Calculate company rankings based on reduction performance
export const getCompanyRankings = () => {
  return companies.map(company => {
    const scope1And2Progress = company.sbtiTargets.currentProgress.scope1And2Achieved;
    const scope3Progress = company.sbtiTargets.currentProgress.scope3Achieved;
    const overallProgress = (scope1And2Progress + scope3Progress) / 2;
    
    return {
      id: company.id,
      name: company.name,
      sector: company.sector,
      scope1And2Progress,
      scope3Progress,
      overallProgress,
      onTrack: company.sbtiTargets.currentProgress.onTrack
    };
  }).sort((a, b) => b.overallProgress - a.overallProgress);
};
