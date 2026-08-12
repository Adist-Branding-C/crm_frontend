import { useCallback } from 'react';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';

interface UseTaskDrawerParams<TItem, TFormData> {
  mapItemToFormData: (item: TItem) => TFormData;
  emptyFormData: TFormData;
  loaders: Array<() => void>;
}

/**
 * Add/edit drawer state for a task-type entity, composed with the lookup loaders
 * its form's dropdowns need - every loader runs on both add-open and edit-open.
 *
 * Used by:
 * - useTaskDrawer (task), useCallTaskDrawer, useCampaignTaskDrawer, useDealTaskDrawer -
 *   each passes its own mapper, blank-form shape, and loader list (Task additionally
 *   loads categories; the other three only load staff and leads).
 *
 * Notes:
 * - Previously each of the four sub-modules reimplemented this exact
 *   "wrap useEditDrawer's open actions with the lookup loads" pattern.
 */
export function useTaskDrawer<TItem, TFormData>({ mapItemToFormData, emptyFormData, loaders }: UseTaskDrawerParams<TItem, TFormData>) {
  const drawer = useEditDrawer<TItem, TFormData>({ mapItemToFormData, emptyFormData });

  const openAddDrawer = useCallback(() => {
    loaders.forEach((load) => load());
    drawer.openAddDrawer();
  }, [loaders, drawer.openAddDrawer]);

  const openEditDrawer = useCallback((item: TItem) => {
    loaders.forEach((load) => load());
    drawer.openEditDrawer(item);
  }, [loaders, drawer.openEditDrawer]);

  return { ...drawer, openAddDrawer, openEditDrawer };
}
