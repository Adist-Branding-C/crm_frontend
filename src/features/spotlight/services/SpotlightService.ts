import axiosInstance from '../../../api/axiosInstance';
import { SPOTLIGHT_API_ENDPOINTS } from '../constants/spotlightApiEndpoints';
import type { SpotlightApiResponse, SpotlightRequestParams } from '../types';

class SpotlightService {
  async getLeads(params?: SpotlightRequestParams): Promise<SpotlightApiResponse> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });
    }

    const url = queryParams.toString()
      ? `${SPOTLIGHT_API_ENDPOINTS.LEADS}?${queryParams.toString()}`
      : SPOTLIGHT_API_ENDPOINTS.LEADS;

    const response = await axiosInstance.get<SpotlightApiResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data ?? null,
    };
  }
}

export const spotlightService = new SpotlightService();
