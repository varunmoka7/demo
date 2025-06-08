
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { usePlatformMetrics } from '@/hooks/usePlatformMetrics';
import { TrendingUp, Shield, Database, Activity } from 'lucide-react';

const PlatformImpactMetrics = () => {
  const { data: metrics, isLoading } = usePlatformMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-2 bg-gray-200 rounded w-full animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const impactMetrics = [
    {
      name: 'monthly_growth_rate',
      title: 'Monthly Growth',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'transparency_index',
      title: 'Transparency Index',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'data_completeness',
      title: 'Data Completeness',
      icon: Database,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'platform_uptime',
      title: 'Platform Uptime',
      icon: Activity,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    }
  ];

  const getMetricValue = (name: string) => {
    return metrics?.find(m => m.metric_name === name)?.metric_value || 0;
  };

  const getMetricDescription = (name: string) => {
    return metrics?.find(m => m.metric_name === name)?.description || '';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Platform Impact Metrics</h3>
        <p className="text-gray-600">Real-time performance and transparency indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric) => {
          const value = getMetricValue(metric.name);
          const description = getMetricDescription(metric.name);
          const Icon = metric.icon;

          return (
            <Card key={metric.name} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${metric.color}`}>
                      {value.toFixed(metric.name === 'platform_uptime' ? 1 : 0)}
                    </span>
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                  
                  <Progress 
                    value={value} 
                    className="h-2"
                  />
                  
                  <p className="text-xs text-gray-600 leading-tight">
                    {description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600">2.4M+</div>
              <div className="text-sm text-gray-600">Tons CO2e Tracked</div>
              <div className="text-xs text-gray-500 mt-1">Equivalent to removing 520,000 cars from roads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">15</div>
              <div className="text-sm text-gray-600">Companies Monitored</div>
              <div className="text-xs text-gray-500 mt-1">Across 8 major industry sectors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">42%</div>
              <div className="text-sm text-gray-600">Supply Chain Coverage</div>
              <div className="text-xs text-gray-500 mt-1">Making hidden emissions visible</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformImpactMetrics;
