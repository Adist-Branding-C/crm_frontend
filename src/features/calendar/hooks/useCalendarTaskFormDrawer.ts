import { useCallback, useMemo, useState } from 'react';
import { draftService } from '../../../shared/services/draftService';
import { useStaffOptions } from '../../task/common/hooks/useStaffOptions';
import { useCategoryOptions } from '../../task/common/hooks/useCategoryOptions';
import { useLeadOptions } from '../../task/common/hooks/useLeadOptions';
import { useCampaignOptions } from '../../task/common/hooks/useCampaignOptions';
import { useDealOptions } from '../../task/common/hooks/useDealOptions';
import { useTaskCrud } from '../../task/common/hooks/useTaskCrud';
import { useTaskFormSubmit } from '../../task/common/hooks/useTaskFormSubmit';
import { UnifiedTaskMapper } from '../../task/common/mapper/unifiedTaskMapper';
import { unifiedTaskDataService } from '../../task/common/services/unifiedTaskDataService';
import { UNIFIED_EMPTY_VALUES } from '../../task/common/constants/unifiedTaskInitialValues';
import type { TaskCrudPagination } from '../../task/common/types/taskCrud.types';
import type { UnifiedTaskFormValues, UnifiedTaskItem } from '../../task/common/types/unifiedTask.types';

/**
 * Add-task drawer state for the Calendar's "Add Task" button, feeding the shared
 * unified TaskFormDrawer. Everything the drawer needs is already the same Task
 * entity as /user/tasks, so Calendar reuses the unified create pipeline instead
 * of its own per-type services: useTaskCrud + useTaskFormSubmit over
 * unifiedTaskDataService, which posts to POST /tasks with `taskType` in the
 * payload.
 *
 * Used by:
 * - CalendarPage.
 *
 * Notes:
 * - The only calendar-specific behavior left is the pre-seeded scheduledDate:
 *   the day cell / DayDrawer the user clicked becomes the task's due date.
 * - All five lookup loaders run on open so every taskType's association
 *   dropdown (category/lead/campaign/deal) plus Assigned To are populated, the
 *   same set the unified form resolves per taskType.
 * - draftId is owned here and handed to the drawer with onDraftSaved, so the
 *   form's add-flow autosave updates one draft instead of orphaning a new one
 *   on every keystroke pause; a successful create deletes it.
 * - Add-only: editing a calendar task is not part of this flow, so no
 *   editingItem is threaded through and handleEditSubmit is unused.
 */
export function useCalendarTaskFormDrawer(
  onCreated: () => void,
  showToastMessage: (message: string, type: 'success' | 'error') => void,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetDate, setTargetDate] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);

  const staff = useStaffOptions();
  const categories = useCategoryOptions();
  const leads = useLeadOptions();
  const campaigns = useCampaignOptions();
  const deals = useDealOptions();

  const open = useCallback((date: string) => {
    staff.loadStaff();
    categories.loadCategories();
    leads.loadLeads();
    campaigns.loadCampaigns();
    deals.loadDeals();
    setTargetDate(date);
    setError('');
    setIsOpen(true);
  }, [
    staff.loadStaff,
    categories.loadCategories,
    leads.loadLeads,
    campaigns.loadCampaigns,
    deals.loadDeals,
  ]);

  const close = useCallback(() => {
    setIsOpen(false);
    setDraftId(null);
  }, []);

  const initialValues = useMemo<UnifiedTaskFormValues>(
    () => ({ ...UNIFIED_EMPTY_VALUES, scheduledDate: targetDate }),
    [targetDate],
  );

  const pagination = useMemo<TaskCrudPagination>(
    () => ({ setError, setIsLoading: setIsSaving, refresh: onCreated }),
    [onCreated],
  );

  const messages = useMemo(
    () => ({
      added: 'Task created successfully',
      updated: 'Task updated successfully',
      deleted: 'Task deleted successfully',
      addFailed: 'Failed to add task',
      updateFailed: 'Failed to update task',
      deleteFailed: 'Failed to delete task',
    }),
    [],
  );

  const crud = useTaskCrud<UnifiedTaskFormValues, UnifiedTaskItem>({
    pagination,
    showToastMessage,
    dataService: unifiedTaskDataService,
    messages,
  });

  const formSubmit = useTaskFormSubmit<UnifiedTaskItem, UnifiedTaskFormValues>({
    editingItem: null,
    closeDrawer: close,
    mapItemToFormData: UnifiedTaskMapper.toFormValues,
    handleAdd: crud.handleAdd,
    handleUpdate: crud.handleUpdate,
  });

  const handleSubmit = useCallback(async (
    values: UnifiedTaskFormValues,
    helpers: Parameters<typeof formSubmit.handleSubmit>[1],
  ) => {
    const success = await formSubmit.handleSubmit(values, helpers);
    if (success && draftId) {
      draftService.deleteDraft(draftId);
    }
    return success;
  }, [formSubmit.handleSubmit, draftId]);

  return {
    isOpen,
    open,
    close,
    initialValues,
    handleSubmit,
    isSaving,
    error,
    draftId,
    onDraftSaved: setDraftId,
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
