import Cookies from 'js-cookie';
import { AUTH_STORAGE_KEYS } from '../constants/auth.constants';

const REMEMBER_ME_KEY = 'crm_remember_me';

function isSecureContext(): boolean {
  return typeof window !== 'undefined' && window.location.protocol === 'https:';
}

function decodeTokenExpiry(token: string): Date | undefined {
  try {
    const payload = token.split('.')[1];
    if (!payload) return undefined;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
    return typeof decoded.exp === 'number' ? new Date(decoded.exp * 1000) : undefined;
  } catch {
    return undefined;
  }
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
