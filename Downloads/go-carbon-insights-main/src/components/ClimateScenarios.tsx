
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Target, Thermometer, Clock, ExternalLink } from 'lucide-react';

// Static mock data for climate scenarios
const mockScenarios = [
  {
    id: '1',
    scenario_name: 'Current Policies',
    warming_by_2100: '2.7-3.1°C by 2100',
    description: 'If we continue with existing policies and measures',
    color: '#dc2626',
    key_milestones: [
      { year: 2030, temp: '+1.4°C', description: 'Continued rise' },
      { year: 2050, temp: '+2.1°C', description: 'Dangerous warming' },
      { year: 2100, temp: '+2.9°C', description: 'Severe climate impacts' }
    ],
    requirements: [
      'Catastrophic climate impacts',
      'Massive ecosystem disruption',
      'Global economic instability'
    ]
  },
  {
    id: '2',
    scenario_name: 'Pledged Targets',
    warming_by_2100: '2.1-2.4°C by 2100',
    description: 'If all current national and corporate commitments are fully implemented',
    color: '#f59e0b',
    key_milestones: [
      { year: 2030, temp: '+1.3°C', description: 'Slower increase' },
      { year: 2050, temp: '+1.8°C', description: 'Significant improvement' },
      { year: 2100, temp: '+2.2°C', description: 'Still above Paris target' }
    ],
    requirements: [
      'Full implementation of current pledges',
      'Enhanced international cooperation',
      'Accelerated technology deployment'
    ]
  },
  {
    id: '3',
    scenario_name: '1.5°C Target',
    warming_by_2100: '1.5°C by 2100',
    description: 'Paris Agreement ambitious goal - requires immediate transformation',
    color: '#059669',
    key_milestones: [
      { year: 2030, temp: '+1.2°C', description: '45% emission reduction achieved' },
      { year: 2050, temp: '+1.4°C', description: 'Net-zero emissions reached' },
      { year: 2100, temp: '+1.5°C', description: 'Climate stabilized' }
    ],
    requirements: [
      '45% global emission reduction by 2030',
      'Net-zero emissions by 2050',
      'Unprecedented international cooperation'
    ]
  }
];

const ClimateScenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="destructive" className="mb-4 px-4 py-2">
            <Thermometer className="h-4 w-4 mr-2" />
            Climate Pathway Analysis
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Global Climate Scenarios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different climate pathways and their implications for global warming by 2100
          </p>
        </div>

        {/* Scenario Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {mockScenarios.map((scenario) => (
            <Card 
              key={scenario.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedScenario === scenario.scenario_name ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedScenario(
                selectedScenario === scenario.scenario_name ? null : scenario.scenario_name
              )}
              style={{ borderLeftColor: scenario.color, borderLeftWidth: '4px' }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{scenario.scenario_name}</CardTitle>
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: scenario.color }}
                  />
                </div>
                <CardDescription className="font-medium text-gray-900">
                  {scenario.warming_by_2100}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                
                {/* Timeline Preview */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Key Milestones
                  </h4>
                  {scenario.key_milestones.slice(0, 2).map((milestone, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span>{milestone.year}</span>
                      <span className="font-medium">{milestone.temp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Timeline */}
        {selectedScenario && (
          <Card className="border-l-4 border-l-orange-500 bg-orange-50">
            <CardContent className="p-6">
              {(() => {
                const scenario = mockScenarios.find(s => s.scenario_name === selectedScenario);
                if (!scenario) return null;
                
                return (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">{scenario.scenario_name} - Detailed Timeline</h3>
                      <button 
                        onClick={() => setSelectedScenario(null)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                      >
                        ×
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Temperature Timeline
                        </h4>
                        <div className="space-y-4">
                          {scenario.key_milestones.map((milestone, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 bg-white rounded">
                              <div className="text-center min-w-[60px]">
                                <div className="font-bold">{milestone.year}</div>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium" style={{ color: scenario.color }}>
                                  {milestone.temp}
                                </div>
                                <div className="text-sm text-gray-600">{milestone.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Key Requirements
                        </h4>
                        <div className="space-y-2">
                          {scenario.requirements.map((requirement, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-2 bg-white rounded">
                              <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: scenario.color }} />
                              <span className="text-sm">{requirement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

        {/* Action Requirements */}
        <Card className="bg-red-100 border-red-200 mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-900 mb-4">Critical Action Window</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">45%</div>
                    <div className="text-sm text-red-800">Global emission reduction needed by 2030</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">Net-Zero</div>
                    <div className="text-sm text-red-800">Global emissions by 2050</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">~400 GtCO₂</div>
                    <div className="text-sm text-red-800">Remaining carbon budget for 1.5°C</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Source Attribution */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            Scenarios based on IPCC Special Report on 1.5°C and latest climate model projections
            <a href="https://www.ipcc.ch/sr15/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClimateScenarios;
