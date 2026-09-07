import { useCallback, useEffect, useState } from 'react';
import { dealPipelineService } from '../../deal-pipeline-builder/services/dealPipeline.service';
import { DEAL_BOARD_PIPELINE_STORAGE_KEY } from '../constants/dealBoard.constants';
import type { DealPipelineItem } from '../../deal-pipeline-builder/types/interface';

function readStoredPipelineId(): number | null {
  try {
    const stored = localStorage.getItem(DEAL_BOARD_PIPELINE_STORAGE_KEY);
    return stored ? Number(stored) : null;
  } catch {
    return null;
  }
}

function storePipelineId(id: number): void {
  try {
    localStorage.setItem(DEAL_BOARD_PIPELINE_STORAGE_KEY, String(id));
  } catch {
    // Private browsing / storage disabled - the picker still works for
    // this session, it just won't remember the choice next visit.
  }
}

/**
 * Loads the company's pipelines and resolves which one the board should
 * show: the last one this user picked (localStorage), falling back to the
 * company's default pipeline if that stored id no longer exists.
 *
 * Used by:
 * - DealBoardPage
 */
export function useSelectedPipeline() {
  const [pipelines, setPipelines] = useState<DealPipelineItem[]>([]);
  const [selectedPipelineId, setSelectedPipelineIdState] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    dealPipelineService
      .getAllPipelines()
      .then((items) => {
        if (cancelled) return;
        setPipelines(items);
        const stored = readStoredPipelineId();
        const storedIsValid = stored !== null && items.some((p) => Number(p.id) === stored);
        const fallback = items.find((p) => p.isDefault) ?? items[0];
        setSelectedPipelineIdState(storedIsValid ? stored : fallback ? Number(fallback.id) : null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setSelectedPipelineId = useCallback((id: number) => {
    setSelectedPipelineIdState(id);
    storePipelineId(id);
  }, []);

  return { pipelines, selectedPipelineId, setSelectedPipelineId, isLoading };
}
