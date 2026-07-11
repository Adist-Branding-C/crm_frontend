import axiosInstance from '../../../../api/axiosInstance';
import { DEAL_TASK_API_ENDPOINTS } from '../constants/index';
export class DealTaskApiService {
    async fetchAll(params = {}) {
        const response = await axiosInstance.get(DEAL_TASK_API_ENDPOINTS.GET_ALL, { params });
        return response.data;
    }
    async create(data) {
        const response = await axiosInstance.post(DEAL_TASK_API_ENDPOINTS.CREATE, data);
        return response.data;
    }
    async update(id, data) {
        const response = await axiosInstance.patch(DEAL_TASK_API_ENDPOINTS.UPDATE(id), data);
        return response.data;
    }
    async delete(id) {
        const response = await axiosInstance.delete(DEAL_TASK_API_ENDPOINTS.DELETE(id));
        return response.data;
    }
}
//# sourceMappingURL=dealTask.api.js.map