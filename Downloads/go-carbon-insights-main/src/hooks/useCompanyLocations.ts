
import { useQuery } from '@tanstack/react-query';

interface CompanyLocation {
  id: string;
  company_id: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  headquarters_city: string;
}

export const useCompanyLocations = () => {
  return useQuery({
    queryKey: ['companyLocations'],
    queryFn: async (): Promise<CompanyLocation[]> => {
      // Using mock data since new tables aren't in Supabase types yet
      return [
        { id: '1', company_id: 'apple', country: 'United States', region: 'North America', latitude: 37.3349, longitude: -122.0090, headquarters_city: 'Cupertino' },
        { id: '2', company_id: 'microsoft', country: 'United States', region: 'North America', latitude: 47.6431, longitude: -122.1271, headquarters_city: 'Redmond' },
        { id: '3', company_id: 'google', country: 'United States', region: 'North America', latitude: 37.4220, longitude: -122.0841, headquarters_city: 'Mountain View' },
        { id: '4', company_id: 'tesla', country: 'United States', region: 'North America', latitude: 30.2279, longitude: -97.7423, headquarters_city: 'Austin' },
        { id: '5', company_id: 'bmw', country: 'Germany', region: 'Europe', latitude: 48.1374, longitude: 11.5755, headquarters_city: 'Munich' },
        { id: '6', company_id: 'toyota', country: 'Japan', region: 'Asia-Pacific', latitude: 35.0844, longitude: 137.1531, headquarters_city: 'Toyota City' },
        { id: '7', company_id: 'samsung', country: 'South Korea', region: 'Asia-Pacific', latitude: 37.5665, longitude: 126.9780, headquarters_city: 'Seoul' }
      ];
    }
  });
};
