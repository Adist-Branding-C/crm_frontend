import { useMemo } from 'react';
import { ADD_CALL_STATUS_INITIAL_VALUES } from '../constants/index';
export function useCallStatusForm(editingItem) {
    const editInitialValues = useMemo(() => editingItem
        ? { name: editingItem.name || '', status: editingItem.status || 'Active' }
        : ADD_CALL_STATUS_INITIAL_VALUES, [editingItem]);
    return { editInitialValues };
}
//# sourceMappingURL=useCallStatusForm.js.map