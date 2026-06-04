import axiosInstance from '../../../api/axiosInstance';
import { CHECKOUT_NOTE_API_ENDPOINTS } from '../constants/checkoutNote.constants';
import type { CheckoutNoteResponse } from '../types/checkoutNote.types';

class CheckoutNoteService {
  async getAllCheckoutNotes(params: Record<string, unknown> = {}): Promise<CheckoutNoteResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${CHECKOUT_NOTE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : CHECKOUT_NOTE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createCheckoutNote(data: { note: string }): Promise<CheckoutNoteResponse> {
    const response = await axiosInstance.post(CHECKOUT_NOTE_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateCheckoutNote(id: number, data: { note: string }): Promise<CheckoutNoteResponse> {
    const response = await axiosInstance.patch(CHECKOUT_NOTE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteCheckoutNote(id: number): Promise<CheckoutNoteResponse> {
    const response = await axiosInstance.delete(CHECKOUT_NOTE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const checkoutNoteService = new CheckoutNoteService();
