import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import companySlice from "../reducers/companySlice";
import employeeSlice from "../reducers/employeeSlice";
import uiSlice from "../reducers/uiSlice";

export const store = configureStore({
  reducer: {
    company: companySlice,
    employee: employeeSlice,
    ui: uiSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
