import { useState, useCallback } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { WORK_MODE_DATA } from '../constants';
import type { WorkModeItem } from '../types';

export function useWorkModeData() {
  const crud = useCrudData(WORK_MODE_DATA);
  const [formData, setFormData] = useState({ name: '' });

  const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ name: '' }); }, [crud]);
  const handleEdit = useCallback((item: WorkModeItem) => { crud.handleEditClick(item); setFormData({ name: item.name }); }, [crud]);
  const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);

  return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
