import { useCallback } from 'react';
import { useLookupOptions } from '../../../../shared/hooks/useLookupOptions';
import { taskService } from '../services/taskService';
import type { CategoryOption } from '../types/options';

export function useCategoryOptions() {
  const fetchCategories = useCallback(async (): Promise<CategoryOption[]> => {
    const catRes = await taskService.getTaskCategories();
    if (catRes.status && catRes.data) {
      return catRes.data.map((c: { id: number; taskCategory?: string; category?: string }) => ({
        value: String(c.id),
        label: c.taskCategory ?? c.category ?? '',
      }));
    }
    return [];
  }, []);

  const { options: categoryOptions, isLoading: categoryLoading, load: loadCategories } = useLookupOptions(fetchCategories);

  return { categoryOptions, categoryLoading, loadCategories };
}
