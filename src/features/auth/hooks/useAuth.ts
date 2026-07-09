import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AUTH_STORAGE_KEYS, AUTH_ROUTES } from '../constants/auth.constants';
import type { AuthUser } from '../types/auth.types';
import { authService } from '../services/AuthService';
import { clearAuthTokens, getAccessTokenClaims } from '../utils/tokenStorage';

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

  // staffId/companyId come from the JWT itself, not the cached `user` object — the token is
  // always current (reissued on every login and refresh), while `user` can be a stale snapshot
  // from a session that logged in before a field like this was added to what gets cached.
  const claims = getAccessTokenClaims();
  if (claims?.staffId && user) {
    const companyId = claims.companyId ?? user.companyId;
    user = { ...user, staffId: claims.staffId, ...(companyId !== undefined ? { companyId } : {}) };
  }

  return { isAuthenticated, isLoading, user, logout };
};
