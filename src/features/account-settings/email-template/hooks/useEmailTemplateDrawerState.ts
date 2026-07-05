import { useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { addEmailTemplateValidationSchema, editEmailTemplateValidationSchema } from '../validations';
import type { EmailTemplateFormData } from '../types';

export function useEmailTemplateDrawerState(
  drawer: {
    showDrawer: boolean;
    editingItem: { staff_id?: string; id?: number } | null;
    closeDrawer: () => void;
    drawerInitialValues: EmailTemplateFormData;
  },
  handlers: {
    handleAddSubmit: (values: EmailTemplateFormData, helpers: FormikHelpers<EmailTemplateFormData>) => Promise<boolean | undefined>;
    handleEditSubmit: (values: EmailTemplateFormData, helpers: FormikHelpers<EmailTemplateFormData>) => Promise<boolean | undefined>;
  },
) {
  const isEditing = !!drawer.editingItem;
  const onClose = useCallback(() => drawer.closeDrawer(), [drawer]);
  const validationSchema = useMemo(
    () => (isEditing ? editEmailTemplateValidationSchema : addEmailTemplateValidationSchema),
    [isEditing],
  );
  const onSubmit = useCallback(
    (values: EmailTemplateFormData, helpers: FormikHelpers<EmailTemplateFormData>) => {
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
