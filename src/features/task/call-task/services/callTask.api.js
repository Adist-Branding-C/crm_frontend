import axiosInstance from '../../../../api/axiosInstance';
import { CALL_TASK_API_ENDPOINTS } from '../constants/index';
export class CallTaskApiService {
    async fetchAll(params = {}) {
        const response = await axiosInstance.get(CALL_TASK_API_ENDPOINTS.GET_ALL, { params });
        return response.data;
    }
    async create(data) {
        const response = await axiosInstance.post(CALL_TASK_API_ENDPOINTS.CREATE, data);
        return response.data;
    }
    async update(id, data) {
        const response = await axiosInstance.patch(CALL_TASK_API_ENDPOINTS.UPDATE(id), data);
        return response.data;
    }
    async delete(id) {
        const response = await axiosInstance.delete(CALL_TASK_API_ENDPOINTS.DELETE(id));
        return response.data;
    }
}
//# sourceMappingURL=callTask.api.js.map