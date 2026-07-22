import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { COMPANIES_API_ENDPOINTS, companyById } from '../constants/companiesApiEndpoints';
import type { ApiResponse } from '../../../shared/types/common';
import type { CompanyListData, CompanyApiItem, CreateCompanyData, CompanyStatisticsData } from '../types/response';
import type { GetCompaniesParams, CompanyStatisticsParams, CreateCompanyPayload, UpdateCompanyPayload } from '../types/request';

/**
 * HTTP client for the Company API (platform tenant management) - communicates
 * with the backend only.
 *
 * Used by:
 * - companyDataService singleton, consumed by useCompaniesList (list/refresh),
 *   useCompanyApi (create/update/delete), and CompaniesStatsGrid (statistics).
 */
class CompanyDataService {
  async getCompanies(params: GetCompaniesParams): Promise<ApiResponse<CompanyListData>> {
    const response = await axiosInstance.get<ApiResponse<CompanyListData>>(COMPANIES_API_ENDPOINTS.COMPANIES, {
      params: QueryMapper.toQuery(params),
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getCompany(companyId: string): Promise<ApiResponse<CompanyApiItem>> {
    const response = await axiosInstance.get<ApiResponse<CompanyApiItem>>(companyById(companyId));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async createCompany(payload: CreateCompanyPayload): Promise<ApiResponse<CreateCompanyData>> {
    const response = await axiosInstance.post<ApiResponse<CreateCompanyData>>(COMPANIES_API_ENDPOINTS.COMPANIES, payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateCompany(companyId: string, payload: UpdateCompanyPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(companyById(companyId), payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async deleteCompany(companyId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(companyById(companyId));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getCompanyStatistics(params: CompanyStatisticsParams): Promise<ApiResponse<{ statistics: CompanyStatisticsData }>> {
    const response = await axiosInstance.get<ApiResponse<{ statistics: CompanyStatisticsData }>>(COMPANIES_API_ENDPOINTS.STATISTICS, {
      params: QueryMapper.toQuery(params),
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const companyDataService = new CompanyDataService();
