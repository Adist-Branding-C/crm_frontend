import { useCallback, useMemo } from 'react';
import { useTaskDrawer as useTaskDrawerCore } from './useTaskDrawer';
import { UNIFIED_EMPTY_VALUES } from '../constants/unifiedTaskInitialValues';
import { UnifiedTaskMapper } from '../mapper/unifiedTaskMapper';
import { unifiedTaskDataService } from '../services/unifiedTaskDataService';
import type { UnifiedTaskFormValues, UnifiedTaskItem } from '../types/unifiedTask.types';

export interface UseUnifiedTaskDrawerParams {
  loadStaff: () => void;
  loadCategories: () => void;
  loadLeads: () => void;
  loadCampaigns: () => void;
  loadDeals: () => void;
}

/**
 * Add/edit drawer state for the unified task form, composed with the lookup
 * loaders every task-type dropdown needs (General needs categories, Call needs
 * leads, Campaign needs campaigns, Deal needs deals - plus staff for all).
 *
 * Used by:
 * - unified TaskPage.
 *
 * Notes:
 * - Reuses the shared useTaskDrawer core (which wraps useEditDrawer + loaders).
 * - Edit re-fetches the task detail (GET /tasks/:id) so the drawer opens with
 *   the saved workflowId/stageId/intact (same behavior as the old per-module
 *   wrappers). If that fetch fails, the row item is used so editing never
 *   blocks on a network failure.
 */
export function useUnifiedTaskDrawer({
  loadStaff,
  loadCategories,
  loadLeads,
  loadCampaigns,
  loadDeals,
}: UseUnifiedTaskDrawerParams) {
  const loaders = useMemo(
    () => [loadStaff, loadCategories, loadLeads, loadCampaigns, loadDeals],
    [loadStaff, loadCategories, loadLeads, loadCampaigns, loadDeals],
  );

  const drawer = useTaskDrawerCore<UnifiedTaskItem, UnifiedTaskFormValues>({
    mapItemToFormData: UnifiedTaskMapper.toFormValues,
    emptyFormData: UNIFIED_EMPTY_VALUES,
    loaders,
  });

  const openEditDrawer = useCallback(async (item: UnifiedTaskItem) => {
    try {
      const detail = await unifiedTaskDataService.getById(item.id);
      if (detail.status && detail.data) {
        drawer.openEditDrawer(detail.data);
        return;
      }
    } catch (err: unknown) {
      console.error('[UnifiedTaskDrawer] Failed to fetch task detail; falling back to row item', err);
    }
    drawer.openEditDrawer(item);
  }, [drawer.openEditDrawer]);

  return { ...drawer, openEditDrawer };
}