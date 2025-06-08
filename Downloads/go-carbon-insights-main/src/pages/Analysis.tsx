
import React from 'react';
import { BarChart3, TrendingUp, Database, AlertCircle } from 'lucide-react';

const Analysis = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg border border-white/20 p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Advanced Analytics</h1>
          <p className="text-xl text-gray-600 mb-8">
            Powerful data analysis and insights are being developed
          </p>
          
          <div className="bg-blue-50/70 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">Coming Features</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800">Predictive Analytics</h3>
                  <p className="text-sm text-blue-700">Forecast future emissions and trends</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800">Benchmarking</h3>
                  <p className="text-sm text-blue-700">Compare performance against industry peers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800">Smart Alerts</h3>
                  <p className="text-sm text-blue-700">Automated notifications for anomalies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-800">Custom Dashboards</h3>
                  <p className="text-sm text-blue-700">Build personalized analytics views</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-500">
            Advanced analytics capabilities will enhance your carbon management strategy with deeper insights and predictive intelligence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
