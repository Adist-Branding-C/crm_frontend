import axiosInstance from '../../../../api/axiosInstance';
import { CHECKOUT_NOTE_API_ENDPOINTS } from '../constants/checkoutNoteApiEndpoints';
import type { CheckoutNoteRequest, GetAllCheckoutNotesParams, GetAllCheckoutNotesResponse, CheckoutNoteResponse, DeleteCheckoutNoteResponse } from '../types/checkoutNote.types';

class CheckoutNoteService {
  async getAllCheckoutNotes(params: GetAllCheckoutNotesParams = {}): Promise<GetAllCheckoutNotesResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${CHECKOUT_NOTE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : CHECKOUT_NOTE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<GetAllCheckoutNotesResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createCheckoutNote(data: CheckoutNoteRequest): Promise<CheckoutNoteResponse> {
    const response = await axiosInstance.post<CheckoutNoteResponse>(CHECKOUT_NOTE_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    };
  }

  async updateCheckoutNote(id: number, data: CheckoutNoteRequest): Promise<CheckoutNoteResponse> {
    const response = await axiosInstance.patch<CheckoutNoteResponse>(CHECKOUT_NOTE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    };
  }

  async deleteCheckoutNote(id: number): Promise<DeleteCheckoutNoteResponse> {
    const response = await axiosInstance.delete<DeleteCheckoutNoteResponse>(CHECKOUT_NOTE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const checkoutNoteService = new CheckoutNoteService();
