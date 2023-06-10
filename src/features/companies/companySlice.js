import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "./companyService";

const initialState = {
  companies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

export const getCompanies = createAsyncThunk(
  "companies/getAll",
  async (_, thunkAPI) => {
    try {
      return await companyService.getCompanies();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCompany = createAsyncThunk(
  "companies/create",
  async (companyData, thunkAPI) => {
    try {
      return await companyService.createCompany(companyData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete company
export const deleteCompany = createAsyncThunk(
  "companies/delete",
  async (id, thunkAPI) => {
    try {
      return await companyService.deleteCompany(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update
export const updateCompany = createAsyncThunk(
  "companies/update",
  async ({ id, companyName }, thunkAPI) => {
    try {
      return await companyService.updateCompany({ id, companyName });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies.push(action.payload);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = state.companies.filter(
          (company) => company._id !== action.payload.id
        );
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { companyName, id } = action.payload;

        const uu = state.companies.find((comp) => comp._id === id);
        if (uu) {
          uu.companyName = companyName;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = companySlice.actions;
export default companySlice.reducer;
