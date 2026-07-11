import axiosInstance from '../../../../api/axiosInstance';
import { MEETING_OUTCOME_API_ENDPOINTS } from '../constants/index';
export class MeetingOutcomeApiService {
    async fetchAll(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, String(value));
            }
        });
        const url = queryParams.toString()
            ? `${MEETING_OUTCOME_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
            : MEETING_OUTCOME_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return response.data;
    }
    async create(data) {
        const response = await axiosInstance.post(MEETING_OUTCOME_API_ENDPOINTS.CREATE, data);
        return response.data;
    }
    async update(id, data) {
        const response = await axiosInstance.patch(MEETING_OUTCOME_API_ENDPOINTS.UPDATE(id), data);
        return response.data;
    }
    async delete(id) {
        const response = await axiosInstance.delete(MEETING_OUTCOME_API_ENDPOINTS.DELETE(id));
        return response.data;
    }
}
//# sourceMappingURL=meetingOutcome.api.js.map