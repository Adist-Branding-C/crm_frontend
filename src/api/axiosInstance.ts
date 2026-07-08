import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { AUTH_STORAGE_KEYS, AUTH_ROUTES } from '../features/auth/constants/auth.constants';
import { AUTH_API_ENDPOINTS } from '../features/auth/constants/authApiEndpoints';
import { refreshTokenApi } from './refreshTokenApi'; // adjust path to wherever refreshTokenApi lives

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  config: RetryableRequestConfig;
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

const isRefreshEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.includes(AUTH_API_ENDPOINTS.REFRESH);
};

const isAuthLifecycleEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  return url.includes(AUTH_API_ENDPOINTS.REFRESH) || url.includes(AUTH_API_ENDPOINTS.LOGIN);
};

let isRedirecting = false;

const forceLogout = () => {
  if (isRedirecting) return;
  isRedirecting = true;

  Cookies.remove(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  Cookies.remove(AUTH_STORAGE_KEYS.REFRESH_TOKEN);

  if (window.location.pathname !== AUTH_ROUTES.LOGIN) {
    window.location.href = AUTH_ROUTES.LOGIN;
  }
};

// ---- Request interceptor: attach access token ----
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ---- Response interceptor: single refresh-token flow ----
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (isAuthLifecycleEndpoint(originalRequest.url)) {
      forceLogout();
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      forceLogout();
      return Promise.reject(error);
    }

    const refreshToken = Cookies.get(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      forceLogout();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    isRefreshing = true;

    try {
      const data = await refreshTokenApi(refreshToken);
      const { accessToken, refreshToken: newRefreshToken } = data.data;

      Cookies.set(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      Cookies.set(AUTH_STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

      processPendingQueue(accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processPendingQueue(null, refreshError);
      forceLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;