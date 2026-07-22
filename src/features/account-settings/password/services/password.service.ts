import axiosInstance from '../../../../api/axiosInstance';
import { PASSWORD_API_ENDPOINTS } from '../constants/passwordApiEndpoints';
import type { ChangePasswordPayload, ChangePasswordResponse } from '../types';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';

class PasswordService {
  async changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
    const response = await axiosInstance.post<ChangePasswordResponse>(
      PASSWORD_API_ENDPOINTS.CHANGE_PASSWORD,
      payload
    );
    return ServiceResponseUtil.normalize(response.data);
  }
}

export const passwordService = new PasswordService();
