
import { useSupabaseSBTITargets } from './useSupabaseSBTI';
import { getCompanyById } from '@/data/mockData';

export const useSBTITargets = (companyId: string) => {
  const supabaseQuery = useSupabaseSBTITargets(companyId);
  
  // If Supabase data is loading or there's an error, fallback to mock data
  if (supabaseQuery.isLoading || supabaseQuery.error || !supabaseQuery.data) {
    const company = getCompanyById(companyId);
    return {
      data: company?.sbtiTargets || null,
      isLoading: supabaseQuery.isLoading,
      error: supabaseQuery.error || (company ? null : new Error('Company not found'))
    };
  }
  
  return supabaseQuery;
};
