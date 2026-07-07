import axiosInstance from '../../../../api/axiosInstance';
import { CHECKOUT_NOTE_API_ENDPOINTS } from '../constants/checkoutNoteApiEndpoints';
import { CheckoutNoteMapper } from '../mappers/checkoutNote.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import type { CheckoutNoteRequest, GetAllCheckoutNotesParams, GetAllCheckoutNotesResponse, CheckoutNoteResponse, DeleteCheckoutNoteResponse } from '../types/checkoutNote.types';

class CheckoutNoteService {
  async getAllCheckoutNotes(params: GetAllCheckoutNotesParams = {}): Promise<GetAllCheckoutNotesResponse> {
    const queryString = CheckoutNoteMapper.toQueryParams({ search: params.search, page: params.page, limit: params.limit });
    const url = queryString ? `${CHECKOUT_NOTE_API_ENDPOINTS.GET_ALL}?${queryString}` : CHECKOUT_NOTE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<GetAllCheckoutNotesResponse>(url);
    return ServiceResponseUtil.normalize(response.data);
  }

  async createCheckoutNote(data: CheckoutNoteRequest): Promise<CheckoutNoteResponse> {
    const response = await axiosInstance.post<CheckoutNoteResponse>(CHECKOUT_NOTE_API_ENDPOINTS.CREATE, data);
    return ServiceResponseUtil.normalize(response.data);
  }

  async updateCheckoutNote(id: number, data: CheckoutNoteRequest): Promise<CheckoutNoteResponse> {
    const response = await axiosInstance.patch<CheckoutNoteResponse>(CHECKOUT_NOTE_API_ENDPOINTS.UPDATE(id), data);
    return ServiceResponseUtil.normalize(response.data);
  }

  async deleteCheckoutNote(id: number): Promise<DeleteCheckoutNoteResponse> {
    const response = await axiosInstance.delete<DeleteCheckoutNoteResponse>(CHECKOUT_NOTE_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.normalize(response.data);
  }
}

export const checkoutNoteService = new CheckoutNoteService();
