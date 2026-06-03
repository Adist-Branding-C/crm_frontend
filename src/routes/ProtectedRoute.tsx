import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_ROUTES } from '../features/auth/constants/auth.constants';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('crm_token');
  if (!isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.LOGIN} replace />;
  }
  return children;
};

export default ProtectedRoute;
