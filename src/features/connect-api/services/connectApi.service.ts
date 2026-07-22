import axiosInstance from '../../../api/axiosInstance';
import { CONNECT_API_ENDPOINTS } from '../constants/connectApiEndpoints';
import type { ApiTokenData } from '../types';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import type { ServiceResponseShape } from '../../../shared/types/serviceResponse.types';

class ConnectApiService {
  async getApiToken(): Promise<ServiceResponseShape<ApiTokenData>> {
    const response = await axiosInstance.get<ServiceResponseShape<ApiTokenData>>(
      CONNECT_API_ENDPOINTS.GET_TOKEN
    );
    return ServiceResponseUtil.normalize(response.data);
  }
}

export const connectApiService = new ConnectApiService();
