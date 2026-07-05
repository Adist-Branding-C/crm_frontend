import { useMemo, useCallback } from 'react';
import { addAgentValidationSchema, editAgentValidationSchema } from '../validations';
import type { FormikHelpers } from 'formik';
import type { AgentFormData, UseAgentDrawerReturn, AgentSubmitHandlers } from '../types';

export function useAgentDrawerState(
  drawer: UseAgentDrawerReturn,
  handlers: AgentSubmitHandlers,
) {
  const isEditing = !!drawer.editingItem;

  const onClose = useCallback(() => drawer.closeDrawer(), [drawer]);

  const validationSchema = useMemo(
    () => (isEditing ? editAgentValidationSchema : addAgentValidationSchema),
    [isEditing],
  );

  const onSubmit = useCallback(
    (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => {
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
