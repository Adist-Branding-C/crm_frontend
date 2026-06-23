import axiosInstance from '../../../../api/axiosInstance';
import { DEAL_API_ENDPOINTS } from '../constants/dealApiEndpoints';
import type { DealOption } from '../types/dealTask.types';

interface DealServiceResponse {
  status: boolean;
  message: string;
  data: DealOption[];
}

class DealService {
  async getAll(): Promise<DealOption[]> {
    try {
      const response = await axiosInstance.get<DealServiceResponse>(DEAL_API_ENDPOINTS.GET_ALL);
      if (response.data.status) {
        const rawData = response.data.data;
        return Array.isArray(rawData) ? rawData : [];
      }
      return [];
    } catch {
      return [];
    }
  }
}

export const dealService = new DealService();
