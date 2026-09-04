import Drawer from '../../../shared/components/Drawer';
import GenericTaskForm from '../../task/common/components/GenericTaskForm';
import { addTaskValidationSchema } from '../../task/task/validations/task.validation';
import { addCallTaskValidationSchema } from '../../task/call-task/validations/callTask.validation';
import { addCampaignTaskValidationSchema } from '../../task/campaign-task/validations/campaignTask.validation';
import { addDealTaskValidationSchema } from '../../task/deal-task/validations/dealTask.validation';
import type { useCalendarAddTask } from '../hooks/useCalendarAddTask';

const TASK_TYPES = [
  { label: 'Normal Task', value: 'NORMAL' },
  { label: 'Call Task', value: 'CALL_TASK' },
  { label: 'Campaign Task', value: 'CAMPAIGN_TASK' },
  { label: 'Deal Task', value: 'DEAL_TASK' },
];

interface AddCalendarTaskDrawerProps {
  addTask: ReturnType<typeof useCalendarAddTask>;
}

/**
 * Wraps the shared Drawer + GenericTaskForm (the same form TaskPage uses)
 * for Calendar's "Add Task" button, pre-filled with the day being viewed.
 *
 * Used by:
 * - CalendarPage.
 */
const AddCalendarTaskDrawer = ({ addTask }: AddCalendarTaskDrawerProps) => (
  <Drawer isOpen={addTask.isOpen} onClose={addTask.close} title="Add Task">
    <div style={{ marginBottom: '1.25rem' }}>
      <label className="field-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>Task Type</label>
      <select 
        className="field-input" 
        style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-default)' }}
        value={addTask.taskType} 
        onChange={(e) => addTask.setTaskType(e.target.value as any)}
      >
        {TASK_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
      </select>
    </div>

    <GenericTaskForm
      validationSchema={
        addTask.taskType === 'CALL_TASK' ? addCallTaskValidationSchema :
        addTask.taskType === 'CAMPAIGN_TASK' ? addCampaignTaskValidationSchema :
        addTask.taskType === 'DEAL_TASK' ? addDealTaskValidationSchema :
        addTaskValidationSchema
      }
      initialValues={addTask.initialValues}
      onSubmit={addTask.handleSubmit}
      isLoading={addTask.isSaving}
      error={addTask.error}
      isEditing={false}
      
      categoryOptions={addTask.categoryOptions}
      categoryLoading={addTask.categoryLoading}
      hideCategory={addTask.taskType !== 'NORMAL'}
      
      staffOptions={addTask.staffOptions}
      staffLoading={addTask.staffLoading}
      
      leadOptions={addTask.leadOptions}
      leadLoading={addTask.leadLoading}
      
      associationOptions={
        addTask.taskType === 'CAMPAIGN_TASK' ? addTask.campaignOptions :
        addTask.taskType === 'DEAL_TASK' ? addTask.dealOptions :
        undefined
      }
      associationLoading={
        addTask.taskType === 'CAMPAIGN_TASK' ? addTask.campaignLoading :
        addTask.taskType === 'DEAL_TASK' ? addTask.dealLoading :
        undefined
      }
      associationFieldName={
        addTask.taskType === 'CAMPAIGN_TASK' ? 'campaignId' :
        addTask.taskType === 'DEAL_TASK' ? 'dealId' :
        'leadId'
      }
      associationLabel={
        addTask.taskType === 'CAMPAIGN_TASK' ? 'Campaign' :
        addTask.taskType === 'DEAL_TASK' ? 'Deal' :
        'Lead'
      }
      associationPlaceholder={
        addTask.taskType === 'CAMPAIGN_TASK' ? 'Select a campaign' :
        addTask.taskType === 'DEAL_TASK' ? 'Select a deal' :
        'Select a lead'
      }
      associationLoadingLabel={
        addTask.taskType === 'CAMPAIGN_TASK' ? 'Loading campaigns...' :
        addTask.taskType === 'DEAL_TASK' ? 'Loading deals...' :
        'Loading leads...'
      }
      associationEmptyMessage={
        addTask.taskType === 'CAMPAIGN_TASK' ? 'No campaigns available.' :
        addTask.taskType === 'DEAL_TASK' ? 'No deals available.' :
        'No leads available.'
      }
    />
  </Drawer>
);

export default AddCalendarTaskDrawer;
