import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, Filter } from "lucide-react";
import {
  setSearchQuery,
  setStatusFilter,
  setRiskFilter,
} from "../../store/slices/contractsSlice.js";

const ContractsFilters = () => {
  const dispatch = useDispatch();
  const { searchQuery, statusFilter, riskFilter } = useSelector(
    (state) => state.contracts
  );

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search by contract name or parties..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Renewal Due">Renewal Due</option>
            </select>
          </div>

          <div>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={riskFilter}
              onChange={(e) => dispatch(setRiskFilter(e.target.value))}
            >
              <option value="all">All Risk</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsFilters;