import { useState, useCallback } from 'react';
export function useDepartmentActions({ department, drawer }) {
    const [deletingItem, setDeletingItem] = useState(null);
    const handleSubmit = useCallback(async (values, helpers) => {
        const success = await department.handleAddDepartment(values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [department.handleAddDepartment, drawer.closeDrawer]);
    const handleEditSubmit = useCallback(async (values, helpers) => {
        if (!drawer.editingItem)
            return;
        const item = drawer.editingItem;
        const original = {
            departmentName: item.departmentName || item.name || '',
            description: item.description || '',
            status: item.status || '',
        };
        if (JSON.stringify(values) === JSON.stringify(original)) {
            helpers.setSubmitting(false);
            return;
        }
        const success = await department.handleUpdateDepartment(item.id, values, helpers);
        if (success) {
            drawer.closeDrawer();
        }
    }, [drawer.editingItem, department.handleUpdateDepartment, drawer.closeDrawer]);
    const handleDeleteClick = useCallback((item) => {
        setDeletingItem(item);
    }, []);
    const handleConfirmDelete = useCallback(async () => {
        if (!deletingItem)
            return;
        const success = await department.handleDeleteDepartment(deletingItem.id);
        if (success) {
            setDeletingItem(null);
        }
        else if (department.dependencyError) {
            setDeletingItem(null);
        }
    }, [deletingItem, department.handleDeleteDepartment, department.dependencyError]);
    const handleCloseDependencyError = useCallback(() => {
        department.clearDependencyError();
    }, [department.clearDependencyError]);
    const closeDeleteModal = useCallback(() => {
        setDeletingItem(null);
    }, []);
    return {
        deletingItem,
        handleSubmit,
        handleEditSubmit,
        handleDeleteClick,
        handleConfirmDelete,
        closeDeleteModal,
        handleCloseDependencyError,
    };
}
//# sourceMappingURL=useDepartmentActions.js.map