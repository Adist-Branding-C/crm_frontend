import { useState, useCallback } from 'react';

interface UseAddEditFormOptions<TItem, TFormData> {
  emptyFormData: TFormData;
  mapItemToFormData: (item: TItem) => TFormData;
}

/**
 * Generic add/edit form state: which item (if any) is being edited, and locally-controlled
 * form values seeded from that item (or blank, in "add" mode).
 *
 * Notes:
 * - For features whose form isn't Formik-owned (plain controlled inputs synced back into
 *   `formData` on every change) - see useEditDrawer for the Formik-owned equivalent.
 *   Previously reimplemented per-feature (deal-settings/status, type, additional-fields each
 *   had an identical local useDealXDrawer hook); this is the shared version.
 */
export function useAddEditForm<TItem, TFormData>({ emptyFormData, mapItemToFormData }: UseAddEditFormOptions<TItem, TFormData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TItem | null>(null);
  const [formData, setFormData] = useState<TFormData>(emptyFormData);

  const openAdd = useCallback(() => {
    setEditingItem(null);
    setFormData(emptyFormData);
    setIsOpen(true);
  }, [emptyFormData]);

  const openEdit = useCallback((item: TItem) => {
    setEditingItem(item);
    setFormData(mapItemToFormData(item));
    setIsOpen(true);
  }, [mapItemToFormData]);

  const reset = useCallback(() => {
    setIsOpen(false);
    setEditingItem(null);
    setFormData(emptyFormData);
  }, [emptyFormData]);

  return { isOpen, editingItem, formData, setFormData, openAdd, openEdit, reset };
}
