import Cookies from "js-cookie";
import { AUTH_STORAGE_KEYS } from "../../features/auth/constants/auth.constants";

/** Reads/writes the access + refresh token cookies. Only place cookie keys are touched. */
export class TokenStorage {
  getAccessToken(): string | undefined {
    return Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken(): string | undefined {
    return Cookies.get(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    Cookies.set(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    Cookies.set(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  clearTokens(): void {
    Cookies.remove(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    Cookies.remove(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  }
}