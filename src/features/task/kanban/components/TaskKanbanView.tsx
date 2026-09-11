import { useCallback, useEffect } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import EmptyState from '../../../../shared/components/EmptyState';
import ToastNotification from '../../../../shared/components/ToastNotification';
import { useToast } from '../../../../shared/hooks/useToast';
import { useSelectedWorkflow } from '../hooks/useSelectedWorkflow';
import { useTaskKanban } from '../hooks/useTaskKanban';
import TaskKanbanBoard from './TaskKanbanBoard';
import TaskWorkflowPicker from './TaskWorkflowPicker';
import type { TaskBoardView } from '../types/kanban.types';

interface TaskKanbanViewProps {
  taskType: string;
  onViewChange: (view: TaskBoardView) => void;
  onAddTask?: (() => void) | undefined;
  addLabel?: string | undefined;
}

function TaskKanbanView({ taskType, onViewChange, onAddTask, addLabel }: TaskKanbanViewProps) {
  const toast = useToast();
  const reportError = useCallback(
    (message: string) => toast.showToastMessage(message, 'error'),
    [toast.showToastMessage],
  );

  const { workflows, selectedWorkflowId, setSelectedWorkflowId, isLoading: workflowsLoading } =
    useSelectedWorkflow();

  const kanban = useTaskKanban(selectedWorkflowId, taskType, reportError);

  useEffect(() => {
    if (selectedWorkflowId) kanban.fetchKanban(selectedWorkflowId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWorkflowId, taskType]);

  const refetch = useCallback(() => {
    if (selectedWorkflowId) kanban.fetchKanban(selectedWorkflowId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWorkflowId]);

  if (workflowsLoading) {
    return <div style={{ padding: 'var(--space-4)', color: 'var(--text-tertiary)' }}>Loading workflows...</div>;
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <TaskWorkflowPicker
          workflows={workflows}
          selectedWorkflowId={selectedWorkflowId}
          onChange={setSelectedWorkflowId}
        />
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
          Drag cards between columns to change stage
        </span>
        {onAddTask && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddTask}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}
          >
            <Plus size={16} /> {addLabel ?? 'Add Task'}
          </button>
        )}
      </div>

      {kanban.error && <EmptyState message={kanban.error} icon={<AlertTriangle size={48} />} action={
        <button type="button" className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={refetch}>Retry</button>
      } />}

      {!kanban.error && kanban.isLoading && kanban.stages.length === 0 && (
        <div style={{ padding: 'var(--space-4)', color: 'var(--text-tertiary)' }}>Loading tasks...</div>
      )}

      {!kanban.error && !kanban.isLoading && kanban.stages.length === 0 && (
        <EmptyState message="No stages configured. Add stages in Settings > Task Workflows" />
      )}

      {!kanban.error && kanban.stages.length > 0 && (
        <DndContext
          sensors={kanban.sensors}
          onDragStart={kanban.handleDragStart}
          onDragEnd={kanban.handleDragEnd}
          onDragCancel={kanban.handleDragCancel}
        >
          <TaskKanbanBoard
            stages={kanban.stages}
            loadingStageId={kanban.loadingStageId}
            onLoadMore={kanban.loadMore}
          />
          <DragOverlay>
            <div className="task-kanban-card task-kanban-card--overlay">
              <div className="task-kanban-card__title">Moving task...</div>
            </div>
          </DragOverlay>
        </DndContext>
      )}

      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />
    </>
  );
}

export default TaskKanbanView;
