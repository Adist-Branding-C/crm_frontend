import axios from "axios";
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { AUTH_API_ENDPOINTS } from "../features/auth/constants/authApiEndpoints";
import { refreshTokenApi } from "./refreshTokenApi";
import { Logger } from "./utils/Logger";
import { TokenStorage } from "./utils/TokenStorage";
import { AuthRedirector } from "./utils/AuthRedirector";
import { RefreshQueue } from "./utils/RefreshQueue";
import type { RetryableRequestConfig } from "./utils/RefreshQueue";

export class ApiClient {
  readonly instance: AxiosInstance;
  private tokens = new TokenStorage();
  private redirector = new AuthRedirector(this.tokens);
  private refreshQueue = new RefreshQueue();

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
      timeout: 15000,
      headers: { "Content-Type": "application/json" },
    });

    this.instance.interceptors.request.use(
      (config) => this.attachAccessToken(config),
      (error) => {
        Logger.error("requestInterceptor: Error", error);
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        Logger.log("responseInterceptor: Response received", response.config.url);
        return response;
      },
      (error: AxiosError) => this.handleResponseError(error),
    );
  }

  private attachAccessToken(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const accessToken = this.tokens.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      Logger.log("requestInterceptor: Access token attached");
    }
    return config;
  }

  private isRefreshEndpoint(url: string | undefined): boolean {
    return Boolean(url?.includes(AUTH_API_ENDPOINTS.REFRESH));
  }

  private async handleResponseError(error: AxiosError): Promise<unknown> {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const shouldAttemptRefresh =
      originalRequest &&
      error.response?.status === 401 &&
      !this.isRefreshEndpoint(originalRequest.url) &&
      !originalRequest._retry;

    if (!shouldAttemptRefresh) {
      if (originalRequest && error.response?.status === 401) {
        Logger.log("responseInterceptor: Not retrying —", originalRequest.url);
        this.redirector.redirectToLogin();
      }
      return Promise.reject(error);
    }

    const refreshToken = this.tokens.getRefreshToken();
    if (!refreshToken) {
      Logger.log("responseInterceptor: No refresh token found");
      this.redirector.redirectToLogin();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (this.refreshQueue.isRefreshing) {
      return this.refreshQueue.wait(originalRequest);
    }

    return this.refreshAndRetry(originalRequest, refreshToken);
  }

  private async refreshAndRetry(
    originalRequest: RetryableRequestConfig,
    refreshToken: string,
  ): Promise<unknown> {
    this.refreshQueue.start();
    Logger.log("responseInterceptor: Calling refresh API");

    try {
      const { data } = await refreshTokenApi(refreshToken);
      const { accessToken, refreshToken: newRefreshToken } = data!;

      this.tokens.setTokens(accessToken, newRefreshToken);
      this.refreshQueue.resolveAll(accessToken, (config) => this.instance(config));

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      Logger.log("responseInterceptor: Retrying original request", originalRequest.url);
      return this.instance(originalRequest);
    } catch (refreshError) {
      Logger.error("responseInterceptor: Refresh failed", refreshError);
      this.refreshQueue.rejectAll(refreshError);
      this.redirector.redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      this.refreshQueue.stop();
    }
  }
}