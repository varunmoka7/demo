
import { useQuery } from '@tanstack/react-query';

interface SectorData {
  sector: string;
  count: number;
  percentage: number;
  totalEmissions: number;
  color: string;
}

export const useSectorBreakdown = () => {
  return useQuery({
    queryKey: ['sectorBreakdown'],
    queryFn: async (): Promise<SectorData[]> => {
      // Using mock data since new tables aren't in Supabase types yet
      return [
        { sector: 'Technology', count: 6, percentage: 35, totalEmissions: 850000, color: '#0d9488' },
        { sector: 'Automotive', count: 4, percentage: 30, totalEmissions: 720000, color: '#06b6d4' },
        { sector: 'Energy', count: 3, percentage: 20, totalEmissions: 480000, color: '#3b82f6' },
        { sector: 'Manufacturing', count: 2, percentage: 10, totalEmissions: 240000, color: '#8b5cf6' },
        { sector: 'Retail', count: 1, percentage: 5, totalEmissions: 120000, color: '#ef4444' }
      ];
    }
  });
};
