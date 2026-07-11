import { useState, useCallback } from 'react';
import { ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES } from '../constants/deal-additional-field.constants';
export function useDealAdditionalFieldDrawer() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState(ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES);
    const openAddDrawer = useCallback(() => {
        setEditingItem(null);
        setFormData(ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES);
        setShowDrawer(true);
    }, []);
    const openEditDrawer = useCallback((item) => {
        setEditingItem(item);
        setFormData({
            fieldName: item.field,
            fieldType: item.type,
            inFilter: item.inFilter,
            inList: item.inList,
            required: item.required,
        });
        setShowDrawer(true);
    }, []);
    const closeDrawer = useCallback(() => {
        setShowDrawer(false);
        setEditingItem(null);
        setFormData(ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES);
    }, []);
    const handleInputChange = useCallback((e) => {
        const target = e.target;
        const name = target.name;
        const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);
    return { showDrawer, editingItem, formData, openAddDrawer, openEditDrawer, closeDrawer, handleInputChange };
}
//# sourceMappingURL=useDealAdditionalFieldDrawer.js.map