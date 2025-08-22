import React from 'react';
// import { useAuthStore } from '../store/auth/authStore';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};
