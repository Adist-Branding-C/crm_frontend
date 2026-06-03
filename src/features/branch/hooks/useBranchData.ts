import { useState, useCallback } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { BRANCH_DATA } from '../constants';
import type { BranchItem } from '../types';

export function useBranchData() {
  const crud = useCrudData(BRANCH_DATA);
  const [formData, setFormData] = useState({ name: '' });

  const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ name: '' }); }, [crud]);
  const handleEdit = useCallback((item: BranchItem) => { crud.handleEditClick(item); setFormData({ name: item.name }); }, [crud]);
  const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);

  return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
