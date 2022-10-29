import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as R from "ramda";
import { RootState } from "../app/store";

export interface Company {
  id: number;
  name: string;
  employeeIds: string[];
  address: string;
}

export interface CompanyState {
  value: Company[];
  selectedCompanies: number[];
  editableCompanyId?: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CompanyState = {
  value: [],
  selectedCompanies: [],
  editableCompanyId: undefined,
  status: "idle",
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    selectCompany: (state, action: PayloadAction<number>) => {
      if (state.selectedCompanies.includes(action.payload)) {
        const index = state.selectedCompanies.findIndex(
          (id) => id === action.payload
        );

        state.selectedCompanies = [
          ...state.selectedCompanies.slice(0, index),
          ...state.selectedCompanies.slice(index + 1),
        ];
      } else {
        state.selectedCompanies = [...state.selectedCompanies, action.payload];
      }
    },
    selectAllCompanies: (state) => {
      if (state.selectedCompanies.length === state.value.length) {
        state.selectedCompanies = [];
      } else {
        state.selectedCompanies = state.value.map((company) => company.id);
      }
    },
    loadCompanies: (state, action: PayloadAction<Company[]>) => {
      state.value = [...state.value, ...action.payload];
    },
    setEditableCompanyId: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.editableCompanyId = action.payload;
    },
    editCompanyData: (state, action: PayloadAction<Company>) => {
      const index = R.findIndex(R.propEq("id", action.payload.id), state.value);

      state.value[index] = action.payload;
    },
    createCompany: (state, action: PayloadAction<Company>) => {
      state.value = [...state.value, action.payload];
    },
    deleteCompany: (state) => {
      state.value = state.value.filter(
        (company) => !state.selectedCompanies.includes(company.id)
      );

      state.selectedCompanies = [];
    },
  },
});

export const {
  selectCompany,
  selectAllCompanies,
  loadCompanies,
  setEditableCompanyId,
  editCompanyData,
  createCompany,
  deleteCompany,
} = companySlice.actions;

export const getCompanies = (state: RootState) => state.company.value;
export const getSelectedCompanies = (state: RootState) =>
  state.company.selectedCompanies;
export const getEditableCompanyId = (state: RootState) =>
  state.company.editableCompanyId;

export default companySlice.reducer;
