import axiosInstance from '../../../api/axiosInstance';
import { AUTH_API_ENDPOINTS } from '../constants/authApiEndpoints';
class AuthService {
    async login(data) {
        const response = await axiosInstance.post(AUTH_API_ENDPOINTS.LOGIN, data);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async forgotPassword(data) {
        const response = await axiosInstance.post(AUTH_API_ENDPOINTS.FORGOT_PASSWORD, data);
        return {
            status: response.data.status,
            message: response.data.message,
        };
    }
    async resetPassword(data) {
        const response = await axiosInstance.post(AUTH_API_ENDPOINTS.RESET_PASSWORD, data);
        return {
            status: response.data.status,
            message: response.data.message,
        };
    }
    async logout() {
        await axiosInstance.post(AUTH_API_ENDPOINTS.LOGOUT);
    }
}
export const authService = new AuthService();
//# sourceMappingURL=AuthService.js.map