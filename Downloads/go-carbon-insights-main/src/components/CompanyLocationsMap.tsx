
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCompanyLocations } from '@/hooks/useCompanyLocations';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building } from 'lucide-react';

const CompanyLocationsMap = () => {
  const { data: locations, isLoading } = useCompanyLocations();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Global Coverage</CardTitle>
          <CardDescription>Companies tracked worldwide</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-gray-200 border-t-teal-600 rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const regionCounts = locations?.reduce((acc, location) => {
    acc[location.region] = (acc[location.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const regionColors = {
    'North America': 'bg-blue-500',
    'Europe': 'bg-green-500',
    'Asia-Pacific': 'bg-purple-500',
    'South America': 'bg-orange-500',
    'Africa': 'bg-red-500'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Coverage</CardTitle>
        <CardDescription>Companies tracked across continents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Region Overview */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(regionCounts).map(([region, count]) => (
              <div key={region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div 
                    className={`w-3 h-3 rounded-full ${regionColors[region as keyof typeof regionColors] || 'bg-gray-500'}`}
                  ></div>
                  <span className="text-sm font-medium">{region}</span>
                </div>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </div>

          {/* Company List */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">Company Locations</h4>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {locations?.map((location) => (
                <div key={location.id} className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium capitalize">{location.company_id.replace('_', ' ')}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {location.headquarters_city}, {location.country}
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`w-2 h-2 rounded-full ${regionColors[location.region as keyof typeof regionColors] || 'bg-gray-500'}`}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="pt-4 border-t grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-teal-600">{locations?.length}</div>
              <div className="text-xs text-gray-600">Companies</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">{Object.keys(regionCounts).length}</div>
              <div className="text-xs text-gray-600">Regions</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">
                {new Set(locations?.map(l => l.country)).size}
              </div>
              <div className="text-xs text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyLocationsMap;
