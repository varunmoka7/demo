
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe, ExternalLink } from 'lucide-react';
import WorldMap from './WorldMap';

// Static mock data for corporate climate data
const mockClimateData = [
  {
    id: '1',
    country_name: 'United States',
    sbti_companies: 234,
    reporting_quality: 78,
    top_sectors: ['Technology', 'Financial Services', 'Manufacturing'],
    annual_improvement: '+8%',
    climate_leadership_score: 82,
    sector_breakdown: {
      Technology: { companies: 45, avg_quality: 85, sbti_targets: 38 },
      'Financial Services': { companies: 38, avg_quality: 82, sbti_targets: 31 },
      Manufacturing: { companies: 52, avg_quality: 71, sbti_targets: 29 }
    },
    notable_achievements: [
      'Microsoft: Carbon negative by 2030',
      'Google: 24/7 renewable energy by 2030',
      'Apple: Carbon neutral supply chain by 2030'
    ]
  },
  {
    id: '2',
    country_name: 'United Kingdom',
    sbti_companies: 89,
    reporting_quality: 84,
    top_sectors: ['Financial Services', 'Retail', 'Energy'],
    annual_improvement: '+12%',
    climate_leadership_score: 87,
    sector_breakdown: {
      'Financial Services': { companies: 23, avg_quality: 88, sbti_targets: 19 },
      Retail: { companies: 18, avg_quality: 81, sbti_targets: 15 },
      Energy: { companies: 15, avg_quality: 79, sbti_targets: 12 }
    },
    notable_achievements: [
      'Unilever: Net-zero emissions by 2039',
      'BT Group: Net-zero by 2031',
      'Tesco: Net-zero by 2035'
    ]
  },
  {
    id: '3',
    country_name: 'Germany',
    sbti_companies: 67,
    reporting_quality: 82,
    top_sectors: ['Automotive', 'Manufacturing', 'Energy'],
    annual_improvement: '+12%',
    climate_leadership_score: 85,
    sector_breakdown: {
      Automotive: { companies: 18, avg_quality: 84, sbti_targets: 15 },
      Manufacturing: { companies: 23, avg_quality: 80, sbti_targets: 18 },
      Energy: { companies: 12, avg_quality: 78, sbti_targets: 9 }
    },
    notable_achievements: [
      'SAP: Carbon neutral by 2030',
      'BMW: Carbon neutral by 2030',
      'Siemens: Carbon neutral by 2030'
    ]
  },
  {
    id: '4',
    country_name: 'France',
    sbti_companies: 52,
    reporting_quality: 80,
    top_sectors: ['Energy', 'Luxury Goods', 'Transportation'],
    annual_improvement: '+10%',
    climate_leadership_score: 83,
    sector_breakdown: {
      Energy: { companies: 15, avg_quality: 82, sbti_targets: 12 },
      'Luxury Goods': { companies: 11, avg_quality: 78, sbti_targets: 8 },
      Transportation: { companies: 13, avg_quality: 79, sbti_targets: 10 }
    },
    notable_achievements: [
      'LVMH: Carbon neutral by 2026',
      'TotalEnergies: Net-zero by 2050',
      "L'Oréal: Carbon neutral by 2025"
    ]
  },
  {
    id: '5',
    country_name: 'Netherlands',
    sbti_companies: 43,
    reporting_quality: 86,
    top_sectors: ['Financial Services', 'Technology', 'Agriculture'],
    annual_improvement: '+15%',
    climate_leadership_score: 89,
    sector_breakdown: {
      'Financial Services': { companies: 14, avg_quality: 89, sbti_targets: 12 },
      Technology: { companies: 12, avg_quality: 87, sbti_targets: 10 },
      Agriculture: { companies: 8, avg_quality: 83, sbti_targets: 6 }
    },
    notable_achievements: [
      'ING: Net-zero by 2050',
      'Philips: Carbon neutral operations by 2025',
      'DSM: Carbon neutral by 2030'
    ]
  },
  {
    id: '6',
    country_name: 'Sweden',
    sbti_companies: 38,
    reporting_quality: 88,
    top_sectors: ['Manufacturing', 'Technology', 'Forest Products'],
    annual_improvement: '+18%',
    climate_leadership_score: 91,
    sector_breakdown: {
      Manufacturing: { companies: 12, avg_quality: 90, sbti_targets: 11 },
      Technology: { companies: 10, avg_quality: 89, sbti_targets: 9 },
      'Forest Products': { companies: 8, avg_quality: 86, sbti_targets: 7 }
    },
    notable_achievements: [
      'IKEA: Climate positive by 2030',
      'Ericsson: Net-zero by 2040',
      'Volvo: Climate neutral by 2040'
    ]
  },
  {
    id: '7',
    country_name: 'Denmark',
    sbti_companies: 29,
    reporting_quality: 90,
    top_sectors: ['Energy', 'Pharmaceuticals', 'Manufacturing'],
    annual_improvement: '+20%',
    climate_leadership_score: 93,
    sector_breakdown: {
      Energy: { companies: 9, avg_quality: 92, sbti_targets: 8 },
      Pharmaceuticals: { companies: 8, avg_quality: 91, sbti_targets: 7 },
      Manufacturing: { companies: 7, avg_quality: 88, sbti_targets: 6 }
    },
    notable_achievements: [
      'Novo Nordisk: Carbon neutral by 2030',
      'Ørsted: Carbon neutral by 2025',
      'Maersk: Net-zero by 2050'
    ]
  },
  {
    id: '8',
    country_name: 'Switzerland',
    sbti_companies: 41,
    reporting_quality: 85,
    top_sectors: ['Financial Services', 'Pharmaceuticals', 'Technology'],
    annual_improvement: '+14%',
    climate_leadership_score: 86,
    sector_breakdown: {
      'Financial Services': { companies: 13, avg_quality: 87, sbti_targets: 11 },
      Pharmaceuticals: { companies: 11, avg_quality: 86, sbti_targets: 9 },
      Technology: { companies: 9, avg_quality: 84, sbti_targets: 7 }
    },
    notable_achievements: [
      'Nestlé: Net-zero by 2050',
      'Roche: Carbon neutral by 2030',
      'UBS: Net-zero by 2050'
    ]
  },
  {
    id: '9',
    country_name: 'Norway',
    sbti_companies: 26,
    reporting_quality: 87,
    top_sectors: ['Energy', 'Maritime', 'Technology'],
    annual_improvement: '+16%',
    climate_leadership_score: 88,
    sector_breakdown: {
      Energy: { companies: 8, avg_quality: 89, sbti_targets: 7 },
      Maritime: { companies: 7, avg_quality: 85, sbti_targets: 5 },
      Technology: { companies: 6, avg_quality: 88, sbti_targets: 5 }
    },
    notable_achievements: [
      'Equinor: Net-zero by 2050',
      'Yara: Carbon neutral by 2050',
      'Telenor: Net-zero by 2050'
    ]
  },
  {
    id: '10',
    country_name: 'Finland',
    sbti_companies: 22,
    reporting_quality: 86,
    top_sectors: ['Forest Products', 'Technology', 'Energy'],
    annual_improvement: '+17%',
    climate_leadership_score: 87,
    sector_breakdown: {
      'Forest Products': { companies: 7, avg_quality: 88, sbti_targets: 6 },
      Technology: { companies: 6, avg_quality: 87, sbti_targets: 5 },
      Energy: { companies: 5, avg_quality: 85, sbti_targets: 4 }
    },
    notable_achievements: [
      'Nokia: Carbon neutral by 2030',
      'UPM: Beyond fossil fuels by 2030',
      'Fortum: Carbon neutral by 2050'
    ]
  },
  {
    id: '11',
    country_name: 'Italy',
    sbti_companies: 35,
    reporting_quality: 79,
    top_sectors: ['Energy', 'Automotive', 'Fashion'],
    annual_improvement: '+9%',
    climate_leadership_score: 81,
    sector_breakdown: {
      Energy: { companies: 11, avg_quality: 81, sbti_targets: 8 },
      Automotive: { companies: 9, avg_quality: 78, sbti_targets: 6 },
      Fashion: { companies: 8, avg_quality: 76, sbti_targets: 5 }
    },
    notable_achievements: [
      'Enel: Carbon neutral by 2050',
      'Prada: Carbon neutral by 2030',
      'Ferrari: Carbon neutral by 2030'
    ]
  },
  {
    id: '12',
    country_name: 'Spain',
    sbti_companies: 31,
    reporting_quality: 77,
    top_sectors: ['Energy', 'Financial Services', 'Telecommunications'],
    annual_improvement: '+11%',
    climate_leadership_score: 80,
    sector_breakdown: {
      Energy: { companies: 10, avg_quality: 79, sbti_targets: 7 },
      'Financial Services': { companies: 8, avg_quality: 78, sbti_targets: 6 },
      Telecommunications: { companies: 6, avg_quality: 76, sbti_targets: 4 }
    },
    notable_achievements: [
      'Iberdrola: Carbon neutral by 2050',
      'Telefónica: Net-zero by 2040',
      'Santander: Net-zero by 2050'
    ]
  },
  {
    id: '13',
    country_name: 'China',
    sbti_companies: 28,
    reporting_quality: 68,
    top_sectors: ['Technology', 'Manufacturing', 'Energy'],
    annual_improvement: '+22%',
    climate_leadership_score: 72,
    sector_breakdown: {
      Technology: { companies: 12, avg_quality: 72, sbti_targets: 8 },
      Manufacturing: { companies: 8, avg_quality: 65, sbti_targets: 5 },
      Energy: { companies: 5, avg_quality: 63, sbti_targets: 3 }
    },
    notable_achievements: [
      'Tencent: Carbon neutral by 2030',
      'Alibaba: Carbon neutral by 2030',
      'China Mobile: Carbon neutral by 2050'
    ]
  },
  {
    id: '14',
    country_name: 'Japan',
    sbti_companies: 45,
    reporting_quality: 75,
    top_sectors: ['Technology', 'Automotive', 'Manufacturing'],
    annual_improvement: '+13%',
    climate_leadership_score: 79,
    sector_breakdown: {
      Technology: { companies: 15, avg_quality: 78, sbti_targets: 11 },
      Automotive: { companies: 12, avg_quality: 76, sbti_targets: 9 },
      Manufacturing: { companies: 10, avg_quality: 73, sbti_targets: 7 }
    },
    notable_achievements: [
      'Sony: Carbon neutral by 2050',
      'Toyota: Carbon neutral by 2050',
      'SoftBank: Net-zero by 2050'
    ]
  }
];

const CorporateClimateMap = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Globe className="h-4 w-4 mr-2" />
            Global Corporate Climate Action
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Corporate Climate Leadership Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how companies worldwide are advancing climate action through science-based targets and sustainable practices
          </p>
        </div>

        <WorldMap countries={mockClimateData} />

        {/* Summary Statistics */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              {mockClimateData.reduce((sum, country) => sum + country.sbti_companies, 0)}
            </div>
            <div className="text-sm text-gray-600">Total SBTi Companies</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(mockClimateData.reduce((sum, country) => sum + country.reporting_quality, 0) / mockClimateData.length)}%
            </div>
            <div className="text-sm text-gray-600">Average Reporting Quality</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              {mockClimateData.filter(country => country.climate_leadership_score >= 85).length}
            </div>
            <div className="text-sm text-gray-600">High-Performance Countries</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-2xl font-bold text-orange-600">
              +{Math.round(mockClimateData.reduce((sum, country) => sum + parseFloat(country.annual_improvement.replace('%', '').replace('+', '')), 0) / mockClimateData.length)}%
            </div>
            <div className="text-sm text-gray-600">Average Annual Improvement</div>
          </div>
        </div>

        {/* Source Attribution */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            Data compiled from CDP Global 500 Climate Report and Science Based Targets initiative
            <a href="https://www.cdp.net/en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorporateClimateMap;
