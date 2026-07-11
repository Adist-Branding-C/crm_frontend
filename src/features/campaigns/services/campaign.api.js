import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { CAMPAIGN_API_ENDPOINTS } from '../constants';
/**
 * HTTP client for the Campaign API - communicates with the backend only.
 *
 * Used by:
 * - campaignApiService singleton (services/index.ts), consumed by useFetchCampaigns
 *   (list) and useCampaignApi (create/update/delete).
 */
export class CampaignApiService {
    async getAll(params) {
        const response = await axiosInstance.get(CAMPAIGN_API_ENDPOINTS.BASE, { params: QueryMapper.toQuery(params) });
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async getById(id) {
        const response = await axiosInstance.get(CAMPAIGN_API_ENDPOINTS.BY_ID(id));
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async create(data) {
        const response = await axiosInstance.post(CAMPAIGN_API_ENDPOINTS.BASE, data);
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async update(id, data) {
        const response = await axiosInstance.patch(CAMPAIGN_API_ENDPOINTS.BY_ID(id), data);
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async delete(id) {
        const response = await axiosInstance.delete(CAMPAIGN_API_ENDPOINTS.BY_ID(id));
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async export(params) {
        const response = await axiosInstance.get(CAMPAIGN_API_ENDPOINTS.EXPORT, {
            params: params ? QueryMapper.toQuery(params) : undefined,
            responseType: 'blob',
        });
        return response.data;
    }
}
//# sourceMappingURL=campaign.api.js.map