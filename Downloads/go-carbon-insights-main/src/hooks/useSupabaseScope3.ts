
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useSupabaseScope3Data = (companyId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['scope3-data', companyId, user?.id],
    queryFn: async () => {
      if (!companyId) {
        throw new Error('Company ID is required');
      }

      console.log(`Fetching Scope 3 data for company ${companyId}...`);

      // Get emissions trend data
      const { data: emissionsData, error: emissionsError } = await supabase
        .from('emissions_data')
        .select('year, scope3')
        .eq('company_id', companyId)
        .order('year');

      if (emissionsError) {
        console.log('Scope 3 emissions data access restricted (expected with RLS):', emissionsError.message);
        return {
          trendData: [],
          categoryData: []
        };
      }

      // Get scope 3 categories for latest year
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('scope3_emissions')
        .select('category, emissions_by_category, influence_factors, insights')
        .eq('company_id', companyId)
        .eq('year', 2023);

      if (categoriesError) {
        console.log('Scope 3 categories data access restricted (expected with RLS):', categoriesError.message);
      }

      return {
        trendData: emissionsData?.map(item => ({
          year: item.year,
          emissions: item.scope3
        })) || [],
        categoryData: categoriesData?.map(item => ({
          category: item.category,
          emissions: item.emissions_by_category.toString(),
          influenceFactors: item.influence_factors || '',
          insights: item.insights || ''
        })) || []
      };
    },
    enabled: !!companyId,
    retry: false, // Don't retry on RLS failures
  });
};
