
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { LinkedinIcon, Target, Users, Globe, TrendingUp, BarChart3, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              About GoCarbonTracker
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Democratizing Carbon Data for a 
              <span className="text-teal-600"> Sustainable Future</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We believe transparency drives change. Our mission is to make carbon emissions data accessible to everyone, 
              helping companies identify hotspots, set science-based targets, and create collaborative spaces for 
              decarbonizing value chains.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 dark:text-blue-100 flex items-center gap-3">
                  <Target className="h-8 w-8" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 dark:text-blue-200 text-lg leading-relaxed">
                  A world where carbon emissions data flows transparently across supply chains, enabling rapid 
                  decarbonization through collaboration and science-based action. We envision companies working 
                  together with complete visibility into their environmental impact, driving collective progress 
                  toward net-zero emissions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-2xl text-green-900 dark:text-green-100 flex items-center gap-3">
                  <Zap className="h-8 w-8" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 dark:text-green-200 text-lg leading-relaxed">
                  To democratize carbon emissions data by making it accessible, actionable, and collaborative. 
                  We track Scope 1, 2, and 3 emissions across organizations worldwide to identify industry hotspots, 
                  enable science-based reduction targets, and create platforms where companies and experts share 
                  knowledge to decarbonize value chains.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              The Challenge
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Current carbon tracking systems leave companies blind to their biggest impact areas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <CardHeader>
                <div className="text-4xl mb-4">🔍</div>
                <CardTitle className="text-red-900 dark:text-red-100">Supply Chain Blindness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-800 dark:text-red-200">
                  70% of corporate emissions occur in supply chains (Scope 3), yet most companies lack 
                  visibility into their value chain emissions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <div className="text-4xl mb-4">📊</div>
                <CardTitle className="text-orange-900 dark:text-orange-100">Data Fragmentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-800 dark:text-orange-200">
                  Carbon data is scattered across different systems, making it impossible to identify 
                  real reduction opportunities and track progress.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <div className="text-4xl mb-4">🤝</div>
                <CardTitle className="text-yellow-900 dark:text-yellow-100">Limited Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-800 dark:text-yellow-200">
                  Companies work in isolation on climate action, missing opportunities for collective 
                  impact and shared learning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the Founder
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-teal-100 dark:border-teal-800 shadow-xl">
                    <img 
                      src="/lovable-uploads/d71439d4-d721-4229-95b2-197eceafc614.png" 
                      alt="Varun Moka, Founder of GoCarbonTracker" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Varun Moka</h3>
                  <p className="text-teal-600 dark:text-teal-400 font-medium mb-4">
                    Chemical Engineer & Supply Chain Expert
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a 
                      href="https://www.linkedin.com/in/varunmoka7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  With a background in Chemical Engineering and Supply Chain Management, I've witnessed firsthand 
                  how complex industrial processes and global supply networks contribute to carbon emissions. 
                  Throughout my studies and career, I became increasingly aware of the urgent need for transparent, 
                  actionable climate data.
                </p>
                
                <p>
                  The idea for GoCarbonTracker emerged from a simple observation: companies want to reduce their 
                  environmental impact, but they lack the comprehensive data and collaborative tools needed to make 
                  meaningful progress. Most emissions tracking focuses only on direct operations, while the majority 
                  of a company's carbon footprint lies hidden in supply chains.
                </p>
                
                <p>
                  I founded GoCarbonTracker to bridge this gap by democratizing access to carbon emissions data and 
                  creating platforms for collaborative decarbonization. By combining my technical understanding of 
                  industrial processes with supply chain expertise, we're building tools that make climate action 
                  accessible, measurable, and impactful.
                </p>
                
                <p className="text-teal-600 dark:text-teal-400 font-medium">
                  Our platform isn't just about tracking emissions—it's about creating transparency that drives 
                  collective action toward a sustainable future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How We're Different
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our unique approach combines transparency, collaboration, and science-based action
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🌐</div>
                <CardTitle>Global Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Making carbon emissions data from companies and supply chains worldwide accessible to drive 
                  informed action and enable science-based reduction targets.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🤝</div>
                <CardTitle>Collaborative Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Bringing companies and industry experts together to share knowledge, accelerate decarbonization, 
                  and create collective impact across value chains.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🎯</div>
                <CardTitle>Science-Based Action</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Helping organizations set credible reduction pathways aligned with climate science and track 
                  progress with standardized, transparent metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Creating Real Impact
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8">
              <CardContent>
                <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">780+</div>
                <p className="text-gray-600 dark:text-gray-300">Companies with SBTi targets tracked</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">14</div>
                <p className="text-gray-600 dark:text-gray-300">Countries with corporate climate data</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">20+</div>
                <p className="text-gray-600 dark:text-gray-300">Industry sectors analyzed</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-teal-200 dark:border-teal-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Looking Forward</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                We're building toward a future where every company has complete visibility into their environmental 
                impact, where supply chain emissions are tracked in real-time, and where collaborative decarbonization 
                becomes the norm rather than the exception.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-teal-100 mb-10 max-w-3xl mx-auto">
            Help us democratize carbon data and accelerate the transition to a sustainable economy. Whether you're 
            a sustainability professional, industry expert, or climate-conscious leader, there's a place for you 
            in this mission.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
              <Link to="/dashboard">Start Tracking Emissions</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-teal-600">
              <Link to="/home">Explore Climate Intelligence</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
