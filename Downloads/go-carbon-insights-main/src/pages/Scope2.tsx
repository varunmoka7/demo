
import React, { useState } from 'react';
import { ArrowLeft, Zap, Thermometer, Snowflake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCompanies } from '@/hooks/useCompanies';
import { useScope2Data } from '@/hooks/useScope2Data';

const Scope2 = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState('techcorp');
  const [selectedYear, setSelectedYear] = useState('2024');
  const { data: companies } = useCompanies();
  const { data: scope2Data, isLoading } = useScope2Data(selectedCompany);

  const sourceIcons = {
    'Purchased Electricity': <Zap className="h-4 w-4" />,
    'Steam & Heating': <Thermometer className="h-4 w-4" />,
    'Cooling': <Snowflake className="h-4 w-4" />
  };

  const availableYears = ['2019', '2020', '2021', '2022', '2023', '2024'];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading Scope 2 data...</div>
      </div>
    );
  }

  const trendData = scope2Data?.trendData || [];
  
  // Get year-specific data with proper fallbacks
  const getSourceDataForYear = (year: string) => {
    if (scope2Data?.sourceDataByYear && scope2Data.sourceDataByYear[year]) {
      return scope2Data.sourceDataByYear[year];
    }
    return scope2Data?.sourceData || [];
  };

  const getLocationDataForYear = (year: string) => {
    if (scope2Data?.locationDataByYear && scope2Data.locationDataByYear[year]) {
      return scope2Data.locationDataByYear[year];
    }
    return scope2Data?.locationData || [];
  };

  const sourceData = getSourceDataForYear(selectedYear).map(item => ({
    ...item,
    icon: sourceIcons[item.source as keyof typeof sourceIcons] || <Zap className="h-4 w-4" />
  }));
  const locationData = getLocationDataForYear(selectedYear);

  const sourceColors = ['#ea580c', '#f59e0b', '#84cc16'];
  const locationColors = ['#3b82f6', '#8b5cf6', '#06b6d4'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-teal-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Scope 2 Emissions Analysis</h1>
        <p className="text-lg text-gray-600 mb-6">Indirect emissions from purchased energy consumption</p>
        
        <div className="flex items-center space-x-4">
          <label className="text-sm font-semibold text-gray-800">Company:</label>
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {companies?.map((comp) => (
                <SelectItem key={comp.id} value={comp.id}>
                  {comp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Market-based vs Location-based Emissions Trend */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Market-based vs Location-based Emissions</CardTitle>
          <CardDescription>Comparison of emission accounting methodologies over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Emissions (tCO2e)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value, name) => [`${value} tCO2e`, name]} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="marketBased" 
                stroke="#dc2626" 
                strokeWidth={3}
                name="Market-based"
                dot={{ fill: '#dc2626', r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="locationBased" 
                stroke="#7c3aed" 
                strokeWidth={3}
                name="Location-based"
                dot={{ fill: '#7c3aed', r: 6 }}
                strokeDasharray="8 8"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Emissions by Source */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Emissions by Source</CardTitle>
              <CardDescription>Breakdown by energy consumption category for {selectedYear}</CardDescription>
            </div>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} tCO2e`, 'Emissions']} />
                <Bar dataKey="emissions" radius={[4, 4, 0, 0]}>
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={sourceColors[index % sourceColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            {/* Source Legend */}
            <div className="mt-4 grid grid-cols-1 gap-2">
              {sourceData.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800">{item.source}</span>
                    <span className="text-xs text-gray-600 ml-2">{Math.round(item.emissions)} tCO2e</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emissions by Location */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Emissions by Location</CardTitle>
              <CardDescription>Regional distribution of energy consumption for {selectedYear}</CardDescription>
            </div>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="emissions"
                  label={({ location, percentage }) => `${location}: ${percentage}`}
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={locationColors[index % locationColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tCO2e`, 'Emissions']} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Location Details */}
            <div className="mt-4 space-y-2">
              {locationData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-800">{item.location}</span>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{Math.round(item.emissions)} tCO2e</div>
                    <div className="text-xs text-green-600">
                      {item.renewablePercent} renewable
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Performance Highlights</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">
                    {trendData.length >= 2 ? 
                      `${Math.round(((trendData[0].emissions - trendData[trendData.length - 1].emissions) / trendData[0].emissions * 100))}% reduction in energy-related emissions over ${trendData.length - 1} years` :
                      'Tracking energy-related emissions progress'
                    }
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">Successful implementation of energy efficiency measures</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">
                    {locationData.length > 0 ? 
                      `${locationData[0]?.location} accounts for ${locationData[0]?.percentage} of energy emissions in ${selectedYear}` :
                      'Monitoring regional energy distribution'
                    }
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Next Steps</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Increase renewable energy procurement</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Implement advanced building management systems</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Explore power purchase agreements (PPAs)</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scope2;
