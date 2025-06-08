import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Treemap } from 'recharts';
import { Factory, Zap, Car, Wheat, Building, Settings, ExternalLink, AlertCircle } from 'lucide-react';
import sectorData from '@/data/sources/sector-emissions-sources.json';

const iconMap = {
  "Energy & Electricity": Zap,
  "Industry & Manufacturing": Factory,
  "Agriculture & Land Use": Wheat,
  "Transportation": Car,
  "Buildings": Building,
  "Other Energy Uses": Settings
};

const SectorEmissionsDashboard = () => {
  const [selectedSector, setSelectedSector] = useState<any>(null);

  const formatNumber = (value: string) => {
    return value;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.sector}</p>
          <p className="text-sm text-gray-600">{data.percentage}% ({data.absolute})</p>
        </div>
      );
    }
    return null;
  };

  const TreemapTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">{data.value}</p>
          <p className="text-xs text-gray-500">{data.percentage}% of sector</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Factory className="h-4 w-4 mr-2" />
            Global Emissions Analysis
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Global Emissions by Sector
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Interactive breakdown of global greenhouse gas emissions by economic sector with drill-down capabilities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Sector Emissions Overview</CardTitle>
              <CardDescription>
                Click on any sector for detailed subcategory breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={sectorData.sectors}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="percentage"
                      onClick={(sector) => setSelectedSector(sector)}
                      cursor="pointer"
                    >
                      {sectorData.sectors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {sectorData.sectors.map((sector, index) => {
              const Icon = iconMap[sector.sector as keyof typeof iconMap] || Factory;
              return (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedSector?.sector === sector.sector ? 'ring-2 ring-teal-500' : ''
                  }`}
                  onClick={() => setSelectedSector(sector)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: sector.color + '20' }}
                        >
                          <Icon className="h-5 w-5" style={{ color: sector.color }} />
                        </div>
                        <div>
                          <div className="font-semibold">{sector.sector}</div>
                          <div className="text-sm text-gray-600">{sector.absolute}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{sector.percentage}%</div>
                        <div className="text-xs text-gray-500">of global emissions</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {selectedSector && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {selectedSector.sector} - Detailed Breakdown
                <button
                  onClick={() => setSelectedSector(null)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <Treemap
                      data={selectedSector.subcategories}
                      dataKey="percentage"
                      stroke="#fff"
                      fill={selectedSector.color}
                    >
                      <Tooltip content={<TreemapTooltip />} />
                    </Treemap>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  {selectedSector.subcategories.map((sub: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{sub.name}</div>
                        <div className="text-sm text-gray-600">{sub.value}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{sub.percentage}%</div>
                        <div className="text-xs text-gray-500">of sector</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-2">Energy Transformation</h3>
                  <p className="text-sm text-orange-800">
                    25% of global emissions from energy sector requires rapid transition to renewables
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-orange-700">• Solar and wind deployment</div>
                    <div className="text-xs text-orange-700">• Grid modernization</div>
                    <div className="text-xs text-orange-700">• Energy storage solutions</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Settings className="h-6 w-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Industrial Decarbonization</h3>
                  <p className="text-sm text-red-800">
                    Heavy industries like steel and cement need breakthrough technologies
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-red-700">• Hydrogen adoption</div>
                    <div className="text-xs text-red-700">• Carbon capture</div>
                    <div className="text-xs text-red-700">• Process innovation</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Building className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">Supply Chain Focus</h3>
                  <p className="text-sm text-green-800">
                    70% of most companies' emissions occur in supply chains (Scope 3)
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-green-700">• Supplier engagement</div>
                    <div className="text-xs text-green-700">• Value chain collaboration</div>
                    <div className="text-xs text-green-700">• Circular economy</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <ExternalLink className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Source Attribution</h3>
                <p className="text-blue-800 mb-2">
                  <strong>Primary Source:</strong> {sectorData.source_attribution.primary_source}
                </p>
                <p className="text-sm text-blue-700 mb-2">
                  {sectorData.source_attribution.methodology}
                </p>
                <a 
                  href={sectorData.source_attribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  {sectorData.source_attribution.url}
                </a>
                <p className="text-xs text-blue-600 mt-1">
                  Data Year: {sectorData.source_attribution.data_year} | License: {sectorData.source_attribution.license}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SectorEmissionsDashboard;
