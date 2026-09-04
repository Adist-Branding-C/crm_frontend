import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { buildRoleInitialValues } from '../utils/roleFormData.util';
import type { RoleItem, RoleFormData } from '../types/role.types';
import type { UseRoleActionsParams } from '../types/use-role-actions.types';

export function useRoleActions({ role, drawer }: UseRoleActionsParams) {
  const [deletingItem, setDeletingItem] = useState<RoleItem | null>(null);

  const handleSubmit = useCallback(async (
    values: RoleFormData,
    helpers: FormikHelpers<RoleFormData>,
  ) => {
    const success = await role.handleAddRole(values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [role.handleAddRole, drawer.closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: RoleFormData,
    helpers: FormikHelpers<RoleFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const item = drawer.editingItem;
    const original = buildRoleInitialValues(item);
    if (JSON.stringify(values.roleName.trim()) === JSON.stringify(original.roleName) &&
        values.canAccessWeb === original.canAccessWeb &&
        JSON.stringify(values.permissions) === JSON.stringify(original.permissions)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await role.handleUpdateRole(item.id, values, helpers);
    if (success) {
      drawer.closeDrawer();
    }
  }, [drawer.editingItem, role.handleUpdateRole, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: RoleItem) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await role.handleDeleteRole(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    } else if (role.dependencyError) {
      // The 409 dependency path already surfaced the "Cannot Delete Role"
      // modal (dependencyError=true). Clear the pending delete so the delete
      // confirmation modal does not reappear behind/before it.
      setDeletingItem(null);
    }
  }, [deletingItem, role.handleDeleteRole, role.dependencyError]);

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
