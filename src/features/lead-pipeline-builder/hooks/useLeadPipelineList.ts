import { useCallback, useEffect, useState } from 'react';
import { leadPipelineService } from '../services/leadPipeline.service';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import type { LeadPipelineItem } from '../types/interface';

/**
 * Data + CRUD actions for the pipeline list page: fetch, create, set-default,
 * delete. 
 *
 * Used by:
 * - LeadPipelineListPage
 */
export function useLeadPipelineList() {
  const [pipelines, setPipelines] = useState<LeadPipelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const items = await leadPipelineService.getAllPipelines();
      setPipelines(items);
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createPipeline = useCallback(
    async (name: string): Promise<{ success: boolean; message?: string }> => {
      try {
        const response = await leadPipelineService.createPipeline(name);
        if (response.status) {
          await refresh();
          return { success: true };
        }
        return { success: false, message: response.message };
      } catch (err) {
        return { success: false, message: parseApiError(err).message };
      }
    },
    [refresh],
  );

  const setDefaultPipeline = useCallback(
    async (id: number): Promise<{ success: boolean; message?: string }> => {
      try {
        const response = await leadPipelineService.setDefaultPipeline(id);
        if (response.status) {
          await refresh();
          return { success: true };
        }
        return { success: false, message: response.message };
      } catch (err) {
        return { success: false, message: parseApiError(err).message };
      }
    },
    [refresh],
  );

  const deletePipeline = useCallback(
    async (id: number): Promise<{ success: boolean; message?: string }> => {
      try {
        const response = await leadPipelineService.deletePipeline(id);
        if (response.status) {
          await refresh();
          return { success: true };
        }
        return { success: false, message: response.message };
      } catch (err) {
        return { success: false, message: parseApiError(err).message };
      }
    },
    [refresh],
  );

  return {
    pipelines,
    isLoading,
    error,
    refresh,
    createPipeline,
    setDefaultPipeline,
    deletePipeline,
  };
}
