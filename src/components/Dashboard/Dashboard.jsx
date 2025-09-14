import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader2, AlertCircle, FileText } from "lucide-react";
import {
  fetchContractsStart,
  fetchContractsSuccess,
  fetchContractsFailure,
  setCurrentPage,
} from "../../store/slices/contractsSlice.js";
import { api } from "../../services/api.js";
import ContractsFilters from "./ContractsFilters.jsx";
import ContractsTable from "./ContractsTable.jsx";
import Pagination from "./Pagination.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    contracts,
    isLoading,
    error,
    searchQuery,
    statusFilter,
    riskFilter,
    currentPage,
    itemsPerPage,
  } = useSelector((state) => state.contracts);

  useEffect(() => {
    const fetchContracts = async () => {
      dispatch(fetchContractsStart());
      try {
        const contractsData = await api.getContracts();
        dispatch(fetchContractsSuccess(contractsData));
      } catch (error) {
        dispatch(
          fetchContractsFailure(
            error instanceof Error ? error.message : "Failed to fetch contracts"
          )
        );
      }
    };

    fetchContracts();
  }, [dispatch]);

  const filteredContracts = useMemo(() => {
    let filtered = contracts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (contract) =>
          contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contract.parties.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (contract) => contract.status === statusFilter
      );
    }

    // Risk filter
    if (riskFilter !== "all") {
      filtered = filtered.filter((contract) => contract.risk === riskFilter);
    }

    return filtered;
  }, [contracts, searchQuery, statusFilter, riskFilter]);

  const paginatedContracts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredContracts.slice(startIndex, endIndex);
  }, [filteredContracts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-500">Loading contracts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <p className="text-gray-900 font-medium mb-2">
              Error loading contracts
            </p>
            <p className="text-gray-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Contracts Dashboard
        </h1>
        <p className="mt-1 text-gray-500">
          Manage and monitor your contract portfolio
        </p>
      </div>

      {/* Filters */}
      <ContractsFilters />

      {/* Content */}
      {filteredContracts.length === 0 ? (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-900 font-medium mb-2">
                {contracts.length === 0
                  ? "No contracts yet"
                  : "No contracts match your search"}
              </p>
              <p className="text-gray-500">
                {contracts.length === 0
                  ? "Upload your first contract to get started"
                  : "Try adjusting your search criteria or filters"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ContractsTable contracts={paginatedContracts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredContracts.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;