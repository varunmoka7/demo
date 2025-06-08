
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useSupabaseScope1Data = (companyId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['scope1-data', companyId, user?.id],
    queryFn: async () => {
      if (!companyId) {
        throw new Error('Company ID is required');
      }

      console.log(`Fetching Scope 1 data for company ${companyId}...`);

      // Get emissions trend data
      const { data: emissionsData, error: emissionsError } = await supabase
        .from('emissions_data')
        .select('year, scope1')
        .eq('company_id', companyId)
        .order('year');

      if (emissionsError) {
        console.log('Scope 1 emissions data access restricted (expected with RLS):', emissionsError.message);
        // Return empty data to trigger fallback to mock data
        return {
          trendData: [],
          sourceData: [],
          sourceDataByYear: {}
        };
      }

      // Get scope 1 sources for latest year
      const { data: sourcesData, error: sourcesError } = await supabase
        .from('scope1_emissions')
        .select('source, emissions_by_source')
        .eq('company_id', companyId)
        .eq('year', 2023);

      if (sourcesError) {
        console.log('Scope 1 sources data access restricted (expected with RLS):', sourcesError.message);
      }

      return {
        trendData: emissionsData?.map(item => ({
          year: item.year,
          emissions: item.scope1
        })) || [],
        sourceData: sourcesData?.map(item => ({
          source: item.source,
          emissions: item.emissions_by_source
        })) || [],
        sourceDataByYear: {}
      };
    },
    enabled: !!companyId,
    retry: false, // Don't retry on RLS failures
  });
};
