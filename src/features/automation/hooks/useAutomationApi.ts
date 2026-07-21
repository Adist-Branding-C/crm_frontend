import { useCallback } from 'react';
import { automationApiService } from '../services';
import type { CreateAutomationPayload, UpdateAutomationPayload } from '../types/request';
import type { ApiResponse } from '../../../shared/types/common';

export function useAutomationApi() {
  const create = useCallback(async (payload: CreateAutomationPayload): Promise<ApiResponse<{ id: string }> | null> => {
    try {
      return await automationApiService.create(payload);
    } catch {
      return null;
    }
  }, []);

  const update = useCallback(async (id: string, payload: UpdateAutomationPayload): Promise<ApiResponse<null> | null> => {
    try {
      return await automationApiService.update(id, payload);
    } catch {
      return null;
    }
  }, []);

  const toggleStatus = useCallback(async (id: string, isActive: boolean): Promise<ApiResponse<null> | null> => {
    try {
      return await automationApiService.toggleStatus(id, isActive);
    } catch {
      return null;
    }
  }, []);

  const remove = useCallback(async (id: string): Promise<ApiResponse<null> | null> => {
    try {
      return await automationApiService.delete(id);
    } catch {
      return null;
    }
  }, []);

  return { create, update, toggleStatus, remove };
}
