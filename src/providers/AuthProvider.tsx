import React, { createContext, useContext, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} from '../store/slices/authSlice';
import { AuthService } from '../services/auth/authService';
import { MockService } from '../services/mock/mockService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, token, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const login = async (email: string, password: string) => {
    dispatch(loginStart());
    try {
      const response = await AuthService.login({ email, password });
      const mockUser = MockService.getMockUser(email);
      if (!mockUser) {
        throw new Error('Usuário não encontrado');
      }

      dispatch(
        loginSuccess({
          user: {
            id: response.user.id.toString(),
            email: response.user.email,
            name: response.user.name,
            balance: mockUser.balance,
            accountNumber: mockUser.accountNumber,
          },
          token: response.token,
        })
      );
    } catch (loginError) {
      dispatch(
        loginFailure({
          message:
            loginError instanceof Error
              ? loginError.message
              : 'Credenciais inválidas',
        })
      );
    }
  };

  const handleLogout = () => dispatch(logout());
  const handleClearError = () => dispatch(clearError());

  const value: AuthContextType = {
    isAuthenticated,
    user,
    token,
    login,
    logout: handleLogout,
    isLoading,
    error,
    clearError: handleClearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
