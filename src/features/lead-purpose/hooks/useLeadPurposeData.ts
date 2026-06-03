import { useState, useCallback } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { LEAD_PURPOSE_DATA } from '../constants';
import type { LeadPurposeItem } from '../types';

export function useLeadPurposeData() {
  const crud = useCrudData(LEAD_PURPOSE_DATA);
  const [formData, setFormData] = useState({ title: '' });

  const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ title: '' }); }, [crud]);
  const handleEdit = useCallback((item: LeadPurposeItem) => { crud.handleEditClick(item); setFormData({ title: item.title }); }, [crud]);
  const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);

  return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
