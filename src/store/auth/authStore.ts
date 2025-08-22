import { createStore } from '../index';

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
    login: async (email: string, _password: string) => {
      set((state: AuthState) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockUser: User = {
          id: '1',
          email,
          name: 'João Silva',
          balance: 5000.0,
          accountNumber: '1234-5678-9012-3456',
        };

        const mockToken = 'mock-jwt-token';

        set((state: AuthState) => {
          state.user = mockUser;
          state.token = mockToken;
          state.isAuthenticated = true;
          state.isLoading = false;
        });
      } catch (error) {
        set((state: AuthState) => {
          state.error =
            error instanceof Error ? error.message : 'Erro no login';
          state.isLoading = false;
        });
      }
    },

    logout: () => {
      set((state: AuthState) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
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
