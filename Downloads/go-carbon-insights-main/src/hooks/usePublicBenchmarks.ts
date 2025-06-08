
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface PublicBenchmark {
  id: string;
  company_id: string;
  benchmark_year: number;
  industry: string;
  sector?: string;
  total_emissions: number;
  emissions_per_revenue?: number;
  emissions_per_employee?: number;
  sbti_status?: 'approved' | 'committed' | 'targets-set' | 'none';
  revenue_range?: string;
  employee_range?: string;
  is_public_data: boolean;
  created_at: string;
  updated_at: string;
}

export const usePublicBenchmarks = (filters?: {
  industry?: string;
  year?: number;
  sbtiStatus?: string;
}) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['public-benchmarks', filters, user?.id],
    queryFn: async () => {
      console.log('Fetching public benchmarks with enhanced security...');

      let query = supabase
        .from('company_benchmarks')
        .select(`
          *,
          companies:company_id (
            name,
            industry,
            sector
          )
        `)
        .eq('is_public_data', true)
        .order('total_emissions', { ascending: false });

      if (filters?.industry) {
        query = query.eq('industry', filters.industry);
      }

      if (filters?.year) {
        query = query.eq('benchmark_year', filters.year);
      }

      if (filters?.sbtiStatus) {
        query = query.eq('sbti_status', filters.sbtiStatus);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching public benchmarks:', error);
        throw error;
      }
      
      console.log(`Fetched ${data?.length || 0} public benchmark records securely`);
      return data as PublicBenchmark[];
    },
    enabled: true // Now works for both authenticated and anonymous users
  });
};

export const useIndustryBenchmarks = (industry: string, year = 2023) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['industry-benchmarks', industry, year, user?.id],
    queryFn: async () => {
      console.log(`Fetching industry benchmarks for ${industry} (${year}) with enhanced security...`);

      const { data, error } = await supabase
        .from('company_benchmarks')
        .select('*')
        .eq('industry', industry)
        .eq('benchmark_year', year)
        .eq('is_public_data', true)
        .order('total_emissions', { ascending: false });
      
      if (error) {
        console.error('Error fetching industry benchmarks:', error);
        throw error;
      }
      
      // Calculate industry statistics
      const emissions = data?.map(b => b.total_emissions) || [];
      const stats = {
        average: emissions.reduce((a, b) => a + b, 0) / emissions.length || 0,
        median: emissions.length > 0 ? emissions.sort((a, b) => a - b)[Math.floor(emissions.length / 2)] : 0,
        min: Math.min(...emissions) || 0,
        max: Math.max(...emissions) || 0,
        companies: data?.length || 0
      };
      
      console.log(`Industry ${industry} statistics calculated:`, stats);
      
      return {
        benchmarks: data || [],
        statistics: stats
      };
    },
    enabled: !!industry
  });
};
