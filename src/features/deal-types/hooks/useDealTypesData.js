import { useState, useCallback } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { DEAL_TYPE_DATA } from '../constants';
export function useDealTypesData() {
    const crud = useCrudData(DEAL_TYPE_DATA);
    const [formData, setFormData] = useState({ type: '' });
    const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ type: '' }); }, [crud]);
    const handleEdit = useCallback((item) => { crud.handleEditClick(item); setFormData({ type: item.type }); }, [crud]);
    const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);
    return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
//# sourceMappingURL=useDealTypesData.js.map