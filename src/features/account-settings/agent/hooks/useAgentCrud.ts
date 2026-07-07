import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { agentService } from '../services/agent.service';
import { AGENT_FIELD_MAP, AGENT_FIELD_ERROR_FALLBACKS } from '../constants/agent.constants';
import type { AgentFormData } from '../types/agent.types';
import type { UseAgentCrudParams } from '../types/use-agent-crud.types';

/**
 * Staff create/update/delete API orchestration for the account-settings/agent ("Staff") tab.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive (loading, error, refresh, reset-to-page-1)
 *   and a toast trigger as narrow dependencies, rather than owning or re-exporting the pagination
 *   or toast hooks themselves - AgentPage.tsx owns those hooks directly and reads their full
 *   state from there, not through this hook.
 */
export function useAgentCrud({ pagination, showToastMessage }: UseAgentCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: AGENT_FIELD_MAP,
    fieldFallbacks: AGENT_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddAgent = useCallback(async (
    values: AgentFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<AgentFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { fullName, email, password, designationId, status } = values;
      const sanitizedPhone = values.phone.replace(/\D/g, '').slice(0, 10);
      const requestData = { fullName, email: email.trim(), phone: sanitizedPhone, password, designationId, status };

      const response = await agentService.createAgent(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Staff member added successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add staff');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add staff');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage]);

  const handleUpdateAgent = useCallback(async (
    staffId: string,
    values: AgentFormData,
    { setSubmitting, setFieldError }: FormikHelpers<AgentFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { fullName, email, designationId, status } = values;
      const sanitizedPhone = values.phone.replace(/\D/g, '').slice(0, 10);
      const requestData = { fullName, email: email.trim(), phone: sanitizedPhone, designationId, status };

      const response = await agentService.updateAgent(staffId, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update staff');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update staff');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError]);

  const handleDeleteAgent = useCallback(async (staffId: string) => {
    pagination.setError('');

    try {
      const response = await agentService.deleteAgent(staffId);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete agent');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete agent');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return { handleAddAgent, handleUpdateAgent, handleDeleteAgent };
}
