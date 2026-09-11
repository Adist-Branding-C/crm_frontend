import DroppableTaskColumn from './DroppableTaskColumn';
import type { TaskKanbanStage } from '../types/kanban.types';
import './TaskKanbanBoard.css';

interface TaskKanbanBoardProps {
  stages: TaskKanbanStage[];
  loadingStageId: string | null;
  onLoadMore: (stageId: string) => void;
}

function TaskKanbanBoard({ stages, loadingStageId, onLoadMore }: TaskKanbanBoardProps) {
  return (
    <div className="pipeline-board">
      {stages.map((stage) => (
        <DroppableTaskColumn
          key={stage.stageId}
          stage={stage}
          loadingStageId={loadingStageId}
          onLoadMore={onLoadMore}
        />
      ))}
    </div>
  );
}

export default TaskKanbanBoard;
