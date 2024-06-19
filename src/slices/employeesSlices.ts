import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { EmployeesState } from "../utility/interfaces";



const initialState: EmployeesState = {
  employeesList: {
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  },
  loading: false,
  error: null,
};

export const getEmpList = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, skip }: { limit: number; skip: number }) => {
    try {
      const response = await axios.get("https://dummyjson.com/products", {
        params: {
          limit,
          skip,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch employees");
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    empIdDataUpdate: (state, action: PayloadAction<any>) => {
      const updatedProduct = action.payload;
      state.employeesList.products = state.employeesList.products.map(
        (product) =>
          product.id === updatedProduct.id
            ? { ...product, ...updatedProduct }
            : product
      );
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getEmpList.pending, (state: EmployeesState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getEmpList.fulfilled,
        (state: EmployeesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.employeesList = action.payload;
        }
      )
      .addCase(getEmpList.rejected, (state: EmployeesState, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { empIdDataUpdate } = employeesSlice.actions;
export default employeesSlice.reducer;
