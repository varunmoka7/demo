
import { useQuery } from '@tanstack/react-query';

interface FeaturedCompany {
  id: string;
  name: string;
  sector: string;
  carbon_footprint: number;
  renewable_energy_percentage?: number;
  featured: boolean;
  achievement?: string;
}

export const useFeaturedCompanies = () => {
  return useQuery({
    queryKey: ['featuredCompanies'],
    queryFn: async (): Promise<FeaturedCompany[]> => {
      // Using mock data since new tables aren't in Supabase types yet
      return [
        { id: 'apple', name: 'Apple Inc.', sector: 'Technology', carbon_footprint: 22800, renewable_energy_percentage: 75, featured: true, achievement: 'Carbon neutral by 2030 commitment' },
        { id: 'microsoft', name: 'Microsoft Corporation', sector: 'Technology', carbon_footprint: 15600, renewable_energy_percentage: 60, featured: true, achievement: 'Carbon negative by 2030 goal' },
        { id: 'tesla', name: 'Tesla Inc.', sector: 'Automotive', carbon_footprint: 8500, renewable_energy_percentage: 45, featured: true, achievement: 'Leading EV manufacturer' },
        { id: 'bp', name: 'BP plc', sector: 'Energy', carbon_footprint: 55700, renewable_energy_percentage: 15, featured: true, achievement: 'Net zero by 2050 target' }
      ];
    }
  });
};
