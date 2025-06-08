
import { useQuery } from '@tanstack/react-query';

interface GlobalStats {
  totalCompanies: number;
  totalEmissions: number;
  sectorsCount: number;
  countriesCount: number;
  monthlyGrowthRate: number;
  transparencyIndex: number;
  dataCompleteness: number;
  platformUptime: number;
}

export const useGlobalStats = () => {
  return useQuery({
    queryKey: ['globalStats'],
    queryFn: async (): Promise<GlobalStats> => {
      // Using mock data since new tables aren't in Supabase types yet
      return {
        totalCompanies: 15,
        totalEmissions: 2400000,
        sectorsCount: 8,
        countriesCount: 12,
        monthlyGrowthRate: 23,
        transparencyIndex: 42,
        dataCompleteness: 87,
        platformUptime: 99.9
      };
    }
  });
};
