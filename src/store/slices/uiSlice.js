import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
  isUploadModalOpen: false,
  uploadFiles: [],
  isUserDropdownOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openUploadModal: (state) => {
      state.isUploadModalOpen = true;
    },
    closeUploadModal: (state) => {
      state.isUploadModalOpen = false;
      state.uploadFiles = [];
    },
    addUploadFile: (state, action) => {
      const newFile = {
        ...action.payload,
        status: "uploading",
        progress: 0,
      };
      state.uploadFiles.push(newFile);
    },
    updateUploadFile: (state, action) => {
      const { id, updates } = action.payload;
      const fileIndex = state.uploadFiles.findIndex((file) => file.id === id);
      if (fileIndex !== -1) {
        state.uploadFiles[fileIndex] = {
          ...state.uploadFiles[fileIndex],
          ...updates,
        };
      }
    },
    removeUploadFile: (state, action) => {
      state.uploadFiles = state.uploadFiles.filter(
        (file) => file.id !== action.payload
      );
    },
    toggleUserDropdown: (state) => {
      state.isUserDropdownOpen = !state.isUserDropdownOpen;
    },
    closeUserDropdown: (state) => {
      state.isUserDropdownOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  openUploadModal,
  closeUploadModal,
  addUploadFile,
  updateUploadFile,
  removeUploadFile,
  toggleUserDropdown,
  closeUserDropdown,
} = uiSlice.actions;

export default uiSlice.reducer;