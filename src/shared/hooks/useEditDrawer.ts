import { useState, useMemo, useCallback } from 'react';

interface UseEditDrawerOptions<TItem, TFormData> {
  mapItemToFormData: (item: TItem) => TFormData;
  emptyFormData: TFormData;
}

/**
 * Generic add/edit drawer state: open/close, which item (if any) is being edited, and the
 * Formik initial values derived from that item, falling back to a blank form in "add" mode.
 *
 * Notes:
 * - Reusable across any feature's add/edit drawer; pass the entity's own item->form mapper and
 *   blank-form shape. Previously reimplemented per-feature (account-settings/agent, designations,
 *   etc. each had an identical local useXDrawer hook); this is the shared version.
 */
export function useEditDrawer<TItem, TFormData>({ mapItemToFormData, emptyFormData }: UseEditDrawerOptions<TItem, TFormData>) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<TItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: TItem) => {
    setEditingItem(item);
    setShowDrawer(true);
  }, []);

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
