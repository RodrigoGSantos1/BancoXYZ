import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthState,
  LoginSuccessPayload,
  AuthError,
} from '../../types/store/slices/auth.types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<AuthError>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = action.payload.message;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserBalance: (
      state,
      action: PayloadAction<{ amount: number; operation: 'credit' | 'debit' }>
    ) => {
      if (state.user) {
        const { amount, operation } = action.payload;
        if (operation === 'credit') {
          state.user.balance += amount;
        } else {
          state.user.balance -= amount;
        }
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  updateUserBalance,
} = authSlice.actions;
export default authSlice.reducer;
