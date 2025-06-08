
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Target, FileText, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const features = [
    {
      icon: BarChart,
      title: 'Emissions Tracking',
      description: 'Track and monitor your carbon emissions across all scopes',
      path: '/tracking'
    },
    {
      icon: Target,
      title: 'Decarbonization',
      description: 'Set science-based targets and track progress',
      path: '/decarbonization'
    },
    {
      icon: FileText,
      title: 'Reports & Analysis',
      description: 'Generate comprehensive sustainability reports',
      path: '/reports'
    },
    {
      icon: TrendingDown,
      title: 'Dashboard',
      description: 'View your emissions data and trends',
      path: '/dashboard'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-3 mb-8">
            <BarChart className="h-12 w-12 text-teal-600" />
            <span className="text-3xl font-bold text-gray-900">GoCarbonTracker</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Carbon Management
            <span className="block text-teal-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive carbon emission tracking and ESG performance management platform 
            designed to help companies monitor, analyze, and reduce their environmental footprint.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Link key={index} to={feature.path}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Platform Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">500+</div>
              <div className="text-gray-600">Companies Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">15+</div>
              <div className="text-gray-600">Industry Sectors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">30%</div>
              <div className="text-gray-600">Avg. Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">95%</div>
              <div className="text-gray-600">Compliance Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Sustainability Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our comprehensive carbon management tools and start tracking your emissions today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 px-8 py-3">
                View Dashboard
              </Button>
            </Link>
            <Link to="/tracking">
              <Button variant="outline" size="lg" className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3">
                Start Tracking
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
