
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CorporateClimateData {
  id: string;
  country_name: string;
  sbti_companies: number;
  reporting_quality: number;
  top_sectors: string[];
  annual_improvement: string;
  climate_leadership_score: number;
  sector_breakdown: Record<string, any>;
  notable_achievements: string[];
}

export const useCorporateClimateData = () => {
  return useQuery({
    queryKey: ['corporate-climate-data'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('corporate_climate_data')
        .select('*')
        .order('climate_leadership_score', { ascending: false });
      
      if (error) {
        console.error('Error fetching corporate climate data:', error);
        throw error;
      }
      
      return data as CorporateClimateData[];
    }
  });
};
