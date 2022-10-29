import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface CompanyTable {
  showEditModal: boolean;
  showCreateModal: boolean;
}

interface EmployeesTable {
  showEditModal: boolean;
  showCreateModal: boolean;
}

interface CompanyState {
  companyTable: CompanyTable;
  employeesTable: EmployeesTable;
}

const initialState: CompanyState = {
  companyTable: {
    showEditModal: false,
    showCreateModal: false,
  },
  employeesTable: {
    showEditModal: false,
    showCreateModal: false,
  },
};

export const uiSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    openEditCompanyModal: (state) => {
      state.companyTable.showEditModal = true;
    },
    closeEditCompanyModal: (state) => {
      state.companyTable.showEditModal = false;
    },
    openEditEmployeesModal: (state) => {
      state.employeesTable.showEditModal = true;
    },
    closeEditEmployeesModal: (state) => {
      state.employeesTable.showEditModal = false;
    },
    openCreateCompanyModal: (state) => {
      state.companyTable.showCreateModal = true;
    },
    closeCreateCompanyModal: (state) => {
      state.companyTable.showCreateModal = false;
    },
    openCreateEmployeeModal: (state) => {
      state.employeesTable.showCreateModal = true;
    },
    closeCreateEmployeeModal: (state) => {
      state.employeesTable.showCreateModal = false;
    },
  },
});

export const {
  openEditCompanyModal,
  closeEditCompanyModal,
  openEditEmployeesModal,
  closeEditEmployeesModal,
  openCreateCompanyModal,
  closeCreateCompanyModal,
  openCreateEmployeeModal,
  closeCreateEmployeeModal,
} = uiSlice.actions;

export const getEditCompanyModal = (state: RootState) =>
  state.ui.companyTable.showEditModal;
export const getEditEmployeeModal = (state: RootState) =>
  state.ui.employeesTable.showEditModal;
export const getCreateCompanyModal = (state: RootState) =>
  state.ui.companyTable.showCreateModal;
export const getCreateEmployeeModal = (state: RootState) =>
  state.ui.employeesTable.showCreateModal;

export default uiSlice.reducer;
