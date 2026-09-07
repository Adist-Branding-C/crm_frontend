import { useCallback, useEffect, useState } from 'react';
import { dealPipelineService } from '../services/dealPipeline.service';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import type { DealPipelineItem } from '../types/interface';

/**
 * Data + CRUD actions for the pipeline list page: fetch, create, activate,
 * set-default, delete. Owns loading/error state for the list itself; does
 * not own any drawer/modal open state (the page composes that separately
 * via useDrawer, per the project's hook-architecture standard).
 *
 * Used by:
 * - DealPipelineListPage
 */
export function useDealPipelineList() {
  const [pipelines, setPipelines] = useState<DealPipelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const items = await dealPipelineService.getAllPipelines();
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
        const response = await dealPipelineService.createPipeline(name);
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

  const activatePipeline = useCallback(
    async (id: number): Promise<{ success: boolean; message?: string }> => {
      try {
        const response = await dealPipelineService.activatePipeline(id);
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
        const response = await dealPipelineService.setDefaultPipeline(id);
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
        const response = await dealPipelineService.deletePipeline(id);
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
    activatePipeline,
    setDefaultPipeline,
    deletePipeline,
  };
}
