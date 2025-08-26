import { useEffect } from 'react';
import { useAuthContext } from '../providers/AuthProvider';

export const useAuth = () => {
  const { isAuthenticated, token, user, logout } = useAuthContext();

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
