    import React, { useEffect } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import { useSelector, useDispatch } from "react-redux";
    import {
      ArrowLeft,
      Loader2,
      AlertCircle,
      Calendar,
      Users,
      Shield,
      Eye,
    } from "lucide-react";
    import {
      fetchContractDetailStart,
      fetchContractDetailSuccess,
      fetchContractDetailFailure,
      clearSelectedContract,
      toggleEvidenceDrawer,
    } from "../../store/slices/contractsSlice.js";
    import { api } from "../../services/api.js";
    import ClausesSection from "./ClausesSection.jsx";
    import InsightsSection from "./InsightsSection.jsx";
    import EvidenceDrawer from "./EvidenceDrawer.jsx";

    const ContractDetail = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const { selectedContract, isLoading, error } = useSelector(
        (state) => state.contracts
      );

      useEffect(() => {
        const fetchContract = async () => {
          if (!id) return;

          dispatch(fetchContractDetailStart());
          try {
            const contractData = await api.getContractDetail(id);
            dispatch(fetchContractDetailSuccess(contractData));
          } catch (error) {
            dispatch(
              fetchContractDetailFailure(
                error instanceof Error
                  ? error.message
                  : "Failed to fetch contract"
              )
            );
          }
        };

        fetchContract();

        return () => {
          dispatch(clearSelectedContract());
        };
      }, [id, dispatch]);

      const handleBack = () => {
        navigate("/dashboard");
      };

      const getRiskColor = (risk) => {
        switch (risk) {
          case "High":
            return "bg-red-100 text-red-800";
          case "Medium":
            return "bg-yellow-100 text-yellow-800";
          case "Low":
            return "bg-green-100 text-green-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      const getStatusColor = (status) => {
        switch (status) {
          case "Active":
            return "bg-green-100 text-green-800";
          case "Expired":
            return "bg-red-100 text-red-800";
          case "Renewal Due":
            return "bg-yellow-100 text-yellow-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

      if (isLoading) {
        return (
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-500">Loading contract details...</p>
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
                  Error loading contract
                </p>
                <p className="text-gray-500 mb-4">{error}</p>
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        );
      }

      if (!selectedContract) {
        return null;
      }

      return (
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedContract.name}
                </h1>
                <p className="mt-1 text-gray-500">
                  Contract Details & Analysis
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleEvidenceDrawer())}
              className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Evidence
            </button>
          </div>

          {/* Contract Metadata */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Users className="w-4 h-4 mr-1" />
                  Parties
                </div>
                <p className="font-medium text-gray-900">
                  {selectedContract.parties}
                </p>
              </div>

              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Start Date
                </div>
                <p className="font-medium text-gray-900">
                  {formatDate(selectedContract.start)}
                </p>
              </div>

              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Expiry Date
                </div>
                <p className="font-medium text-gray-900">
                  {formatDate(selectedContract.expiry)}
                </p>
              </div>

              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Shield className="w-4 h-4 mr-1" />
                  Risk Score
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(
                    selectedContract.risk
                  )}`}
                >
                  {selectedContract.risk}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Status</div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    selectedContract.status
                  )}`}
                >
                  {selectedContract.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Clauses Section */}
            <ClausesSection clauses={selectedContract.clauses} />

            {/* AI Insights Section */}
            <InsightsSection insights={selectedContract.insights} />
          </div>

          {/* Evidence Drawer */}
          <EvidenceDrawer evidence={selectedContract.evidence} />
        </div>
      );
    };

    export default ContractDetail;