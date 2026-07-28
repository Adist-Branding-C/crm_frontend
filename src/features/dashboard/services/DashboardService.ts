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
  GetActivitiesStatisticsParams,
  ActivitiesStatisticsResponseData,
  GetCampaignsStatisticsParams,
  CampaignsStatisticsResponseData,
  GetLeadStatusStatisticsParams,
  LeadStatusStatisticsResponseData,
  GetLeadSourceStatisticsParams,
  LeadSourceStatisticsResponseData,
  GetLeadPurposeStatisticsParams,
  LeadPurposeStatisticsResponseData,
  GetLeadOverviewStatisticsParams,
  LeadOverviewStatisticsResponseData,
  GetPipelineAmountParams,
  PipelineAmountResponseData,
  GetFollowupCountParams,
  FollowupCountResponseData,
  GetCallLogsCountParams,
  CallLogsCountResponseData,
} from '../types';

/**
 * HTTP client for the Dashboard API - communicates with the backend only.
 *
 * Used by:
 * - dashboardService singleton, consumed by useWonDeals (Won Deals tile),
 *   useLostDeals (Lost Deals tile), useInProgressDeals (In Progress Deals tile),
 *   useDealPipeline (Deal Pipeline chart), useDealByStage (Deal by stage card),
 *   useTasksStatistics (Tasks card), useActivitiesStatistics (Activities
 *   statistics widget), and useCampaignsStatistics (Campaigns widget).
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

  async getActivitiesStatistics(
    params: GetActivitiesStatisticsParams,
  ): Promise<ApiResponse<ActivitiesStatisticsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<ActivitiesStatisticsResponseData>>(
      DASHBOARD_API_ENDPOINTS.ACTIVITIES_STATISTICS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getCampaignsStatistics(
    params: GetCampaignsStatisticsParams,
  ): Promise<ApiResponse<CampaignsStatisticsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<CampaignsStatisticsResponseData>>(
      DASHBOARD_API_ENDPOINTS.CAMPAIGNS_STATISTICS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getLeadStatusStatistics(
    params: GetLeadStatusStatisticsParams,
  ): Promise<ApiResponse<LeadStatusStatisticsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<LeadStatusStatisticsResponseData>>(
      DASHBOARD_API_ENDPOINTS.LEAD_STATUS_STATISTICS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getLeadSourceStatistics(
    params: GetLeadSourceStatisticsParams,
  ): Promise<ApiResponse<LeadSourceStatisticsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<LeadSourceStatisticsResponseData>>(
      DASHBOARD_API_ENDPOINTS.LEAD_SOURCE_STATISTICS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getLeadPurposeStatistics(
    params: GetLeadPurposeStatisticsParams,
  ): Promise<ApiResponse<LeadPurposeStatisticsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<LeadPurposeStatisticsResponseData>>(
      DASHBOARD_API_ENDPOINTS.LEAD_PURPOSE_STATISTICS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getLeadOverviewStatistics(
    params: GetLeadOverviewStatisticsParams,
  ): Promise<ApiResponse<LeadOverviewStatisticsResponseData>> {
    const response = await axiosInstance.get<ApiResponse<LeadOverviewStatisticsResponseData>>(
      DASHBOARD_API_ENDPOINTS.LEAD_OVERVIEW_STATISTICS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getPipelineAmountStatistics(
    params: GetPipelineAmountParams,
  ): Promise<ApiResponse<PipelineAmountResponseData>> {
    const response = await axiosInstance.get<ApiResponse<PipelineAmountResponseData>>(
      DASHBOARD_API_ENDPOINTS.DEALS_PIPELINE_AMOUNT,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getFollowupCount(
    params: GetFollowupCountParams,
  ): Promise<ApiResponse<FollowupCountResponseData>> {
    const response = await axiosInstance.get<ApiResponse<FollowupCountResponseData>>(
      DASHBOARD_API_ENDPOINTS.FOLLOWUP_LEADS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getCallLogsCount(
    params: GetCallLogsCountParams,
  ): Promise<ApiResponse<CallLogsCountResponseData>> {
    const response = await axiosInstance.get<ApiResponse<CallLogsCountResponseData>>(
      DASHBOARD_API_ENDPOINTS.CALL_LOGS,
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
