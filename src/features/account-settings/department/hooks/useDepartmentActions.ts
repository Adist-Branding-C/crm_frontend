import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { DepartmentItem, DepartmentFormData } from '../types/department.types';
import type { UseDepartmentActionsParams } from '../types/use-department-actions.types';

export function useDepartmentActions({ department, drawer }: UseDepartmentActionsParams) {
  const [deletingItem, setDeletingItem] = useState<DepartmentItem | null>(null);

  const handleSubmit = useCallback(async (
    values: DepartmentFormData,
    helpers: FormikHelpers<DepartmentFormData>,
  ) => {
    const success = await department.handleAddDepartment(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [department.handleAddDepartment, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: DepartmentFormData,
    helpers: FormikHelpers<DepartmentFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const success = await department.handleUpdateDepartment(drawer.editingItem.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, department.handleUpdateDepartment, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: DepartmentItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await department.handleDeleteDepartment(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, department.handleDeleteDepartment]);

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
  };
}
