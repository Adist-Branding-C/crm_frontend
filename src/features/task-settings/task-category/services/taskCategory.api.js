import axiosInstance from '../../../../api/axiosInstance';
import { TASK_CATEGORY_API_ENDPOINTS } from '../constants/index';
export class TaskCategoryApiService {
    async fetchAll(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, String(value));
            }
        });
        const url = queryParams.toString()
            ? `${TASK_CATEGORY_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
            : TASK_CATEGORY_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return response.data;
    }
    async create(data) {
        const response = await axiosInstance.post(TASK_CATEGORY_API_ENDPOINTS.CREATE, data);
        return response.data;
    }
    async update(id, data) {
        const response = await axiosInstance.patch(TASK_CATEGORY_API_ENDPOINTS.UPDATE(id), data);
        return response.data;
    }
    async delete(id) {
        const response = await axiosInstance.delete(TASK_CATEGORY_API_ENDPOINTS.DELETE(id));
        return response.data;
    }
}
//# sourceMappingURL=taskCategory.api.js.map