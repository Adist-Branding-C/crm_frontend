import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { useAutomationApi } from './useAutomationApi';
import { useDrawerScroll } from '../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import { applyFieldErrors } from '../../task-settings/call-reason/utils/applyFieldErrors';
import { AutomationMapper } from '../mappers/automation.mapper';
import type { AutomationFormData } from '../types/interface';
import type { CreateAutomationPayload } from '../types/request';

/**
 * Submit handling for the standalone builder page (create + edit), separate
 * from useAutomationSubmitHandlers - that hook is wired to the list page's
 * drawer flow (pagination refresh, list-scoped toast), which doesn't apply
 * here. This one just creates/updates and navigates back to the list on
 * success.
 */
export function useAutomationBuilderSubmit(id: string | undefined) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = useAutomationApi();
  const navigate = useNavigate();
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleSubmit = useCallback(async (
    values: AutomationFormData,
    { setSubmitting, setFieldError }: FormikHelpers<AutomationFormData>,
  ) => {
    setError(null);
    setIsLoading(true);

    try {
      const payload = AutomationMapper.toRequest(values);
      const response = id
        ? await api.update(id, payload)
        : await api.create(payload as CreateAutomationPayload);

      if (!response) {
        setError('Network error. Please try again.');
        return;
      }

      if (response.status) {
        navigate('/automation');
        return;
      }

      const errorField = applyFieldErrors(
        (response as unknown as Record<string, unknown>).errors as Record<string, string[]> | undefined,
        response.message,
        (response as unknown as Record<string, unknown>).field as string | undefined,
        setFieldError,
      );
      if (errorField) {
        scrollAndFocusError();
      } else {
        setError(response.message || 'Failed to save automation');
        scrollToTop();
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      setError(parsed.message);
      scrollToTop();
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [api, id, navigate, scrollAndFocusError, scrollToTop]);

  return { handleSubmit, isLoading, error };
}
