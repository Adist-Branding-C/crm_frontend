import { useCallback } from 'react';
import { useLookupOptions } from '../../../../shared/hooks/useLookupOptions';
import { taskService } from '../services/taskService';
import type { CategoryOption } from '../types/options';

export function useCategoryOptions() {
  const fetchCategories = useCallback(async (): Promise<CategoryOption[]> => {
    const catRes = await taskService.getTaskCategories();
    if (catRes.status && catRes.data?.items) {
      return catRes.data.items.map((c) => ({ value: c.id, label: c.taskCategory }));
    }
    return [];
  }, []);

  const { options: categoryOptions, load: loadCategories } = useLookupOptions(fetchCategories);

  return { categoryOptions, loadCategories };
}
