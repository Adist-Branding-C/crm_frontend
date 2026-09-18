import Cookies from 'js-cookie';
import axiosInstance, { API_BASE_URL } from '../../../../api/axiosInstance';
import { AUTH_STORAGE_KEYS } from '../../../auth/constants/auth.constants';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { extractFilenameFromContentDisposition } from '../../../../shared/utils/blobDownload.util';
import { TASK_REPORT_API_ENDPOINTS } from '../constants/taskReportsApiEndpoints';
import { ACTIVITY_DEFAULT_EXPORT_FILENAME } from '../constants/taskActivity.data';
import type { ApiResponse } from '../../../../shared/types/common';
import type {
  GetRecurringComplianceInstancesParams,
  GetRecurringComplianceParams,
  GetSlaBreachesParams,
  GetTaskActivityParams,
  GetTaskPipelineDistributionParams,
  GetTaskStageHistoryParams,
  GetTaskSummaryParams,
  GetTeamPerformanceParams,
  RecurringComplianceInstancesData,
  RecurringComplianceReportData,
  TaskActivityReportData,
  TaskPipelineDistributionData,
  TaskSlaBreachReportData,
  TaskStageHistoryData,
  TaskSummaryReportData,
  TaskTeamPerformanceReportData,
} from '../types';

/**
 * Service for Task report endpoints.
 *
 * Used by:
 * - useTaskSummaryReport (Task Summary / Productivity report)
 * - useTaskPipelineDistributionReport (Workflow Pipeline / Stage Distribution report)
 * - useTaskSlaBreachReport (SLA Breach & Escalation report)
 * - useTaskStageHistoryReport (Stage & Status Change History report)
 * - useTaskRecurringComplianceReport / useTaskRecurringComplianceInstances
 *   (Recurring Task Compliance report; both modes hit the same endpoint -
 *   summary without a taskId, drill-down with one)
 * - useTaskActivityReport / useTaskActivityExport (Task Work / Activity report;
 *   paginated JSON vs export=true CSV come from the same endpoint)
 * - useTaskTeamPerformanceReport / useTaskTeamPerformanceDrilldown (Team /
 *   Department Performance report; rollup and per-staff drill-down come from
 *   the same endpoint - with a departmentId for the drill-down mode).
 *
 * Notes:
 * - Mirrors the ImportHistoryService pattern: axiosInstance + ServiceResponseUtil
 *   success envelope, empty/undefined query params dropped via QueryMapper.toQuery.
 */
export class TaskReportService {
  async getSummary(params: GetTaskSummaryParams): Promise<ApiResponse<TaskSummaryReportData>> {
    const response = await axiosInstance.get<ApiResponse<TaskSummaryReportData>>(
      TASK_REPORT_API_ENDPOINTS.SUMMARY,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getPipelineDistribution(
    params: GetTaskPipelineDistributionParams,
  ): Promise<ApiResponse<TaskPipelineDistributionData>> {
    const response = await axiosInstance.get<ApiResponse<TaskPipelineDistributionData>>(
      TASK_REPORT_API_ENDPOINTS.PIPELINE_DISTRIBUTION,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getSlaBreaches(
    params: GetSlaBreachesParams,
  ): Promise<ApiResponse<TaskSlaBreachReportData>> {
    const response = await axiosInstance.get<ApiResponse<TaskSlaBreachReportData>>(
      TASK_REPORT_API_ENDPOINTS.SLA_BREACHES,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getStageHistory(
    params: GetTaskStageHistoryParams,
  ): Promise<ApiResponse<TaskStageHistoryData>> {
    const response = await axiosInstance.get<ApiResponse<TaskStageHistoryData>>(
      TASK_REPORT_API_ENDPOINTS.STAGE_HISTORY,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getRecurringCompliance(
    params: GetRecurringComplianceParams,
  ): Promise<ApiResponse<RecurringComplianceReportData>> {
    const response = await axiosInstance.get<ApiResponse<RecurringComplianceReportData>>(
      TASK_REPORT_API_ENDPOINTS.RECURRING_COMPLIANCE,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getRecurringComplianceInstances(
    params: GetRecurringComplianceInstancesParams,
  ): Promise<ApiResponse<RecurringComplianceInstancesData>> {
    const response = await axiosInstance.get<ApiResponse<RecurringComplianceInstancesData>>(
      TASK_REPORT_API_ENDPOINTS.RECURRING_COMPLIANCE,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getActivityReport(
    params: GetTaskActivityParams,
  ): Promise<ApiResponse<TaskActivityReportData>> {
    const response = await axiosInstance.get<ApiResponse<TaskActivityReportData>>(
      TASK_REPORT_API_ENDPOINTS.ACTIVITY,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  // The team-performance endpoint serves both modes from the same route:
  // without a departmentId it returns the paginated department rollup; with
  // one it returns that department's full per-staff breakdown (no server-side
  // pagination in drill-down mode).
  async getTeamPerformance<TData = TaskTeamPerformanceReportData>(
    params: GetTeamPerformanceParams,
  ): Promise<ApiResponse<TData>> {
    const response = await axiosInstance.get<ApiResponse<TData>>(
      TASK_REPORT_API_ENDPOINTS.TEAM_PERFORMANCE,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  // export=true on the same endpoint streams the full filtered dataset as an
  // Excel (.xlsx) attachment instead of paginated JSON. The blob is fetched
  // directly with the shared API base URL and the access-token cookie so the
  // download keeps its binary content type; the filename comes from the
  // Content-Disposition header with a static fallback. Non-2xx responses are
  // JSON bodies that arrive as blobs, so the backend message (e.g. the export
  // row cap) is parsed from them and re-thrown intact.
  async exportActivityExcel(
    params: GetTaskActivityParams,
  ): Promise<{ blob: Blob; filename: string }> {
    const accessToken = Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    const paramObject = QueryMapper.toQuery({ ...params, export: 'true' });
    const searchParams = new URLSearchParams();
    (Object.keys(paramObject) as Array<keyof typeof paramObject>).forEach((key) => {
      const value = paramObject[key];
      if (value !== undefined && value !== null) searchParams.append(key, String(value));
    });

    const response = await fetch(
      `${API_BASE_URL}${TASK_REPORT_API_ENDPOINTS.ACTIVITY}?${searchParams.toString()}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: 'same-origin',
      },
    );

    if (!response.ok) {
      const errorBlob = await response.blob();
      let message: string | undefined;
      if (errorBlob.type.toLowerCase().includes('json')) {
        try {
          const text = await errorBlob.text();
          message = text
            ? (JSON.parse(text) as { message?: string } | undefined)?.message
            : undefined;
        } catch {
          message = undefined;
        }
      }
      throw new Error(message || `Export failed with status ${response.status}`);
    }

    const blob = await response.blob();
    const filename = extractFilenameFromContentDisposition(
      response.headers.get('content-disposition') ?? undefined,
      ACTIVITY_DEFAULT_EXPORT_FILENAME,
    );
    return { blob, filename };
  }
}

export const taskReportService = new TaskReportService();