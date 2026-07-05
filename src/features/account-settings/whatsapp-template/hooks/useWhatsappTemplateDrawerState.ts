import { useMemo, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { addWhatsappTemplateValidationSchema, editWhatsappTemplateValidationSchema } from '../validations';
import type { WhatsappTemplateFormData } from '../types';

export function useWhatsappTemplateDrawerState(
  drawer: {
    showDrawer: boolean;
    editingItem: { staff_id?: string; id?: number } | null;
    closeDrawer: () => void;
    drawerInitialValues: WhatsappTemplateFormData;
  },
  handlers: {
    handleAddSubmit: (values: WhatsappTemplateFormData, helpers: FormikHelpers<WhatsappTemplateFormData>) => Promise<boolean | undefined>;
    handleEditSubmit: (values: WhatsappTemplateFormData, helpers: FormikHelpers<WhatsappTemplateFormData>) => Promise<boolean | undefined>;
  },
) {
  const isEditing = !!drawer.editingItem;
  const onClose = useCallback(() => drawer.closeDrawer(), [drawer]);
  const validationSchema = useMemo(
    () => (isEditing ? editWhatsappTemplateValidationSchema : addWhatsappTemplateValidationSchema),
    [isEditing],
  );
  const onSubmit = useCallback(
    (values: WhatsappTemplateFormData, helpers: FormikHelpers<WhatsappTemplateFormData>) => {
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
