import { useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Drawer from '../../../shared/components/Drawer';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { useLeadPipelineDetail } from '../hooks/useLeadPipelineDetail';
import { useStageGraph } from '../hooks/useStageGraph';
import { useStageFormDrawer } from '../hooks/useStageFormDrawer';
import PipelineCanvas from '../components/PipelineCanvas';
import StageFormDrawer from '../components/StageFormDrawer';
import ReassignStageModal from '../components/ReassignStageModal';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { ADD_STAGE_INITIAL_VALUES } from '../constants/leadPipelineBuilder.constants';
import type { LeadStageItem } from '../types/interface';
import type { LeadStageFormData } from '../types/request';
import { useToast } from '../../task-settings/hooks/useToast';
import ToastNotification from '../../task-settings/components/ToastNotification';
import './LeadPipelineCanvasPage.css';


function LeadPipelineCanvasPage() {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const navigate = useNavigate();
  const numericPipelineId = Number(pipelineId);
  const formBodyRef = useRef<HTMLDivElement>(null);

  const { pipeline, isLoading, error, refresh } = useLeadPipelineDetail(numericPipelineId);
  const toast = useToast();

  const stageDrawer = useStageFormDrawer(numericPipelineId, refresh, toast.showToastMessage);
  const { open: openStageDrawer } = stageDrawer.drawer;
  const handleEditStage = useCallback((stage: LeadStageItem) => openStageDrawer(stage), [openStageDrawer]);

  const graph = useStageGraph(numericPipelineId, pipeline, handleEditStage);

  const editInitialValues: LeadStageFormData = useMemo(() => {
    const item = stageDrawer.drawer.item;
    if (!item) return ADD_STAGE_INITIAL_VALUES;
    return { status: item.status, color: item.color || '#2563eb', conversion: item.conversion };
  }, [stageDrawer.drawer.item]);

  const otherStages = useMemo(
    () => (pipeline?.stages ?? []).filter((s) => s.id !== stageDrawer.reassignPrompt?.stage.id),
    [pipeline, stageDrawer.reassignPrompt],
  );

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader title="Pipeline" description="Loading..." />
      </PageContainer>
    );
  }

  if (error || !pipeline) {
    return (
      <PageContainer>
        <PageHeader title="Pipeline" />
        <ErrorMessage message={error || 'Pipeline not found'} />
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/settings/lead-pipelines')}>
          Back to pipelines
        </button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title={pipeline.name}
        description={`${pipeline.isActive ? 'Active' : 'Inactive'} pipeline · ${pipeline.stages.length} stage${pipeline.stages.length === 1 ? '' : 's'}`}
        action={
          <button type="button" className="btn btn-secondary" onClick={() => stageDrawer.drawer.open()}>
            <Plus size={16} style={{ marginRight: 'var(--space-2)' }} /> Add Stage
          </button>
        }
      />

      {graph.transitionError && <ErrorMessage message={graph.transitionError} />}

      <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
        Drag a stage left or right to change which comes next on the board, drag from one stage's right edge to
        another's left edge to draw a transition arrow, and double-click a stage to edit it.
      </p>

      <PipelineCanvas
        nodes={graph.nodes}
        edges={graph.edges}
        onNodesChange={graph.onNodesChange}
        onEdgesChange={graph.onEdgesChange}
        onConnect={graph.handleConnect}
        onEdgesDelete={graph.handleEdgesDelete}
        onNodeDragStop={graph.handleNodeDragStop}
      />

      <Drawer
        ref={formBodyRef}
        isOpen={stageDrawer.drawer.isOpen}
        onClose={stageDrawer.drawer.close}
        title={stageDrawer.drawer.item ? 'Edit Stage' : 'Add Stage'}
      >
        <StageFormDrawer
          editingItem={stageDrawer.drawer.item}
          initialValues={editInitialValues}
          onSubmit={stageDrawer.handleSubmit}
          onDelete={stageDrawer.requestDelete}
          error={stageDrawer.error}
          onCancel={stageDrawer.drawer.close}
        />
      </Drawer>

      <ReassignStageModal
        isOpen={!!stageDrawer.reassignPrompt}
        stage={stageDrawer.reassignPrompt?.stage ?? null}
        leadCount={stageDrawer.reassignPrompt?.leadCount ?? 0}
        otherStages={otherStages}
        onConfirm={stageDrawer.confirmReassignAndDelete}
        onClose={stageDrawer.cancelReassignPrompt}
      />

      <AdminDeleteModal
        isOpen={!!stageDrawer.stageToDelete}
        itemName={stageDrawer.stageToDelete?.status ?? ''}
        itemType="Stage"
        onConfirm={stageDrawer.confirmDelete}
        onClose={stageDrawer.cancelDelete}
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

export default LeadPipelineCanvasPage;
