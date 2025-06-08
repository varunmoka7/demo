
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp, Info } from 'lucide-react';

interface ChartData {
  year: number;
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
}

interface DrillDownData {
  category: string;
  value: number;
  color: string;
  description: string;
}

const InteractiveChart: React.FC<{ data: ChartData[]; title: string }> = ({ data, title }) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [drillDownData, setDrillDownData] = useState<DrillDownData[] | null>(null);

  const scopeColors = {
    scope1: '#ef4444', // red
    scope2: '#f59e0b', // amber
    scope3: '#10b981'  // emerald
  };

  const handleDataPointClick = (data: any) => {
    if (data && data.activePayload) {
      const year = data.activePayload[0].payload.year;
      setSelectedYear(year);
      
      // Generate drill-down data based on selected year
      const yearData = data.activePayload[0].payload;
      const drillDown: DrillDownData[] = [
        {
          category: 'Scope 1 - Direct Emissions',
          value: yearData.scope1,
          color: scopeColors.scope1,
          description: 'Direct GHG emissions from company-owned sources'
        },
        {
          category: 'Scope 2 - Energy Indirect',
          value: yearData.scope2,
          color: scopeColors.scope2,
          description: 'Indirect emissions from purchased energy'
        },
        {
          category: 'Scope 3 - Other Indirect',
          value: yearData.scope3,
          color: scopeColors.scope3,
          description: 'All other indirect emissions in value chain'
        }
      ];
      setDrillDownData(drillDown);
    }
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en', { notation: 'compact' }).format(value);
  };

  const latestYear = data[data.length - 1];
  const previousYear = data[data.length - 2];
  const totalChange = latestYear && previousYear ? 
    ((latestYear.total - previousYear.total) / previousYear.total) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            <div className="flex items-center gap-2">
              {totalChange < 0 ? (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {Math.abs(totalChange).toFixed(1)}% reduction
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {totalChange.toFixed(1)}% increase
                </Badge>
              )}
            </div>
          </CardTitle>
          <CardDescription>
            Click on any data point to drill down into emission categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <AreaChart data={data} onClick={handleDataPointClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={formatNumber} />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `${formatNumber(value)} tCO2e`,
                    name.charAt(0).toUpperCase() + name.slice(1)
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="scope1"
                  stackId="1"
                  stroke={scopeColors.scope1}
                  fill={scopeColors.scope1}
                  fillOpacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="scope2"
                  stackId="1"
                  stroke={scopeColors.scope2}
                  fill={scopeColors.scope2}
                  fillOpacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="scope3"
                  stackId="1"
                  stroke={scopeColors.scope3}
                  fill={scopeColors.scope3}
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {selectedYear && drillDownData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Emission Breakdown for {selectedYear}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedYear(null);
                  setDrillDownData(null);
                }}
              >
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={drillDownData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={(entry) => `${entry.category.split(' - ')[0]}: ${formatNumber(entry.value)}`}
                    >
                      {drillDownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${formatNumber(value)} tCO2e`]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                {drillDownData.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div 
                      className="w-4 h-4 rounded-full mt-1"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.category}</div>
                      <div className="text-2xl font-bold">{formatNumber(item.value)} tCO2e</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveChart;
