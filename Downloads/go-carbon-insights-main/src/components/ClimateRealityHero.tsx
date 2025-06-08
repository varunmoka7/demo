
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ExternalLink, TrendingUp, Globe, Thermometer, Target } from 'lucide-react';
import climateData from '@/data/sources/climate-data-sources.json';

interface DataPointProps {
  value: string;
  label: string;
  sourceKey: keyof typeof climateData;
  icon: React.ElementType;
  trend?: 'critical' | 'warning' | 'urgent';
}

const DataPoint = ({ value, label, sourceKey, icon: Icon, trend = 'critical' }: DataPointProps) => {
  const source = climateData[sourceKey].source;
  
  const trendColors = {
    critical: 'border-red-500 bg-red-50',
    warning: 'border-amber-500 bg-amber-50',
    urgent: 'border-orange-500 bg-orange-50'
  };

  // Safely get reliability or fallback to peer_review or default
  const reliability = (source as any).reliability || (source as any).peer_review || 'Primary Source';

  return (
    <Card className={`${trendColors[trend]} border-l-4`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Icon className="h-6 w-6 text-gray-700" />
          <Badge variant="outline" className="text-xs">
            {reliability}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="text-sm font-medium text-gray-700">{label}</div>
          <div className="text-xs text-gray-600">
            <div className="flex items-center gap-1 mb-1">
              <span className="font-medium">{source.organization}</span>
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div>Updated: {source.last_updated}</div>
            <div className="mt-1 text-xs text-gray-500">{source.methodology}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ClimateRealityHero = () => {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="destructive" className="mb-4 px-4 py-2">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Climate Emergency - Real-Time Data
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Current Climate Reality
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Live atmospheric measurements and climate indicators from leading scientific institutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <DataPoint
            value="423.0 ppm"
            label="Current CO₂ Levels"
            sourceKey="atmospheric_co2"
            icon={Globe}
            trend="critical"
          />
          <DataPoint
            value="+1.1°C"
            label="Global Temperature Rise"
            sourceKey="global_temperature_anomaly"
            icon={Thermometer}
            trend="warning"
          />
          <DataPoint
            value="~400 GtCO₂"
            label="Carbon Budget Remaining"
            sourceKey="carbon_budget_remaining"
            icon={Target}
            trend="urgent"
          />
        </div>

        <Card className="bg-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">Critical Alert</h3>
                <p className="text-red-800">
                  These atmospheric CO₂ levels represent the highest concentrations in over 3 million years, 
                  approaching irreversible climate tipping points. Immediate, unprecedented action is required 
                  across all sectors to avoid catastrophic warming.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClimateRealityHero;
