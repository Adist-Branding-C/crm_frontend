import { useState, useMemo, useCallback } from 'react';

interface UseEditDrawerOptions<TItem, TFormData> {
  mapItemToFormData: (item: TItem) => TFormData;
  emptyFormData: TFormData;
  onOpen?: () => void;
}

/**
 * Generic add/edit drawer state: open/close, which item (if any) is being edited, and the
 * Formik initial values derived from that item, falling back to a blank form in "add" mode.
 *
 * Notes:
 * - Reusable across any feature's add/edit drawer; pass the entity's own item->form mapper and
 *   blank-form shape. Previously reimplemented per-feature (account-settings/agent, designations,
 *   etc. each had an identical local useXDrawer hook); this is the shared version.
 * - onOpen fires on both add and edit opens, before showDrawer flips true - use it to clear any
 *   stale submit-error banner from a previous drawer session (it otherwise persists into the
 *   next open since the error lives in the list/table hook, not the drawer's own state).
 */
export function useEditDrawer<TItem, TFormData>({ mapItemToFormData, emptyFormData, onOpen }: UseEditDrawerOptions<TItem, TFormData>) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<TItem | null>(null);

  const openAddDrawer = useCallback(() => {
    onOpen?.();
    setEditingItem(null);
    setShowDrawer(true);
  }, [onOpen]);

  const openEditDrawer = useCallback((item: TItem) => {
    onOpen?.();
    setEditingItem(item);
    setShowDrawer(true);
  }, [onOpen]);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const drawerInitialValues = useMemo(
    () => (editingItem ? mapItemToFormData(editingItem) : emptyFormData),
    [editingItem, mapItemToFormData, emptyFormData]
  );

  return { showDrawer, editingItem, openAddDrawer, openEditDrawer, closeDrawer, drawerInitialValues };
}
