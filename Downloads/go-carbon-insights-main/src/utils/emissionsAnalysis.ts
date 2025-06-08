
/**
 * Calculate emissions intensity metrics
 */
export function calculateEmissionsIntensity(emissions: any, company: any) {
  const totalEmissions = emissions.scope1 + emissions.scope2 + emissions.scope3;
  
  return {
    emissionsPerEmployee: company.employees ? 
      (totalEmissions / company.employees).toFixed(2) : null,
    emissionsPerRevenue: company.revenue ? 
      (totalEmissions / company.revenue).toFixed(2) : null,
    scope1Percentage: ((emissions.scope1 / totalEmissions) * 100).toFixed(1),
    scope2Percentage: ((emissions.scope2 / totalEmissions) * 100).toFixed(1),
    scope3Percentage: ((emissions.scope3 / totalEmissions) * 100).toFixed(1)
  };
}

/**
 * Calculate year-over-year changes
 */
export function calculateYearOverYearChange(trendsData: any[]) {
  const changes = [];
  
  for (let i = 1; i < trendsData.length; i++) {
    const current = trendsData[i];
    const previous = trendsData[i - 1];
    const currentTotal = current.scope1 + current.scope2 + current.scope3;
    const previousTotal = previous.scope1 + previous.scope2 + previous.scope3;
    
    changes.push({
      year: current.year,
      totalEmissionsChange: ((currentTotal - previousTotal) / previousTotal * 100).toFixed(1),
      scope1Change: ((current.scope1 - previous.scope1) / previous.scope1 * 100).toFixed(1),
      scope2Change: ((current.scope2 - previous.scope2) / previous.scope2 * 100).toFixed(1),
      scope3Change: ((current.scope3 - previous.scope3) / previous.scope3 * 100).toFixed(1)
    });
  }
  
  return changes;
}
