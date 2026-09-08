import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import type { ApiResponse } from '../../../shared/types/common';
import type { WinRateData, StageFunnelData, AnalyticsPeriod } from '../types';

/**
 * HTTP client for the deal-analytics endpoints under `/deals/statistics/*` -
 * communicates with the backend only.
 *
 * Used by:
 * - useWinRate, useStageFunnel
 */
class DealAnalyticsService {
  async getWinRate(period?: AnalyticsPeriod, from?: string, to?: string): Promise<ApiResponse<WinRateData>> {
    const response = await axiosInstance.get<ApiResponse<WinRateData>>('/deals/statistics/win-rate', {
      params: period ? { period, from, to } : {},
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getStageFunnel(pipelineId?: number): Promise<ApiResponse<StageFunnelData>> {
    const response = await axiosInstance.get<ApiResponse<StageFunnelData>>('/deals/statistics/stage-funnel', {
      params: pipelineId !== undefined ? { pipelineId } : {},
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const dealAnalyticsService = new DealAnalyticsService();
