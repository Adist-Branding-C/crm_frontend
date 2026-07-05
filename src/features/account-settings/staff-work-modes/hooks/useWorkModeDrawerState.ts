import { useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { addWorkModeValidationSchema, editWorkModeValidationSchema } from '../validations';
import type { WorkModeFormData } from '../types';

export function useWorkModeDrawerState(
  drawer: {
    showDrawer: boolean;
    editingItem: { staff_id?: string; id?: number } | null;
    closeDrawer: () => void;
    drawerInitialValues: WorkModeFormData;
  },
  handlers: {
    handleAddSubmit: (values: WorkModeFormData, helpers: FormikHelpers<WorkModeFormData>) => Promise<boolean | undefined>;
    handleEditSubmit: (values: WorkModeFormData, helpers: FormikHelpers<WorkModeFormData>) => Promise<boolean | undefined>;
  },
) {
  const isEditing = !!drawer.editingItem;
  const onClose = useCallback(() => drawer.closeDrawer(), [drawer]);
  const validationSchema = useMemo(
    () => (isEditing ? editWorkModeValidationSchema : addWorkModeValidationSchema),
    [isEditing],
  );
  const onSubmit = useCallback(
    (values: WorkModeFormData, helpers: FormikHelpers<WorkModeFormData>) => {
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
