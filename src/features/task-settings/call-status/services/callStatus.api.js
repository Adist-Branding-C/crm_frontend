import axiosInstance from '../../../../api/axiosInstance';
import { CALL_STATUS_API_ENDPOINTS } from '../constants/index';
export class CallStatusApiService {
    async fetchAll(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, String(value));
            }
        });
        const url = queryParams.toString()
            ? `${CALL_STATUS_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
            : CALL_STATUS_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return response.data;
    }
    async create(data) {
        const response = await axiosInstance.post(CALL_STATUS_API_ENDPOINTS.CREATE, data);
        return response.data;
    }
    async update(id, data) {
        const response = await axiosInstance.patch(CALL_STATUS_API_ENDPOINTS.UPDATE(id), data);
        return response.data;
    }
    async delete(id) {
        const response = await axiosInstance.delete(CALL_STATUS_API_ENDPOINTS.DELETE(id));
        return response.data;
    }
}
//# sourceMappingURL=callStatus.api.js.map