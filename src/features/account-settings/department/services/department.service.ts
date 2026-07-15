import axiosInstance from '../../../../api/axiosInstance';
import { DEPARTMENT_API_ENDPOINTS } from '../constants/departmentApiEndpoints';
import { DepartmentMapper } from '../mappers/department.mapper';
import type { DepartmentFormData, DepartmentListResponse, DepartmentResponse, DeleteDepartmentResponse, DepartmentQueryParams } from '../types/department.types';

class DepartmentService {
  async getAllDepartments(params: DepartmentQueryParams = {}): Promise<DepartmentListResponse> {
    const queryString = DepartmentMapper.toQueryParams(params);
    const url = queryString ? `${DEPARTMENT_API_ENDPOINTS.GET_ALL}?${queryString}` : DEPARTMENT_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<DepartmentListResponse>(url);
    return response.data;
  }

  async createDepartment(data: DepartmentFormData): Promise<DepartmentResponse> {
    const response = await axiosInstance.post<DepartmentResponse>(DEPARTMENT_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async updateDepartment(id: number, data: DepartmentFormData): Promise<DepartmentResponse> {
    const response = await axiosInstance.patch<DepartmentResponse>(DEPARTMENT_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async deleteDepartment(id: number): Promise<DeleteDepartmentResponse> {
    const response = await axiosInstance.delete<DeleteDepartmentResponse>(DEPARTMENT_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}

export const departmentService = new DepartmentService();
