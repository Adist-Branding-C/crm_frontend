import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AUTH_STORAGE_KEYS, AUTH_ROUTES } from '../constants/auth.constants';
import type { AuthUser } from '../types/auth.types';
import { authService } from '../services/AuthService';
import { clearAuthTokens } from '../utils/tokenStorage';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN));
    setIsLoading(false);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Best-effort server-side revoke; local session must still be cleared even if this fails.
    } finally {
      clearAuthTokens();
      setIsAuthenticated(false);
      navigate(AUTH_ROUTES.LOGIN);
    }
  }, [navigate]);

  let user: AuthUser | null = null;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
    user = stored ? JSON.parse(stored) : null;
  } catch {
    user = null;
  }

  return { isAuthenticated, isLoading, user, logout };
};
