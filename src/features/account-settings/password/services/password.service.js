import axiosInstance from '../../../../api/axiosInstance';
import { PASSWORD_API_ENDPOINTS } from '../constants/passwordApiEndpoints';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
class PasswordService {
    async changePassword(payload) {
        const response = await axiosInstance.post(PASSWORD_API_ENDPOINTS.CHANGE_PASSWORD, payload);
        return ServiceResponseUtil.normalize(response.data);
    }
}
export const passwordService = new PasswordService();
//# sourceMappingURL=password.service.js.map