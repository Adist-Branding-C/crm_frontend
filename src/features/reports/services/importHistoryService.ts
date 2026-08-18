import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { IMPORT_API_ENDPOINTS } from '../constants/importApiEndpoints';
import type { ApiResponse } from '../../../shared/types/common';
import type {
  ImportHistoryListData,
  ImportHistoryApiItem,
  ImportEntriesListData,
  UploadImportResult,
} from '../types';

export interface GetImportHistoryParams {
  pageNumber?: number;
  limit?: number;
  search?: string | undefined;
}

export interface GetImportEntriesParams {
  pageNumber?: number;
  limit?: number;
  status?: string | undefined;
}

/**
 * HTTP client for the bulk lead-import API - communicates with the backend only.
 *
 * Used by:
 * - importHistoryService singleton, consumed by useImportHistoryData (list/upload/sample
 *   download) and useImportHistoryDetail (header + per-tab entries).
 */
class ImportHistoryService {
  async uploadFile(file: File): Promise<ApiResponse<UploadImportResult>> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post<ApiResponse<UploadImportResult>>(
      IMPORT_API_ENDPOINTS.IMPORT,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async downloadSampleFile(): Promise<void> {
    const response = await axiosInstance.get(IMPORT_API_ENDPOINTS.IMPORT_SAMPLE, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Leads_Import_Sample.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  async getImportHistory(params: GetImportHistoryParams): Promise<ApiResponse<ImportHistoryListData>> {
    const response = await axiosInstance.get<ApiResponse<ImportHistoryListData>>(
      IMPORT_API_ENDPOINTS.IMPORT_HISTORY,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getImportHistoryDetail(importId: string): Promise<ApiResponse<ImportHistoryApiItem>> {
    const response = await axiosInstance.get<ApiResponse<ImportHistoryApiItem>>(
      `${IMPORT_API_ENDPOINTS.IMPORT_HISTORY}/${importId}`,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getImportEntries(
    importId: string,
    params: GetImportEntriesParams,
  ): Promise<ApiResponse<ImportEntriesListData>> {
    const response = await axiosInstance.get<ApiResponse<ImportEntriesListData>>(
      `${IMPORT_API_ENDPOINTS.IMPORT_HISTORY}/${importId}/entries`,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const importHistoryService = new ImportHistoryService();
