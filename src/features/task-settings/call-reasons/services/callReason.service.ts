import { fetchCallReasonsApi, createCallReasonApi, updateCallReasonApi, deleteCallReasonApi } from '../api/callReason.api';
import type { CallReasonFormData, CallReasonResponse } from '../types/callReason.types';

class CallReasonService {
  async getAll(params: Record<string, string | number | undefined> = {}): Promise<CallReasonResponse> {
    return fetchCallReasonsApi(params);
  }

  async create(data: CallReasonFormData): Promise<CallReasonResponse> {
    return createCallReasonApi(data);
  }

  async update(id: number, data: CallReasonFormData): Promise<CallReasonResponse> {
    return updateCallReasonApi(id, data);
  }

  async delete(id: number): Promise<Pick<CallReasonResponse, 'status' | 'message'>> {
    return deleteCallReasonApi(id);
  }
}

export const callReasonService = new CallReasonService();
