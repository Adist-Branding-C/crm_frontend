import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { DASHBOARD_API_ENDPOINTS } from '../constants/dashboardApiEndpoints';
import type { ApiResponse } from '../../../shared/types/common';
import type {
  GetWonDealsParams,
  WonDealsResponseData,
  GetLostDealsParams,
  LostDealsResponseData,
  GetInProgressDealsParams,
  InProgressDealsResponseData,
  DealStatisticsResponseData,
  GetDealStatisticsParams,
  GetDealByStageParams,
  DealByStageResponseData,
  GetTasksStatisticsParams,
  TasksStatisticsResponseData,
} from '../types';

/**
 * HTTP client for the Dashboard API - communicates with the backend only.
 *
 * Used by:
 * - dashboardService singleton, consumed by useWonDeals (Won Deals tile),
 *   useLostDeals (Lost Deals tile), useInProgressDeals (In Progress Deals tile),
 *   useDealPipeline (Deal Pipeline chart), useDealByStage (Deal by stage card),
 *   and useTasksStatistics (Tasks card).
 */
class DashboardService {
  async getWonDeals(params: GetWonDealsParams): Promise<ApiResponse<WonDealsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<WonDealsResponseData>>(
      DASHBOARD_API_ENDPOINTS.WON_DEALS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getLostDeals(params: GetLostDealsParams): Promise<ApiResponse<LostDealsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<LostDealsResponseData>>(
      DASHBOARD_API_ENDPOINTS.LOST_DEALS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getInProgressDeals(params: GetInProgressDealsParams): Promise<ApiResponse<InProgressDealsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<InProgressDealsResponseData>>(
      DASHBOARD_API_ENDPOINTS.IN_PROGRESS_DEALS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getDealStatistics(params: GetDealStatisticsParams): Promise<ApiResponse<DealStatisticsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<DealStatisticsResponseData>>(
      DASHBOARD_API_ENDPOINTS.DEALS_STATISTICS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getDealByStage(params: GetDealByStageParams): Promise<ApiResponse<DealByStageResponseData>> {
    const response = await axiosInstance.get<ApiResponse<DealByStageResponseData>>(
      DASHBOARD_API_ENDPOINTS.DEAL_BY_STAGE,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getTasksStatistics(params: GetTasksStatisticsParams): Promise<ApiResponse<TasksStatisticsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<TasksStatisticsResponseData>>(
      DASHBOARD_API_ENDPOINTS.TASKS_STATISTICS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const dashboardService = new DashboardService();
