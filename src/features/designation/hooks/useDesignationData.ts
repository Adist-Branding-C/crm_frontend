import { useState, useCallback } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { DESIGNATION_DATA } from '../constants';
import type { DesignationItem } from '../types';

export function useDesignationData() {
  const crud = useCrudData(DESIGNATION_DATA);
  const [formData, setFormData] = useState({ name: '' });

  const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ name: '' }); }, [crud]);
  const handleEdit = useCallback((item: DesignationItem) => { crud.handleEditClick(item); setFormData({ name: item.name }); }, [crud]);
  const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);

  return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
