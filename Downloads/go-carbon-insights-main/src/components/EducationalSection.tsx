
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Factory, Zap, Truck, Building2, Leaf, Target, Users, Globe, ArrowRight, Info } from 'lucide-react';
import InteractiveChart from './InteractiveChart';

const EducationalSection = () => {
  const [activeScope, setActiveScope] = useState<'scope1' | 'scope2' | 'scope3'>('scope1');

  const globalEmissionsData = [
    { year: 2019, scope1: 18500, scope2: 12300, scope3: 26200, total: 57000 },
    { year: 2020, scope1: 17800, scope2: 11900, scope3: 25100, total: 54800 },
    { year: 2021, scope1: 18200, scope2: 12100, scope3: 25800, total: 56100 },
    { year: 2022, scope1: 18600, scope2: 12400, scope3: 26300, total: 57300 },
    { year: 2023, scope1: 18100, scope2: 12000, scope3: 25700, total: 55800 }
  ];

  const scopeDefinitions = {
    scope1: {
      title: 'Scope 1: Direct Emissions',
      icon: Factory,
      color: 'bg-red-500',
      description: 'Direct greenhouse gas emissions from company-owned and controlled resources.',
      examples: [
        { icon: Factory, text: 'On-site fuel combustion' },
        { icon: Truck, text: 'Company vehicle fleet' },
        { icon: Building2, text: 'Manufacturing processes' },
        { icon: Zap, text: 'Fugitive emissions' }
      ],
      importance: 'Companies have direct control over these emissions and can implement immediate reduction strategies.',
      percentage: 32
    },
    scope2: {
      title: 'Scope 2: Energy Indirect Emissions',
      icon: Zap,
      color: 'bg-amber-500',
      description: 'Indirect emissions from purchased energy consumed by the company.',
      examples: [
        { icon: Zap, text: 'Purchased electricity' },
        { icon: Building2, text: 'Purchased steam' },
        { icon: Factory, text: 'Purchased heating' },
        { icon: Zap, text: 'Purchased cooling' }
      ],
      importance: 'Represents energy purchasing decisions and renewable energy adoption opportunities.',
      percentage: 22
    },
    scope3: {
      title: 'Scope 3: Other Indirect Emissions',
      icon: Globe,
      color: 'bg-emerald-500',
      description: 'All other indirect emissions in the company\'s value chain.',
      examples: [
        { icon: Truck, text: 'Supply chain transport' },
        { icon: Users, text: 'Employee commuting' },
        { icon: Building2, text: 'Purchased goods & services' },
        { icon: Globe, text: 'Product use & disposal' }
      ],
      importance: 'Often represents 70-90% of total emissions, requiring supplier collaboration.',
      percentage: 46
    }
  };

  const whyItMatters = [
    {
      icon: Target,
      title: 'Regulatory Compliance',
      description: 'Meeting mandatory reporting requirements and avoiding penalties',
      stats: '80+ countries with carbon reporting regulations'
    },
    {
      icon: Leaf,
      title: 'Climate Impact',
      description: 'Contributing to global emission reduction targets',
      stats: '1.5°C warming limit requires 45% emission reduction by 2030'
    },
    {
      icon: Users,
      title: 'Stakeholder Expectations',
      description: 'Investors, customers, and employees demand transparency',
      stats: '$30 trillion in assets under ESG mandates'
    },
    {
      icon: Building2,
      title: 'Business Value',
      description: 'Cost savings, risk management, and competitive advantage',
      stats: 'Companies with science-based targets outperform by 5.6%'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold">Understanding Carbon Emissions</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn why scope-based emission reporting is crucial for companies and the global fight against climate change
        </p>
      </div>

      {/* Global Impact Visualization */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-500" />
            Global Corporate Emissions Trend
          </CardTitle>
          <CardDescription>
            Interactive visualization of global corporate emissions by scope (billions of tons CO2e)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InteractiveChart 
            data={globalEmissionsData} 
            title="Global Corporate Emissions by Scope"
          />
        </CardContent>
      </Card>

      {/* Scope Definitions */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-8">The Three Scopes of Emissions</h3>
        <Tabs value={activeScope} onValueChange={(value) => setActiveScope(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scope1" className="flex items-center gap-2">
              <Factory className="h-4 w-4" />
              Scope 1
            </TabsTrigger>
            <TabsTrigger value="scope2" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Scope 2
            </TabsTrigger>
            <TabsTrigger value="scope3" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Scope 3
            </TabsTrigger>
          </TabsList>

          {Object.entries(scopeDefinitions).map(([key, scope]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${scope.color} text-white`}>
                      <scope.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>{scope.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {scope.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {scope.percentage}% of total
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Common Sources:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {scope.examples.map((example, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                          <example.icon className="h-5 w-5 text-muted-foreground" />
                          <span>{example.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-blue-900 dark:text-blue-100">Why it matters:</h5>
                        <p className="text-blue-800 dark:text-blue-200 mt-1">{scope.importance}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Typical proportion of total emissions</span>
                      <span className="text-sm text-muted-foreground">{scope.percentage}%</span>
                    </div>
                    <Progress value={scope.percentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Why It Matters */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-8">Why Scope Reporting Matters</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {whyItMatters.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{item.description}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {item.stats}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950/30 dark:to-green-950/30 border-teal-200 dark:border-teal-800">
        <CardContent className="text-center py-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Carbon Journey?</h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of companies already using comprehensive scope reporting to reduce their environmental impact and build a sustainable future.
          </p>
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
            Explore the Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationalSection;
