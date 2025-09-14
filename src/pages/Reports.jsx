import React from "react";
import { FileBarChart, Download, Calendar } from "lucide-react";

const Reports = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="mt-1 text-gray-500">
          Generate and download contract reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <FileBarChart className="h-8 w-8 text-blue-600" />
            <h3 className="ml-3 text-lg font-medium text-gray-900">
              Contract Summary
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Overview of all contracts and their status
          </p>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-8 w-8 text-green-600" />
            <h3 className="ml-3 text-lg font-medium text-gray-900">
              Expiry Report
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Contracts expiring in the next 90 days
          </p>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <FileBarChart className="h-8 w-8 text-red-600" />
            <h3 className="ml-3 text-lg font-medium text-gray-900">
              Risk Assessment
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Risk analysis across all contracts
          </p>
          <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            <Download className="w-4 h-4 mr-2" />
            Download
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Custom Reports
        </h2>
        <p className="text-gray-500">
          Create custom reports with specific filters and criteria. This feature
          is coming soon.
        </p>
      </div>
    </div>
  );
};

export default Reports;