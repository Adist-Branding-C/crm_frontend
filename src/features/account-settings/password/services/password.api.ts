import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { PASSWORD_API_ENDPOINTS } from '../constants';
import type { ChangePasswordPayload } from '../types';

export class PasswordApiService {
  async changePassword(payload: ChangePasswordPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post<ApiResponse<null>>(PASSWORD_API_ENDPOINTS.CHANGE_PASSWORD, payload);
    return response.data;
  }
}
