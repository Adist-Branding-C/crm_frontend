import axiosInstance from '../../../api/axiosInstance';
import { PROFILE_API_ENDPOINTS } from '../constants';
class ProfileService {
    async getProfile() {
        const response = await axiosInstance.get(PROFILE_API_ENDPOINTS.PROFILE);
        return response.data;
    }
    async updateProfile(payload) {
        const body = {
            companyName: payload.name,
            email: payload.email,
            phone: payload.mobile,
            address: payload.address,
            gstNumber: payload.gstNumber,
        };
        const response = await axiosInstance.patch(PROFILE_API_ENDPOINTS.PROFILE, body);
        return response.data;
    }
}
export const profileService = new ProfileService();
//# sourceMappingURL=profile.service.js.map