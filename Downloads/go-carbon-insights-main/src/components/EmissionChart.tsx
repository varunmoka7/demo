
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EmissionChartProps {
  data: any[];
  title: string;
  height?: number;
  selectedScope?: string;
}

const EmissionChart = ({ data, title, height = 300, selectedScope = 'all' }: EmissionChartProps) => {
  const renderLines = () => {
    switch (selectedScope) {
      case 'scope1':
        return (
          <Line 
            type="monotone" 
            dataKey="scope1" 
            stroke="#dc2626" 
            strokeWidth={3}
            name="Scope 1"
            dot={{ fill: '#dc2626', strokeWidth: 2, r: 5 }}
          />
        );
      case 'scope2':
        return (
          <Line 
            type="monotone" 
            dataKey="scope2" 
            stroke="#ea580c" 
            strokeWidth={3}
            name="Scope 2"
            dot={{ fill: '#ea580c', strokeWidth: 2, r: 5 }}
          />
        );
      case 'scope3':
        return (
          <Line 
            type="monotone" 
            dataKey="scope3" 
            stroke="#0d9488" 
            strokeWidth={3}
            name="Scope 3"
            dot={{ fill: '#0d9488', strokeWidth: 2, r: 5 }}
          />
        );
      case 'total':
        return (
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#1f2937" 
            strokeWidth={3}
            name="Total Emissions"
            dot={{ fill: '#1f2937', strokeWidth: 2, r: 5 }}
          />
        );
      default:
        return (
          <>
            <Line 
              type="monotone" 
              dataKey="scope1" 
              stroke="#dc2626" 
              strokeWidth={2}
              name="Scope 1"
              dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="scope2" 
              stroke="#ea580c" 
              strokeWidth={2}
              name="Scope 2"
              dot={{ fill: '#ea580c', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="scope3" 
              stroke="#0d9488" 
              strokeWidth={2}
              name="Scope 3"
              dot={{ fill: '#0d9488', strokeWidth: 2, r: 4 }}
            />
          </>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            stroke="#6b7280"
            fontSize={12}
            tick={{ fontSize: 12 }}
            label={{ value: 'Year', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fontSize: '14px', fontWeight: 'bold' } }}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tick={{ fontSize: 12 }}
            label={{ value: 'Emissions (tCO2e)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: '14px', fontWeight: 'bold' } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value, name) => [`${Number(value).toLocaleString()} tCO2e`, name]}
          />
          <Legend 
            wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
          />
          {renderLines()}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionChart;
