import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TransferState,
  TransferFilters,
} from '../../types/store/slices/transfer.types';
import { Transfer } from '../../types/models';

const initialState: TransferState = {
  transfers: [],
  isLoading: false,
  error: null,
  filters: {
    search: '',
    minValue: 0,
    maxValue: 0,
    startDate: null,
    endDate: null,
  },
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    fetchTransfersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTransfersSuccess: (state, action: PayloadAction<Transfer[]>) => {
      state.transfers = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchTransfersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createTransferStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createTransferSuccess: (state, action: PayloadAction<Transfer>) => {
      state.transfers.unshift(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    createTransferFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<TransferFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  fetchTransfersStart,
  fetchTransfersSuccess,
  fetchTransfersFailure,
  createTransferStart,
  createTransferSuccess,
  createTransferFailure,
  updateFilters,
  clearFilters,
} = transferSlice.actions;

export default transferSlice.reducer;
