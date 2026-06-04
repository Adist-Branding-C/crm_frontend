import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AUTH_STORAGE_KEYS, AUTH_ROUTES } from '../constants/auth.constants';
import type { AuthUser } from '../types/auth.types';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN));
  }, []);

  const logout = useCallback(() => {
    Cookies.remove(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    Cookies.remove(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    setIsAuthenticated(false);
    navigate(AUTH_ROUTES.LOGIN);
  }, [navigate]);

  let user: AuthUser | null = null;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
    user = stored ? JSON.parse(stored) : null;
  } catch {
    user = null;
  }

  return { isAuthenticated, user, logout };
};
