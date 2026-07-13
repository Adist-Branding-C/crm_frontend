import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { AUTH_ROUTES } from '../features/auth/constants/auth.constants';

const SuperAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isSuperAdmin } = useAuth();
  if (isLoading) return null;
  if (!isSuperAdmin) {
    return <Navigate to={AUTH_ROUTES.DASHBOARD} replace />;
  }
  return children;
};

export default SuperAdminRoute;
