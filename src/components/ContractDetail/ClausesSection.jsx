import React from "react";
import { FileText, TrendingUp } from "lucide-react";

const ClausesSection = ({ clauses }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return "text-green-600 bg-green-100";
    if (confidence >= 0.6) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <FileText className="w-5 h-5 text-gray-400 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          Contract Clauses
        </h2>
      </div>

      <div className="space-y-4">
        {clauses.map((clause, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-900">{clause.title}</h3>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getConfidenceColor(
                    clause.confidence
                  )}`}
                >
                  {Math.round(clause.confidence * 100)}%
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{clause.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClausesSection;