import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import type { ApiResponse } from '../../../shared/types/common';
import type {
  ForecastData,
  WinRateData,
  StageFunnelData,
  AnalyticsPeriod,
  ReportPeriod,
  ForecastByPeriodData,
  VelocityData,
  WinLossReasonsData,
  SourceConversionRow,
  AgingDealsData,
  AgingDealsFilters,
  SizeDistributionData,
  OwnerLeaderboardRow,
  DeletedDealsData,
  DeletedDealsFilters,
  DealExportHistoryData,
  DealExportHistoryFilters,
  DealExportHistoryItem,
  CreateDealExportPayload,
  CreateDealExportResult,
} from '../types';

interface ForecastByPeriodFilters {
  period: ReportPeriod;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
  agentId?: number | undefined;
}

interface VelocityFilters {
  period?: AnalyticsPeriod | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
  agentId?: number | undefined;
  stageId?: number | undefined;
}

interface WinLossReasonsFilters {
  period?: AnalyticsPeriod | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
  agentId?: number | undefined;
}

interface SourceConversionFilters {
  period?: AnalyticsPeriod | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
  sourceIds?: string | undefined;
}

interface OwnerLeaderboardFilters {
  period?: AnalyticsPeriod | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
}

interface SizeDistributionFilters {
  currency?: string | undefined;
  period?: AnalyticsPeriod | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pipelineId?: number | undefined;
}

/**
 * HTTP client for the deal-analytics endpoints under `/deals/statistics/*` -
 * communicates with the backend only.
 *
 * Used by:
 * - useDealForecast, useWinRate, useStageFunnel, and the Deal Reports hooks
 *   (useForecastByPeriod, useVelocity, useWinLossReasons,
 *   useSourceConversion, useAgingDeals, useSizeDistribution,
 *   useOwnerLeaderboard).
 */
class DealAnalyticsService {
  async getForecast(pipelineId?: number): Promise<ApiResponse<ForecastData>> {
    const response = await axiosInstance.get<ApiResponse<ForecastData>>('/deals/statistics/forecast', {
      params: pipelineId !== undefined ? { pipelineId } : {},
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

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

  async getOwnerLeaderboard(filters: OwnerLeaderboardFilters): Promise<ApiResponse<OwnerLeaderboardRow[]>> {
    const response = await axiosInstance.get<ApiResponse<OwnerLeaderboardRow[]>>('/deals/statistics/owner-leaderboard', {
      params: filters,
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getForecastByPeriod(filters: ForecastByPeriodFilters): Promise<ApiResponse<ForecastByPeriodData>> {
    const response = await axiosInstance.get<ApiResponse<ForecastByPeriodData>>('/deals/statistics/forecast-by-period', {
      params: filters,
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getVelocity(filters: VelocityFilters): Promise<ApiResponse<VelocityData>> {
    const response = await axiosInstance.get<ApiResponse<VelocityData>>('/deals/statistics/velocity', {
      params: filters,
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getWinLossReasons(filters: WinLossReasonsFilters): Promise<ApiResponse<WinLossReasonsData>> {
    const response = await axiosInstance.get<ApiResponse<WinLossReasonsData>>('/deals/statistics/win-loss-reasons', {
      params: filters,
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getSourceConversion(filters: SourceConversionFilters): Promise<ApiResponse<SourceConversionRow[]>> {
    const response = await axiosInstance.get<ApiResponse<SourceConversionRow[]>>('/deals/statistics/source-conversion', {
      params: filters,
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getAgingDeals(filters: AgingDealsFilters): Promise<ApiResponse<AgingDealsData>> {
    const response = await axiosInstance.get<ApiResponse<AgingDealsData>>('/deals/statistics/aging', {
      params: filters,
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getSizeDistribution(filters: SizeDistributionFilters): Promise<ApiResponse<SizeDistributionData>> {
    const response = await axiosInstance.get<ApiResponse<SizeDistributionData>>('/deals/statistics/size-distribution', {
      params: filters,
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }


  async getDeletedDeals(filters: DeletedDealsFilters): Promise<ApiResponse<DeletedDealsData>> {
    const response = await axiosInstance.get<ApiResponse<DeletedDealsData>>('/deals/deleted', {
      params: filters,
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getDealExportHistory(filters: DealExportHistoryFilters): Promise<ApiResponse<DealExportHistoryData>> {
    const response = await axiosInstance.get<ApiResponse<DealExportHistoryData>>('/deals/export-history', {
      params: filters,
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async downloadDealExportFile(exportId: string): Promise<{ data: Blob; headers: Record<string, string> }> {
    const response = await axiosInstance.get(`/deals/export-history/${exportId}/download`, {
      responseType: 'blob',
    });
    return { data: response.data as Blob, headers: response.headers as unknown as Record<string, string> };
  }


  async createDealExport(payload: CreateDealExportPayload): Promise<ApiResponse<CreateDealExportResult>> {
    const response = await axiosInstance.post<ApiResponse<CreateDealExportResult>>('/deals/export', payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getDealExportHistoryDetail(exportId: string): Promise<ApiResponse<DealExportHistoryItem>> {
    const response = await axiosInstance.get<ApiResponse<DealExportHistoryItem>>(`/deals/export-history/${exportId}`);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const dealAnalyticsService = new DealAnalyticsService();
