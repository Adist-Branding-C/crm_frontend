import { useDroppable } from '@dnd-kit/core';
import { Inbox, Loader2 } from 'lucide-react';
import TaskCard from './TaskCard';
import type { TaskKanbanStage } from '../types/kanban.types';
import './TaskKanbanBoard.css';

interface DroppableTaskColumnProps {
  stage: TaskKanbanStage;
  loadingStageId: string | null;
  onLoadMore: (stageId: string) => void;
}

function DroppableTaskColumn({ stage, loadingStageId, onLoadMore }: DroppableTaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `task-col-${stage.stageId}`,
    data: { stageId: stage.stageId },
  });

  const hasMore = stage.items.length < stage.count || stage.pagination.has_next;
  const isLoadingMore = loadingStageId === stage.stageId;
  const remainingMore = Math.max(0, stage.count - stage.items.length);
  const pageSize = stage.pagination.limit || remainingMore;

  return (
    <div
      ref={setNodeRef}
      className={`pipeline-column${isOver ? ' pipeline-column--drop-target' : ''}`}
    >
      <div
        className="column-header"
        style={{ borderTopColor: stage.stageColor || 'var(--border-strong)' }}
      >
        <div className="column-title">
          <span className="column-name">{stage.stageName}</span>
          <span className="column-count">{stage.count}</span>
        </div>
      </div>

      <div className="column-cards">
        {stage.items.length === 0 ? (
          <div className="pipeline-column-empty">
            <Inbox size={32} />
            <p>No tasks in this stage</p>
          </div>
        ) : (
          stage.items.map((task) => (
            <TaskCard key={task.id} task={task} stageId={stage.stageId} />
          ))
        )}
      </div>

      {hasMore && (
        <button
          className="see-more-btn"
          onClick={() => onLoadMore(stage.stageId)}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? (
            <>
              <Loader2 size={14} className="spin" />
              Loading...
            </>
          ) : (
            <>
              Load {pageSize} more
              {remainingMore > 0 && ` (${remainingMore} remaining)`}
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default DroppableTaskColumn;
