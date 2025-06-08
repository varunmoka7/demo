
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface IndustryBenchmark {
  id: string;
  sector: string;
  leading_companies: Array<{
    company: string;
    achievement: string;
    score: number;
  }>;
  avg_emission_intensity: number;
  industry_avg_intensity: number;
  best_practices: string[];
  regional_leaders: Record<string, string>;
}

export const useIndustryBenchmarks = () => {
  return useQuery({
    queryKey: ['industry-benchmarks'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('industry_benchmarks')
        .select('*')
        .order('avg_emission_intensity', { ascending: true });
      
      if (error) {
        console.error('Error fetching industry benchmarks:', error);
        throw error;
      }
      
      return data as IndustryBenchmark[];
    }
  });
};
