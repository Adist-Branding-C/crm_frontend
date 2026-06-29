import axios from "axios";
import { AUTH_API_ENDPOINTS } from "../features/auth/constants/authApiEndpoints";
import type { RefreshTokenResponse } from "../features/auth/types/auth.types";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

const refreshAxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export const refreshTokenApi = async (refreshToken: string) => {
  console.log("refreshTokenApi: Calling refresh API");
  const response = await refreshAxiosInstance.post<RefreshTokenResponse>(
    AUTH_API_ENDPOINTS.REFRESH,
    { refreshToken },
  );
  return response.data;
};
