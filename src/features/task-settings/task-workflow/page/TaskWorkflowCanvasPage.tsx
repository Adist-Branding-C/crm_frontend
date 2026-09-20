import { useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import PageContainer from '../../../../shared/components/layout/PageContainer';
import Drawer from '../../../../shared/components/Drawer';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { useTaskWorkflowDetail } from '../hooks/useTaskWorkflowDetail';
import { useTaskStageGraph } from '../hooks/useTaskStageGraph';
import { useTaskStageCounts } from '../hooks/useTaskStageCounts';
import { useTaskStageFormDrawer } from '../hooks/useTaskStageFormDrawer';
import TaskWorkflowCanvas from '../components/TaskWorkflowCanvas';
import StageFormDrawer from '../components/StageFormDrawer';
import ReassignTaskStageModal from '../components/ReassignTaskStageModal';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import { ADD_STAGE_INITIAL_VALUES } from '../constants/index';
import type { TaskStageFormData } from '../types/request';
import type { TaskWorkflowStage } from '../types/interface';
import './TaskWorkflowCanvasPage.css';

function TaskWorkflowCanvasPage() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  const numericWorkflowId = Number(workflowId);
  const formBodyRef = useRef<HTMLDivElement>(null);

  const { workflow, isLoading, error, refresh } = useTaskWorkflowDetail(numericWorkflowId);

  const stageCounts = useTaskStageCounts(numericWorkflowId);
  const stageDrawer = useTaskStageFormDrawer(numericWorkflowId, refresh, stageCounts);
  const { open: openStageDrawer } = stageDrawer.drawer;
  const handleEditStage = useCallback(
    (stage: TaskWorkflowStage) => openStageDrawer(stage),
    [openStageDrawer],
  );

  const graph = useTaskStageGraph(numericWorkflowId, workflow, handleEditStage, stageCounts);

  const editInitialValues: TaskStageFormData = useMemo(() => {
    const item = stageDrawer.drawer.item;
    if (!item) return ADD_STAGE_INITIAL_VALUES;
    return {
      name: item.name,
      color: item.color ?? '#2563eb',
      isCompletedStage: Boolean(item.isCompletedStage),
    };
  }, [stageDrawer.drawer.item]);

  const otherCompletedStageName = useMemo(() => {
    const item = stageDrawer.drawer.item;
    if (!item) return null;
    const currentId = String(item.id);
    return (workflow?.stages ?? []).find((stage) => stage.id !== currentId && stage.isCompletedStage)?.name ?? null;
  }, [stageDrawer.drawer.item, workflow?.stages]);

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader title="Workflow" description="Loading..." />
      </PageContainer>
    );
  }

  if (error || !workflow) {
    return (
      <PageContainer>
        <PageHeader title="Workflow" />
        <ErrorMessage message={error || 'Workflow not found'} />
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/settings/task_workflows')}>
          Back to workflows
        </button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title={workflow.name}
        description={
          workflow.isActive
            ? `Active workflow · ${workflow.stages.length} stage${workflow.stages.length === 1 ? '' : 's'}`
            : 'Inactive workflow'
        }
        action={
          <div className="task-canvas-header-actions">
            <button type="button" className="btn btn-secondary" onClick={() => stageDrawer.drawer.open()}>
              <Plus size={16} style={{ marginRight: 'var(--space-2)' }} /> Add Stage
            </button>
          </div>
        }
      />

      {graph.transitionError && <ErrorMessage message={graph.transitionError} />}

      <p className="task-canvas-instructions">
        Drag a stage left or right to change the board order, and double-click a stage to edit it.
      </p>

      <TaskWorkflowCanvas
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
          otherCompletedStageName={otherCompletedStageName}
          onSubmit={stageDrawer.handleSubmit}
          onDelete={stageDrawer.requestDelete}
          error={stageDrawer.error}
          onCancel={stageDrawer.drawer.close}
        />
      </Drawer>

      <ReassignTaskStageModal
        isOpen={!!stageDrawer.reassignPrompt}
        stage={stageDrawer.reassignPrompt?.stage ?? null}
        taskCount={stageDrawer.reassignPrompt?.taskCount ?? 0}
        otherStages={(workflow.stages ?? []).filter((s) => s.id !== stageDrawer.reassignPrompt?.stage.id)}
        onConfirm={stageDrawer.confirmReassignAndDelete}
        onClose={stageDrawer.cancelReassignPrompt}
      />

      <AdminDeleteModal
        isOpen={!!stageDrawer.deleteConfirm}
        itemName={stageDrawer.deleteConfirm?.name}
        itemType="stage"
        error={stageDrawer.error}
        isDeleting={stageDrawer.isDeleting}
        onConfirm={stageDrawer.confirmDelete}
        onClose={stageDrawer.cancelDeleteConfirm}
      />
    </PageContainer>
  );
}

export default TaskWorkflowCanvasPage;
