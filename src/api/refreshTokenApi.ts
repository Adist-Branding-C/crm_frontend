import { AUTH_API_ENDPOINTS } from "../features/auth/constants/authApiEndpoints";
import type { ApiResponse } from "../shared/types/common";
import type { RefreshTokenData } from "../features/auth/types/auth.types";
import { refreshAxiosInstance } from "./refreshAxiosInstance";

export const refreshTokenApi = async (refreshToken: string) => {
  console.log("refreshTokenApi: Calling refresh API");
  const response = await refreshAxiosInstance.post<ApiResponse<RefreshTokenData>>(
    AUTH_API_ENDPOINTS.REFRESH,
    { refreshToken },
  );
  return response.data;
};