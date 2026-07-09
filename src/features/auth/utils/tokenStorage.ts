import Cookies from 'js-cookie';
import { AUTH_STORAGE_KEYS } from '../constants/auth.constants';

const REMEMBER_ME_KEY = 'crm_remember_me';

function isSecureContext(): boolean {
  return typeof window !== 'undefined' && window.location.protocol === 'https:';
}

interface AccessTokenClaims {
  authId?: string;
  staffId?: string;
  companyId?: string;
  exp?: number;
}

function decodeTokenPayload(token: string): AccessTokenClaims | undefined {
  try {
    const payload = token.split('.')[1];
    if (!payload) return undefined;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return undefined;
  }
}

function decodeTokenExpiry(token: string): Date | undefined {
  const decoded = decodeTokenPayload(token);
  return typeof decoded?.exp === 'number' ? new Date(decoded.exp * 1000) : undefined;
}

/**
 * Reads staffId/companyId directly from the current access token's JWT claims.
 * The token always carries these (set at issue time on the backend), so this is the
 * source of truth — unlike the cached `user` object in localStorage, it can't go stale
 * for sessions that logged in before some other field was added to that cache.
 */
export function getAccessTokenClaims(): AccessTokenClaims | undefined {
  const token = Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  return token ? decodeTokenPayload(token) : undefined;
}

function isRememberMeEnabled(): boolean {
  return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
}

/**
 * Persists the access/refresh token pair as cookies.
 * When `rememberMe` is omitted, the previously stored preference (set at login) is reused,
 * so silent token refreshes keep the same persistence behavior the user originally chose.
 */
export function setAuthTokens(accessToken: string, refreshToken: string, rememberMe?: boolean): void {
  if (rememberMe !== undefined) {
    localStorage.setItem(REMEMBER_ME_KEY, String(rememberMe));
  }
  const persist = rememberMe ?? isRememberMeEnabled();

  const cookieOptions = {
    sameSite: 'strict' as const,
    secure: isSecureContext(),
  };

  Cookies.set(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken, {
    ...cookieOptions,
    expires: persist ? decodeTokenExpiry(accessToken) : undefined,
  });
  Cookies.set(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken, {
    ...cookieOptions,
    expires: persist ? decodeTokenExpiry(refreshToken) : undefined,
  });
}

export function clearAuthTokens(): void {
  Cookies.remove(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  Cookies.remove(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
  localStorage.removeItem(REMEMBER_ME_KEY);
}
