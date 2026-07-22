import { useState, useCallback } from 'react';
import { useCrudData } from '../../../../shared/hooks/useCrudData';
import { INIT_DATA } from '../constants';
import type { LeadStatusItem } from '../types';

export function useLeadStatusData() {
  const crud = useCrudData(INIT_DATA);
  const [formData, setFormData] = useState({ status: '', color: '#3b82f6', useForConversion: false });

  const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ status: '', color: '#3b82f6', useForConversion: false }); }, [crud]);
  const handleEdit = useCallback((item: LeadStatusItem) => { crud.handleEditClick(item); setFormData({ status: item.status, color: item.color, useForConversion: item.useForConversion }); }, [crud]);
  const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);

  return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
