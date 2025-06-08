
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { secureAddEmissionEntry } from '@/utils/secureDataOperations';
import { useSecurityValidation } from './useSecurityValidation';
import { toast } from 'sonner';

export const useEnhancedEmissionsTracking = () => {
  const queryClient = useQueryClient();
  const { validateOperation } = useSecurityValidation();

  return useMutation({
    mutationFn: async (entryData: {
      company_id: string;
      date: string;
      category: string;
      amount: number;
      unit: string;
      description?: string;
    }) => {
      // Validate operation before proceeding
      const isAllowed = await validateOperation('INSERT');
      if (!isAllowed) {
        throw new Error('Rate limit exceeded. Please wait before making more changes.');
      }

      console.log('Adding secure emission entry...');
      const result = await secureAddEmissionEntry(entryData);
      
      if (!result.success) {
        if (result.requiresAuth) {
          throw new Error('Authentication required');
        }
        if (result.rateLimited) {
          throw new Error('Rate limit exceeded');
        }
        throw new Error(result.error || 'Failed to add emission entry');
      }
      
      return result.data;
    },
    onSuccess: (data, variables) => {
      console.log('Emission entry added successfully');
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['emissions-data', variables.company_id] });
      queryClient.invalidateQueries({ queryKey: ['scope1-data', variables.company_id] });
      queryClient.invalidateQueries({ queryKey: ['scope2-data', variables.company_id] });
      queryClient.invalidateQueries({ queryKey: ['scope3-data', variables.company_id] });
      
      toast.success('Emission entry added successfully');
    },
    onError: (error: any) => {
      console.error('Failed to add emission entry:', error);
      
      if (error.message.includes('Authentication required')) {
        toast.error('Please log in to add emission data');
      } else if (error.message.includes('Rate limit')) {
        toast.error('Too many requests. Please wait a moment before trying again.');
      } else if (error.message.includes('Access denied')) {
        toast.error('You do not have permission to modify this company\'s data');
      } else {
        toast.error('Failed to add emission entry. Please try again.');
      }
    }
  });
};
