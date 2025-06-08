
import { useSupabaseCompanies, useSupabaseCompany } from './useSupabaseCompanies';
import { companies, getCompanyById as getMockCompanyById } from '@/data/companyMockData';
import { PublicCompanyData } from './useSecurePublicData';

// Transform mock data to match the secure public view structure
const transformMockDataToPublicStructure = (mockCompanies: typeof companies): PublicCompanyData[] => {
  return mockCompanies.map(company => ({
    id: company.id,
    name: company.name,
    industry: company.industry || 'Unknown',
    sector: company.sector,
    description: company.description,
    total_emissions: company.carbon_footprint || undefined,
    benchmark_year: 2024, // Default benchmark year for mock data
    sbti_status: undefined
  }));
};

// Transform a single mock company to match the secure public view structure
const transformMockCompanyToPublicStructure = (mockCompany: typeof companies[0]): PublicCompanyData => {
  return {
    id: mockCompany.id,
    name: mockCompany.name,
    industry: mockCompany.industry || 'Unknown',
    sector: mockCompany.sector,
    description: mockCompany.description,
    total_emissions: mockCompany.carbon_footprint || undefined,
    benchmark_year: 2024,
    sbti_status: undefined
  };
};

export const useCompanies = () => {
  const supabaseQuery = useSupabaseCompanies();
  
  // If Supabase data is loading or there's an error, fallback to transformed mock data
  if (supabaseQuery.isLoading || supabaseQuery.error || !supabaseQuery.data?.length) {
    const transformedMockData = transformMockDataToPublicStructure(companies);
    return {
      data: transformedMockData,
      isLoading: supabaseQuery.isLoading,
      error: supabaseQuery.error
    };
  }

  // Ensure Supabase data is also properly typed
  return {
    data: supabaseQuery.data as PublicCompanyData[],
    isLoading: supabaseQuery.isLoading,
    error: supabaseQuery.error
  };
};

export const useCompany = (companyId: string) => {
  const supabaseQuery = useSupabaseCompany(companyId);
  
  // If Supabase data is loading or there's an error, fallback to mock data
  if (supabaseQuery.isLoading || supabaseQuery.error || !supabaseQuery.data) {
    const mockCompany = getMockCompanyById(companyId);
    
    if (mockCompany) {
      const transformedCompany = transformMockCompanyToPublicStructure(mockCompany);
      
      return {
        data: transformedCompany,
        isLoading: supabaseQuery.isLoading,
        error: null
      };
    }
    
    return {
      data: null,
      isLoading: supabaseQuery.isLoading,
      error: supabaseQuery.error || new Error('Company not found')
    };
  }

  // Ensure Supabase data is properly typed
  return {
    data: supabaseQuery.data as PublicCompanyData,
    isLoading: supabaseQuery.isLoading,
    error: supabaseQuery.error
  };
};
