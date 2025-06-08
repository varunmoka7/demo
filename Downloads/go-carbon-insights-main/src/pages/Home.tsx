
import React from 'react';
import ClimateRealityHero from '@/components/ClimateRealityHero';
import CorporateClimateMap from '@/components/CorporateClimateMap';
import SectorEmissionsDashboard from '@/components/SectorEmissionsDashboard';
import IndustryBenchmarking from '@/components/IndustryBenchmarking';
import ClimateScenarios from '@/components/ClimateScenarios';
import CollaborationHub from '@/components/CollaborationHub';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Section 1: Climate Reality Hero Section */}
      <ClimateRealityHero />

      {/* Section 2: Interactive Corporate Climate Action Map */}
      <CorporateClimateMap />

      {/* Section 3: Global Emissions by Sector Dashboard */}
      <SectorEmissionsDashboard />

      {/* Section 4: Industry Benchmarking */}
      <IndustryBenchmarking />

      {/* Section 5: Climate Scenarios */}
      <ClimateScenarios />

      {/* Section 6: Supply Chain Collaboration Hub */}
      <CollaborationHub />
    </div>
  );
};

export default Home;
