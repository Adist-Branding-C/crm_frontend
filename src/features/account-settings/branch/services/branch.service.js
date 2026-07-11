import axiosInstance from '../../../../api/axiosInstance';
import { BRANCH_API_ENDPOINTS } from '../constants/branchApiEndpoints';
import { buildQueryParams } from '../../../../shared/utils/queryParams.util';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
class BranchService {
    async getAllBranches(params = {}) {
        const { pageNumber, limit, search } = params;
        const queryString = buildQueryParams({ pageNumber, limit, search });
        const url = queryString ? `${BRANCH_API_ENDPOINTS.GET_ALL}?${queryString}` : BRANCH_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async createBranch(data) {
        const { name, description, status } = data;
        const payload = { name, description, status };
        const response = await axiosInstance.post(BRANCH_API_ENDPOINTS.CREATE, payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async updateBranch(id, data) {
        const { name, description, status } = data;
        const payload = { name, description, status };
        const response = await axiosInstance.patch(BRANCH_API_ENDPOINTS.UPDATE(id), payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async deleteBranch(id) {
        const response = await axiosInstance.delete(BRANCH_API_ENDPOINTS.DELETE(id));
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
        });
    }
}
export const branchService = new BranchService();
//# sourceMappingURL=branch.service.js.map