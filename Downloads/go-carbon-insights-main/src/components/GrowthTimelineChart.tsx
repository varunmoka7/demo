
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useTrackingGrowth } from '@/hooks/useTrackingGrowth';

const GrowthTimelineChart = () => {
  const { data: growth, isLoading } = useTrackingGrowth();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Platform Growth</CardTitle>
          <CardDescription>Monthly expansion timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-gray-200 border-t-teal-600 rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label} 2024</p>
          <p className="text-sm text-teal-600">Companies: {data.companies_tracked}</p>
          <p className="text-sm text-blue-600">New Added: {data.new_companies_added}</p>
          <p className="text-sm text-purple-600">Sectors: {data.sectors_covered}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Growth</CardTitle>
        <CardDescription>Monthly expansion in companies and sector coverage</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={growth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="monthName" 
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="companies_tracked" 
                stroke="#0d9488" 
                fill="#0d9488" 
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="sectors_covered" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-teal-600">{growth?.[growth.length - 1]?.companies_tracked}</div>
            <div className="text-xs text-gray-600">Total Companies</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {growth?.reduce((sum, month) => sum + month.new_companies_added, 0)}
            </div>
            <div className="text-xs text-gray-600">Companies Added</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{growth?.[growth.length - 1]?.sectors_covered}</div>
            <div className="text-xs text-gray-600">Sectors Covered</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthTimelineChart;
