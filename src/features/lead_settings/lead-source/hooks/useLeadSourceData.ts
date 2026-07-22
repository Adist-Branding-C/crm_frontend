import { useState, useCallback } from 'react';
import { useCrudData } from '../../../../shared/hooks/useCrudData';
import { LEAD_SOURCE_DATA } from '../constants';
import type { LeadSourceItem } from '../types';

export function useLeadSourceData() {
  const crud = useCrudData(LEAD_SOURCE_DATA);
  const [formData, setFormData] = useState({ source: '' });

  const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ source: '' }); }, [crud]);
  const handleEdit = useCallback((item: LeadSourceItem) => { crud.handleEditClick(item); setFormData({ source: item.source }); }, [crud]);
  const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);

  return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
