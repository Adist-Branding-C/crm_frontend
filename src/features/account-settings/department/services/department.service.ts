import axiosInstance from '../../../../api/axiosInstance';
import { DEPARTMENT_API_ENDPOINTS } from '../constants/departmentApiEndpoints';
import type { DepartmentFormData, DepartmentListResponse, DepartmentResponse, DeleteDepartmentResponse, DepartmentQueryParams } from '../types/department.types';

class DepartmentService {
  async getAllDepartments(params: DepartmentQueryParams = {}): Promise<DepartmentListResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${DEPARTMENT_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : DEPARTMENT_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<DepartmentListResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createDepartment(data: DepartmentFormData): Promise<DepartmentResponse> {
    const response = await axiosInstance.post<DepartmentResponse>(DEPARTMENT_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    };
  }

  async updateDepartment(id: number, data: DepartmentFormData): Promise<DepartmentResponse> {
    const response = await axiosInstance.patch<DepartmentResponse>(DEPARTMENT_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    };
  }

  async deleteDepartment(id: number): Promise<DeleteDepartmentResponse> {
    const response = await axiosInstance.delete<DeleteDepartmentResponse>(DEPARTMENT_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const departmentService = new DepartmentService();
