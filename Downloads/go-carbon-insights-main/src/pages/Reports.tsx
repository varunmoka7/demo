
import React from 'react';
import { FileText, Clock, Calendar } from 'lucide-react';

const Reports = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-white/70 rounded-xl shadow-lg border border-white/20 p-12 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Reports & Analytics</h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive reporting features are coming soon
          </p>
          
          <div className="bg-purple-50/70 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-purple-900 mb-4">What's Coming</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-800">Automated Reports</h3>
                  <p className="text-sm text-purple-700">Generate compliance and sustainability reports automatically</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-800">Scheduled Delivery</h3>
                  <p className="text-sm text-purple-700">Set up recurring report delivery to stakeholders</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-800">Multiple Formats</h3>
                  <p className="text-sm text-purple-700">Export in PDF, Excel, and interactive formats</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-800">Compliance Ready</h3>
                  <p className="text-sm text-purple-700">Meet CSRD, CDP, and other regulatory requirements</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-500">
            This feature will be available in the next update. Stay tuned for powerful reporting capabilities!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
