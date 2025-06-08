
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ClimateScenario {
  id: string;
  scenario_name: string;
  warming_by_2100: string;
  description: string;
  color: string;
  key_milestones: Array<{
    year: number;
    temp: string;
    description: string;
  }>;
  requirements: string[];
}

export const useClimateScenarios = () => {
  return useQuery({
    queryKey: ['climate-scenarios'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('climate_scenarios')
        .select('*')
        .order('warming_by_2100', { ascending: true });
      
      if (error) {
        console.error('Error fetching climate scenarios:', error);
        throw error;
      }
      
      return data as ClimateScenario[];
    }
  });
};
