import { useState, useCallback } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { INIT_DATA } from '../constants';
import type { TaskCategoryItem } from '../types';

export function useTaskCategoriesData() {
  const crud = useCrudData(INIT_DATA);
  const [formData, setFormData] = useState({ category: '', action: '' });

  const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ category: '', action: '' }); }, [crud]);
  const handleEdit = useCallback((item: TaskCategoryItem) => { crud.handleEditClick(item); setFormData({ category: item.category, action: item.action }); }, [crud]);
  const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);

  return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
