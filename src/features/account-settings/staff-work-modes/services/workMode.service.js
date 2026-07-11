import axiosInstance from '../../../../api/axiosInstance';
import { WORK_MODE_API_ENDPOINTS } from '../constants/workModeApiEndpoints';
import { WorkModeMapper } from '../mappers/workMode.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
class WorkModeService {
    async getAllWorkModes(params = {}) {
        const queryString = WorkModeMapper.toQueryParams(params);
        const url = queryString ? `${WORK_MODE_API_ENDPOINTS.GET_ALL}?${queryString}` : WORK_MODE_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return ServiceResponseUtil.normalize(response.data);
    }
    async createWorkMode(data) {
        const { workModeName, description, status } = data;
        const payload = { workModeName, description, status };
        const response = await axiosInstance.post(WORK_MODE_API_ENDPOINTS.CREATE, payload);
        return ServiceResponseUtil.normalize(response.data);
    }
    async updateWorkMode(id, data) {
        const { workModeName, description, status } = data;
        const payload = { workModeName, description, status };
        const response = await axiosInstance.patch(WORK_MODE_API_ENDPOINTS.UPDATE(id), payload);
        return ServiceResponseUtil.normalize(response.data);
    }
    async deleteWorkMode(id) {
        const response = await axiosInstance.delete(WORK_MODE_API_ENDPOINTS.DELETE(id));
        return ServiceResponseUtil.normalize(response.data);
    }
}
export const workModeService = new WorkModeService();
//# sourceMappingURL=workMode.service.js.map