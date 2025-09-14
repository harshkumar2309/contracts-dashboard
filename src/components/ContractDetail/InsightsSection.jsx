import React from "react";
import { Brain, AlertTriangle, AlertCircle, Info } from "lucide-react";

const InsightsSection = ({ insights }) => {
  const getRiskConfig = (risk) => {
    switch (risk) {
      case "High":
        return {
          color: "text-red-600 bg-red-100 border-red-200",
          icon: AlertTriangle,
        };
      case "Medium":
        return {
          color: "text-yellow-600 bg-yellow-100 border-yellow-200",
          icon: AlertCircle,
        };
      case "Low":
        return {
          color: "text-blue-600 bg-blue-100 border-blue-200",
          icon: Info,
        };
      default:
        return {
          color: "text-gray-600 bg-gray-100 border-gray-200",
          icon: Info,
        };
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Brain className="w-5 h-5 text-gray-400 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const config = getRiskConfig(insight.risk);
          const Icon = config.icon;

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${config.color} transition-colors`}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium uppercase tracking-wide">
                      {insight.risk} Risk
                    </span>
                  </div>
                  <p className="text-sm">{insight.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsSection;