
import React from 'react';
import { BookOpen, Calculator, Database, Shield, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Methodology = () => {
  const dataPoints = [
    {
      category: 'Direct Emissions (Scope 1)',
      icon: <Calculator className="h-6 w-6 text-red-600" />,
      description: 'Emissions from sources that are owned or controlled by your company',
      examples: ['Natural gas combustion', 'Company vehicle fuel', 'Manufacturing processes', 'Refrigerant leaks'],
      calculation: 'Activity Data × Emission Factor = CO2 Equivalent Emissions',
      units: 'Metric tons of CO2 equivalent (tCO2e)'
    },
    {
      category: 'Indirect Energy Emissions (Scope 2)',
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      description: 'Emissions from purchased electricity, steam, heating, and cooling',
      examples: ['Purchased electricity', 'Purchased steam', 'Purchased heating', 'Purchased cooling'],
      calculation: 'Energy Consumption × Grid Emission Factor = CO2 Equivalent Emissions',
      units: 'Metric tons of CO2 equivalent (tCO2e)'
    },
    {
      category: 'Other Indirect Emissions (Scope 3)',
      icon: <Database className="h-6 w-6 text-teal-600" />,
      description: 'All other indirect emissions that occur in your value chain',
      examples: ['Supply chain emissions', 'Business travel', 'Employee commuting', 'Waste disposal', 'Product lifecycle'],
      calculation: 'Various methods including spend-based, activity-based, and hybrid approaches',
      units: 'Metric tons of CO2 equivalent (tCO2e)'
    },
    {
      category: 'Science-Based Targets',
      icon: <Target className="h-6 w-6 text-blue-600" />,
      description: 'Emission reduction targets aligned with climate science',
      examples: ['Near-term targets (5-10 years)', 'Long-term targets (2050)', 'Net-zero commitments', 'Sector-specific pathways'],
      calculation: 'Based on global warming scenarios (1.5°C pathway)',
      units: 'Percentage reduction from baseline year'
    }
  ];

  const frameworks = [
    {
      name: 'GHG Protocol',
      description: 'The most widely used international accounting tool for quantifying greenhouse gas emissions',
      scope: 'Provides standards for corporate and project-level emissions accounting'
    },
    {
      name: 'Science Based Targets Initiative (SBTi)',
      description: 'Defines and promotes best practice in science-based target setting',
      scope: 'Provides methods for companies to set emission reduction targets'
    },
    {
      name: 'Corporate Sustainability Reporting Directive (CSRD)',
      description: 'EU legislation requiring companies to report on sustainability matters',
      scope: 'Mandatory sustainability reporting for large companies'
    },
    {
      name: 'Carbon Disclosure Project (CDP)',
      description: 'Global disclosure system for environmental impacts',
      scope: 'Standardized environmental disclosure framework'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Methodology & Data Sources</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Understanding how we measure, calculate, and track carbon emissions across all business operations
          </p>
        </div>

        {/* Introduction */}
        <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg border border-white/20 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Approach</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Our carbon tracking methodology follows internationally recognized standards and best practices. 
              We use the <strong>Greenhouse Gas (GHG) Protocol</strong> as our primary framework, which is the 
              most widely used international accounting tool for quantifying greenhouse gas emissions.
            </p>
            <p className="mb-4">
              All emission calculations are performed using the latest emission factors from reputable sources 
              including the EPA, IPCC, and regional grid authorities. We categorize emissions into three scopes 
              to provide comprehensive coverage of your organization's carbon footprint.
            </p>
            <p>
              Our platform is designed to be transparent, accurate, and accessible to users at all levels of 
              environmental expertise - from sustainability professionals to students learning about climate action.
            </p>
          </div>
        </div>

        {/* Data Points Explained */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Points Explained</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {dataPoints.map((point, index) => (
              <Card key={index} className="backdrop-blur-lg bg-white/70 border-white/20 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {point.icon}
                    <CardTitle className="text-xl">{point.category}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{point.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Examples Include:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {point.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50/70 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Calculation Method:</h4>
                    <p className="text-gray-700 text-sm">{point.calculation}</p>
                  </div>
                  
                  <div className="bg-blue-50/70 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 mb-1">Units:</h4>
                    <p className="text-gray-700 text-sm">{point.units}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Standards & Frameworks */}
        <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Standards & Frameworks</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {frameworks.map((framework, index) => (
              <div key={index} className="bg-white/50 rounded-lg p-4 hover:bg-white/70 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{framework.name}</h3>
                <p className="text-gray-700 text-sm mb-2">{framework.description}</p>
                <p className="text-gray-600 text-xs">{framework.scope}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg border border-white/20 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quality Assurance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Validation</h3>
              <p className="text-gray-600 text-sm">All data inputs are validated against known ranges and industry benchmarks</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calculator className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Calculation Accuracy</h3>
              <p className="text-gray-600 text-sm">Emission factors are updated annually from authoritative sources</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Third-Party Verification</h3>
              <p className="text-gray-600 text-sm">Methodology reviewed by independent climate experts and auditors</p>
            </div>
          </div>
        </div>

        {/* Simple Language Explanation */}
        <div className="backdrop-blur-lg bg-gradient-to-r from-green-50/70 to-blue-50/70 rounded-xl shadow-lg border border-white/20 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">In Simple Terms</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-4">
              Think of carbon emissions like the exhaust from a car, but for businesses. Just like a car produces 
              pollution when it burns fuel, companies create carbon dioxide (CO2) when they:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Use energy</strong> - Like turning on lights or running machines</li>
              <li><strong>Transport goods</strong> - Like trucks delivering products</li>
              <li><strong>Make products</strong> - Like factories producing goods</li>
              <li><strong>Heat buildings</strong> - Like warming offices in winter</li>
            </ul>
            <p className="text-lg">
              We measure all these different sources of CO2 and add them up to get the total "carbon footprint" 
              of a company. This helps businesses understand their impact on the climate and find ways to reduce it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
