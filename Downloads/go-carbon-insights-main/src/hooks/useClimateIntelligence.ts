import { useQuery } from '@tanstack/react-query';
import { useCompanies } from './useCompanies';

interface ClimateMetrics {
  temperatureAlignment: string;
  netZeroProgress: number;
  sbtiStatus: string;
  climateRiskScore: string;
  totalEmissions: number;
  carbonIntensity: number;
  renewableEnergy: number;
  avoidedEmissions: number;
  carbonCostExposure: number;
  climateInvestment: number;
  averageROI: number;
  greenRevenue: number;
}

interface CarbonProject {
  id: string;
  name: string;
  type: string;
  status: string;
  investment: number;
  annualReduction: number;
  paybackPeriod: number;
  roi: number;
  description: string;
}

interface CompanyClimateData {
  revenueMillions: number;
  renewableEnergyPercent: number;
  energyEfficiencyImprovement: number;
  fleetElectrification: number;
  sbtiStatus: string;
  netZeroTargetYear: number;
  climateRiskScore: string;
}

export const useClimateIntelligence = (companyId: string) => {
  const { data: companies } = useCompanies();
  
  return useQuery({
    queryKey: ['climate-intelligence', companyId],
    queryFn: () => {
      console.log('Generating climate intelligence for company:', companyId);
      
      // Comprehensive strategic climate data for each company
      const strategicClimateData: Record<string, CompanyClimateData> = {
        apple: {
          revenueMillions: 394300,
          renewableEnergyPercent: 100,
          energyEfficiencyImprovement: 35,
          fleetElectrification: 85,
          sbtiStatus: 'approved',
          netZeroTargetYear: 2030,
          climateRiskScore: 'low'
        },
        microsoft: {
          revenueMillions: 211900,
          renewableEnergyPercent: 85,
          energyEfficiencyImprovement: 40,
          fleetElectrification: 70,
          sbtiStatus: 'approved',
          netZeroTargetYear: 2030,
          climateRiskScore: 'low'
        },
        google: {
          revenueMillions: 307400,
          renewableEnergyPercent: 75,
          energyEfficiencyImprovement: 30,
          fleetElectrification: 60,
          sbtiStatus: 'committed',
          netZeroTargetYear: 2030,
          climateRiskScore: 'medium'
        },
        tesla: {
          revenueMillions: 96800,
          renewableEnergyPercent: 95,
          energyEfficiencyImprovement: 45,
          fleetElectrification: 100,
          sbtiStatus: 'approved',
          netZeroTargetYear: 2025,
          climateRiskScore: 'low'
        },
        amazon: {
          revenueMillions: 513900,
          renewableEnergyPercent: 65,
          energyEfficiencyImprovement: 28,
          fleetElectrification: 80,
          sbtiStatus: 'committed',
          netZeroTargetYear: 2040,
          climateRiskScore: 'medium'
        },
        meta: {
          revenueMillions: 118000,
          renewableEnergyPercent: 50,
          energyEfficiencyImprovement: 25,
          fleetElectrification: 40,
          sbtiStatus: 'not_set',
          netZeroTargetYear: 2035,
          climateRiskScore: 'high'
        },
        bmw: {
          revenueMillions: 142600,
          renewableEnergyPercent: 60,
          energyEfficiencyImprovement: 32,
          fleetElectrification: 55,
          sbtiStatus: 'committed',
          netZeroTargetYear: 2030,
          climateRiskScore: 'medium'
        },
        volkswagen: {
          revenueMillions: 295800,
          renewableEnergyPercent: 45,
          energyEfficiencyImprovement: 28,
          fleetElectrification: 45,
          sbtiStatus: 'committed',
          netZeroTargetYear: 2035,
          climateRiskScore: 'medium'
        },
        toyota: {
          revenueMillions: 274500,
          renewableEnergyPercent: 70,
          energyEfficiencyImprovement: 38,
          fleetElectrification: 65,
          sbtiStatus: 'approved',
          netZeroTargetYear: 2035,
          climateRiskScore: 'low'
        },
        samsung: {
          revenueMillions: 244200,
          renewableEnergyPercent: 55,
          energyEfficiencyImprovement: 30,
          fleetElectrification: 35,
          sbtiStatus: 'committed',
          netZeroTargetYear: 2030,
          climateRiskScore: 'medium'
        },
        bp: {
          revenueMillions: 164200,
          renewableEnergyPercent: 40,
          energyEfficiencyImprovement: 35,
          fleetElectrification: 25,
          sbtiStatus: 'approved',
          netZeroTargetYear: 2030,
          climateRiskScore: 'high'
        },
        shell: {
          revenueMillions: 261500,
          renewableEnergyPercent: 35,
          energyEfficiencyImprovement: 30,
          fleetElectrification: 20,
          sbtiStatus: 'committed',
          netZeroTargetYear: 2050,
          climateRiskScore: 'high'
        },
        nike: {
          revenueMillions: 51200,
          renewableEnergyPercent: 80,
          energyEfficiencyImprovement: 42,
          fleetElectrification: 90,
          sbtiStatus: 'approved',
          netZeroTargetYear: 2030,
          climateRiskScore: 'low'
        },
        unilever: {
          revenueMillions: 64300,
          renewableEnergyPercent: 75,
          energyEfficiencyImprovement: 38,
          fleetElectrification: 65,
          sbtiStatus: 'committed',
          netZeroTargetYear: 2030,
          climateRiskScore: 'medium'
        },
        nestle: {
          revenueMillions: 94400,
          renewableEnergyPercent: 65,
          energyEfficiencyImprovement: 35,
          fleetElectrification: 55,
          sbtiStatus: 'committed',
          netZeroTargetYear: 2050,
          climateRiskScore: 'medium'
        }
      };

      // Get climate data for the company or use default
      const data = strategicClimateData[companyId] || strategicClimateData.apple;
      
      // Get company info from existing data
      const company = companies?.find(c => c.id === companyId);
      const totalEmissions = company?.total_emissions || 3500;
      
      console.log('Company data found:', company);
      console.log('Total emissions:', totalEmissions);
      
      // Calculate climate metrics
      const climateMetrics: ClimateMetrics = {
        temperatureAlignment: data.netZeroTargetYear <= 2030 ? '1.5°C Aligned' : '2°C Pathway',
        netZeroProgress: Math.min(95, ((2050 - data.netZeroTargetYear) / (2050 - 2020)) * 100),
        sbtiStatus: data.sbtiStatus,
        climateRiskScore: data.climateRiskScore,
        totalEmissions,
        carbonIntensity: Math.round((totalEmissions / data.revenueMillions) * 1000000),
        renewableEnergy: data.renewableEnergyPercent,
        avoidedEmissions: Math.round(totalEmissions * (data.energyEfficiencyImprovement / 100)),
        carbonCostExposure: Math.round(totalEmissions * 85), // $85/tCO2e
        climateInvestment: Math.round(data.revenueMillions * 0.02), // 2% of revenue
        averageROI: 12.5,
        greenRevenue: Math.round(data.revenueMillions * 0.15) // 15% green revenue
      };

      // Generate sector-appropriate carbon projects
      const generateCarbonProjects = (companyId: string, data: CompanyClimateData): CarbonProject[] => {
        const baseProjects = [
          {
            id: '1',
            name: 'Renewable Energy Transition',
            type: 'renewable_energy',
            status: 'active',
            investment: Math.round(data.revenueMillions * 0.008),
            annualReduction: Math.round(totalEmissions * 0.25),
            paybackPeriod: 8.5,
            roi: 14.2,
            description: 'Solar and wind power installations across facilities'
          },
          {
            id: '2',
            name: 'Energy Efficiency Program',
            type: 'energy_efficiency',
            status: 'completed',
            investment: Math.round(data.revenueMillions * 0.003),
            annualReduction: Math.round(totalEmissions * 0.15),
            paybackPeriod: 5.2,
            roi: 18.7,
            description: 'LED lighting, smart HVAC, and building automation'
          },
          {
            id: '3',
            name: 'Fleet Electrification',
            type: 'electrification',
            status: 'planned',
            investment: Math.round(data.revenueMillions * 0.005),
            annualReduction: Math.round(totalEmissions * 0.10),
            paybackPeriod: 6.8,
            roi: 12.3,
            description: 'Electric vehicle adoption and charging infrastructure'
          }
        ];

        // Add sector-specific projects
        if (['bp', 'shell'].includes(companyId)) {
          baseProjects.push({
            id: '4',
            name: 'Carbon Capture & Storage',
            type: 'carbon_capture',
            status: 'planned',
            investment: Math.round(data.revenueMillions * 0.015),
            annualReduction: Math.round(totalEmissions * 0.20),
            paybackPeriod: 15.0,
            roi: 8.5,
            description: 'Industrial-scale carbon capture from operations'
          });
        }

        if (['tesla', 'bmw', 'volkswagen', 'toyota'].includes(companyId)) {
          baseProjects.push({
            id: '4',
            name: 'Battery Technology Innovation',
            type: 'innovation',
            status: 'active',
            investment: Math.round(data.revenueMillions * 0.012),
            annualReduction: Math.round(totalEmissions * 0.18),
            paybackPeriod: 7.5,
            roi: 16.2,
            description: 'Advanced battery technology for electric vehicles'
          });
        }

        return baseProjects;
      };

      const carbonProjects = generateCarbonProjects(companyId, data);

      const result = {
        climateMetrics,
        carbonProjects,
        company: {
          ...company,
          ...data
        }
      };

      console.log('Generated climate intelligence:', result);
      return result;
    },
    enabled: true, // Always enabled to ensure data is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (updated from cacheTime)
  });
};
