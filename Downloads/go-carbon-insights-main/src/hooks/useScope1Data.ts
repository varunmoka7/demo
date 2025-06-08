
import { useSupabaseScope1Data } from './useSupabaseScope1';
import { getCompanyById } from '@/data/enhancedMockData';

export const useScope1Data = (companyId: string) => {
  const supabaseQuery = useSupabaseScope1Data(companyId);
  
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

    // Generate year-specific source data based on company characteristics
    const generateSourceDataByYear = () => {
      const sourceDataByYear: Record<string, any[]> = {};
      
      company.emissionsData.forEach(yearData => {
        const year = yearData.year.toString();
        const totalScope1 = yearData.scope1;
        
        // Industry-specific source distributions
        const getSourceDistribution = () => {
          switch (company.industry) {
            case 'Technology':
              return {
                'Natural Gas': 0.45,
                'Diesel Fuel': 0.25,
                'Company Vehicles': 0.20,
                'Refrigerants': 0.10
              };
            case 'Manufacturing':
              return {
                'Natural Gas': 0.50,
                'Diesel Fuel': 0.30,
                'Company Vehicles': 0.15,
                'Refrigerants': 0.05
              };
            case 'Transportation':
              return {
                'Natural Gas': 0.20,
                'Diesel Fuel': 0.55,
                'Company Vehicles': 0.20,
                'Refrigerants': 0.05
              };
            case 'Energy':
              return {
                'Natural Gas': 0.60,
                'Diesel Fuel': 0.25,
                'Company Vehicles': 0.10,
                'Refrigerants': 0.05
              };
            case 'Retail':
              return {
                'Natural Gas': 0.35,
                'Diesel Fuel': 0.20,
                'Company Vehicles': 0.30,
                'Refrigerants': 0.15
              };
            case 'Agriculture':
              return {
                'Natural Gas': 0.25,
                'Diesel Fuel': 0.50,
                'Company Vehicles': 0.20,
                'Refrigerants': 0.05
              };
            default:
              return {
                'Natural Gas': 0.40,
                'Diesel Fuel': 0.30,
                'Company Vehicles': 0.20,
                'Refrigerants': 0.10
              };
          }
        };

        const sourceDistribution = getSourceDistribution();
        
        sourceDataByYear[year] = [
          { source: 'Natural Gas', emissions: Math.round(totalScope1 * sourceDistribution['Natural Gas']) },
          { source: 'Diesel Fuel', emissions: Math.round(totalScope1 * sourceDistribution['Diesel Fuel']) },
          { source: 'Company Vehicles', emissions: Math.round(totalScope1 * sourceDistribution['Company Vehicles']) },
          { source: 'Refrigerants', emissions: Math.round(totalScope1 * sourceDistribution['Refrigerants']) }
        ];
      });
      
      return sourceDataByYear;
    };

    const scope1Data = {
      trendData: company.emissionsData.map(item => ({
        year: item.year,
        emissions: item.scope1
      })),
      sourceData: [
        { source: 'Natural Gas', emissions: company.emissionsData[5]?.scope1 * 0.4 || 4600 },
        { source: 'Diesel Fuel', emissions: company.emissionsData[5]?.scope1 * 0.3 || 3450 },
        { source: 'Company Vehicles', emissions: company.emissionsData[5]?.scope1 * 0.2 || 2300 },
        { source: 'Refrigerants', emissions: company.emissionsData[5]?.scope1 * 0.1 || 1150 }
      ],
      sourceDataByYear: generateSourceDataByYear()
    };

    return {
      data: scope1Data,
      isLoading: supabaseQuery.isLoading,
      error: supabaseQuery.error
    };
  }

  return supabaseQuery;
};
