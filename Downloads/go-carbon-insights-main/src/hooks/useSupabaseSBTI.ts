
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useSupabaseSBTITargets = (companyId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['sbti-targets', companyId, user?.id],
    queryFn: async () => {
      if (!companyId) {
        throw new Error('Company ID is required');
      }

      console.log(`Fetching SBTi targets for company ${companyId}...`);

      const { data, error } = await supabase
        .from('sbti_targets')
        .select('*')
        .eq('company_id', companyId)
        .maybeSingle();
      
      if (error) {
        console.log('SBTi targets data access restricted (expected with RLS):', error.message);
        return null;
      }
      
      return data;
    },
    enabled: !!companyId,
    retry: false, // Don't retry on RLS failures
  });
};

export const useSupabaseSBTIPathway = (companyId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['sbti-pathway', companyId, user?.id],
    queryFn: async () => {
      if (!companyId) {
        throw new Error('Company ID is required');
      }

      console.log(`Fetching SBTi pathway for company ${companyId}...`);

      const { data, error } = await supabase
        .from('sbti_pathway_data')
        .select('*')
        .eq('company_id', companyId)
        .order('year');
      
      if (error) {
        console.log('SBTi pathway data access restricted (expected with RLS):', error.message);
        return [];
      }
      
      return data || [];
    },
    enabled: !!companyId,
    retry: false, // Don't retry on RLS failures
  });
};
