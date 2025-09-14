import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, FileSearch, TrendingUp } from "lucide-react";
import { closeEvidenceDrawer } from "../../store/slices/contractsSlice.js";

const EvidenceDrawer = ({ evidence }) => {
  const dispatch = useDispatch();
  const { isEvidenceDrawerOpen } = useSelector((state) => state.contracts);

  const getRelevanceColor = (relevance) => {
    if (relevance >= 0.8) return "text-green-600 bg-green-100";
    if (relevance >= 0.6) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <>
      {/* Backdrop */}
      {isEvidenceDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
          onClick={() => dispatch(closeEvidenceDrawer())}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isEvidenceDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <FileSearch className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">
                Evidence Sources
              </h2>
            </div>
            <button
              onClick={() => dispatch(closeEvidenceDrawer())}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {evidence && evidence.length > 0 ? (
              <div className="space-y-4">
                {evidence.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-sm font-medium text-gray-900">
                        {item.source}
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${getRelevanceColor(
                            item.relevance
                          )}`}
                        >
                          {Math.round(item.relevance * 100)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <FileSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No evidence sources available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EvidenceDrawer;