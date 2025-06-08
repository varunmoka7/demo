
import React, { useState } from 'react';
import { Target, TrendingDown, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useCompanies } from '@/hooks/useCompanies';
import DecarbonizationStrategy from '@/components/DecarbonizationStrategy';

const Decarbonization = () => {
  const [selectedCompany, setSelectedCompany] = useState('techcorp');
  const { data: companies } = useCompanies();

  const pathwayData = [
    { year: 2020, actual: 4500, target: 4500, baseline: 4500 },
    { year: 2021, actual: 4200, target: 4275, baseline: 4500 },
    { year: 2022, actual: 3900, target: 4050, baseline: 4500 },
    { year: 2023, actual: 3600, target: 3825, baseline: 4500 },
    { year: 2024, actual: 3300, target: 3600, baseline: 4500 },
    { year: 2025, actual: null, target: 3375, baseline: 4500 },
    { year: 2026, actual: null, target: 3150, baseline: 4500 },
    { year: 2030, actual: null, target: 2250, baseline: 4500 },
    { year: 2050, actual: null, target: 0, baseline: 4500 }
  ];

  const strategies = [
    {
      id: '1',
      strategy_type: 'Renewable Energy Transition',
      description: 'Switch to 100% renewable electricity across all operations through solar installations and green energy contracts.',
      expected_reduction: 1200,
      implementation_year: 2025,
      status: 'in_progress' as const
    },
    {
      id: '2',
      strategy_type: 'Energy Efficiency Program',
      description: 'Implement comprehensive energy efficiency measures including LED lighting, smart HVAC systems, and building automation.',
      expected_reduction: 450,
      implementation_year: 2024,
      status: 'completed' as const
    },
    {
      id: '3',
      strategy_type: 'Fleet Electrification',
      description: 'Replace all company vehicles with electric alternatives and install charging infrastructure.',
      expected_reduction: 280,
      implementation_year: 2026,
      status: 'planned' as const
    },
    {
      id: '4',
      strategy_type: 'Supply Chain Engagement',
      description: 'Work with top 50 suppliers to reduce their emissions by 25% through collaborative programs.',
      expected_reduction: 800,
      implementation_year: 2027,
      status: 'planned' as const
    }
  ];

  const currentYear = new Date().getFullYear();
  const currentData = pathwayData.find(d => d.year === currentYear);
  const baselineData = pathwayData[0];
  const reductionToDate = baselineData ? ((baselineData.baseline - (currentData?.actual || 0)) / baselineData.baseline * 100).toFixed(1) : '0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Decarbonization Strategy</h1>
        <p className="text-lg text-gray-600 mb-6">Science-based targets and reduction pathways</p>
        
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Company:</label>
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {companies?.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reduction</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{reductionToDate}%</div>
            <p className="text-xs text-muted-foreground">Since baseline year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2030 Target</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-50%</div>
            <p className="text-xs text-muted-foreground">Scope 1 & 2 reduction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Zero Target</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2050</div>
            <p className="text-xs text-muted-foreground">All scopes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SBTi Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Approved</div>
            <p className="text-xs text-muted-foreground">Science-based targets</p>
          </CardContent>
        </Card>
      </div>

      {/* Decarbonization Pathway */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Science-Based Decarbonization Pathway</CardTitle>
          <CardDescription>Progress toward 2030 and 2050 targets aligned with 1.5°C scenario</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={pathwayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Emissions (tCO2e)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value, name) => [
                  value ? `${value} tCO2e` : 'N/A', 
                  name === 'actual' ? 'Actual Emissions' : 
                  name === 'target' ? 'Target Pathway' : 'Baseline'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="baseline" 
                stroke="#9ca3af" 
                strokeWidth={2}
                strokeDasharray="8 8"
                name="Baseline"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Target Pathway"
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Actual Emissions"
                dot={{ fill: '#10b981', r: 6 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Decarbonization Strategies */}
      <DecarbonizationStrategy strategies={strategies} />

      {/* Progress Summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Progress Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Achievements</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-600">Achieved {reductionToDate}% emission reduction since baseline</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-600">SBTi targets approved and committed</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-600">Energy efficiency program completed</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-600">Renewable energy transition in progress</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Next Milestones</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">Complete renewable energy transition by 2025</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">Begin fleet electrification program in 2026</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">Launch supplier engagement initiative in 2027</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">Achieve 50% reduction target by 2030</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Decarbonization;
