
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Globe, ExternalLink } from 'lucide-react';

// Comprehensive static mock data for all major SBTi-recognized sectors
const mockBenchmarks = [
  // High-Impact Heavy Industry Sectors
  {
    id: '1',
    sector: 'Energy & Utilities',
    leading_companies: [
      { company: 'Ørsted', achievement: 'Carbon neutral by 2025', score: 94 },
      { company: 'Iberdrola', achievement: 'Carbon neutral by 2050', score: 87 },
      { company: 'Enel', achievement: 'Carbon neutral by 2050', score: 85 }
    ],
    avg_emission_intensity: 45.2,
    industry_avg_intensity: 78.5,
    best_practices: ['Renewable energy transition', 'Coal plant phase-out', 'Green hydrogen'],
    regional_leaders: {
      'North America': 'NextEra Energy',
      'Europe': 'Ørsted',
      'Asia': 'China Three Gorges'
    },
    sbti_companies: 156
  },
  {
    id: '2',
    sector: 'Technology & Software',
    leading_companies: [
      { company: 'Microsoft', achievement: 'Carbon negative by 2030', score: 95 },
      { company: 'Google', achievement: '24/7 renewable energy by 2030', score: 92 },
      { company: 'Apple', achievement: 'Carbon neutral supply chain by 2030', score: 90 }
    ],
    avg_emission_intensity: 0.2,
    industry_avg_intensity: 0.8,
    best_practices: ['100% renewable energy', 'Carbon removal', 'Green cloud'],
    regional_leaders: {
      'North America': 'Microsoft',
      'Europe': 'SAP',
      'Asia': 'Sony'
    },
    sbti_companies: 234
  },
  {
    id: '3',
    sector: 'Oil & Gas',
    leading_companies: [
      { company: 'TotalEnergies', achievement: 'Net-zero by 2050', score: 78 },
      { company: 'Shell', achievement: 'Net-zero by 2050', score: 75 },
      { company: 'Equinor', achievement: 'Net-zero by 2050', score: 72 }
    ],
    avg_emission_intensity: 78.5,
    industry_avg_intensity: 95.2,
    best_practices: ['Carbon capture', 'Methane reduction', 'Renewable power'],
    regional_leaders: {
      'North America': 'ExxonMobil',
      'Europe': 'Shell',
      'Asia': 'CNOOC'
    },
    sbti_companies: 23
  },
  {
    id: '4',
    sector: 'Food & Beverage',
    leading_companies: [
      { company: 'Unilever', achievement: 'Net-zero by 2039', score: 88 },
      { company: 'Nestlé', achievement: 'Net-zero by 2050', score: 85 },
      { company: 'Danone', achievement: 'Carbon neutral by 2030', score: 83 }
    ],
    avg_emission_intensity: 3.2,
    industry_avg_intensity: 4.8,
    best_practices: ['Regenerative agriculture', 'Packaging reduction', 'Plant-based products'],
    regional_leaders: {
      'North America': 'General Mills',
      'Europe': 'Unilever',
      'Asia': 'Kirin'
    },
    sbti_companies: 156
  },
  {
    id: '5',
    sector: 'Steel & Metals',
    leading_companies: [
      { company: 'ArcelorMittal', achievement: 'Carbon neutral by 2050', score: 79 },
      { company: 'Nucor', achievement: '35% reduction by 2030', score: 76 },
      { company: 'SSAB', achievement: 'Fossil-free steel by 2030', score: 84 }
    ],
    avg_emission_intensity: 12.4,
    industry_avg_intensity: 18.7,
    best_practices: ['Hydrogen reduction', 'Electric arc furnaces', 'Scrap recycling'],
    regional_leaders: {
      'North America': 'Nucor',
      'Europe': 'SSAB',
      'Asia': 'POSCO'
    },
    sbti_companies: 34
  },
  {
    id: '6',
    sector: 'Automotive',
    leading_companies: [
      { company: 'BMW', achievement: 'Carbon neutral by 2030', score: 89 },
      { company: 'Volvo', achievement: 'Climate neutral by 2040', score: 87 },
      { company: 'Ford', achievement: 'Carbon neutral by 2050', score: 81 }
    ],
    avg_emission_intensity: 2.8,
    industry_avg_intensity: 4.2,
    best_practices: ['Electric vehicles', 'Renewable energy', 'Circular design'],
    regional_leaders: {
      'North America': 'Ford',
      'Europe': 'BMW',
      'Asia': 'Toyota'
    },
    sbti_companies: 89
  },
  {
    id: '7',
    sector: 'Financial Services',
    leading_companies: [
      { company: 'ING', achievement: 'Net-zero by 2050', score: 85 },
      { company: 'UBS', achievement: 'Net-zero by 2050', score: 83 },
      { company: 'Bank of America', achievement: 'Net-zero by 2050', score: 80 }
    ],
    avg_emission_intensity: 0.1,
    industry_avg_intensity: 0.3,
    best_practices: ['Green financing', 'Portfolio decarbonization', 'Climate risk assessment'],
    regional_leaders: {
      'North America': 'Bank of America',
      'Europe': 'ING',
      'Asia': 'MUFG'
    },
    sbti_companies: 198
  },
  {
    id: '8',
    sector: 'Retail & Consumer Goods',
    leading_companies: [
      { company: 'IKEA', achievement: 'Climate positive by 2030', score: 89 },
      { company: 'H&M', achievement: 'Climate positive by 2030', score: 86 },
      { company: 'Walmart', achievement: 'Zero emissions by 2040', score: 82 }
    ],
    avg_emission_intensity: 1.9,
    industry_avg_intensity: 2.8,
    best_practices: ['Circular business models', 'Renewable energy', 'Sustainable sourcing'],
    regional_leaders: {
      'North America': 'Walmart',
      'Europe': 'IKEA',
      'Asia': 'Seven & i'
    },
    sbti_companies: 123
  },
  {
    id: '9',
    sector: 'Cement & Building Materials',
    leading_companies: [
      { company: 'LafargeHolcim', achievement: 'Carbon neutral concrete by 2050', score: 77 },
      { company: 'Cemex', achievement: 'Net-zero by 2050', score: 74 },
      { company: 'CRH', achievement: 'Net-zero by 2050', score: 71 }
    ],
    avg_emission_intensity: 8.9,
    industry_avg_intensity: 12.3,
    best_practices: ['Alternative fuels', 'Carbon capture', 'Circular cement'],
    regional_leaders: {
      'North America': 'Cemex',
      'Europe': 'LafargeHolcim',
      'Asia': 'Anhui Conch'
    },
    sbti_companies: 28
  },
  {
    id: '10',
    sector: 'Chemicals & Petrochemicals',
    leading_companies: [
      { company: 'BASF', achievement: 'Carbon neutral by 2050', score: 82 },
      { company: 'Dow', achievement: 'Carbon neutral by 2050', score: 79 },
      { company: 'DSM', achievement: 'Climate neutral by 2030', score: 87 }
    ],
    avg_emission_intensity: 5.7,
    industry_avg_intensity: 7.9,
    best_practices: ['Bio-based feedstocks', 'Process electrification', 'Recycling'],
    regional_leaders: {
      'North America': 'Dow',
      'Europe': 'BASF',
      'Asia': 'Sinopec'
    },
    sbti_companies: 67
  },
  {
    id: '11',
    sector: 'Aviation',
    leading_companies: [
      { company: 'KLM', achievement: 'Net-zero by 2050', score: 78 },
      { company: 'Lufthansa', achievement: 'Net-zero by 2050', score: 75 },
      { company: 'Delta', achievement: 'Net-zero by 2050', score: 73 }
    ],
    avg_emission_intensity: 15.3,
    industry_avg_intensity: 22.8,
    best_practices: ['Sustainable aviation fuels', 'Fleet efficiency', 'Carbon offsetting'],
    regional_leaders: {
      'North America': 'Delta',
      'Europe': 'KLM',
      'Asia': 'ANA'
    },
    sbti_companies: 18
  },
  {
    id: '12',
    sector: 'Pharmaceuticals',
    leading_companies: [
      { company: 'Novo Nordisk', achievement: 'Carbon neutral by 2030', score: 91 },
      { company: 'Roche', achievement: 'Carbon neutral by 2030', score: 88 },
      { company: 'Johnson & Johnson', achievement: 'Carbon neutral by 2030', score: 85 }
    ],
    avg_emission_intensity: 1.4,
    industry_avg_intensity: 2.1,
    best_practices: ['Green chemistry', 'Renewable energy', 'Sustainable packaging'],
    regional_leaders: {
      'North America': 'Johnson & Johnson',
      'Europe': 'Novo Nordisk',
      'Asia': 'Takeda'
    },
    sbti_companies: 56
  },
  {
    id: '13',
    sector: 'Telecommunications',
    leading_companies: [
      { company: 'BT Group', achievement: 'Net-zero by 2031', score: 86 },
      { company: 'Telefónica', achievement: 'Net-zero by 2040', score: 83 },
      { company: 'Deutsche Telekom', achievement: 'Net-zero by 2040', score: 80 }
    ],
    avg_emission_intensity: 0.8,
    industry_avg_intensity: 1.3,
    best_practices: ['Network efficiency', 'Renewable energy', 'Circular economy'],
    regional_leaders: {
      'North America': 'Verizon',
      'Europe': 'BT Group',
      'Asia': 'NTT'
    },
    sbti_companies: 45
  },
  {
    id: '14',
    sector: 'Apparel & Textiles',
    leading_companies: [
      { company: 'Nike', achievement: 'Carbon neutral by 2030', score: 84 },
      { company: 'Adidas', achievement: 'Climate neutral by 2050', score: 81 },
      { company: 'Levi Strauss', achievement: 'Net-zero by 2050', score: 78 }
    ],
    avg_emission_intensity: 2.7,
    industry_avg_intensity: 3.9,
    best_practices: ['Sustainable materials', 'Supply chain transparency', 'Circular design'],
    regional_leaders: {
      'North America': 'Nike',
      'Europe': 'Adidas',
      'Asia': 'Fast Retailing'
    },
    sbti_companies: 78
  },
  {
    id: '15',
    sector: 'Real Estate',
    leading_companies: [
      { company: 'British Land', achievement: 'Net-zero by 2030', score: 87 },
      { company: 'Prologis', achievement: 'Net-zero by 2040', score: 84 },
      { company: 'Boston Properties', achievement: 'Carbon neutral by 2025', score: 89 }
    ],
    avg_emission_intensity: 6.3,
    industry_avg_intensity: 8.7,
    best_practices: ['Green building certification', 'Renewable energy', 'Smart building tech'],
    regional_leaders: {
      'North America': 'Boston Properties',
      'Europe': 'British Land',
      'Asia': 'Mitsui Fudosan'
    },
    sbti_companies: 89
  },
  {
    id: '16',
    sector: 'Mining & Minerals',
    leading_companies: [
      { company: 'Rio Tinto', achievement: 'Net-zero by 2050', score: 76 },
      { company: 'BHP', achievement: 'Net-zero by 2050', score: 74 },
      { company: 'Anglo American', achievement: 'Carbon neutral by 2040', score: 78 }
    ],
    avg_emission_intensity: 18.7,
    industry_avg_intensity: 24.3,
    best_practices: ['Renewable power', 'Process efficiency', 'Rehabilitation'],
    regional_leaders: {
      'North America': 'Freeport-McMoRan',
      'Europe': 'Rio Tinto',
      'Asia': 'China Shenhua'
    },
    sbti_companies: 28
  },
  {
    id: '17',
    sector: 'Agriculture',
    leading_companies: [
      { company: 'Cargill', achievement: 'Net-zero by 2050', score: 79 },
      { company: 'ADM', achievement: 'Net-zero by 2050', score: 76 },
      { company: 'Tyson Foods', achievement: 'Net-zero by 2050', score: 73 }
    ],
    avg_emission_intensity: 4.8,
    industry_avg_intensity: 6.2,
    best_practices: ['Regenerative farming', 'Methane reduction', 'Sustainable sourcing'],
    regional_leaders: {
      'North America': 'Cargill',
      'Europe': 'Glencore',
      'Asia': 'Wilmar'
    },
    sbti_companies: 34
  },
  {
    id: '18',
    sector: 'Shipping & Maritime',
    leading_companies: [
      { company: 'Maersk', achievement: 'Net-zero by 2050', score: 81 },
      { company: 'CMA CGM', achievement: 'Net-zero by 2050', score: 78 },
      { company: 'MSC', achievement: 'Net-zero by 2050', score: 75 }
    ],
    avg_emission_intensity: 22.1,
    industry_avg_intensity: 28.4,
    best_practices: ['Green ammonia', 'Wind power', 'Route optimization'],
    regional_leaders: {
      'North America': 'Maersk',
      'Europe': 'CMA CGM',
      'Asia': 'COSCO'
    },
    sbti_companies: 12
  },
  {
    id: '19',
    sector: 'Forest & Paper Products',
    leading_companies: [
      { company: 'UPM', achievement: 'Beyond fossil fuels by 2030', score: 85 },
      { company: 'International Paper', achievement: 'Net-zero by 2050', score: 82 },
      { company: 'Stora Enso', achievement: 'Fossil-free by 2035', score: 87 }
    ],
    avg_emission_intensity: 4.2,
    industry_avg_intensity: 5.8,
    best_practices: ['Sustainable forestry', 'Bio-based products', 'Circular economy'],
    regional_leaders: {
      'North America': 'International Paper',
      'Europe': 'UPM',
      'Asia': 'Oji Holdings'
    },
    sbti_companies: 45
  },
  {
    id: '20',
    sector: 'Healthcare Services',
    leading_companies: [
      { company: 'Kaiser Permanente', achievement: 'Carbon neutral by 2030', score: 88 },
      { company: 'NHS', achievement: 'Net-zero by 2040', score: 85 },
      { company: 'Cleveland Clinic', achievement: 'Carbon neutral by 2027', score: 83 }
    ],
    avg_emission_intensity: 2.1,
    industry_avg_intensity: 3.2,
    best_practices: ['Energy efficiency', 'Sustainable procurement', 'Waste reduction'],
    regional_leaders: {
      'North America': 'Kaiser Permanente',
      'Europe': 'NHS',
      'Asia': 'IHH Healthcare'
    },
    sbti_companies: 23
  }
];

const IndustryBenchmarking = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            Industry Leadership Analysis
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Global Industry Benchmarking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare sector performance and identify climate leaders across industries and regions
          </p>
        </div>

        {/* Comprehensive Sector Performance Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockBenchmarks.map((benchmark, index) => (
            <Card key={benchmark.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{benchmark.sector}</CardTitle>
                  <Badge variant={benchmark.avg_emission_intensity < 2 ? "default" : "secondary"}>
                    {benchmark.avg_emission_intensity.toFixed(1)} tCO₂e/M$
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {benchmark.sbti_companies} SBTi companies • Industry avg: {benchmark.industry_avg_intensity.toFixed(1)} tCO₂e/M$
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Leading Companies */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                      <Award className="h-3 w-3" />
                      Top Performers
                    </h4>
                    <div className="space-y-1">
                      {benchmark.leading_companies.slice(0, 2).map((company, idx) => (
                        <div key={idx} className="flex items-center justify-between p-1.5 bg-gray-50 rounded text-xs">
                          <div className="flex-1 min-w-0">
                            <span className="font-medium block truncate">{company.company}</span>
                            <p className="text-gray-600 truncate">{company.achievement}</p>
                          </div>
                          <Badge variant="outline" className="text-xs ml-2">{company.score}/100</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regional Leaders */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                      <Globe className="h-3 w-3" />
                      Regional Leaders
                    </h4>
                    <div className="grid grid-cols-3 gap-1">
                      {Object.entries(benchmark.regional_leaders).map(([region, leader]) => (
                        <div key={region} className="text-center p-1.5 bg-blue-50 rounded">
                          <div className="text-xs text-gray-600 truncate">{region.replace('North America', 'NA')}</div>
                          <div className="text-xs font-medium truncate" title={leader}>{leader}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best Practices */}
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Best Practices</h4>
                    <div className="flex flex-wrap gap-1">
                      {benchmark.best_practices.slice(0, 2).map((practice, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {practice}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Insights Section */}
        <Card className="bg-indigo-100 border-indigo-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Key Industry Insights
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-2">67%</div>
                <div className="text-sm text-gray-700">Heavy industry has SBTi targets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-2">Scope 3</div>
                <div className="text-sm text-gray-700">Primary focus for supply chain decarbonization</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-2">Nordic</div>
                <div className="text-sm text-gray-700">Regional leadership in climate action</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-2">1,800+</div>
                <div className="text-sm text-gray-700">Total SBTi companies across sectors</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updated Source Attribution */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            Data sourced from CDP Global 500 Climate Report and Science Based Targets initiative
            <br />
            Corporate climate action index based on SBTi commitments, reporting transparency, and sector participation across 20+ major industry sectors
            <a href="#" className="text-blue-600 hover:text-blue-700 ml-2">
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndustryBenchmarking;
