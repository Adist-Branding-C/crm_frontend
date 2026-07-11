import axios from 'axios';
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
let isRefreshing = false;
let pendingRequests = [];
function flushPendingRequests(error, token) {
    pendingRequests.forEach(({ resolve, reject }) => {
        if (token)
            resolve(token);
        else
            reject(error);
    });
    pendingRequests = [];
}
function forceLogout() {
    clearAuthTokens();
    if (window.location.pathname !== AUTH_ROUTES.LOGIN) {
        window.location.href = AUTH_ROUTES.LOGIN;
    }
}
async function refreshAccessToken(refreshToken) {
    let lastError;
    for (let attempt = 1; attempt <= MAX_REFRESH_ATTEMPTS; attempt++) {
        try {
            const { data } = await axios.post(`${BASE_URL}${AUTH_API_ENDPOINTS.REFRESH}`, { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = data.data;
            setAuthTokens(accessToken, newRefreshToken);
            return accessToken;
        }
        catch (err) {
            lastError = err;
            const status = err?.response?.status;
            if (status === 401 || status === 400)
                break;
        }
    }
    throw lastError;
}
axiosInstance.interceptors.request.use((config) => {
    const accessToken = Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    console.error("requestInterceptor: Error", error);
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const isAuthLifecycleCall = originalRequest?.url?.includes(AUTH_API_ENDPOINTS.REFRESH) ||
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
                resolve: (token) => {
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
    }
    catch (refreshError) {
        flushPendingRequests(refreshError);
        forceLogout();
        return Promise.reject(refreshError);
    }
    finally {
        isRefreshing = false;
    }
});
export default axiosInstance;
//# sourceMappingURL=axiosInstance.js.map