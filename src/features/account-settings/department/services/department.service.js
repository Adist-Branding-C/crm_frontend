import axiosInstance from '../../../../api/axiosInstance';
import { DEPARTMENT_API_ENDPOINTS } from '../constants/departmentApiEndpoints';
import { DepartmentMapper } from '../mappers/department.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
class DepartmentService {
    async getAllDepartments(params = {}) {
        const queryString = DepartmentMapper.toQueryParams(params);
        const url = queryString ? `${DEPARTMENT_API_ENDPOINTS.GET_ALL}?${queryString}` : DEPARTMENT_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return ServiceResponseUtil.normalize(response.data);
    }
    async createDepartment(data) {
        const response = await axiosInstance.post(DEPARTMENT_API_ENDPOINTS.CREATE, data);
        return ServiceResponseUtil.normalize(response.data);
    }
    async updateDepartment(id, data) {
        const response = await axiosInstance.patch(DEPARTMENT_API_ENDPOINTS.UPDATE(id), data);
        return ServiceResponseUtil.normalize(response.data);
    }
    async deleteDepartment(id) {
        const response = await axiosInstance.delete(DEPARTMENT_API_ENDPOINTS.DELETE(id));
        return ServiceResponseUtil.normalize(response.data);
    }
}
export const departmentService = new DepartmentService();
//# sourceMappingURL=department.service.js.map