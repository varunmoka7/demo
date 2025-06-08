
// GHG Protocol Scope 3 categories classification
export const SCOPE3_CATEGORIES = {
  // Upstream activities (Categories 1-8)
  upstream: [
    'Purchased Goods & Services',
    'Capital Goods',
    'Fuel and Energy Related Activities',
    'Transportation & Distribution (Upstream)',
    'Waste Generated in Operations',
    'Business Travel',
    'Employee Commuting',
    'Leased Assets (Upstream)'
  ],
  // Downstream activities (Categories 9-15)
  downstream: [
    'Transportation & Distribution (Downstream)',
    'Processing of Sold Products',
    'Use of Sold Products',
    'End-of-Life Treatment of Sold Products',
    'Leased Assets (Downstream)',
    'Franchises',
    'Investments'
  ]
};

export interface CategoryBreakdown {
  category: string;
  emissions: number;
  type: 'upstream' | 'downstream';
}

export interface UpstreamDownstreamData {
  upstream: {
    total: number;
    categories: CategoryBreakdown[];
    percentage: number;
  };
  downstream: {
    total: number;
    categories: CategoryBreakdown[];
    percentage: number;
  };
}

/**
 * Categorizes Scope 3 emissions data into upstream and downstream
 */
export const categorizeScope3Data = (categoryData: any[]): UpstreamDownstreamData => {
  const upstreamCategories: CategoryBreakdown[] = [];
  const downstreamCategories: CategoryBreakdown[] = [];

  categoryData.forEach(item => {
    const emissions = typeof item.emissions === 'string' ? 
      parseInt(item.emissions.replace(/,/g, '')) : 
      item.emissions;

    const categoryBreakdown: CategoryBreakdown = {
      category: item.category,
      emissions,
      type: isUpstreamCategory(item.category) ? 'upstream' : 'downstream'
    };

    if (isUpstreamCategory(item.category)) {
      upstreamCategories.push(categoryBreakdown);
    } else {
      downstreamCategories.push(categoryBreakdown);
    }
  });

  const upstreamTotal = upstreamCategories.reduce((sum, cat) => sum + cat.emissions, 0);
  const downstreamTotal = downstreamCategories.reduce((sum, cat) => sum + cat.emissions, 0);
  const grandTotal = upstreamTotal + downstreamTotal;

  return {
    upstream: {
      total: upstreamTotal,
      categories: upstreamCategories,
      percentage: grandTotal > 0 ? Math.round((upstreamTotal / grandTotal) * 100) : 0
    },
    downstream: {
      total: downstreamTotal,
      categories: downstreamCategories,
      percentage: grandTotal > 0 ? Math.round((downstreamTotal / grandTotal) * 100) : 0
    }
  };
};

/**
 * Determines if a category is upstream based on GHG Protocol
 */
export const isUpstreamCategory = (category: string): boolean => {
  return SCOPE3_CATEGORIES.upstream.some(upstreamCat => 
    category.toLowerCase().includes(upstreamCat.toLowerCase()) ||
    upstreamCat.toLowerCase().includes(category.toLowerCase())
  );
};

/**
 * Generates fallback data when real data is incomplete
 */
export const generateFallbackScope3Distribution = (totalScope3: number): UpstreamDownstreamData => {
  // Industry-typical distribution: ~70% upstream, ~30% downstream
  const upstreamTotal = Math.round(totalScope3 * 0.7);
  const downstreamTotal = totalScope3 - upstreamTotal;

  return {
    upstream: {
      total: upstreamTotal,
      categories: [
        { category: 'Purchased Goods & Services', emissions: Math.round(upstreamTotal * 0.6), type: 'upstream' },
        { category: 'Business Travel', emissions: Math.round(upstreamTotal * 0.15), type: 'upstream' },
        { category: 'Employee Commuting', emissions: Math.round(upstreamTotal * 0.15), type: 'upstream' },
        { category: 'Waste Generated', emissions: Math.round(upstreamTotal * 0.1), type: 'upstream' }
      ],
      percentage: 70
    },
    downstream: {
      total: downstreamTotal,
      categories: [
        { category: 'Use of Sold Products', emissions: Math.round(downstreamTotal * 0.7), type: 'downstream' },
        { category: 'Transportation & Distribution (Downstream)', emissions: Math.round(downstreamTotal * 0.3), type: 'downstream' }
      ],
      percentage: 30
    }
  };
};
