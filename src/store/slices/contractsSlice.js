import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contracts: [],
  selectedContract: null,
  isLoading: false,
  error: null,
  searchQuery: "",
  statusFilter: "all",
  riskFilter: "all",
  currentPage: 1,
  itemsPerPage: 10,
  isEvidenceDrawerOpen: false,
};

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    fetchContractsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchContractsSuccess: (state, action) => {
      state.isLoading = false;
      state.contracts = action.payload;
      state.error = null;
    },
    fetchContractsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchContractDetailStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchContractDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.selectedContract = action.payload;
      state.error = null;
    },
    fetchContractDetailFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.currentPage = 1;
    },
    setRiskFilter: (state, action) => {
      state.riskFilter = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    toggleEvidenceDrawer: (state) => {
      state.isEvidenceDrawerOpen = !state.isEvidenceDrawerOpen;
    },
    closeEvidenceDrawer: (state) => {
      state.isEvidenceDrawerOpen = false;
    },
    clearSelectedContract: (state) => {
      state.selectedContract = null;
      state.isEvidenceDrawerOpen = false;
    },
  },
});

export const {
  fetchContractsStart,
  fetchContractsSuccess,
  fetchContractsFailure,
  fetchContractDetailStart,
  fetchContractDetailSuccess,
  fetchContractDetailFailure,
  setSearchQuery,
  setStatusFilter,
  setRiskFilter,
  setCurrentPage,
  toggleEvidenceDrawer,
  closeEvidenceDrawer,
  clearSelectedContract,
} = contractsSlice.actions;

export default contractsSlice.reducer;
