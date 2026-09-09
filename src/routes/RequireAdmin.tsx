import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import AccessDenied from './AccessDenied';

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user?.isAdmin && !user?.isSuperAdmin) {
    return <AccessDenied />;
  }
  return <>{children}</>;
};

export default RequireAdmin;
