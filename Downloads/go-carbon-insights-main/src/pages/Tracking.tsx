
import React from 'react';
import { Badge } from '@/components/ui/badge';
import GlobalStatsCards from '@/components/GlobalStatsCards';
import SectorBreakdownChart from '@/components/SectorBreakdownChart';
import GrowthTimelineChart from '@/components/GrowthTimelineChart';
import CompanyLocationsMap from '@/components/CompanyLocationsMap';
import FeaturedCompaniesGrid from '@/components/FeaturedCompaniesGrid';
import DataQualityMetrics from '@/components/DataQualityMetrics';
import PlatformImpactMetrics from '@/components/PlatformImpactMetrics';
import { Globe, Target, TrendingUp } from 'lucide-react';

const Tracking = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="outline" className="px-4 py-2">
            <Globe className="h-4 w-4 mr-2" />
            Global Emissions Monitoring Center
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tracking Corporate Carbon Footprints
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
          GoCarbonTracker monitors emissions data from organizations worldwide, making previously 
          untapped sustainability information accessible to humanity and accelerating climate transparency.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-teal-600" />
            <span>Supply Chain Transparency</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span>Real-time Monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-purple-600" />
            <span>Global Coverage</span>
          </div>
        </div>
      </div>

      {/* Global Overview Cards */}
      <GlobalStatsCards />

      {/* Main Analytics Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <CompanyLocationsMap />
        <SectorBreakdownChart />
      </div>

      {/* Growth and Quality Analysis */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <GrowthTimelineChart />
        <DataQualityMetrics />
      </div>

      {/* Featured Companies */}
      <div className="mb-12">
        <FeaturedCompaniesGrid />
      </div>

      {/* Platform Impact Metrics */}
      <PlatformImpactMetrics />

      {/* Mission Statement Footer */}
      <div className="mt-16 text-center bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 border border-teal-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-6">
          We believe transparency accelerates climate action. By making corporate carbon data accessible 
          and actionable, we empower companies, investors, and consumers to make informed decisions that 
          drive meaningful emission reductions across global supply chains.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600 mb-2">15+</div>
            <div className="text-sm text-gray-600">Companies Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">8</div>
            <div className="text-sm text-gray-600">Industry Sectors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">12</div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
