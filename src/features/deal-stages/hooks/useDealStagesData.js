import { useState, useCallback } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { DEAL_STAGE_DATA } from '../constants';
export function useDealStagesData() {
    const crud = useCrudData(DEAL_STAGE_DATA);
    const [formData, setFormData] = useState({ status: '', stage: '', priority: 0 });
    const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ status: '', stage: '', priority: 0 }); }, [crud]);
    const handleEdit = useCallback((item) => { crud.handleEditClick(item); setFormData({ status: item.status, stage: item.stage, priority: item.priority }); }, [crud]);
    const handleSave = useCallback(() => { crud.handleSave({ ...formData, priority: Number(formData.priority) }); }, [crud, formData]);
    return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
//# sourceMappingURL=useDealStagesData.js.map