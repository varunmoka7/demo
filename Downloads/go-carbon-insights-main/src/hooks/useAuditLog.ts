
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface AuditLogEntry {
  action: string;
  table_name: string;
  record_id?: string;
  company_id?: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
}

export const useAuditLog = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (logEntry: AuditLogEntry) => {
      if (!user?.id) return;
      
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: user.id,
          ...logEntry,
          ip_address: '127.0.0.1', // Will be updated by edge function in production
          user_agent: navigator.userAgent
        });
      
      if (error) {
        console.error('Error logging audit entry:', error);
      }
    }
  });
};

export const createAuditLogWrapper = (auditMutation: any) => {
  return (originalMutation: any) => ({
    ...originalMutation,
    mutationFn: async (variables: any) => {
      const result = await originalMutation.mutationFn(variables);
      
      // Log the action
      auditMutation.mutate({
        action: 'UPDATE',
        table_name: 'unknown', // Will be set by specific hooks
        record_id: variables?.id || 'unknown',
        new_values: variables
      });
      
      return result;
    }
  });
};
