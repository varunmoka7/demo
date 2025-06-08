
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingUp, Building, Star, ExternalLink } from 'lucide-react';

interface CorporateClimateData {
  id: string;
  country_name: string;
  sbti_companies: number;
  reporting_quality: number;
  top_sectors: string[];
  annual_improvement: string;
  climate_leadership_score: number;
  sector_breakdown: Record<string, any>;
  notable_achievements: string[];
}

interface WorldMapProps {
  countries: CorporateClimateData[];
}

const CountryBox = ({ country, onClick }: { country: CorporateClimateData; onClick: () => void }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Exceptional';
    if (score >= 80) return 'Strong';
    if (score >= 70) return 'Moderate';
    return 'Developing';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={onClick}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm truncate">{country.country_name}</h4>
                <div className={`w-3 h-3 rounded-full ${getScoreColor(country.climate_leadership_score)}`} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <Building className="h-3 w-3" />
                  <span>{country.sbti_companies} SBTi companies</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Star className="h-3 w-3" />
                  <span>{country.reporting_quality}% quality</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span>{country.annual_improvement}</span>
                </div>
              </div>
              <Badge variant="outline" className="mt-2 text-xs">
                {getScoreLabel(country.climate_leadership_score)}
              </Badge>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <h5 className="font-semibold">{country.country_name} Climate Leadership</h5>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>SBTi Companies: {country.sbti_companies}</div>
              <div>Quality Score: {country.reporting_quality}%</div>
              <div>Leadership: {country.climate_leadership_score}/100</div>
              <div>Growth: {country.annual_improvement}</div>
            </div>
            <div className="text-xs text-gray-600">
              Top Sectors: {country.top_sectors.slice(0, 2).join(', ')}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const WorldMap = ({ countries }: WorldMapProps) => {
  const [selectedCountry, setSelectedCountry] = useState<CorporateClimateData | null>(null);

  const handleCountryClick = (country: CorporateClimateData) => {
    setSelectedCountry(country);
  };

  const closePanel = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="space-y-6">
      {/* World Map Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {countries.map((country) => (
          <CountryBox 
            key={country.id} 
            country={country} 
            onClick={() => handleCountryClick(country)}
          />
        ))}
      </div>

      {/* Detailed Panel */}
      {selectedCountry && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {selectedCountry.country_name} Climate Action Profile
                <a 
                  href="#" 
                  className="text-blue-600 hover:text-blue-700"
                  onClick={(e) => e.preventDefault()}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </h3>
              <button 
                onClick={closePanel}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Leadership Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Climate Leadership Score:</span>
                    <Badge variant={selectedCountry.climate_leadership_score >= 85 ? "default" : "secondary"}>
                      {selectedCountry.climate_leadership_score}/100
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>SBTi Companies:</span>
                    <span className="font-medium">{selectedCountry.sbti_companies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reporting Quality:</span>
                    <span className="font-medium">{selectedCountry.reporting_quality}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Improvement:</span>
                    <span className="font-medium text-green-600">{selectedCountry.annual_improvement}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Top Sectors</h4>
                <div className="space-y-2">
                  {selectedCountry.top_sectors.map((sector, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-sm">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Notable Achievements</h4>
                <div className="space-y-2">
                  {selectedCountry.notable_achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="text-sm text-gray-700 border-l-2 border-green-500 pl-2">
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorldMap;
