import { useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { addBranchValidationSchema, editBranchValidationSchema } from '../validations';
import type { BranchFormData } from '../types';

export function useBranchDrawerState(
  drawer: {
    showDrawer: boolean;
    editingItem: { staff_id?: string; id?: number } | null;
    closeDrawer: () => void;
    drawerInitialValues: BranchFormData;
  },
  handlers: {
    handleAddSubmit: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => Promise<boolean | undefined>;
    handleEditSubmit: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => Promise<boolean | undefined>;
  },
) {
  const isEditing = !!drawer.editingItem;
  const onClose = useCallback(() => drawer.closeDrawer(), [drawer]);
  const validationSchema = useMemo(
    () => (isEditing ? editBranchValidationSchema : addBranchValidationSchema),
    [isEditing],
  );
  const onSubmit = useCallback(
    (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => {
      return isEditing
        ? handlers.handleEditSubmit(values, helpers)
        : handlers.handleAddSubmit(values, helpers);
    },
    [isEditing, handlers.handleAddSubmit, handlers.handleEditSubmit],
  );

  return {
    isOpen: drawer.showDrawer,
    onClose,
    validationSchema,
    initialValues: drawer.drawerInitialValues,
    onSubmit,
    isEditing,
  };
}
