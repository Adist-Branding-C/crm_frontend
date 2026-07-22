import axiosInstance from '../../../../api/axiosInstance';
import { DESIGNATION_API_ENDPOINTS } from '../constants/designationApiEndpoints';
import { DesignationMapper } from '../mappers/designation.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import type { DesignationFormData, DesignationResponse, DeleteDesignationResponse } from '../types/designation.types';

class DesignationService {
  async getAllDesignations(params: Record<string, string | number | undefined> = {}): Promise<DesignationResponse> {
    const queryString = DesignationMapper.toQueryParams(params);
    const url = queryString ? `${DESIGNATION_API_ENDPOINTS.GET_ALL}?${queryString}` : DESIGNATION_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<DesignationResponse>(url);
    return ServiceResponseUtil.normalize(response.data);
  }

  async createDesignation(data: DesignationFormData): Promise<DesignationResponse> {
    const response = await axiosInstance.post<DesignationResponse>(DESIGNATION_API_ENDPOINTS.CREATE, data);
    return ServiceResponseUtil.normalize(response.data);
  }

  async updateDesignation(id: number, data: DesignationFormData): Promise<DesignationResponse> {
    const response = await axiosInstance.patch<DesignationResponse>(DESIGNATION_API_ENDPOINTS.UPDATE(id), data);
    return ServiceResponseUtil.normalize(response.data);
  }

  async deleteDesignation(id: number): Promise<DeleteDesignationResponse> {
    const response = await axiosInstance.delete<DesignationResponse>(DESIGNATION_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.normalize(response.data);
  }
}

export const designationService = new DesignationService();
