import type { CustomPipelineApiItem } from './interface';

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface CreateCustomPipelineData {
  pipelineId: string;
}

export interface CustomPipelineListData {
  items: CustomPipelineApiItem[];
  pagination: PaginationResponse;
}

export interface CreateCustomPipelineResponse {
  status: boolean;
  message: string;
  data?: CreateCustomPipelineData;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface CustomPipelineResponse {
  status: boolean;
  message: string;
  data?: CustomPipelineApiItem;
  errors?: Record<string, string[]>;
  field?: string;
}

export interface CustomPipelineListResponse {
  status: boolean;
  message: string;
  data?: CustomPipelineListData;
}

export interface DeleteCustomPipelineResponse {
  status: boolean;
  message: string;
}
