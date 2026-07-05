import { useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { addDepartmentValidationSchema, editDepartmentValidationSchema } from '../validations';
import type { DepartmentFormData } from '../types';

export function useDepartmentDrawerState(
  drawer: {
    showDrawer: boolean;
    editingItem: { staff_id?: string; id?: number } | null;
    closeDrawer: () => void;
    drawerInitialValues: DepartmentFormData;
  },
  handlers: {
    handleAddSubmit: (values: DepartmentFormData, helpers: FormikHelpers<DepartmentFormData>) => Promise<boolean | undefined>;
    handleEditSubmit: (values: DepartmentFormData, helpers: FormikHelpers<DepartmentFormData>) => Promise<boolean | undefined>;
  },
) {
  const isEditing = !!drawer.editingItem;
  const onClose = useCallback(() => drawer.closeDrawer(), [drawer]);
  const validationSchema = useMemo(
    () => (isEditing ? editDepartmentValidationSchema : addDepartmentValidationSchema),
    [isEditing],
  );
  const onSubmit = useCallback(
    (values: DepartmentFormData, helpers: FormikHelpers<DepartmentFormData>) => {
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
