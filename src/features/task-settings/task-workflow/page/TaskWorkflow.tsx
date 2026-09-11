import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { useTaskWorkflowList } from '../hooks/useTaskWorkflowList';
import { useDrawer } from '../../../../shared/hooks/useDrawer';
import { useToast } from '../../../../shared/hooks/useToast';
import { SETTINGS_TABS } from '../../constants/index';
import TaskWorkflowCard from '../components/TaskWorkflowCard';
import CreateWorkflowModal from '../components/CreateWorkflowModal';
import ToastNotification from '../../components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { TaskWorkflowItem } from '../types/interface';
import './TaskWorkflow.css';

const TaskWorkflowPage = () => {
  const { workflows, isLoading, error, createWorkflow, setDefaultWorkflow, deleteWorkflow } = useTaskWorkflowList();
  const createModal = useDrawer();
  const deleteDialog = useDrawer<TaskWorkflowItem>();
  const toast = useToast();
  const [createError, setCreateError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleCreate = async (name: string) => {
    setIsCreating(true);
    setCreateError('');
    const result = await createWorkflow(name);
    setIsCreating(false);
    if (result.success) {
      createModal.close();
      toast.showToastMessage('Workflow created', 'success');
    } else {
      setCreateError(result.message || 'Failed to create workflow');
    }
  };

  const handleSetDefault = useCallback(async (item: TaskWorkflowItem) => {
    const result = await setDefaultWorkflow(Number(item.id));
    toast.showToastMessage(
      result.success ? 'Default workflow updated' : result.message || 'Failed to update default workflow',
      result.success ? 'success' : 'error',
    );
  }, [setDefaultWorkflow, toast]);

  const handleConfirmDelete = async () => {
    if (!deleteDialog.item) return;
    setIsDeleting(true);
    setDeleteError('');
    const result = await deleteWorkflow(Number(deleteDialog.item.id));
    setIsDeleting(false);
    if (result.success) {
      deleteDialog.close();
      toast.showToastMessage('Workflow deleted', 'success');
    } else {
      setDeleteError(result.message || 'Failed to delete workflow');
    }
  };

  return (
    <div className="task-settings-page">
      <PageHeader
        title="Task Settings"
        description="Manage task configurations and settings"
        action={
          <button type="button" className="btn btn-primary" onClick={() => createModal.open()}>
            <Plus size={16} style={{ marginRight: 'var(--space-2)' }} /> Add Workflow
          </button>
        }
      />
      <SettingsTabs items={SETTINGS_TABS} />

      {error && <ErrorMessage message={error} />}

      {!isLoading && workflows.length === 0 ? (
        <p className="pipeline-list-empty">No workflows yet - create one to get started.</p>
      ) : (
        <div className="pipeline-list-grid">
          {workflows.map((workflow) => (
            <TaskWorkflowCard
              key={workflow.id}
              workflow={workflow}
              onSetDefault={handleSetDefault}
              onDelete={(item) => deleteDialog.open(item)}
            />
          ))}
        </div>
      )}

      <CreateWorkflowModal
        isOpen={createModal.isOpen}
        isSubmitting={isCreating}
        error={createError}
        onSubmit={handleCreate}
        onClose={createModal.close}
      />

      <AdminDeleteModal
        isOpen={deleteDialog.isOpen}
        itemName={deleteDialog.item?.name ?? ''}
        itemType="workflow"
        error={deleteError}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={deleteDialog.close}
      />

      <ToastNotification
        message={toast.toastMessage}
        type={toast.toastType}
        visible={toast.showToast}
        onClose={() => toast.setShowToast(false)}
      />
    </div>
  );
};

export default TaskWorkflowPage;
