
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useSupabaseCompanies = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['companies', user?.id],
    queryFn: async () => {
      console.log('Fetching companies from Supabase with enhanced security...');
      
      // Try to fetch companies from the secure public view first
      const { data: publicData, error: publicError } = await supabase
        .from('public_company_data')
        .select('*')
        .order('name');
      
      if (!publicError && publicData) {
        console.log(`Successfully fetched ${publicData.length} companies from secure public view`);
        return publicData;
      }
      
      // Fallback to direct companies table access for authenticated users
      if (user?.id) {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .order('name');
        
        if (error) {
          console.log('Supabase companies query failed (expected with RLS):', error.message);
          return [];
        }
        
        console.log(`Successfully fetched ${data?.length || 0} companies from direct access`);
        return data || [];
      }
      
      console.log('No access to companies data, returning empty array');
      return [];
    },
    enabled: true, // Always try to fetch
    retry: false, // Don't retry on RLS failures
  });
};

export const useSupabaseCompany = (companyId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['company', companyId, user?.id],
    queryFn: async () => {
      if (!companyId) {
        throw new Error('Company ID is required');
      }

      console.log(`Fetching company ${companyId} from Supabase with enhanced security...`);

      const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .single();
      
      if (companyError) {
        console.log('Supabase company query failed (expected with RLS):', companyError.message);
        return null;
      }

      // Try to fetch emissions data - will respect RLS policies
      const { data: emissionsData, error: emissionsError } = await supabase
        .from('emissions_data')
        .select('*')
        .eq('company_id', companyId)
        .order('year');

      if (emissionsError) {
        console.log('Emissions data access controlled by RLS:', emissionsError.message);
      }

      // Try to fetch SBTi targets with RLS respect
      const { data: sbtiTarget, error: sbtiError } = await supabase
        .from('sbti_targets')
        .select('*')
        .eq('company_id', companyId)
        .maybeSingle();

      if (sbtiError) {
        console.log('SBTi data access controlled by RLS:', sbtiError.message);
      }

      // Try to fetch frameworks compliance with RLS respect
      const { data: frameworks, error: frameworksError } = await supabase
        .from('frameworks_compliance')
        .select('*')
        .eq('company_id', companyId);

      if (frameworksError) {
        console.log('Frameworks data access controlled by RLS:', frameworksError.message);
      }

      // Fetch public benchmark data (should always work due to public access)
      const { data: benchmarks, error: benchmarksError } = await supabase
        .from('company_benchmarks')
        .select('*')
        .eq('company_id', companyId)
        .eq('is_public_data', true);

      if (benchmarksError) {
        console.log('Public benchmarks access error:', benchmarksError.message);
      }

      return {
        ...company,
        emissionsData: emissionsData || [],
        sbtiTargets: sbtiTarget,
        frameworks: frameworks || [],
        benchmarks: benchmarks || [],
        // Calculate total emissions from latest year if data is available
        totalEmissions: emissionsData && emissionsData.length > 0 
          ? emissionsData[emissionsData.length - 1].scope1 + 
            emissionsData[emissionsData.length - 1].scope2 + 
            emissionsData[emissionsData.length - 1].scope3
          : 0,
        // Add mock data for properties not in database yet (fallback for missing data)
        topCarbonFootprints: company?.top_carbon_footprints || [
          'Manufacturing Operations',
          'Supply Chain Transport', 
          'Employee Commuting'
        ],
        energyConsumption: company?.energy_consumption || 50000,
        wasteGenerated: company?.waste_generated || 2500,
        renewableEnergyPercentage: company?.renewable_energy_percentage || 45,
        sbtiProgress: sbtiTarget?.progress_percentage || 0
      };
    },
    enabled: !!companyId,
    retry: false, // Don't retry on RLS failures
  });
};
