import { useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Drawer from '../../../shared/components/Drawer';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { useDealPipelineDetail } from '../hooks/useDealPipelineDetail';
import { useStageGraph } from '../hooks/useStageGraph';
import { useStageFormDrawer } from '../hooks/useStageFormDrawer';
import { usePipelineActivation } from '../hooks/usePipelineActivation';
import PipelineCanvas from '../components/PipelineCanvas';
import StageFormDrawer from '../components/StageFormDrawer';
import ReassignStageModal from '../components/ReassignStageModal';
import { ADD_STAGE_INITIAL_VALUES } from '../constants/dealPipelineBuilder.constants';
import type { DealStageItem } from '../types/interface';
import type { DealStageFormData } from '../types/request';

function DealPipelineCanvasPage() {
  const { pipelineId } = useParams<{ pipelineId: string }>();
  const navigate = useNavigate();
  const numericPipelineId = Number(pipelineId);
  const formBodyRef = useRef<HTMLDivElement>(null);

  const { pipeline, isLoading, error, refresh } = useDealPipelineDetail(numericPipelineId);

  const stageDrawer = useStageFormDrawer(numericPipelineId, refresh);
  const { open: openStageDrawer } = stageDrawer.drawer;
  const handleEditStage = useCallback((stage: DealStageItem) => openStageDrawer(stage), [openStageDrawer]);

  const graph = useStageGraph(numericPipelineId, pipeline, handleEditStage);
  const activation = usePipelineActivation(numericPipelineId, refresh);

  const editInitialValues: DealStageFormData = useMemo(() => {
    const item = stageDrawer.drawer.item;
    if (!item) return ADD_STAGE_INITIAL_VALUES;
    return { name: item.name, probability: item.probability, outcome: item.outcome, color: item.color ?? '#2563eb' };
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
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/settings/deal-pipelines')}>
          Back to pipelines
        </button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title={pipeline.name}
        description={
          pipeline.isActive
            ? `Active pipeline · ${pipeline.stages.length} stage${pipeline.stages.length === 1 ? '' : 's'}`
            : 'Inactive - add a Won and a Lost stage, then activate'
        }
        action={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button type="button" className="btn btn-secondary" onClick={() => stageDrawer.drawer.open()}>
              <Plus size={16} style={{ marginRight: 'var(--space-2)' }} /> Add Stage
            </button>
            {!pipeline.isActive && (
              <button
                type="button"
                className="btn btn-primary"
                disabled={activation.isActivating}
                onClick={activation.activate}
              >
                Activate pipeline
              </button>
            )}
          </div>
        }
      />

      {activation.blockedReason && <ErrorMessage message={activation.blockedReason} />}
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
        dealCount={stageDrawer.reassignPrompt?.dealCount ?? 0}
        otherStages={otherStages}
        onConfirm={stageDrawer.confirmReassignAndDelete}
        onClose={stageDrawer.cancelReassignPrompt}
      />
    </PageContainer>
  );
}

export default DealPipelineCanvasPage;
