import axiosInstance from '../../../../api/axiosInstance';
import { DESIGNATION_API_ENDPOINTS } from '../constants/designationApiEndpoints';
import { DesignationMapper } from '../mappers/designation.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
class DesignationService {
    async getAllDesignations(params = {}) {
        const queryString = DesignationMapper.toQueryParams(params);
        const url = queryString ? `${DESIGNATION_API_ENDPOINTS.GET_ALL}?${queryString}` : DESIGNATION_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return ServiceResponseUtil.normalize(response.data);
    }
    async createDesignation(data) {
        const response = await axiosInstance.post(DESIGNATION_API_ENDPOINTS.CREATE, data);
        return ServiceResponseUtil.normalize(response.data);
    }
    async updateDesignation(id, data) {
        const response = await axiosInstance.patch(DESIGNATION_API_ENDPOINTS.UPDATE(id), data);
        return ServiceResponseUtil.normalize(response.data);
    }
    async deleteDesignation(id) {
        const response = await axiosInstance.delete(DESIGNATION_API_ENDPOINTS.DELETE(id));
        return ServiceResponseUtil.normalize(response.data);
    }
}
export const designationService = new DesignationService();
//# sourceMappingURL=designation.service.js.map