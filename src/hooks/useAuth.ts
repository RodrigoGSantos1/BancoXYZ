import { useEffect } from 'react';
import { useAuthStore } from '../store/auth/authStore';

export const useAuth = () => {
  const { isAuthenticated, token, user, logout } = useAuthStore();

  useEffect(() => {
    if (token && !isAuthenticated) {
      logout();
    }
  }, [token, isAuthenticated, logout]);

  return {
    isAuthenticated,
    token,
    user,
    logout,
  };
};
