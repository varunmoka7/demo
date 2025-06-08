
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Target, 
  Users, 
  Globe, 
  TrendingUp, 
  CheckCircle, 
  DollarSign,
  Download,
  ExternalLink,
  Building2,
  Leaf,
  BarChart3
} from 'lucide-react';

const Funding = () => {
  const milestones = [
    {
      phase: 1,
      target: 100000,
      title: "Enhanced Data Integration",
      status: "current",
      progress: 15,
      deliverables: [
        "Real-time emissions data feeds",
        "Enhanced Scope 3 supply chain mapping", 
        "Industry benchmarking dashboard"
      ],
      timeline: "3 months"
    },
    {
      phase: 2,
      target: 200000,
      title: "Collaborative Platform Features",
      status: "planned",
      progress: 0,
      deliverables: [
        "Company collaboration workspace",
        "Expert knowledge sharing platform",
        "Science-based target setting tools"
      ],
      timeline: "6 months"
    },
    {
      phase: 3,
      target: 300000,
      title: "AI-Powered Insights",
      status: "planned",
      progress: 0,
      deliverables: [
        "Predictive emissions modeling",
        "Automated reduction recommendations",
        "Risk assessment algorithms"
      ],
      timeline: "9 months"
    },
    {
      phase: 4,
      target: 400000,
      title: "Global Expansion",
      status: "planned", 
      progress: 0,
      deliverables: [
        "Multi-language support",
        "Regional regulatory compliance",
        "Enterprise API platform"
      ],
      timeline: "12 months"
    },
    {
      phase: 5,
      target: 500000,
      title: "Open Source Ecosystem",
      status: "planned",
      progress: 0,
      deliverables: [
        "Open source carbon calculation engine",
        "Community contribution platform",
        "Educational resources and certification"
      ],
      timeline: "15 months"
    }
  ];

  const impactMetrics = [
    { icon: Users, label: "Expected Users", value: "10,000+", color: "text-blue-600" },
    { icon: Building2, label: "Companies Tracked", value: "5,000+", color: "text-green-600" },
    { icon: Leaf, label: "Emissions Reduced", value: "1M tons CO2e", color: "text-teal-600" },
    { icon: Globe, label: "Countries Supported", value: "30+", color: "text-purple-600" }
  ];

  const fundAllocation = [
    { category: "Development", percentage: 60, amount: 300000, color: "bg-blue-500" },
    { category: "Data & Infrastructure", percentage: 25, amount: 125000, color: "bg-green-500" },
    { category: "Community & Partnerships", percentage: 15, amount: 75000, color: "bg-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Funding Our Mission
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Help us democratize carbon emissions data and accelerate global supply chain decarbonization through transparency, collaboration, and science-based action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
              <Target className="h-5 w-5 mr-2" />
              Support Our Mission
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('/funding.json', '_blank')}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Funding Manifest
            </Button>
          </div>
        </div>

        {/* Funding Goal Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-green-600" />
              Funding Goal: $500,000 USD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {fundAllocation.map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-full h-3 ${item.color} rounded-full mb-3`}></div>
                  <h3 className="font-semibold text-lg">{item.category}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.percentage}%</p>
                  <p className="font-bold text-xl">${item.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Icon className={`h-12 w-12 mx-auto mb-4 ${metric.color}`} />
                  <h3 className="font-bold text-2xl mb-2">{metric.value}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{metric.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Milestone Timeline */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              Development Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/4">
                      <Badge 
                        variant={milestone.status === 'current' ? 'default' : 'secondary'}
                        className="mb-2"
                      >
                        Phase {milestone.phase}
                      </Badge>
                      <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Target: ${milestone.target.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Timeline: {milestone.timeline}
                      </p>
                      {milestone.status === 'current' && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{milestone.progress}%</span>
                          </div>
                          <Progress value={milestone.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                    <div className="lg:w-3/4">
                      <h4 className="font-semibold mb-3">Deliverables:</h4>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {milestone.deliverables.map((deliverable, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < milestones.length - 1 && (
                    <Separator className="mt-8" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Roadmap */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-purple-600" />
              Technical Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Data Platform</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time emissions tracking</li>
                  <li>• Global company database</li>
                  <li>• Supply chain mapping</li>
                  <li>• Industry benchmarking</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Collaboration Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Expert knowledge sharing</li>
                  <li>• Company workspace</li>
                  <li>• Target setting guidance</li>
                  <li>• Progress tracking</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">AI & Analytics</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Predictive modeling</li>
                  <li>• Automated recommendations</li>
                  <li>• Risk assessment</li>
                  <li>• Impact analysis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transparency & Accountability */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Transparency & Accountability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Our Commitments</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Monthly Progress Reports</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Detailed updates on development progress and fund utilization
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Quarterly Financial Reports</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Transparent breakdown of how funds are allocated and spent
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Open Roadmap</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Community involvement in feature prioritization and development
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Open Source Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Leaf className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Carbon Calculation Engine</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Open source tools for accurate emissions calculations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Community Platform</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Free access to basic tracking tools for small businesses
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Educational Resources</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Free carbon accounting education and certification programs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="pt-8">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Help us build the future of supply chain transparency and accelerate global decarbonization efforts through collaborative action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                <Target className="h-5 w-5 mr-2" />
                Support Development
              </Button>
              <Button variant="outline" size="lg">
                <ExternalLink className="h-5 w-5 mr-2" />
                Learn More About Our Impact
              </Button>
            </div>
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Funding manifest available at:{" "}
                <a 
                  href="/funding.json" 
                  target="_blank"
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  /funding.json
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Funding;
