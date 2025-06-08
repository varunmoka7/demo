
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useSectorBreakdown } from '@/hooks/useSectorBreakdown';

const SectorBreakdownChart = () => {
  const { data: sectors, isLoading } = useSectorBreakdown();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Industry Sectors</CardTitle>
          <CardDescription>Emissions breakdown by industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-gray-200 border-t-teal-600 rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.sector}</p>
          <p className="text-sm text-gray-600">{data.count} companies ({data.percentage}%)</p>
          <p className="text-sm text-gray-600">{(data.totalEmissions / 1000).toFixed(0)}K tCO2e</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Industry Sectors</CardTitle>
        <CardDescription>Emissions breakdown by industry sector</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={sectors}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                stroke="#fff"
                strokeWidth={2}
              >
                {sectors?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {sectors?.map((sector) => (
            <div key={sector.sector} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: sector.color }}
                ></div>
                <span>{sector.sector}</span>
              </div>
              <span className="font-medium">{sector.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SectorBreakdownChart;
