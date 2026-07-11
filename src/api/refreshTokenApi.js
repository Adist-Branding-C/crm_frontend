import axios from "axios";
import { AUTH_API_ENDPOINTS } from "../features/auth/constants/authApiEndpoints";
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";
const refreshAxiosInstance = axios.create({
    baseURL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
});
export const refreshTokenApi = async (refreshToken) => {
    console.log("refreshTokenApi: Calling refresh API");
    const response = await refreshAxiosInstance.post(AUTH_API_ENDPOINTS.REFRESH, { refreshToken });
    return response.data;
};
//# sourceMappingURL=refreshTokenApi.js.map