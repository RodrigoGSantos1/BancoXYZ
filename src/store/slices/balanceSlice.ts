import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BalanceState,
  UpdateBalancePayload,
} from '../../types/store/slices/balance.types';

const initialState: BalanceState = {
  balance: 0,
  accountNumber: '',
  isLoading: false,
  error: null,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    fetchBalanceStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBalanceSuccess: (
      state,
      action: PayloadAction<{ balance: number; accountNumber: string }>
    ) => {
      state.balance = action.payload.balance;
      state.accountNumber = action.payload.accountNumber;
      state.isLoading = false;
      state.error = null;
    },
    fetchBalanceFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateBalance: (state, action: PayloadAction<UpdateBalancePayload>) => {
      const { amount, operation } = action.payload;
      if (operation === 'credit') {
        state.balance += amount;
      } else {
        state.balance -= amount;
      }
    },
  },
});

export const {
  fetchBalanceStart,
  fetchBalanceSuccess,
  fetchBalanceFailure,
  updateBalance,
} = balanceSlice.actions;

export default balanceSlice.reducer;
