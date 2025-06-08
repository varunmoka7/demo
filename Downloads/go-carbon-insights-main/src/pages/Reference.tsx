
import React, { useState } from 'react';
import { ExternalLink, Globe, Building2, FileText, Award, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Reference = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const references = [
    {
      category: 'Standards & Frameworks',
      items: [
        {
          name: 'GHG Protocol',
          description: 'The most widely used international accounting tool for government and business leaders',
          url: 'https://ghgprotocol.org/',
          type: 'Standard'
        },
        {
          name: 'Science Based Targets Initiative',
          description: 'Drives ambitious climate action by enabling companies to set science-based emissions reduction targets',
          url: 'https://sciencebasedtargets.org/',
          type: 'Initiative'
        },
        {
          name: 'Carbon Disclosure Project',
          description: 'Global environmental disclosure system used by investors, companies, cities, states and regions',
          url: 'https://www.cdp.net/',
          type: 'Platform'
        },
        {
          name: 'UN Global Compact',
          description: 'World\'s largest corporate sustainability initiative',
          url: 'https://www.unglobalcompact.org/',
          type: 'Initiative'
        }
      ]
    },
    {
      category: 'Regulatory Bodies',
      items: [
        {
          name: 'EU CSRD',
          description: 'Corporate Sustainability Reporting Directive - EU mandatory sustainability reporting',
          url: 'https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en',
          type: 'Regulation'
        },
        {
          name: 'EPA Climate Change',
          description: 'US Environmental Protection Agency climate change resources',
          url: 'https://www.epa.gov/climate-change',
          type: 'Government'
        },
        {
          name: 'TCFD',
          description: 'Task Force on Climate-related Financial Disclosures',
          url: 'https://www.fsb-tcfd.org/',
          type: 'Framework'
        }
      ]
    },
    {
      category: 'Data Sources',
      items: [
        {
          name: 'IPCC Guidelines',
          description: 'Intergovernmental Panel on Climate Change emission factor database',
          url: 'https://www.ipcc.ch/',
          type: 'Scientific'
        },
        {
          name: 'EPA Emission Factors',
          description: 'US EPA emission factors for greenhouse gas inventories',
          url: 'https://www.epa.gov/air-emissions-factors-and-quantification',
          type: 'Database'
        },
        {
          name: 'IEA Energy Statistics',
          description: 'International Energy Agency global energy data',
          url: 'https://www.iea.org/data-and-statistics',
          type: 'Database'
        }
      ]
    }
  ];

  const filteredReferences = references.filter(category => 
    selectedCategory === 'all' || category.category.toLowerCase().includes(selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">References & Data Sources</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Comprehensive directory of standards, frameworks, and sustainability information
          </p>
        </div>

        {/* Search and Filter */}
        <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search frameworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 backdrop-blur-sm bg-white/80"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === 'standards' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('standards')}
              >
                Standards
              </Button>
              <Button
                variant={selectedCategory === 'regulatory' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('regulatory')}
              >
                Regulatory
              </Button>
              <Button
                variant={selectedCategory === 'data' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('data')}
              >
                Data Sources
              </Button>
            </div>
          </div>
        </div>

        {/* Frameworks & Standards */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            <Award className="h-6 w-6 text-purple-600 mr-2" />
            Frameworks & Standards
          </h2>
          <div className="space-y-6">
            {filteredReferences.map((category, categoryIndex) => (
              <div key={categoryIndex} className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg border border-white/20 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.items.filter(item => 
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white/50 rounded-lg p-4 hover:bg-white/70 transition-all duration-300 group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="group-hover:bg-blue-50 transition-colors"
                            onClick={() => window.open(item.url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Visit Website
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="backdrop-blur-lg bg-yellow-50/70 rounded-xl shadow-lg border border-yellow-200/30 p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Note</h3>
          <p className="text-yellow-700 text-sm">
            All framework and standards references link to official websites and authoritative sources. 
            This directory provides access to the most current and reliable information for carbon accounting 
            and sustainability reporting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reference;
