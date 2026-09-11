import { useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, ChevronUp, ChevronDown, GripVertical, Star } from 'lucide-react';
import { useTaskWorkflowDetail } from '../hooks/useTaskWorkflowDetail';
import { useStageFormDrawer } from '../hooks/useStageFormDrawer';
import { useToast } from '../../../../shared/hooks/useToast';
import { taskWorkflowService } from '../services/taskworkflow.service';
import { ADD_STAGE_INITIAL_VALUES } from '../constants/index';
import StageFormDrawer from '../components/StageFormDrawer';
import ToastNotification from '../../components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import Drawer from '../../../../shared/components/Drawer';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { TaskWorkflowStage } from '../types/interface';
import type { TaskStageFormData } from '../types/request';
import './TaskWorkflowDetail.css';

const TaskWorkflowDetailPage = () => {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  const numericId = Number(workflowId);
  const { workflow, isLoading, error, refresh } = useTaskWorkflowDetail(numericId);
  const toast = useToast();
  const drawerBodyRef = useRef<HTMLDivElement>(null);

  const stageDrawer = useStageFormDrawer(numericId, refresh);

  const sortedStages = useMemo(() => {
    if (!workflow) return [];
    return [...workflow.stages].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [workflow]);

  const handleMoveUp = useCallback(async (stage: TaskWorkflowStage, index: number) => {
    if (index === 0) return;
    const prevStage = sortedStages[index - 1];
    if (!prevStage) return;
    try {
      await Promise.all([
        taskWorkflowService.reorderStage(numericId, Number(stage.id), prevStage.sortOrder),
        taskWorkflowService.reorderStage(numericId, Number(prevStage.id), stage.sortOrder),
      ]);
      await refresh();
    } catch {
      toast.showToastMessage('Failed to reorder stages', 'error');
    }
  }, [sortedStages, numericId, refresh, toast]);

  const handleMoveDown = useCallback(async (stage: TaskWorkflowStage, index: number) => {
    if (index === sortedStages.length - 1) return;
    const nextStage = sortedStages[index + 1];
    if (!nextStage) return;
    try {
      await Promise.all([
        taskWorkflowService.reorderStage(numericId, Number(stage.id), nextStage.sortOrder),
        taskWorkflowService.reorderStage(numericId, Number(nextStage.id), stage.sortOrder),
      ]);
      await refresh();
    } catch {
      toast.showToastMessage('Failed to reorder stages', 'error');
    }
  }, [sortedStages, numericId, refresh, toast]);

  const stageInitialValues: TaskStageFormData = useMemo(() => {
    if (stageDrawer.editingItem) {
      return { name: stageDrawer.editingItem.name, color: stageDrawer.editingItem.color };
    }
    return ADD_STAGE_INITIAL_VALUES;
  }, [stageDrawer.editingItem]);

  if (isLoading) {
    return (
      <div className="task-settings-page">
        <div className="workflow-detail-loading">Loading workflow...</div>
      </div>
    );
  }

  if (error || !workflow) {
    return (
      <div className="task-settings-page">
        <PageHeader title="Task Settings" description="Manage task configurations and settings" />
        <ErrorMessage message={error || 'Workflow not found'} />
      </div>
    );
  }

  return (
    <div className="task-settings-page">
      <PageHeader
        title={workflow.name}
        description={workflow.isDefault ? 'Default workflow' : `${workflow.stages.length} stage${workflow.stages.length !== 1 ? 's' : ''}`}
        action={
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/user/task_workflows')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ArrowLeft size={16} /> Back to Workflows
          </button>
        }
      />

      <div className="account-content">
        <div className="workflow-detail-header">
          <h3>Stages</h3>
          <button className="btn btn-primary" onClick={stageDrawer.openAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Add Stage
          </button>
        </div>

        {sortedStages.length === 0 ? (
          <div className="workflow-detail-empty">
            <p>No stages yet. Add a stage to get started.</p>
          </div>
        ) : (
          <div className="workflow-stages-list">
            {sortedStages.map((stage, index) => (
              <div key={stage.id} className="workflow-stage-card">
                <div className="workflow-stage-card__order">
                  <GripVertical size={16} className="workflow-stage-card__grip" />
                  <span className="workflow-stage-card__number">{index + 1}</span>
                </div>
                <div
                  className="workflow-stage-card__color"
                  style={{ backgroundColor: stage.color }}
                />
                <div className="workflow-stage-card__info">
                  <span className="workflow-stage-card__name">{stage.name}</span>
                </div>
                <div className="workflow-stage-card__actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={index === 0}
                    onClick={() => handleMoveUp(stage, index)}
                    title="Move up"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={index === sortedStages.length - 1}
                    onClick={() => handleMoveDown(stage, index)}
                    title="Move down"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => stageDrawer.openEdit(stage)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {workflow.isDefault && (
          <div className="workflow-detail-badge">
            <Star size={14} /> This is the default workflow
          </div>
        )}

        <Drawer isOpen={stageDrawer.isOpen} onClose={stageDrawer.close} title={stageDrawer.editingItem ? 'Edit Stage' : 'Add Stage'} ref={drawerBodyRef}>
          <StageFormDrawer
            editingItem={stageDrawer.editingItem}
            initialValues={stageInitialValues}
            onSubmit={stageDrawer.handleSubmit}
            onDelete={stageDrawer.requestDelete}
            error={stageDrawer.error}
            onCancel={stageDrawer.close}
          />
        </Drawer>
      </div>

      <ToastNotification
        message={toast.toastMessage}
        type={toast.toastType}
        visible={toast.showToast}
        onClose={() => toast.setShowToast(false)}
      />
    </div>
  );
};

export default TaskWorkflowDetailPage;
