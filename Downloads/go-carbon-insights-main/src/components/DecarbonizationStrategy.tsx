
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Strategy {
  id: string;
  strategy_type: string;
  description: string;
  expected_reduction: number;
  implementation_year: number;
  status: 'completed' | 'in_progress' | 'planned';
}

interface DecarbonizationStrategyProps {
  strategies: Strategy[];
}

const DecarbonizationStrategy = ({ strategies }: DecarbonizationStrategyProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'planned':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decarbonization Strategies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{strategy.strategy_type}</h3>
                <div className="flex items-center gap-2">
                  {getStatusIcon(strategy.status)}
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(strategy.status)}
                  >
                    {strategy.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{strategy.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 font-medium">
                  Expected reduction: {strategy.expected_reduction.toLocaleString()} tCO2e
                </span>
                <span className="text-gray-500">
                  Target year: {strategy.implementation_year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DecarbonizationStrategy;
