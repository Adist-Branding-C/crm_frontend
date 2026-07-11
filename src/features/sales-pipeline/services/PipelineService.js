import axiosInstance from '../../../api/axiosInstance';
import { PIPELINE_API_ENDPOINTS } from '../constants/pipelineApiEndpoints';
class PipelineService {
    async getLeads(params) {
        const response = await axiosInstance.get(PIPELINE_API_ENDPOINTS.LEADS, {
            params,
        });
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async getDeals(params) {
        const response = await axiosInstance.get(PIPELINE_API_ENDPOINTS.DEALS, {
            params,
        });
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async getTasks(params) {
        const response = await axiosInstance.get(PIPELINE_API_ENDPOINTS.TASKS, {
            params,
        });
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async getStatusDeals(statusId, skip, limit) {
        const response = await axiosInstance.get(PIPELINE_API_ENDPOINTS.STATUS_DEALS, {
            params: { statusId, skip, limit },
        });
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async getStatusLeads(statusId, skip, limit) {
        const response = await axiosInstance.get(PIPELINE_API_ENDPOINTS.STATUS_LEADS, {
            params: { statusId, skip, limit },
        });
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async getStatusTasks(statusId, skip, limit) {
        const response = await axiosInstance.get(PIPELINE_API_ENDPOINTS.STATUS_TASKS, {
            params: { statusId, skip, limit },
        });
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
}
export const pipelineService = new PipelineService();
//# sourceMappingURL=PipelineService.js.map