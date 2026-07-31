import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const RequireSuperAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user?.isSuperAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default RequireSuperAdmin;
