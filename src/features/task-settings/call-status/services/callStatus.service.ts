import { fetchCallStatusesApi, createCallStatusApi, updateCallStatusApi, deleteCallStatusApi } from './callStatus.api';
import type { CallStatusFormData, CallStatusResponse } from '../types/index';

class CallStatusService {
  async getAll(params: Record<string, string | number | undefined> = {}): Promise<CallStatusResponse> {
    return fetchCallStatusesApi(params);
  }

  async create(data: CallStatusFormData): Promise<CallStatusResponse> {
    return createCallStatusApi(data);
  }

  async update(id: number, data: CallStatusFormData): Promise<CallStatusResponse> {
    return updateCallStatusApi(id, data);
  }

  async delete(id: number): Promise<Pick<CallStatusResponse, 'status' | 'message'>> {
    return deleteCallStatusApi(id);
  }
}

export const callStatusService = new CallStatusService();
