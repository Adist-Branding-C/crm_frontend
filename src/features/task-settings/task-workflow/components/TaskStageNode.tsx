import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { TaskStageNode as TaskStageNodeType } from '../hooks/useTaskStageGraph';
import './TaskStageNode.css';

/**
 * Renders one Task Stage as a canvas node: a numbered color badge in the
 * stage's color (order number + quick color cue), the stage name, and a
 * compact pill with the current task count (fetched via the kanban
 * endpoint). Double-clicking opens the edit drawer via data.onEdit.
 * Both handles (source + target) are always shown so any stage can
 * connect to any other in either direction.
 */
function TaskStageNode({ data, selected }: NodeProps<TaskStageNodeType>) {
  const { stage, displayOrder, onEdit, taskCount } = data;
  const stageColor = stage.color ?? 'var(--border-strong)';

  return (
    <div
      className={`task-stage-node${selected ? ' task-stage-node--selected' : ''}`}
      style={{ borderLeftColor: stageColor, '--stage-color': stageColor } as React.CSSProperties}
      onDoubleClick={() => onEdit(stage)}
    >
      <Handle type="target" position={Position.Left} className="task-stage-node__handle" />
      <div className="task-stage-node__content">
        <span className="task-stage-node__order">{displayOrder + 1}</span>
        <span className="task-stage-node__name">{stage.name}</span>
        <span
          className="task-stage-node__count"
          title={`${taskCount} task${taskCount === 1 ? '' : 's'} in this stage`}
        >
          {taskCount}
        </span>
      </div>
      <Handle type="source" position={Position.Right} className="task-stage-node__handle" />
    </div>
  );
}

export default TaskStageNode;