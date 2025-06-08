
import { useQuery } from '@tanstack/react-query';

interface DataQuality {
  company_id: string;
  scope1_completeness: number;
  scope2_completeness: number;
  scope3_completeness: number;
  overall_quality_score: number;
  confidence_level: string;
  verification_status: string;
}

export const useDataQuality = () => {
  return useQuery({
    queryKey: ['dataQuality'],
    queryFn: async (): Promise<DataQuality[]> => {
      // Using mock data since new tables aren't in Supabase types yet
      return [
        { company_id: 'apple', scope1_completeness: 95, scope2_completeness: 92, scope3_completeness: 88, overall_quality_score: 92, confidence_level: 'high', verification_status: 'third_party_verified' },
        { company_id: 'microsoft', scope1_completeness: 90, scope2_completeness: 95, scope3_completeness: 85, overall_quality_score: 90, confidence_level: 'high', verification_status: 'third_party_verified' },
        { company_id: 'tesla', scope1_completeness: 87, scope2_completeness: 85, scope3_completeness: 75, overall_quality_score: 82, confidence_level: 'medium', verification_status: 'self_reported' },
        { company_id: 'toyota', scope1_completeness: 91, scope2_completeness: 93, scope3_completeness: 87, overall_quality_score: 90, confidence_level: 'high', verification_status: 'third_party_verified' }
      ];
    }
  });
};
