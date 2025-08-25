import { createStore } from '../index';
import { AuthService } from '../../services/auth/authService';
import { MockService } from '../../services/mock/mockService';

interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  accountNumber: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = createStore<AuthState>(
  'auth',
  initialState,
  (set, _get) => ({
    login: async (email: string, password: string) => {
      set((state: AuthState) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const response = await AuthService.login({ email, password });
        const mockUser = MockService.getMockUser(email);

        if (!mockUser) {
          throw new Error('Usuário não encontrado');
        }

        const user: User = {
          id: response.user.id.toString(),
          email: response.user.email,
          name: response.user.name,
          balance: mockUser.balance,
          accountNumber: mockUser.accountNumber,
        };

        set((state: AuthState) => {
          state.user = user;
          state.token = response.token;
          state.isAuthenticated = true;
          state.isLoading = false;
        });
      } catch (error) {
        set((state: AuthState) => {
          state.error =
            error instanceof Error ? error.message : 'Credenciais inválidas';
          state.isLoading = false;
        });
      }
    },

    logout: () => {
      set((state: AuthState) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
    },

    setUser: (user: User) => {
      set((state: AuthState) => {
        state.user = user;
      });
    },

    setToken: (token: string) => {
      set((state: AuthState) => {
        state.token = token;
        state.isAuthenticated = true;
      });
    },

    clearError: () => {
      set((state: AuthState) => {
        state.error = null;
      });
    },

    updateBalance: (newBalance: number) => {
      set((state: AuthState) => {
        if (state.user) {
          state.user.balance = newBalance;
        }
      });
    },
  })
);
