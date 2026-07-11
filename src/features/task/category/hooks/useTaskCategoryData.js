import { useState, useCallback } from 'react';
import { useCrudData } from '../../../../shared/hooks/useCrudData';
import { INIT_DATA } from '../constants';
export function useTaskCategoryData() {
    const crud = useCrudData(INIT_DATA);
    const [formData, setFormData] = useState({ name: '' });
    const handleAdd = useCallback(() => { crud.handleAddClick(); setFormData({ name: '' }); }, [crud]);
    const handleEdit = useCallback((item) => { crud.handleEditClick(item); setFormData({ name: item.name }); }, [crud]);
    const handleSave = useCallback(() => { crud.handleSave(formData); }, [crud, formData]);
    return { ...crud, formData, setFormData, handleAdd, handleEdit, handleSave };
}
//# sourceMappingURL=useTaskCategoryData.js.map