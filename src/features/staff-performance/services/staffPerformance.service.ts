import axiosInstance from '../../../api/axiosInstance';
import type { StaffPerformanceItem } from '../types';

class StaffPerformanceService {
  async getStaffPerformance(dateFrom?: string, dateTo?: string) {
    const response = await axiosInstance.get('/staff/performance', {
      params: {
        ...(dateFrom ? { dateFrom } : {}),
        ...(dateTo ? { dateTo } : {}),
      },
    });
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data as StaffPerformanceItem[],
    };
  }
}

export const staffPerformanceService = new StaffPerformanceService();
