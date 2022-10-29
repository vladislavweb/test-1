import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as R from "ramda";
import { RootState } from "../app/store";

export interface Employee {
  id: string;
  companyId: number;
  firstName: string;
  lastName: string;
  position: string;
}

export interface EmployeeState {
  value: Employee[];
  selectedEmployees: string[];
  editableEmployeeId?: string;
  status: "idle" | "loading" | "failed";
}

const initialState: EmployeeState = {
  value: [],
  selectedEmployees: [],
  editableEmployeeId: undefined,
  status: "idle",
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    selectEmployee: (state, action: PayloadAction<string>) => {
      if (state.selectedEmployees.includes(action.payload)) {
        const index = state.selectedEmployees.findIndex(
          (id) => id === action.payload
        );

        state.selectedEmployees = [
          ...state.selectedEmployees.slice(0, index),
          ...state.selectedEmployees.slice(index + 1),
        ];
      } else {
        state.selectedEmployees = [...state.selectedEmployees, action.payload];
      }
    },
    selectAllEmployees: (state) => {
      if (state.selectedEmployees.length === state.value.length) {
        state.selectedEmployees = [];
      } else {
        state.selectedEmployees = state.value.map((company) => company.id);
      }
    },
    loadEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.value = action.payload;
    },
    setEditableEmployeeId: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.editableEmployeeId = action.payload;
    },
    editEmployeeData: (state, action: PayloadAction<Employee>) => {
      const index = R.findIndex(R.propEq("id", action.payload.id), state.value);

      state.value[index] = action.payload;
    },
    createEmployee: (state, action: PayloadAction<Employee>) => {
      state.value = [...state.value, action.payload];
    },
    deleteEmployee: (state) => {
      state.value = state.value.filter(
        (employee) => !state.selectedEmployees.includes(employee.id)
      );

      state.selectedEmployees = [];
    },
    updateEmployees: (state, action: PayloadAction<Employee[]>) => {
      // state.value = action.payload;
    },
  },
});

export const {
  selectEmployee,
  selectAllEmployees,
  loadEmployees,
  setEditableEmployeeId,
  editEmployeeData,
  createEmployee,
  deleteEmployee,
  updateEmployees,
} = employeeSlice.actions;

export const getEmployees = (state: RootState) => state.employee.value;
export const getSelectedEmployees = (state: RootState) =>
  state.employee.selectedEmployees;
export const getEditableEmployeeId = (state: RootState) =>
  state.employee.editableEmployeeId;

export default employeeSlice.reducer;
