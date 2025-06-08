
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Package, Truck, Users, Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCompanies } from '@/hooks/useCompanies';
import { useScope3Data } from '@/hooks/useScope3Data';
import { categorizeScope3Data, generateFallbackScope3Distribution, type UpstreamDownstreamData } from '@/utils/scope3Categorization';

const Scope3 = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState('techcorp');
  const [selectedYear, setSelectedYear] = useState('2024');
  const { data: companies } = useCompanies();
  const { data: scope3Data, isLoading, error } = useScope3Data(selectedCompany);

  const availableYears = ['2019', '2020', '2021', '2022', '2023', '2024'];

  // Get year-specific category data
  const getCategoryDataForYear = (year: string) => {
    if (scope3Data?.categoryDataByYear?.[year]) {
      return scope3Data.categoryDataByYear[year];
    }
    
    // Fallback: use latest year data with adjustments
    const latestData = scope3Data?.categoryData;
    if (!latestData) return [];
    
    // Apply year-based adjustments (older years typically had higher emissions)
    const yearAdjustment = year === '2024' ? 1.0 : 
                          year === '2023' ? 1.05 : 
                          year === '2022' ? 1.10 : 
                          year === '2021' ? 1.15 : 
                          year === '2020' ? 1.20 : 1.25;
    
    return latestData.map(item => ({
      ...item,
      emissions: typeof item.emissions === 'string' 
        ? Math.round(parseInt(item.emissions.replace(/,/g, '')) * yearAdjustment).toString()
        : Math.round(Number(item.emissions) * yearAdjustment)
    }));
  };

  // Process upstream/downstream data for selected year
  const upstreamDownstreamData = useMemo((): UpstreamDownstreamData => {
    const categoryDataForYear = getCategoryDataForYear(selectedYear);
    
    if (!categoryDataForYear || categoryDataForYear.length === 0) {
      // Fallback: use trend data to estimate total scope 3
      const yearTrendData = scope3Data?.trendData?.find(item => item.year.toString() === selectedYear);
      const latestEmissions = yearTrendData?.emissions || scope3Data?.trendData?.[scope3Data.trendData.length - 1]?.emissions || 1750;
      return generateFallbackScope3Distribution(latestEmissions);
    }

    return categorizeScope3Data(categoryDataForYear);
  }, [scope3Data, selectedYear]);

  // Prepare chart data with proper structure
  const upstreamDownstreamChartData = useMemo(() => {
    const data = [
      {
        category: 'Upstream',
        emissions: upstreamDownstreamData.upstream.total,
        color: '#0d9488',
        percentage: upstreamDownstreamData.upstream.percentage,
        fill: '#0d9488'
      },
      {
        category: 'Downstream',
        emissions: upstreamDownstreamData.downstream.total,
        color: '#14b8a6',
        percentage: upstreamDownstreamData.downstream.percentage,
        fill: '#14b8a6'
      }
    ];
    
    return data;
  }, [upstreamDownstreamData]);

  // Prepare category data for charts
  const categoryData = useMemo(() => {
    const categoryDataForYear = getCategoryDataForYear(selectedYear);
    
    if (!categoryDataForYear || categoryDataForYear.length === 0) {
      // Use fallback data for category breakdown
      const fallbackData = upstreamDownstreamData;
      return [
        ...fallbackData.upstream.categories,
        ...fallbackData.downstream.categories
      ].map((item, index) => ({
        category: item.category.length > 15 ? item.category.substring(0, 15) + '...' : item.category,
        emissions: item.emissions,
        percentage: Math.round((item.emissions / (fallbackData.upstream.total + fallbackData.downstream.total)) * 100)
      }));
    }

    const totalEmissions = categoryDataForYear.reduce((sum, cat) => {
      const emissions = typeof cat.emissions === 'string' ? parseInt(cat.emissions.replace(/,/g, '')) : Number(cat.emissions);
      return sum + emissions;
    }, 0);

    return categoryDataForYear.map(item => {
      const emissions = typeof item.emissions === 'string' ? parseInt(item.emissions.replace(/,/g, '')) : Number(item.emissions);
      return {
        category: item.category.length > 15 ? item.category.substring(0, 15) + '...' : item.category,
        emissions: emissions,
        percentage: Math.round((emissions / totalEmissions) * 100)
      };
    });
  }, [selectedYear, scope3Data, upstreamDownstreamData]);

  const trendData = scope3Data?.trendData || [];

  const categoryColors = ['#dc2626', '#ea580c', '#d97706', '#65a30d', '#0d9488', '#0891b2'];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading Scope 3 data...</div>
      </div>
    );
  }

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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Scope 3 Emissions Analysis</h1>
        <p className="text-lg text-gray-600 mb-6">All other indirect emissions in your value chain</p>
        
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

      {/* Emissions Trend Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Scope 3 Emissions Trend</CardTitle>
          <CardDescription>Historical value chain emissions showing improvement over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Emissions (tCO2e)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${value} tCO2e`, 'Scope 3 Emissions']} />
              <Line 
                type="monotone" 
                dataKey="emissions" 
                stroke="#0d9488" 
                strokeWidth={3}
                dot={{ fill: '#0d9488', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Emissions by Category */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Emissions by Category</CardTitle>
              <CardDescription>Breakdown of Scope 3 emissions by source for {selectedYear}</CardDescription>
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
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData.slice(0, 6)} // Show top 6 categories
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="emissions"
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                >
                  {categoryData.slice(0, 6).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} tCO2e`, 'Emissions']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upstream vs Downstream */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Upstream vs Downstream</CardTitle>
              <CardDescription>Distribution across value chain for {selectedYear}</CardDescription>
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
            <div className="mb-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={upstreamDownstreamChartData} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    label={{ value: 'Emissions (tCO2e)', angle: -90, position: 'insideLeft' }}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`${Number(value).toLocaleString()} tCO2e`, 'Emissions']}
                    labelFormatter={(label) => `${label} Activities`}
                  />
                  <Bar 
                    dataKey="emissions" 
                    radius={[4, 4, 0, 0]}
                    fill="#0d9488"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-200">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-teal-700 rounded"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Upstream Activities</span>
                    <p className="text-xs text-gray-600">Categories 1-8: Purchased goods, business travel, etc.</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{upstreamDownstreamData.upstream.total.toLocaleString()} tCO2e</span>
                  <p className="text-xs text-gray-600">({upstreamDownstreamData.upstream.percentage}%)</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-200">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-teal-500 rounded"></div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Downstream Activities</span>
                    <p className="text-xs text-gray-600">Categories 9-15: Use of products, end-of-life, etc.</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{upstreamDownstreamData.downstream.total.toLocaleString()} tCO2e</span>
                  <p className="text-xs text-gray-600">({upstreamDownstreamData.downstream.percentage}%)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Category Breakdown */}
      {categoryData.length > 0 && (
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Category Performance</CardTitle>
              <CardDescription>Detailed breakdown of all Scope 3 categories for {selectedYear}</CardDescription>
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
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="category" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis label={{ value: 'Emissions (tCO2e)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value} tCO2e`, 'Emissions']} />
                <Bar dataKey="emissions" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

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
                    {upstreamDownstreamData.upstream.percentage}% of emissions are from upstream activities in {selectedYear}
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">
                    Value chain emissions: {(upstreamDownstreamData.upstream.total + upstreamDownstreamData.downstream.total).toLocaleString()} tCO2e total in {selectedYear}
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">
                    {trendData.length >= 2 ? 
                      `${Math.round(((trendData[0].emissions - trendData[trendData.length - 1].emissions) / trendData[0].emissions * 100))}% reduction over ${trendData.length - 1} years` :
                      'Upstream activities represent the majority of value chain impact'
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
                  <span className="text-gray-600">Engage suppliers on emission reduction programs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Implement sustainable procurement policies</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                  <span className="text-gray-600">Optimize transportation and logistics networks</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scope3;
