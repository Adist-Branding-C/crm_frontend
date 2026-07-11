import axiosInstance from '../../../../api/axiosInstance';
import { TASK_API_ENDPOINTS } from '../constants/index';
export class TaskApiService {
    async fetchAll(params = {}) {
        const response = await axiosInstance.get(TASK_API_ENDPOINTS.GET_ALL, { params });
        return response.data;
    }
    async create(data) {
        const response = await axiosInstance.post(TASK_API_ENDPOINTS.CREATE, data);
        return response.data;
    }
    async update(id, data) {
        const response = await axiosInstance.patch(TASK_API_ENDPOINTS.UPDATE(id), data);
        return response.data;
    }
    async delete(id) {
        const response = await axiosInstance.delete(TASK_API_ENDPOINTS.DELETE(id));
        return response.data;
    }
}
//# sourceMappingURL=task.api.js.map