import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { AUTH_STORAGE_KEYS, AUTH_ROUTES } from '../features/auth/constants/auth.constants';
import { AUTH_API_ENDPOINTS } from '../features/auth/constants/authApiEndpoints';
import { setAuthTokens, clearAuthTokens } from '../features/auth/utils/tokenStorage';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
const MAX_REFRESH_ATTEMPTS = 3;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Prevent firing the same redirect/cookie-clear logic repeatedly for a burst of failing requests.
let isRedirecting = false;

const redirectToLogin = () => {
  if (isRedirecting || window.location.pathname === LOGIN_PATH) return;
  isRedirecting = true;

  log("redirectToLogin: Redirecting to /login");
  Cookies.remove(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  Cookies.remove(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  window.location.href = LOGIN_PATH;
};

const isRefreshEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.includes(AUTH_API_ENDPOINTS.REFRESH);
};

let isRefreshing = false;
let pendingQueue: Array<{
  config: RetryableRequestConfig;
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}> = [];

const processPendingQueue = (token: string | null, error: unknown = null) => {
  pendingQueue.forEach(({ config, resolve, reject }) => {
    if (token && !error) {
      config.headers.Authorization = `Bearer ${token}`;
      resolve(axiosInstance(config));
    } else {
      reject(error);
    }
  });
  pendingQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      log("requestInterceptor: Access token attached");
    }

    return config;
  },
  (error) => {
    console.error("requestInterceptor: Error", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    log("responseInterceptor: Response received", response.config.url);
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    log("responseInterceptor: 401 detected on", originalRequest.url);

    if (isRefreshEndpoint(originalRequest.url)) {
      log("responseInterceptor: Refresh endpoint failed — not retrying");
      redirectToLogin();
      return Promise.reject(error);
    }

 
    if (originalRequest._retry) {
      log("responseInterceptor: Already retried once — giving up");
      redirectToLogin();
      return Promise.reject(error);
    }

    const refreshToken = Cookies.get(AUTH_STORAGE_KEYS.REFRESH_TOKEN);

    if (!refreshToken) {
      log("responseInterceptor: No refresh token found");
      redirectToLogin();
      return Promise.reject(error);
    }

    log("responseInterceptor: Refresh token found");
    originalRequest._retry = true;

    if (isRefreshing) {
      log("responseInterceptor: Refresh already in progress — queueing request");
      return new Promise((resolve, reject) => {
        pendingQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    isRefreshing = true;
    log("responseInterceptor: Calling refresh API");

    try {
      const data = await refreshTokenApi(refreshToken);

      log("responseInterceptor: Refresh API success",data);

      const { accessToken, refreshToken: newRefreshToken } = data.data;

      Cookies.set(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      Cookies.set(AUTH_STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

      processPendingQueue(accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      log("responseInterceptor: Retrying original request", originalRequest.url);
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.error("responseInterceptor: Refresh failed", refreshError);
      processPendingQueue(null, refreshError);
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

let isRefreshing = false;
let pendingRequests: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function flushPendingRequests(error: unknown, token?: string) {
  pendingRequests.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  pendingRequests = [];
}

function forceLogout() {
  clearAuthTokens();
  if (window.location.pathname !== AUTH_ROUTES.LOGIN) {
    window.location.href = AUTH_ROUTES.LOGIN;
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_REFRESH_ATTEMPTS; attempt++) {
    try {
      const { data } = await axios.post(`${BASE_URL}${AUTH_API_ENDPOINTS.REFRESH}`, { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = data.data;
      setAuthTokens(accessToken, newRefreshToken);
      return accessToken;
    } catch (err) {
      lastError = err;
      const status = (err as AxiosError)?.response?.status;
      if (status === 401 || status === 400) break;
    }
  }

  throw lastError;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status;

    const isAuthLifecycleCall =
      originalRequest?.url?.includes(AUTH_API_ENDPOINTS.REFRESH) ||
      originalRequest?.url?.includes(AUTH_API_ENDPOINTS.LOGIN);

    if (status !== 401 || !originalRequest || isAuthLifecycleCall) {
      return Promise.reject(error);
    }

    originalRequest._retryCount = originalRequest._retryCount ?? 0;

    if (originalRequest._retryCount >= MAX_REFRESH_ATTEMPTS) {
      forceLogout();
      return Promise.reject(error);
    }
    originalRequest._retryCount += 1;

    const refreshToken = Cookies.get(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      forceLogout();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      flushPendingRequests(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      flushPendingRequests(refreshError);
      forceLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
