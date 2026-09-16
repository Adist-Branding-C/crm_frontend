import type { FormikHelpers } from 'formik';
import Drawer from '../../../../shared/components/Drawer';
import type { TaskPreviewData } from '../types/genericTaskForm.types';
import type { CategoryOption, StaffOption, LeadOption, DealOption, CampaignOption } from '../types/options';
import type { UnifiedTaskFormValues, UnifiedTaskItem } from '../types/unifiedTask.types';
import { unifiedTaskValidationSchema } from '../validations/unifiedTaskValidation';
import type { RecurrenceChainItem } from '../../task/types';
import GenericTaskForm from './GenericTaskForm';
import RecurrenceHistoryList from '../../task/components/RecurrenceHistoryList';
import { isRecurring } from '../utils/recurrence';

/**
 * Single Add/Edit task drawer for the unified Tasks module (table + kanban).
 * Composes the shared Drawer shell with the generic form in unified mode and
 * the recurrence history block shown while editing a recurring task.
 *
 * Used by:
 * - unified TaskPage (only the row edit and "Add Task"/kanban flow)
 *
 * Notes:
 * - The form's preview flow is preserved (onPreviewRequest) so the page can
 *   keep the existing PreviewCanvas behavior.
 * - Everything needed to render any of the four task types is passed in; the
 *   form resolves which association field to show from the selected taskType.
 */
interface TaskFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  initialValues: UnifiedTaskFormValues;
  onSubmit: (values: UnifiedTaskFormValues, helpers: FormikHelpers<UnifiedTaskFormValues>) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  draftId?: string | null;
  onDraftSaved?: (id: string) => void;
  onPreviewRequest?: (previewData: TaskPreviewData) => void;
  editingItem?: UnifiedTaskItem | null;
  onHistoryItemClick?: (item: RecurrenceChainItem) => void;
  staffOptions: StaffOption[];
  staffLoading?: boolean;
  categoryOptions?: CategoryOption[];
  categoryLoading?: boolean;
  leadOptions?: LeadOption[];
  leadLoading?: boolean;
  campaignOptions?: CampaignOption[];
  campaignLoading?: boolean;
  dealOptions?: DealOption[];
  dealLoading?: boolean;
}

const TaskFormDrawer = ({
  isOpen,
  onClose,
  isEditing,
  initialValues,
  onSubmit,
  isLoading,
  error,
  draftId,
  onDraftSaved,
  onPreviewRequest,
  editingItem,
  onHistoryItemClick,
  staffOptions,
  staffLoading,
  categoryOptions,
  categoryLoading,
  leadOptions,
  leadLoading,
  campaignOptions,
  campaignLoading,
  dealOptions,
  dealLoading,
}: TaskFormDrawerProps) => {
  const showRecurrenceHistory = isEditing && editingItem && isRecurring(editingItem.repeatType);

  const handleSubmit: (
    values: Record<string, unknown>,
    helpers: FormikHelpers<Record<string, unknown>>,
  ) => Promise<boolean> = async (values, helpers) =>
    onSubmit(
      values as unknown as UnifiedTaskFormValues,
      helpers as unknown as FormikHelpers<UnifiedTaskFormValues>,
    );

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Task' : 'Add Task'}>
      <GenericTaskForm
        unifiedMode
        validationSchema={unifiedTaskValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        isEditing={isEditing}
        draftId={draftId ?? null}
        {...(onDraftSaved ? { onDraftSaved } : {})}
        {...(onPreviewRequest ? { onPreviewRequest } : {})}
        staffOptions={staffOptions}
        staffLoading={staffLoading ?? false}
        categoryOptions={categoryOptions ?? []}
        categoryLoading={categoryLoading ?? false}
        leadOptions={leadOptions ?? []}
        leadLoading={leadLoading ?? false}
        campaignOptions={campaignOptions ?? []}
        campaignLoading={campaignLoading ?? false}
        dealOptions={dealOptions ?? []}
        dealLoading={dealLoading ?? false}
      />
      {showRecurrenceHistory && editingItem && (
        <RecurrenceHistoryList taskId={editingItem.id} {...(onHistoryItemClick ? { onTaskClick: onHistoryItemClick } : {})} />
      )}
    </Drawer>
  );
};

export default TaskFormDrawer;