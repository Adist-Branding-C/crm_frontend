import { useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { addCheckoutNoteValidationSchema, editCheckoutNoteValidationSchema } from '../validations';
import type { CheckoutNoteFormData } from '../types';

export function useCheckoutNoteDrawerState(
  drawer: {
    showDrawer: boolean;
    editingItem: { staff_id?: string; id?: number } | null;
    closeDrawer: () => void;
    drawerInitialValues: CheckoutNoteFormData;
  },
  handlers: {
    handleAddSubmit: (values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => Promise<boolean | undefined>;
    handleEditSubmit: (values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => Promise<boolean | undefined>;
  },
) {
  const isEditing = !!drawer.editingItem;
  const onClose = useCallback(() => drawer.closeDrawer(), [drawer]);
  const validationSchema = useMemo(
    () => (isEditing ? editCheckoutNoteValidationSchema : addCheckoutNoteValidationSchema),
    [isEditing],
  );
  const onSubmit = useCallback(
    (values: CheckoutNoteFormData, helpers: FormikHelpers<CheckoutNoteFormData>) => {
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
