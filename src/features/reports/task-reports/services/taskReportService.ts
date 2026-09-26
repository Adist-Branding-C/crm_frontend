import Cookies from 'js-cookie';
import axiosInstance from '../../../../api/axiosInstance';

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
  const paramObject = QueryMapper.toQuery({ ...params, export: 'true' });

  const response = await axiosInstance.get(
    TASK_REPORT_API_ENDPOINTS.ACTIVITY,
    {
      params: paramObject,
      responseType: 'blob',
    },
  );

  const filename = extractFilenameFromContentDisposition(
    response.headers['content-disposition'],
    ACTIVITY_DEFAULT_EXPORT_FILENAME,
  );

  return {
    blob: response.data,
    filename,
  };
}
}

export const taskReportService = new TaskReportService();