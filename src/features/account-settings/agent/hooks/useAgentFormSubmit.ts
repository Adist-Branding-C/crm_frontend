import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { mapAgentToFormData } from '../utils/mapAgentToFormData';
import type { AgentFormData } from '../types/agent.types';
import type { UseAgentFormSubmitParams } from '../types/use-agent-form-submit.types';

/**
 * Add/edit submit orchestration for the account-settings/agent ("Staff") drawer: dispatches to
 * add or update, skips the update call when the form is unchanged, and closes the drawer on success.
 */
export function useAgentFormSubmit({ editingItem, closeDrawer, handleAddAgent, handleUpdateAgent }: UseAgentFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: AgentFormData,
    helpers: FormikHelpers<AgentFormData>,
  ) => {
    const success = await handleAddAgent(values, helpers);
    if (success) {
      closeDrawer();
    }
  }, [handleAddAgent, closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: AgentFormData,
    helpers: FormikHelpers<AgentFormData>,
  ) => {
    if (!editingItem || !editingItem.staff_id) return;
    const original = mapAgentToFormData(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateAgent(editingItem.staff_id, values, helpers);
    if (success) {
      closeDrawer();
    }
  }, [editingItem, handleUpdateAgent, closeDrawer]);

  return { handleSubmit, handleEditSubmit };
}
