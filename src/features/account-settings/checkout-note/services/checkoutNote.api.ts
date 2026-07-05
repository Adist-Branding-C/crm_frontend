import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { CHECKOUT_NOTE_API_ENDPOINTS } from '../constants';
import type { CheckoutNoteItem, CheckoutNoteFormData } from '../types';

export class CheckoutNoteApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<{ items: CheckoutNoteItem[]; total?: number }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: CheckoutNoteItem[]; total?: number }>>(CHECKOUT_NOTE_API_ENDPOINTS.GET_ALL, { params });
    return response.data;
  }

  async create(data: CheckoutNoteFormData): Promise<ApiResponse<CheckoutNoteItem>> {
    const response = await axiosInstance.post<ApiResponse<CheckoutNoteItem>>(CHECKOUT_NOTE_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: CheckoutNoteFormData): Promise<ApiResponse<CheckoutNoteItem>> {
    const response = await axiosInstance.patch<ApiResponse<CheckoutNoteItem>>(CHECKOUT_NOTE_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CHECKOUT_NOTE_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
