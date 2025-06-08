
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useDataQuality } from '@/hooks/useDataQuality';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const DataQualityMetrics = () => {
  const { data: quality, isLoading } = useDataQuality();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Quality Scores</CardTitle>
          <CardDescription>Completeness and verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 border rounded-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'third_party_verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'self_reported':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getConfidenceBadge = (level: string) => {
    const variants = {
      high: 'default',
      medium: 'secondary',
      low: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[level as keyof typeof variants] || 'secondary'}>
        {level} confidence
      </Badge>
    );
  };

  const averageQuality = quality?.reduce((sum, company) => sum + company.overall_quality_score, 0) / (quality?.length || 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Quality Scores</CardTitle>
        <CardDescription>Emission data completeness and verification status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Quality Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Platform Average Quality</span>
              <span className="text-lg font-bold text-teal-600">{averageQuality.toFixed(0)}%</span>
            </div>
            <Progress value={averageQuality} className="h-2" />
          </div>

          {/* Individual Company Scores */}
          <div className="space-y-4">
            {quality?.map((company) => (
              <div key={company.company_id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium capitalize">
                      {company.company_id.replace('_', ' ')}
                    </h4>
                    {getVerificationIcon(company.verification_status)}
                  </div>
                  <div className="flex items-center gap-2">
                    {getConfidenceBadge(company.confidence_level)}
                    <span className="text-lg font-bold">{company.overall_quality_score}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Scope 1 Completeness:</span>
                    <span className="font-medium">{company.scope1_completeness}%</span>
                  </div>
                  <Progress value={company.scope1_completeness} className="h-1" />

                  <div className="flex items-center justify-between text-sm">
                    <span>Scope 2 Completeness:</span>
                    <span className="font-medium">{company.scope2_completeness}%</span>
                  </div>
                  <Progress value={company.scope2_completeness} className="h-1" />

                  <div className="flex items-center justify-between text-sm">
                    <span>Scope 3 Completeness:</span>
                    <span className="font-medium">{company.scope3_completeness}%</span>
                  </div>
                  <Progress value={company.scope3_completeness} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataQualityMetrics;
