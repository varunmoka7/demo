
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useSecureCompanyAccess = (companyId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['company-access', companyId, user?.id],
    queryFn: async () => {
      if (!user?.id || !companyId) {
        return { hasAccess: false, accessLevel: null };
      }

      console.log(`Checking secure access for company ${companyId}...`);

      // Check if user has access using the security function
      const { data: hasAccess, error: accessError } = await supabase.rpc(
        'user_has_company_access',
        {
          user_uuid: user.id,
          company_text: companyId
        }
      );

      if (accessError) {
        console.error('Access check failed:', accessError);
        return { hasAccess: false, accessLevel: null };
      }

      if (!hasAccess) {
        console.log('User does not have access to this company');
        return { hasAccess: false, accessLevel: null };
      }

      // Get the specific access level
      const { data: accessData, error: levelError } = await supabase
        .from('user_company_access')
        .select('access_level')
        .eq('user_id', user.id)
        .eq('company_id', companyId)
        .eq('is_active', true)
        .maybeSingle();

      if (levelError) {
        console.error('Error fetching access level:', levelError);
        return { hasAccess: true, accessLevel: 'viewer' }; // Default to viewer
      }

      return {
        hasAccess: true,
        accessLevel: accessData?.access_level || 'viewer'
      };
    },
    enabled: !!user?.id && !!companyId,
    retry: false
  });
};
