
import { useSupabaseScope3Data } from './useSupabaseScope3';
import { getCompanyById } from '@/data/companyMockData';

export const useScope3Data = (companyId: string) => {
  const supabaseQuery = useSupabaseScope3Data(companyId);
  
  // Always provide fallback data to ensure charts display
  const company = getCompanyById(companyId);
  
  if (!company) {
    return {
      data: null,
      isLoading: supabaseQuery.isLoading,
      error: supabaseQuery.error || new Error('Company not found')
    };
  }

  // Generate comprehensive scope 3 data structure based on company
  const getScope3DataForCompany = () => {
    const baseEmissions = company.emissionsData[company.emissionsData.length - 1]?.scope3 || 1750;
    
    // Industry-specific category distributions
    const getCategoryDistribution = () => {
      switch (company.industry) {
        case 'Technology':
          return {
            'Purchased Goods & Services': 0.40,
            'Capital Goods': 0.15,
            'Fuel & Energy Related Activities': 0.06,
            'Transportation & Distribution (Upstream)': 0.05,
            'Waste Generated in Operations': 0.02,
            'Business Travel': 0.08,
            'Employee Commuting': 0.06,
            'Leased Assets (Upstream)': 0.02,
            'Transportation & Distribution (Downstream)': 0.03,
            'Processing of Sold Products': 0.01,
            'Use of Sold Products': 0.10,
            'End-of-Life Treatment of Sold Products': 0.01,
            'Leased Assets (Downstream)': 0.005,
            'Franchises': 0.005,
            'Investments': 0.005
          };
        case 'Manufacturing':
          return {
            'Purchased Goods & Services': 0.50,
            'Capital Goods': 0.18,
            'Fuel & Energy Related Activities': 0.08,
            'Transportation & Distribution (Upstream)': 0.08,
            'Waste Generated in Operations': 0.05,
            'Business Travel': 0.03,
            'Employee Commuting': 0.03,
            'Leased Assets (Upstream)': 0.01,
            'Transportation & Distribution (Downstream)': 0.02,
            'Processing of Sold Products': 0.005,
            'Use of Sold Products': 0.005,
            'End-of-Life Treatment of Sold Products': 0.005,
            'Leased Assets (Downstream)': 0.005,
            'Franchises': 0.005,
            'Investments': 0.005
          };
        case 'Transportation':
          return {
            'Purchased Goods & Services': 0.35,
            'Capital Goods': 0.12,
            'Fuel & Energy Related Activities': 0.15,
            'Transportation & Distribution (Upstream)': 0.12,
            'Waste Generated in Operations': 0.03,
            'Business Travel': 0.08,
            'Employee Commuting': 0.04,
            'Leased Assets (Upstream)': 0.03,
            'Transportation & Distribution (Downstream)': 0.06,
            'Processing of Sold Products': 0.005,
            'Use of Sold Products': 0.005,
            'End-of-Life Treatment of Sold Products': 0.01,
            'Leased Assets (Downstream)': 0.005,
            'Franchises': 0.005,
            'Investments': 0.005
          };
        case 'Retail':
          return {
            'Purchased Goods & Services': 0.55,
            'Capital Goods': 0.08,
            'Fuel & Energy Related Activities': 0.05,
            'Transportation & Distribution (Upstream)': 0.10,
            'Waste Generated in Operations': 0.04,
            'Business Travel': 0.02,
            'Employee Commuting': 0.05,
            'Leased Assets (Upstream)': 0.03,
            'Transportation & Distribution (Downstream)': 0.06,
            'Processing of Sold Products': 0.005,
            'Use of Sold Products': 0.005,
            'End-of-Life Treatment of Sold Products': 0.015,
            'Leased Assets (Downstream)': 0.005,
            'Franchises': 0.01,
            'Investments': 0.005
          };
        case 'Food & Beverages':
          return {
            'Purchased Goods & Services': 0.60,
            'Capital Goods': 0.10,
            'Fuel & Energy Related Activities': 0.06,
            'Transportation & Distribution (Upstream)': 0.08,
            'Waste Generated in Operations': 0.06,
            'Business Travel': 0.02,
            'Employee Commuting': 0.03,
            'Leased Assets (Upstream)': 0.01,
            'Transportation & Distribution (Downstream)': 0.03,
            'Processing of Sold Products': 0.005,
            'Use of Sold Products': 0.005,
            'End-of-Life Treatment of Sold Products': 0.005,
            'Leased Assets (Downstream)': 0.005,
            'Franchises': 0.005,
            'Investments': 0.005
          };
        default:
          return {
            'Purchased Goods & Services': 0.45,
            'Capital Goods': 0.12,
            'Fuel & Energy Related Activities': 0.08,
            'Transportation & Distribution (Upstream)': 0.06,
            'Waste Generated in Operations': 0.03,
            'Business Travel': 0.05,
            'Employee Commuting': 0.04,
            'Leased Assets (Upstream)': 0.02,
            'Transportation & Distribution (Downstream)': 0.04,
            'Processing of Sold Products': 0.03,
            'Use of Sold Products': 0.08,
            'End-of-Life Treatment of Sold Products': 0.02,
            'Leased Assets (Downstream)': 0.01,
            'Franchises': 0.01,
            'Investments': 0.01
          };
      }
    };

    const categoryDistribution = getCategoryDistribution();

    // Generate year-specific category data
    const generateCategoryDataByYear = () => {
      const categoryDataByYear: Record<string, any[]> = {};
      
      company.emissionsData.forEach(yearData => {
        const year = yearData.year.toString();
        const totalScope3 = yearData.scope3;
        
        categoryDataByYear[year] = Object.entries(categoryDistribution).map(([category, percentage]) => ({
          category,
          emissions: Math.round(totalScope3 * percentage).toString(),
          influenceFactors: getCategoryInfluenceFactors(category),
          insights: getCategoryInsights(category, company.industry)
        }));
      });
      
      return categoryDataByYear;
    };
    
    return {
      trendData: company.emissionsData.map(item => ({
        year: item.year,
        emissions: item.scope3
      })),
      categoryData: Object.entries(categoryDistribution).map(([category, percentage]) => ({
        category,
        emissions: Math.round(baseEmissions * percentage).toString(),
        influenceFactors: getCategoryInfluenceFactors(category),
        insights: getCategoryInsights(category, company.industry)
      })),
      categoryDataByYear: generateCategoryDataByYear()
    };
  };

  // Industry-specific influence factors
  const getCategoryInfluenceFactors = (category: string): string => {
    const factors: Record<string, string> = {
      'Purchased Goods & Services': 'Supplier engagement, sustainable procurement',
      'Capital Goods': 'Equipment selection, lifecycle assessment',
      'Fuel & Energy Related Activities': 'Energy mix, transmission losses',
      'Transportation & Distribution (Upstream)': 'Logistics optimization, supplier location',
      'Waste Generated in Operations': 'Waste management, recycling programs',
      'Business Travel': 'Travel policy, virtual meetings adoption',
      'Employee Commuting': 'Remote work policy, public transport incentives',
      'Leased Assets (Upstream)': 'Lease agreements, asset efficiency',
      'Transportation & Distribution (Downstream)': 'Distribution network, customer location',
      'Processing of Sold Products': 'Product design, processing requirements',
      'Use of Sold Products': 'Product efficiency, user behavior',
      'End-of-Life Treatment of Sold Products': 'Product recyclability, disposal methods',
      'Leased Assets (Downstream)': 'Asset utilization, tenant behavior',
      'Franchises': 'Franchise operations, standardization',
      'Investments': 'Investment portfolio, ESG criteria'
    };
    return factors[category] || 'Various operational factors';
  };

  // Industry-specific insights
  const getCategoryInsights = (category: string, industry: string): string => {
    const baseInsights: Record<string, string> = {
      'Purchased Goods & Services': 'Focus on supplier carbon requirements and local sourcing',
      'Capital Goods': 'Prioritize energy-efficient equipment and circular design',
      'Fuel & Energy Related Activities': 'Switch to renewable energy sources and improve efficiency',
      'Transportation & Distribution (Upstream)': 'Optimize supply chain routes and use low-carbon transport',
      'Waste Generated in Operations': 'Implement waste prevention and composting programs',
      'Business Travel': 'Implement virtual-first meeting policy and efficient routes',
      'Employee Commuting': 'Promote hybrid work model and sustainable transport',
      'Leased Assets (Upstream)': 'Include carbon criteria in leasing decisions',
      'Transportation & Distribution (Downstream)': 'Optimize distribution and offer local pickup options',
      'Processing of Sold Products': 'Design products for minimal processing needs',
      'Use of Sold Products': 'Improve product energy efficiency and user education',
      'End-of-Life Treatment of Sold Products': 'Design for circularity and establish take-back programs',
      'Leased Assets (Downstream)': 'Provide guidance for efficient asset use',
      'Franchises': 'Implement carbon standards across franchise network',
      'Investments': 'Apply ESG criteria to investment decisions'
    };
    
    return baseInsights[category] || 'Implement best practices for emission reduction';
  };

  // Use Supabase data if available, otherwise use enhanced fallback
  if (supabaseQuery.data?.trendData?.length && supabaseQuery.data?.categoryData?.length) {
    return supabaseQuery;
  }

  return {
    data: getScope3DataForCompany(),
    isLoading: false,
    error: null
  };
};
