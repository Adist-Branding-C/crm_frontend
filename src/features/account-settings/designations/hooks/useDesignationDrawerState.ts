import { useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { addDesignationValidationSchema, editDesignationValidationSchema } from '../validations';
import type { DesignationFormData } from '../types';

export function useDesignationDrawerState(
  drawer: {
    showDrawer: boolean;
    editingItem: { staff_id?: string; id?: number } | null;
    closeDrawer: () => void;
    drawerInitialValues: DesignationFormData;
  },
  handlers: {
    handleAddSubmit: (values: DesignationFormData, helpers: FormikHelpers<DesignationFormData>) => Promise<boolean | undefined>;
    handleEditSubmit: (values: DesignationFormData, helpers: FormikHelpers<DesignationFormData>) => Promise<boolean | undefined>;
  },
) {
  const isEditing = !!drawer.editingItem;
  const onClose = useCallback(() => drawer.closeDrawer(), [drawer]);
  const validationSchema = useMemo(
    () => (isEditing ? editDesignationValidationSchema : addDesignationValidationSchema),
    [isEditing],
  );
  const onSubmit = useCallback(
    (values: DesignationFormData, helpers: FormikHelpers<DesignationFormData>) => {
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
