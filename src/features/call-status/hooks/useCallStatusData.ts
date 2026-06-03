import { useState, useCallback } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { INIT_DATA } from '../constants';
import type { CallStatusItem } from '../types';

export function useCallStatusData() {
  const crud = useCrudData(INIT_DATA);
  const [formData, setFormData] = useState({ name: '' });

  const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ name: '' }); }, [crud]);
  const handleEdit = useCallback((item: CallStatusItem) => { crud.handleEditClick(item); setFormData({ name: item.name }); }, [crud]);
  const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);

  return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
