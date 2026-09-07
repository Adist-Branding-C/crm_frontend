import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { StageNode as StageNodeType } from '../hooks/useStageGraph';
import './StageNode.css';

const OUTCOME_LABEL: Record<string, string> = {
  OPEN: 'Open',
  WON: 'Won',
  LOST: 'Lost',
};

/**
 * Renders one Stage as a canvas node: name, probability, an outcome badge,
 * and a left accent bar in the stage's color. Both handles are always shown
 * (source + target) so any stage can connect to any other in either
 * direction - the graph itself, not the handle placement, is what encodes
 * direction. Double-clicking opens the edit drawer via `data.onEdit` -
 * React Flow's custom node types only receive NodeProps, so callbacks must
 * travel through each node's own `data`, not as extra component props.
 *
 * Used by:
 * - PipelineCanvas (registered as the 'stageNode' node type)
 */
function StageNode({ data, selected }: NodeProps<StageNodeType>) {
  const { stage, onEdit } = data;

  return (
    <div
      className={`stage-node${selected ? ' stage-node--selected' : ''}${!stage.status ? ' stage-node--inactive' : ''}`}
      style={{ borderLeftColor: stage.color ?? 'var(--border-strong)' }}
      onDoubleClick={() => onEdit(stage)}
    >
      <Handle type="target" position={Position.Left} className="stage-node__handle" />
      <div className="stage-node__header">
        <span className="stage-node__name">{stage.name}</span>
        <span className={`stage-node__outcome stage-node__outcome--${stage.outcome.toLowerCase()}`}>
          {OUTCOME_LABEL[stage.outcome] ?? stage.outcome}
        </span>
      </div>
      <div className="stage-node__probability">{stage.probability}% chance</div>
      {!stage.status && <div className="stage-node__inactive-badge">Inactive</div>}
      <Handle type="source" position={Position.Right} className="stage-node__handle" />
    </div>
  );
}

export default StageNode;
