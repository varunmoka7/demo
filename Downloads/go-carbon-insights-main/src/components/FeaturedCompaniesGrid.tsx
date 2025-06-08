
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFeaturedCompanies } from '@/hooks/useFeaturedCompanies';
import { Star, TrendingDown, Award } from 'lucide-react';

const FeaturedCompaniesGrid = () => {
  const { data: companies, isLoading } = useFeaturedCompanies();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Featured Companies</CardTitle>
          <CardDescription>Leading organizations in sustainability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 border rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-40"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatEmissions = (emissions: number) => {
    if (emissions >= 1000) {
      return `${(emissions / 1000).toFixed(1)}K`;
    }
    return emissions.toString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Featured Companies
        </CardTitle>
        <CardDescription>Leading organizations in carbon transparency and reduction</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companies?.map((company) => (
            <div key={company.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{company.name}</h4>
                  <Badge variant="outline" className="mt-1">{company.sector}</Badge>
                </div>
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Carbon Footprint:</span>
                  <span className="font-medium">{formatEmissions(company.carbon_footprint)} tCO2e</span>
                </div>
                
                {company.renewable_energy_percentage && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Renewable Energy:</span>
                    <span className="font-medium text-green-600">{company.renewable_energy_percentage}%</span>
                  </div>
                )}
                
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Award className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-gray-600">{company.achievement}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedCompaniesGrid;
