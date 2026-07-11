import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { CUSTOM_PIPELINE_API_ENDPOINTS } from '../constants/customPipelineApiEndpoints';
import type { CreateCustomPipelinePayload, UpdateCustomPipelinePayload } from '../types/request';
import type {
  CreateCustomPipelineResponse,
  CustomPipelineResponse,
  CustomPipelineListResponse,
  DeleteCustomPipelineResponse,
} from '../types/response';

class CustomPipelineService {
  async createCustomPipeline(payload: CreateCustomPipelinePayload): Promise<CreateCustomPipelineResponse> {
    const response = await axiosInstance.post<CreateCustomPipelineResponse>(CUSTOM_PIPELINE_API_ENDPOINTS.PIPELINES, payload);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async getCustomPipelines(page = 1, limit = 10, search?: string): Promise<CustomPipelineListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    const response = await axiosInstance.get<CustomPipelineListResponse>(CUSTOM_PIPELINE_API_ENDPOINTS.PIPELINES, { params });
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateCustomPipeline(pipelineId: string, payload: UpdateCustomPipelinePayload): Promise<CustomPipelineResponse> {
    const response = await axiosInstance.patch<CustomPipelineResponse>(`${CUSTOM_PIPELINE_API_ENDPOINTS.PIPELINES}/${pipelineId}`, payload);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async deleteCustomPipeline(pipelineId: string): Promise<DeleteCustomPipelineResponse> {
    const response = await axiosInstance.delete<DeleteCustomPipelineResponse>(`${CUSTOM_PIPELINE_API_ENDPOINTS.PIPELINES}/${pipelineId}`);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
    });
  }
}

export const customPipelineService = new CustomPipelineService();
