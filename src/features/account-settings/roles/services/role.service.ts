import axiosInstance from '../../../../api/axiosInstance';
import { ROLE_API_ENDPOINTS } from '../constants/roleApiEndpoints';
import { buildQueryParams } from '../../../../shared/utils/queryParams.util';
import { RoleMapper } from '../mappers/role.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import type {
  RoleFormData,
  RoleListResponse,
  RolePayload,
  RoleQueryParams,
  RoleResponse,
  DeleteRoleResponse,
} from '../types/role.types';

class RoleService {
  async getAllRoles(params: RoleQueryParams = {}): Promise<RoleListResponse> {
    const queryString = buildQueryParams(params);
    const url = queryString ? `${ROLE_API_ENDPOINTS.GET_ALL}?${queryString}` : ROLE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<RoleListResponse>(url);
    return ServiceResponseUtil.normalize(response.data);
  }

  async createRole(data: RoleFormData): Promise<RoleResponse> {
    const payload: RolePayload = RoleMapper.toPayload(data);
    const response = await axiosInstance.post<RoleResponse>(ROLE_API_ENDPOINTS.CREATE, payload);
    return ServiceResponseUtil.normalize(response.data);
  }

  async updateRole(id: string, data: RoleFormData): Promise<RoleResponse> {
    const payload: RolePayload = RoleMapper.toPayload(data);
    const response = await axiosInstance.patch<RoleResponse>(ROLE_API_ENDPOINTS.UPDATE(id), payload);
    return ServiceResponseUtil.normalize(response.data);
  }

  async deleteRole(id: string): Promise<DeleteRoleResponse> {
    const response = await axiosInstance.delete<DeleteRoleResponse>(ROLE_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.normalize(response.data);
  }
}

export const roleService = new RoleService();
