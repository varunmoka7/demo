
import { useSupabaseScope2Data } from './useSupabaseScope2';
import { getCompanyById } from '@/data/companyMockData';

export const useScope2Data = (companyId: string) => {
  const supabaseQuery = useSupabaseScope2Data(companyId);
  
  // If Supabase data is loading or there's an error, fallback to mock data
  if (supabaseQuery.isLoading || supabaseQuery.error || !supabaseQuery.data?.trendData?.length) {
    const company = getCompanyById(companyId);
    
    if (!company) {
      return {
        data: null,
        isLoading: supabaseQuery.isLoading,
        error: supabaseQuery.error || new Error('Company not found')
      };
    }

    // Generate year-specific data
    const generateYearSpecificData = () => {
      const sourceDataByYear: Record<string, any[]> = {};
      const locationDataByYear: Record<string, any[]> = {};
      
      company.emissionsData.forEach(yearData => {
        const year = yearData.year.toString();
        const totalScope2 = yearData.scope2;
        
        // Industry-specific source distributions
        const getSourceDistribution = () => {
          switch (company.industry) {
            case 'Technology':
              return {
                'Purchased Electricity': 0.75,
                'Steam & Heating': 0.15,
                'Cooling': 0.10
              };
            case 'Manufacturing':
              return {
                'Purchased Electricity': 0.60,
                'Steam & Heating': 0.30,
                'Cooling': 0.10
              };
            case 'Transportation':
              return {
                'Purchased Electricity': 0.50,
                'Steam & Heating': 0.25,
                'Cooling': 0.25
              };
            case 'Energy':
              return {
                'Purchased Electricity': 0.40,
                'Steam & Heating': 0.35,
                'Cooling': 0.25
              };
            case 'Retail':
              return {
                'Purchased Electricity': 0.65,
                'Steam & Heating': 0.20,
                'Cooling': 0.15
              };
            case 'Agriculture':
              return {
                'Purchased Electricity': 0.55,
                'Steam & Heating': 0.25,
                'Cooling': 0.20
              };
            default:
              return {
                'Purchased Electricity': 0.70,
                'Steam & Heating': 0.20,
                'Cooling': 0.10
              };
          }
        };

        const sourceDistribution = getSourceDistribution();
        
        sourceDataByYear[year] = [
          { 
            source: 'Purchased Electricity', 
            emissions: Math.round(totalScope2 * sourceDistribution['Purchased Electricity']) 
          },
          { 
            source: 'Steam & Heating', 
            emissions: Math.round(totalScope2 * sourceDistribution['Steam & Heating']) 
          },
          { 
            source: 'Cooling', 
            emissions: Math.round(totalScope2 * sourceDistribution['Cooling']) 
          }
        ];

        // Location data with year-over-year renewable energy improvements
        const renewableImprovement = (2024 - yearData.year) * 2; // 2% improvement per year
        const baseRenewable = company.renewable_energy_percentage || 65;
        
        const getLocationData = () => {
          const renewableByRegion = {
            'North America': Math.max(20, baseRenewable - renewableImprovement),
            'Europe': Math.max(30, (baseRenewable - renewableImprovement) + 15),
            'Asia Pacific': Math.max(15, (baseRenewable - renewableImprovement) - 20)
          };

          return [
            { 
              location: 'North America', 
              emissions: Math.round(totalScope2 * 0.45), 
              percentage: '45%', 
              renewablePercent: `${Math.min(95, renewableByRegion['North America'])}%` 
            },
            { 
              location: 'Europe', 
              emissions: Math.round(totalScope2 * 0.30), 
              percentage: '30%', 
              renewablePercent: `${Math.min(95, renewableByRegion['Europe'])}%` 
            },
            { 
              location: 'Asia Pacific', 
              emissions: Math.round(totalScope2 * 0.25), 
              percentage: '25%', 
              renewablePercent: `${Math.min(95, renewableByRegion['Asia Pacific'])}%` 
            }
          ];
        };

        locationDataByYear[year] = getLocationData();
      });
      
      return { sourceDataByYear, locationDataByYear };
    };

    const { sourceDataByYear, locationDataByYear } = generateYearSpecificData();
    const latestScope2 = company.emissionsData[company.emissionsData.length - 1]?.scope2 || 20000;

    // Industry-specific source distributions for latest year
    const getSourceDistribution = () => {
      switch (company.industry) {
        case 'Technology':
          return {
            'Purchased Electricity': 0.75,
            'Steam & Heating': 0.15,
            'Cooling': 0.10
          };
        case 'Manufacturing':
          return {
            'Purchased Electricity': 0.60,
            'Steam & Heating': 0.30,
            'Cooling': 0.10
          };
        case 'Transportation':
          return {
            'Purchased Electricity': 0.50,
            'Steam & Heating': 0.25,
            'Cooling': 0.25
          };
        case 'Energy':
          return {
            'Purchased Electricity': 0.40,
            'Steam & Heating': 0.35,
            'Cooling': 0.25
          };
        case 'Retail':
          return {
            'Purchased Electricity': 0.65,
            'Steam & Heating': 0.20,
            'Cooling': 0.15
          };
        case 'Agriculture':
          return {
            'Purchased Electricity': 0.55,
            'Steam & Heating': 0.25,
            'Cooling': 0.20
          };
        default:
          return {
            'Purchased Electricity': 0.70,
            'Steam & Heating': 0.20,
            'Cooling': 0.10
          };
      }
    };

    const sourceDistribution = getSourceDistribution();
    
    // Generate location-based data based on company type
    const getLocationData = () => {
      const renewableByRegion = {
        'North America': company.renewable_energy_percentage || 65,
        'Europe': (company.renewable_energy_percentage || 65) + 15,
        'Asia Pacific': (company.renewable_energy_percentage || 65) - 20
      };

      return [
        { 
          location: 'North America', 
          emissions: Math.round(latestScope2 * 0.45), 
          percentage: '45%', 
          renewablePercent: `${renewableByRegion['North America']}%` 
        },
        { 
          location: 'Europe', 
          emissions: Math.round(latestScope2 * 0.30), 
          percentage: '30%', 
          renewablePercent: `${Math.min(95, renewableByRegion['Europe'])}%` 
        },
        { 
          location: 'Asia Pacific', 
          emissions: Math.round(latestScope2 * 0.25), 
          percentage: '25%', 
          renewablePercent: `${Math.max(25, renewableByRegion['Asia Pacific'])}%` 
        }
      ];
    };

    return {
      data: {
        trendData: company.emissionsData.map(item => ({
          year: item.year,
          emissions: item.scope2,
          marketBased: item.scope2,
          locationBased: Math.round(item.scope2 * 1.15)
        })),
        sourceData: [
          { 
            source: 'Purchased Electricity', 
            emissions: Math.round(latestScope2 * sourceDistribution['Purchased Electricity']) 
          },
          { 
            source: 'Steam & Heating', 
            emissions: Math.round(latestScope2 * sourceDistribution['Steam & Heating']) 
          },
          { 
            source: 'Cooling', 
            emissions: Math.round(latestScope2 * sourceDistribution['Cooling']) 
          }
        ],
        locationData: getLocationData(),
        sourceDataByYear,
        locationDataByYear
      },
      isLoading: supabaseQuery.isLoading,
      error: supabaseQuery.error
    };
  }

  return supabaseQuery;
};
