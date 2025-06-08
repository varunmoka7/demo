
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Target, Users, Globe, TrendingDown, ArrowRight, BarChart3, BookOpen, Network } from 'lucide-react';

const CollaborationHub = () => {
  const opportunities = [
    {
      icon: Target,
      title: "Industry Hotspot Identification",
      description: "Analyze emissions data across sectors to identify highest-impact reduction opportunities and coordinate industry-wide action",
      benefits: [
        "Identify 80/20 reduction opportunities",
        "Share decarbonization costs across value chains",
        "Accelerate breakthrough technology adoption"
      ],
      participants: "156 companies across 14 countries"
    },
    {
      icon: Users,
      title: "Expert Knowledge Sharing",
      description: "Connect with industry experts and sustainability professionals to share decarbonization strategies, technologies, and best practices",
      benefits: [
        "Access proven decarbonization strategies",
        "Learn from industry leaders and pioneers",
        "Collaborate on emerging technology solutions"
      ],
      participants: "Sustainability managers from leading companies"
    },
    {
      icon: Globe,
      title: "Science-Based Action",
      description: "Help organizations set credible reduction pathways aligned with climate science and track progress transparently",
      benefits: [
        "Set science-based emissions targets",
        "Track progress with standardized metrics",
        "Ensure alignment with 1.5°C pathway"
      ],
      participants: "890+ companies with SBTi targets globally"
    },
    {
      icon: BarChart3,
      title: "Global Transparency Initiative",
      description: "Make carbon emissions data accessible worldwide to drive informed action and enable science-based reduction targets",
      benefits: [
        "Access comprehensive emissions database",
        "Compare performance against industry peers",
        "Identify collaborative reduction opportunities"
      ],
      participants: "Open platform for transparency"
    }
  ];

  const stats = [
    {
      value: "70%",
      label: "Of emissions come from supply chains",
      sublabel: "Scope 3 - Value chain emissions",
      trend: "stable",
      action: "Collaborative reduction essential",
      source: "CDP Supply Chain Report 2024"
    },
    {
      value: "45%",
      label: "Emission reduction needed by 2030",
      sublabel: "To limit warming to 1.5°C",
      trend: "urgent",
      action: "Critical decade for climate action",
      source: "IPCC Special Report on 1.5°C"
    },
    {
      value: "2030",
      label: "Critical decade for climate action",
      sublabel: "Window for meaningful action",
      trend: "countdown",
      action: "6 years remaining",
      source: "Science Based Targets initiative"
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Network className="h-4 w-4 mr-2" />
            Collective Climate Action
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Urgency for Collective Action
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Supply chain emissions represent up to 70% of most companies' carbon footprint. 
            Meaningful decarbonization requires unprecedented cooperation between companies, governments, and individuals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-l-4 border-l-teal-500">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2">{stat.value}</div>
                  <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600 mb-3">{stat.sublabel}</div>
                  <Badge variant="secondary" className="mb-2">
                    {stat.action}
                  </Badge>
                  <div className="text-xs text-gray-500">{stat.source}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Collaborative Opportunities</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-teal-100 rounded-lg">
                      <opportunity.icon className="h-6 w-6 text-teal-600" />
                    </div>
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {opportunity.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <strong>Participants:</strong> {opportunity.participants}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mb-16 bg-gradient-to-r from-teal-50 to-green-50 border-teal-200">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission: Democratizing Carbon Data</h3>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                We believe transparency drives change. Our platform aims to make carbon emissions data accessible to everyone, 
                helping identify industry hotspots, enable science-based reduction targets, and create collaborative spaces 
                where companies and experts share knowledge to decarbonize value chains.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-teal-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Global Transparency</h4>
                <p className="text-sm text-gray-600">
                  Making carbon emissions data from companies and supply chains worldwide accessible to drive informed action
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Collaborative Platform</h4>
                <p className="text-sm text-gray-600">
                  Bringing companies and industry experts together to share knowledge and accelerate decarbonization
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Science-Based Action</h4>
                <p className="text-sm text-gray-600">
                  Helping organizations set credible reduction pathways aligned with climate science and global targets
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Take Action Today</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link to="/analysis" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-teal-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-gray-900 mb-2">Explore Your Industry</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Discover sector-specific insights and benchmarking data
                  </p>
                  <div className="flex items-center justify-center text-teal-600 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">View Industry Analysis</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-gray-900 mb-2">Start Company Tracking</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Begin comprehensive carbon emissions tracking for your organization
                  </p>
                  <div className="flex items-center justify-center text-blue-600 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Start Tracking</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/methodology" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-gray-900 mb-2">Learn Our Methodology</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Connect with sustainability experts and industry leaders
                  </p>
                  <div className="flex items-center justify-center text-green-600 group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Explore Methodology</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="bg-teal-600 rounded-lg p-8 text-white">
            <p className="text-lg mb-6">
              Join hundreds of companies already transforming their environmental impact through 
              comprehensive scope-based emission tracking and strategic decarbonization planning.
            </p>
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationHub;
