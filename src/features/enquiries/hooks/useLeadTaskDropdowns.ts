import { useState, useEffect, useRef } from 'react';
import { taskCategoryService } from '../../task-settings/task-category/services/taskCategory.service';
import { staffService } from '../../deal/services/staff.service';
import type { LabelValuePair } from '../../../shared/types/common';

export function useLeadTaskDropdowns(isOpen: boolean) {
  const [categoryOptions, setCategoryOptions] = useState<LabelValuePair[]>([]);
  const [staffOptions, setStaffOptions] = useState<LabelValuePair[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingStaff, setIsLoadingStaff] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [staffError, setStaffError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (isOpen && !fetchedRef.current) {
      fetchedRef.current = true;

      setIsLoadingCategories(true);
      setCategoriesError(null);
      taskCategoryService.getAll({ pageNumber: 1, limit: 10 })
        .then((response) => {
          const raw = response.data as Record<string, unknown> | undefined;
          const items = (raw && 'items' in raw
            ? (raw as { items: Array<{ id: number; taskCategory?: string; category?: string }> }).items
            : Array.isArray(response.data)
              ? response.data
              : []) || [];
          setCategoryOptions(
            items.map((item) => ({
              value: String(item.id),
              label: item.taskCategory ?? item.category ?? '',
            }))
          );
        })
        .catch(() => setCategoriesError('Failed to load categories'))
        .finally(() => setIsLoadingCategories(false));

      setIsLoadingStaff(true);
      setStaffError(null);
      staffService.getStaff()
        .then((response) => {
          const data = response?.data ?? [];
          const items = Array.isArray(data) ? data : (data as { items: Array<{ staff_id?: string; id?: string; name: string }> }).items ?? [];
          setStaffOptions(
            (Array.isArray(items) ? items : []).map((s) => ({
              value: s.staff_id ?? s.id ?? '',
              label: s.name,
            }))
          );
        })
        .catch(() => setStaffError('Failed to load staff'))
        .finally(() => setIsLoadingStaff(false));
    }
    if (!isOpen) {
      fetchedRef.current = false;
    }
  }, [isOpen]);

  return {
    categoryOptions,
    staffOptions,
    isLoadingCategories,
    isLoadingStaff,
    categoriesError,
    staffError,
  };
}
