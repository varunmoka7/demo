
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BarChart, Target, FileText, TrendingDown, CheckCircle, Users, ArrowRight, Star, Quote, Factory, Zap, Globe, TreePine, Building, Recycle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/ui/Logo';

const Landing = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Handle email verification success
  useEffect(() => {
    if (searchParams.get('verified') === 'true') {
      toast({
        title: "Email Verified Successfully!",
        description: "Your email has been verified. You can now sign in to your account.",
      });
      // Clear the URL parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams, toast]);

  const features = [
    {
      icon: BarChart,
      title: 'Company Comparison',
      description: 'Compare emissions performance across companies and track relative progress in your industry.'
    },
    {
      icon: Target,
      title: 'Sector & Industry Analysis',
      description: 'Deep-dive into sector-level performance with comprehensive industry benchmarking and trends.'
    },
    {
      icon: FileText,
      title: 'Track Your Companies',
      description: 'Monitor multiple companies\' performance and see detailed breakdowns of their carbon footprint.'
    }
  ];

  const whyTrackingMatters = [
    'Science-based reduction pathways are becoming mandatory for climate goals',
    'Supply chain emissions (Scope 3) represent 70%+ of most companies\' carbon footprint',
    'Industry collaboration and transparency drive collective decarbonization',
    'Regulatory frameworks (CSRD, CDP, TCFD) require comprehensive emissions reporting',
    'Benchmarking against industry peers identifies improvement opportunities',
    'Shared knowledge platforms accelerate sustainable technology adoption'
  ];

  const scopeEducation = [
    {
      icon: Factory,
      scope: 'Scope 1',
      title: 'Direct Emissions',
      description: 'Emissions from owned or controlled sources like company vehicles and on-site fuel combustion',
      color: 'text-red-500 bg-red-50',
      examples: ['Company fleet vehicles', 'On-site manufacturing', 'Facility heating systems']
    },
    {
      icon: Zap,
      scope: 'Scope 2',
      title: 'Energy Indirect',
      description: 'Emissions from purchased electricity, steam, heating and cooling for own use',
      color: 'text-amber-500 bg-amber-50',
      examples: ['Purchased electricity', 'District heating/cooling', 'Steam consumption']
    },
    {
      icon: Globe,
      scope: 'Scope 3',
      title: 'Value Chain Emissions',
      description: 'All other indirect emissions in the upstream and downstream value chain',
      color: 'text-emerald-500 bg-emerald-50',
      examples: ['Supplier emissions', 'Product transportation', 'End-of-life treatment']
    }
  ];

  const collaborationBenefits = [
    {
      icon: Building,
      title: 'Industry Hotspot Identification',
      description: 'Analyze emissions data across sectors to identify the highest-impact areas for reduction efforts.'
    },
    {
      icon: Users,
      title: 'Expert Knowledge Sharing',
      description: 'Connect with industry experts and peers to share decarbonization strategies and technologies.'
    },
    {
      icon: TreePine,
      title: 'Science-Based Targets',
      description: 'Set credible reduction pathways aligned with climate science and track progress transparently.'
    },
    {
      icon: Recycle,
      title: 'Sustainable Technology Adoption',
      description: 'Discover and implement proven sustainable technologies through collaborative learning.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 overflow-hidden">
      {/* Demo Mode Notice */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="border-0 bg-transparent text-white">
            <AlertCircle className="h-4 w-4 text-white" />
            <AlertDescription className="text-white font-medium">
              <span className="font-bold">PROTOTYPE DEMO:</span> This is a development prototype showcasing GoCarbonTracker's capabilities with mock data. Currently under active development.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Hero Section with Enhanced Animation */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-teal-200 rounded-full opacity-30 animate-bounce delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Logo with Animation */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="relative">
                <Logo size="large" className="h-16 w-auto animate-pulse" />
              </div>
              <span className="text-3xl font-bold text-gray-900">GoCarbonTracker</span>
            </div>
          </div>

          {/* Enhanced Main Heading */}
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 animate-fade-in">
            <span className="block animate-slide-in-right">Stop Guessing About</span>
            <span className="block text-teal-600 animate-slide-in-right delay-300">Your Carbon Impact</span>
            <span className="block animate-slide-in-right delay-500">Start Leading Your Industry</span>
          </h1>

          {/* Enhanced Subtitle with Mission Focus */}
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-700 font-medium">
            Democratizing carbon emissions data worldwide. We track <span className="text-teal-600 font-bold">Scope 1, 2, and 3 emissions</span> across 
            organizations to identify industry hotspots, enable science-based targets, and create a collaborative platform 
            where companies and experts share <span className="text-green-600 font-bold">decarbonization knowledge</span>.
          </p>

          {/* Updated CTA Buttons - Demo Mode */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-1000">
            <Link to="/home">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 border-teal-600">
                Explore Demo
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/tracking">
              <Button variant="outline" size="lg" className="border-3 border-teal-600 text-teal-700 hover:bg-teal-50 px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Learn About Carbon Tracking
              </Button>
            </Link>
          </div>

          {/* Mission Statement */}
          <div className="mt-12 animate-fade-in delay-1200">
            <p className="text-sm text-gray-600 mb-4 font-medium">Our Mission:</p>
            <div className="text-gray-700 text-lg font-medium max-w-3xl mx-auto">
              Creating transparency to identify emission hotspots and solutions through collaborative decarbonization
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in delay-1200">
            <div className="text-center group cursor-pointer p-4 rounded-lg hover:bg-white/50 transition-all">
              <div className="text-5xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform">70%+</div>
              <div className="text-gray-700 font-medium">Supply Chain Emissions</div>
            </div>
            <div className="text-center group cursor-pointer p-4 rounded-lg hover:bg-white/50 transition-all">
              <div className="text-5xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">3</div>
              <div className="text-gray-700 font-medium">Emission Scopes Tracked</div>
            </div>
            <div className="text-center group cursor-pointer p-4 rounded-lg hover:bg-white/50 transition-all">
              <div className="text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">∞</div>
              <div className="text-gray-700 font-medium">Collaboration Potential</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-teal-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-teal-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Understanding Supply Chain Emissions Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Understanding Supply Chain Emissions</h2>
            <p className="text-xl text-gray-700 font-medium max-w-4xl mx-auto">
              Emissions are categorized into three scopes to provide comprehensive coverage of an organization's carbon footprint. 
              Understanding these is crucial for effective decarbonization strategies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {scopeEducation.map((scope, index) => (
              <div key={index} className={`group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-l-4 ${scope.color}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${scope.color}`}>
                  <scope.icon className="h-8 w-8" />
                </div>
                <div className="mb-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">{scope.scope}</span>
                  <h3 className="text-2xl font-semibold text-gray-900 mt-1">{scope.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium mb-6">{scope.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-900 uppercase tracking-wide">Examples:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {scope.examples.map((example, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Value Chain Studies Matter</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Most emissions occur in supply chains (Scope 3). Companies must work together with industry experts 
              to identify hotspots and implement collaborative solutions for meaningful decarbonization.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Platform Features</h2>
            <p className="text-xl text-gray-700 font-medium">
              Tools designed to drive transparency and collaborative decarbonization
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-100 to-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-r from-teal-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Why Companies Should Choose Carbon Tracking
              </h2>
              <p className="text-xl text-gray-700 mb-10 font-medium leading-relaxed">
                The shift toward sustainable business practices isn't just about environmental responsibility—it's about 
                future-proofing your business, meeting regulatory requirements, and maintaining competitive advantage 
                in an increasingly carbon-conscious world.
              </p>
              <div className="space-y-6">
                {whyTrackingMatters.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-teal-600 group-hover:scale-110 transition-transform mt-1" />
                    </div>
                    <span className="text-lg text-gray-800 font-medium leading-relaxed">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">The Collaboration Imperative</h3>
                  <p className="text-gray-600">Working together for collective impact</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {collaborationBenefits.map((benefit, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-teal-50 transition-colors">
                      <benefit.icon className="h-8 w-8 mx-auto mb-3 text-teal-600" />
                      <div className="text-sm font-semibold text-gray-900 mb-2">{benefit.title}</div>
                      <div className="text-xs text-gray-600">{benefit.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-r from-teal-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Lead Through Transparency?
          </h2>
          <p className="text-xl text-teal-100 mb-10 font-medium leading-relaxed">
            Join the movement toward collaborative decarbonization. Help identify industry emission hotspots, 
            share knowledge with experts, and implement science-based reduction strategies that create 
            real environmental impact through collective action.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/home">
              <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100 px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Explore Demo
              </Button>
            </Link>
            <Link to="/methodology">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-10 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105">
                Learn Our Methodology
              </Button>
            </Link>
          </div>
          <p className="text-teal-100 mt-6 text-sm">
            ✓ Open platform for transparency  ✓ Science-based methodologies  ✓ Collaborative knowledge sharing
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
