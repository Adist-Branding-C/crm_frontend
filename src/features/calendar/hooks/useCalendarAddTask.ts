import { useCallback, useState } from 'react';
import type { FormikHelpers } from 'formik';
import { taskDataService } from '../../task/task/services/taskDataService';
import { ADD_TASK_INITIAL_VALUES } from '../../task/task/constants/addTask.constants';
import { TASK_FIELD_MAP, TASK_FIELD_ERROR_FALLBACKS } from '../../task/common/constants/fieldErrors';
import { useStaffOptions } from '../../task/common/hooks/useStaffOptions';
import { useCategoryOptions } from '../../task/common/hooks/useCategoryOptions';
import { useLeadOptions } from '../../task/common/hooks/useLeadOptions';
import { useSubmitErrorHandler } from '../../../shared/hooks/useSubmitErrorHandler';
import type { TaskFormData } from '../../task/task/types';

/**
 * Add-task drawer state for the Calendar's "Add Task" button (opened from a
 * day cell / DayDrawer). Reuses the same create endpoint, form, and option
 * loaders as the standalone Task page (TaskPage.tsx) - Calendar never had
 * its own task-creation logic, it's the same Task entity either way.
 *
 * Used by:
 * - CalendarPage.
 */
export function useCalendarAddTask(onCreated: () => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetDate, setTargetDate] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const staff = useStaffOptions();
  const categories = useCategoryOptions();
  const leads = useLeadOptions();

  const submitError = useSubmitErrorHandler({
    fieldMap: TASK_FIELD_MAP,
    fieldFallbacks: TASK_FIELD_ERROR_FALLBACKS,
    setError,
  });

  const open = useCallback((date: string) => {
    staff.loadStaff();
    categories.loadCategories();
    leads.loadLeads();
    setTargetDate(date);
    setError('');
    setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const initialValues: TaskFormData = { ...ADD_TASK_INITIAL_VALUES, scheduledDate: targetDate };

  const handleSubmit = useCallback(async (
    values: TaskFormData,
    helpers: FormikHelpers<TaskFormData>,
  ) => {
    setError('');
    setIsSaving(true);
    try {
      const response = await taskDataService.create(values);
      if (response.status) {
        onCreated();
        setIsOpen(false);
        return;
      }
      submitError.handleErrorResponse(response, helpers.setFieldError, 'Failed to create task');
    } catch (err: unknown) {
      submitError.handleThrownError(err, helpers.setFieldError, 'Failed to create task');
    } finally {
      setIsSaving(false);
      helpers.setSubmitting(false);
    }
  }, [onCreated, submitError]);

  return {
    isOpen,
    open,
    close,
    initialValues,
    error,
    isSaving,
    handleSubmit,
    staffOptions: staff.staffOptions,
    staffLoading: staff.staffLoading,
    categoryOptions: categories.categoryOptions,
    categoryLoading: categories.categoryLoading,
    leadOptions: leads.leadOptions,
    leadLoading: leads.leadLoading,
  };
}
