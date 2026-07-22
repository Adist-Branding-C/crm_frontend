import { useState, useCallback } from 'react';
import { LEAD_TYPE_DATA } from '../constants';
import type { LeadTypeItem } from '../types';
import { useCrudData } from '../../../../shared/hooks/useCrudData';

export function useLeadTypesData() {
  const crud = useCrudData(LEAD_TYPE_DATA);
  const [formData, setFormData] = useState({ type: '' });

  const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ type: '' }); }, [crud]);
  const handleEdit = useCallback((item: LeadTypeItem) => { crud.handleEditClick(item); setFormData({ type: item.type }); }, [crud]);
  const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);

  return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
