import axiosInstance from '../../../../api/axiosInstance';
import { CHECKOUT_NOTE_API_ENDPOINTS } from '../constants/checkoutNoteApiEndpoints';
import { CheckoutNoteMapper } from '../mappers/checkoutNote.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
class CheckoutNoteService {
    async getAllCheckoutNotes(params = {}) {
        const queryString = CheckoutNoteMapper.toQueryParams({ search: params.search, page: params.page, limit: params.limit });
        const url = queryString ? `${CHECKOUT_NOTE_API_ENDPOINTS.GET_ALL}?${queryString}` : CHECKOUT_NOTE_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return ServiceResponseUtil.normalize(response.data);
    }
    async createCheckoutNote(data) {
        const response = await axiosInstance.post(CHECKOUT_NOTE_API_ENDPOINTS.CREATE, data);
        return ServiceResponseUtil.normalize(response.data);
    }
    async updateCheckoutNote(id, data) {
        const response = await axiosInstance.patch(CHECKOUT_NOTE_API_ENDPOINTS.UPDATE(id), data);
        return ServiceResponseUtil.normalize(response.data);
    }
    async deleteCheckoutNote(id) {
        const response = await axiosInstance.delete(CHECKOUT_NOTE_API_ENDPOINTS.DELETE(id));
        return ServiceResponseUtil.normalize(response.data);
    }
}
export const checkoutNoteService = new CheckoutNoteService();
//# sourceMappingURL=checkoutNote.service.js.map