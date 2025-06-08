
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface SecurityAlert {
  id: string;
  type: 'rate_limit' | 'suspicious_activity' | 'unauthorized_access';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
}

export const useSecurityValidation = () => {
  const { user } = useAuth();

  const { data: userRole } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase.rpc('get_user_role', {
        user_uuid: user.id
      });
      
      if (error) {
        console.error('Error fetching user role:', error);
        return 'user'; // Default to user role
      }
      
      return data || 'user';
    },
    enabled: !!user?.id
  });

  const { data: suspiciousActivity } = useQuery({
    queryKey: ['suspicious-activity', user?.id],
    queryFn: async () => {
      if (!user?.id || userRole !== 'admin') return [];
      
      const { data, error } = await supabase.rpc('detect_suspicious_activity');
      
      if (error) {
        console.error('Error detecting suspicious activity:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!user?.id && userRole === 'admin',
    refetchInterval: 5 * 60 * 1000 // Check every 5 minutes
  });

  const validateOperation = async (operationType: string): Promise<boolean> => {
    if (!user?.id) {
      console.warn('User not authenticated for operation:', operationType);
      return false;
    }

    try {
      const { data, error } = await supabase.rpc('check_rate_limit', {
        user_uuid: user.id,
        operation_type: operationType
      });

      if (error) {
        console.error('Rate limit check failed:', error);
        return false;
      }

      return data === true;
    } catch (error) {
      console.error('Rate limit validation error:', error);
      return false;
    }
  };

  return {
    userRole,
    suspiciousActivity,
    validateOperation,
    isAdmin: userRole === 'admin',
    isAnalyst: userRole === 'analyst' || userRole === 'admin',
    isAuthenticated: !!user?.id
  };
};
