
import { supabase } from '@/integrations/supabase/client';

/**
 * Get dashboard overview data for a specific company with enhanced RLS security
 */
export async function getDashboardData(companyId: string, year = 2023) {
  try {
    console.log(`Fetching dashboard data for company ${companyId}...`);

    // Get company basic info (secured by RLS)
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (companyError) {
      console.log('Company data access restricted (expected with RLS):', companyError.message);
      return { success: false, error: companyError, noAccess: true };
    }

    // Get emissions data for the year (private data - requires company access)
    const { data: emissions, error: emissionsError } = await supabase
      .from('emissions_data')
      .select('*')
      .eq('company_id', companyId)
      .eq('year', year)
      .single();

    if (emissionsError) {
      console.log('Emissions data access restricted (expected with RLS):', emissionsError.message);
    }

    // Get SBTi targets (secured by RLS)
    const { data: sbti, error: sbtiError } = await supabase
      .from('sbti_targets')
      .select('*')
      .eq('company_id', companyId)
      .single();

    if (sbtiError) {
      console.log('SBTi data access restricted (expected with RLS):', sbtiError.message);
    }

    // Get compliance status (secured by RLS)
    const { data: compliance, error: complianceError } = await supabase
      .from('frameworks_compliance')
      .select('*')
      .eq('company_id', companyId);

    if (complianceError) {
      console.log('Compliance data access restricted (expected with RLS):', complianceError.message);
    }

    // Get top 3 carbon footprint sources (private data)
    const { data: scope3Breakdown, error: scope3Error } = await supabase
      .from('scope3_emissions')
      .select('category, emissions_by_category')
      .eq('company_id', companyId)
      .eq('year', year)
      .order('emissions_by_category', { ascending: false })
      .limit(3);

    if (scope3Error) {
      console.log('Scope 3 breakdown access restricted (expected with RLS):', scope3Error.message);
    }

    // Get public benchmark data (accessible based on RLS)
    const { data: benchmarks, error: benchmarksError } = await supabase
      .from('company_benchmarks')
      .select('*')
      .eq('company_id', companyId)
      .eq('is_public_data', true);

    if (benchmarksError) {
      console.log('Benchmarks data access restricted (expected with RLS):', benchmarksError.message);
    }

    return {
      company,
      emissions,
      sbti,
      compliance: compliance || [],
      topCarbonSources: scope3Breakdown || [],
      benchmarks: benchmarks || [],
      success: true
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return { success: false, error };
  }
}

/**
 * Get emissions trends for multiple years (private data - secured by RLS)
 */
export async function getEmissionsTrends(companyId: string, startYear = 2019, endYear = 2023) {
  try {
    console.log(`Fetching emissions trends for company ${companyId}...`);
    
    const { data, error } = await supabase
      .from('emissions_data')
      .select('year, scope1, scope2, scope3')
      .eq('company_id', companyId)
      .gte('year', startYear)
      .lte('year', endYear)
      .order('year', { ascending: true });

    if (error) {
      console.log('Emissions trends access restricted (expected with RLS):', error.message);
      return { success: false, error, noAccess: true };
    }

    return {
      trends: data,
      success: true
    };
  } catch (error) {
    console.error('Error fetching emissions trends:', error);
    return { success: false, error };
  }
}

/**
 * Get all companies with their public benchmark data (accessible based on RLS)
 */
export async function getCompaniesOverview(year = 2023) {
  try {
    console.log('Fetching companies overview...');
    
    const { data, error } = await supabase
      .from('company_benchmarks')
      .select(`
        *,
        companies:company_id (
          id,
          name,
          industry,
          sector,
          description
        )
      `)
      .eq('benchmark_year', year)
      .eq('is_public_data', true)
      .order('total_emissions', { ascending: false });

    if (error) {
      console.log('Companies overview access restricted (expected with RLS):', error.message);
      return { success: false, error, noAccess: true };
    }

    return {
      companies: data,
      success: true
    };
  } catch (error) {
    console.error('Error fetching companies overview:', error);
    return { success: false, error };
  }
}

/**
 * Get detailed Scope 3 analysis for a company (private data - secured by RLS)
 */
export async function getScope3Analysis(companyId: string, year = 2023) {
  try {
    console.log(`Fetching Scope 3 analysis for company ${companyId}...`);
    
    const { data, error } = await supabase
      .from('scope3_emissions')
      .select('*')
      .eq('company_id', companyId)
      .eq('year', year)
      .order('emissions_by_category', { ascending: false });

    if (error) {
      console.log('Scope 3 analysis access restricted (expected with RLS):', error.message);
      return { success: false, error, noAccess: true };
    }

    // Calculate total and percentages
    const totalScope3 = data?.reduce((sum, category) => sum + category.emissions_by_category, 0) || 0;
    const categoriesWithPercentages = data?.map(category => ({
      ...category,
      percentage: ((category.emissions_by_category / totalScope3) * 100).toFixed(1)
    })) || [];

    return {
      categories: categoriesWithPercentages,
      totalEmissions: totalScope3,
      success: true
    };
  } catch (error) {
    console.error('Error fetching Scope 3 analysis:', error);
    return { success: false, error };
  }
}

/**
 * Get industry benchmarks for comparison (public data - accessible based on RLS)
 */
export async function getIndustryBenchmarks(industry: string, year = 2023) {
  try {
    console.log(`Fetching industry benchmarks for ${industry}...`);
    
    const { data, error } = await supabase
      .from('company_benchmarks')
      .select(`
        *,
        companies:company_id (
          name
        )
      `)
      .eq('industry', industry)
      .eq('benchmark_year', year)
      .eq('is_public_data', true)
      .order('total_emissions', { ascending: false });

    if (error) {
      console.log('Industry benchmarks access restricted (expected with RLS):', error.message);
      return { success: false, error, noAccess: true };
    }

    return {
      benchmarks: data,
      success: true
    };
  } catch (error) {
    console.error('Error fetching industry benchmarks:', error);
    return { success: false, error };
  }
}
