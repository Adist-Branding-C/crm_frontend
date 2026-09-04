import { useCallback, useState } from 'react';
import type { FormikHelpers } from 'formik';
import { taskDataService } from '../../task/task/services/taskDataService';
import { callTaskDataService } from '../../task/call-task/services/callTaskDataService';
import { campaignTaskDataService } from '../../task/campaign-task/services/campaignTaskDataService';
import { dealTaskDataService } from '../../task/deal-task/services/dealTaskDataService';
import { ADD_TASK_INITIAL_VALUES } from '../../task/task/constants/addTask.constants';
import { ADD_CALL_TASK_INITIAL_VALUES } from '../../task/call-task/constants/addCallTask.constants';
import { ADD_CAMPAIGN_TASK_INITIAL_VALUES } from '../../task/campaign-task/constants/addCampaignTask.constants';
import { ADD_DEAL_TASK_INITIAL_VALUES } from '../../task/deal-task/constants/addDealTask.constants';
import { TASK_FIELD_MAP, TASK_FIELD_ERROR_FALLBACKS } from '../../task/common/constants/fieldErrors';
import { useStaffOptions } from '../../task/common/hooks/useStaffOptions';
import { useCategoryOptions } from '../../task/common/hooks/useCategoryOptions';
import { useLeadOptions } from '../../task/common/hooks/useLeadOptions';
import { useCampaignOptions } from '../../task/common/hooks/useCampaignOptions';
import { useDealOptions } from '../../task/common/hooks/useDealOptions';
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
export function useCalendarAddTask(onCreated: () => void, showToast: (message: string, type: 'success' | 'error') => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetDate, setTargetDate] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [taskType, setTaskType] = useState<'NORMAL' | 'CALL_TASK' | 'CAMPAIGN_TASK' | 'DEAL_TASK'>('NORMAL');

  const staff = useStaffOptions();
  const categories = useCategoryOptions();
  const leads = useLeadOptions();
  const campaigns = useCampaignOptions();
  const deals = useDealOptions();

  const submitError = useSubmitErrorHandler({
    fieldMap: TASK_FIELD_MAP,
    fieldFallbacks: TASK_FIELD_ERROR_FALLBACKS,
    setError,
  });

  const open = useCallback((date: string) => {
    staff.loadStaff();
    categories.loadCategories();
    leads.loadLeads();
    campaigns.loadCampaigns();
    deals.loadDeals();
    setTargetDate(date);
    setError('');
    setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const getInitialValues = () => {
    if (taskType === 'CALL_TASK') return { ...ADD_CALL_TASK_INITIAL_VALUES, scheduledDate: targetDate };
    if (taskType === 'CAMPAIGN_TASK') return { ...ADD_CAMPAIGN_TASK_INITIAL_VALUES, scheduledDate: targetDate };
    if (taskType === 'DEAL_TASK') return { ...ADD_DEAL_TASK_INITIAL_VALUES, scheduledDate: targetDate };
    return { ...ADD_TASK_INITIAL_VALUES, scheduledDate: targetDate };
  };

  const initialValues = getInitialValues() as any;

  const handleSubmit = useCallback(async (
    values: any,
    helpers: FormikHelpers<any>,
  ) => {
    setError('');
    setIsSaving(true);
    try {
      let response;
      if (taskType === 'CALL_TASK') response = await callTaskDataService.create(values);
      else if (taskType === 'CAMPAIGN_TASK') response = await campaignTaskDataService.create(values);
      else if (taskType === 'DEAL_TASK') response = await dealTaskDataService.create(values);
      else response = await taskDataService.create(values);

      if (response.status) {
        showToast('Task created successfully', 'success');
        onCreated();
        setIsOpen(false);
        return;
      }
      submitError.handleErrorResponse(response, helpers.setFieldError as any, 'Failed to create task');
    } catch (err: unknown) {
      submitError.handleThrownError(err, helpers.setFieldError as any, 'Failed to create task');
    } finally {
      setIsSaving(false);
      helpers.setSubmitting(false);
    }
  }, [onCreated, submitError, taskType]);

  return {
    isOpen,
    open,
    close,
    initialValues,
    error,
    isSaving,
    handleSubmit,
    taskType,
    setTaskType,
    staffOptions: staff.staffOptions,
    staffLoading: staff.staffLoading,
    categoryOptions: categories.categoryOptions,
    categoryLoading: categories.categoryLoading,
    leadOptions: leads.leadOptions,
    leadLoading: leads.leadLoading,
    campaignOptions: campaigns.campaignOptions,
    campaignLoading: campaigns.campaignLoading,
    dealOptions: deals.dealOptions,
    dealLoading: deals.dealLoading,
  };
}
