import { useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { useDealPipelineList } from '../hooks/useDealPipelineList';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useToast } from '../../task-settings/hooks/useToast';
import PipelineListCard from '../components/PipelineListCard';
import CreatePipelineModal from '../components/CreatePipelineModal';
import ToastNotification from '../../task-settings/components/ToastNotification';
import type { DealPipelineItem } from '../types/interface';
import './DealPipelineListPage.css';

function DealPipelineListPage() {
  const { pipelines, isLoading, error, createPipeline, setDefaultPipeline, deletePipeline } =
    useDealPipelineList();
  const createModal = useDrawer();
  const deleteDialog = useDrawer<DealPipelineItem>();
  const toast = useToast();
  const [createError, setCreateError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleCreate = async (name: string) => {
    setIsCreating(true);
    setCreateError('');
    const result = await createPipeline(name);
    setIsCreating(false);
    if (result.success) {
      createModal.close();
      toast.showToastMessage('Pipeline created', 'success');
    } else {
      setCreateError(result.message || 'Failed to create pipeline');
    }
  };

  const handleSetDefault = async (id: number) => {
    const result = await setDefaultPipeline(id);
    toast.showToastMessage(
      result.success ? 'Default pipeline updated' : result.message || 'Failed to update default pipeline',
      result.success ? 'success' : 'error',
    );
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.item) return;
    setIsDeleting(true);
    setDeleteError('');
    const result = await deletePipeline(Number(deleteDialog.item.id));
    setIsDeleting(false);
    if (result.success) {
      deleteDialog.close();
      toast.showToastMessage('Pipeline deleted', 'success');
    } else {
      setDeleteError(result.message || 'Failed to delete pipeline');
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Deal Pipelines"
        description="Design the stages a deal moves through and their win probabilities"
        action={
          <button type="button" className="btn btn-primary" onClick={() => createModal.open()}>
            <Plus size={16} style={{ marginRight: 'var(--space-2)' }} /> Create Pipeline
          </button>
        }
      />

      {error && <ErrorMessage message={error} />}

      {!isLoading && pipelines.length === 0 ? (
        <p className="pipeline-list-empty">No pipelines yet - create one to get started.</p>
      ) : (
        <div className="pipeline-list-grid">
          {pipelines.map((pipeline) => (
            <PipelineListCard
              key={pipeline.id}
              pipeline={pipeline}
              onSetDefault={handleSetDefault}
              onDelete={(item) => deleteDialog.open(item)}
            />
          ))}
        </div>
      )}

      <CreatePipelineModal
        isOpen={createModal.isOpen}
        isSubmitting={isCreating}
        error={createError}
        onSubmit={handleCreate}
        onClose={createModal.close}
      />

      <AdminDeleteModal
        isOpen={deleteDialog.isOpen}
        itemName={deleteDialog.item?.name ?? ''}
        itemType="pipeline"
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
    </PageContainer>
  );
}

export default DealPipelineListPage;
