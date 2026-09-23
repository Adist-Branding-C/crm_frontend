import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { StageNode as StageNodeType } from '../hooks/useStageGraph';
import './StageNode.css';

/**
 * Renders one Stage as a canvas node: name, a conversion badge when it's
 * marked as counting toward conversion metrics, and a left accent bar in
 * the stage's color. Both handles are always shown (source + target) so any
 * stage can connect to any other in either direction - the graph itself,
 * not the handle placement, is what encodes direction. Double-clicking
 * opens the edit drawer via `data.onEdit` - React Flow's custom node types
 * only receive NodeProps, so callbacks must travel through each node's own
 * `data`, not as extra component props.
 *
 * Used by:
 * - PipelineCanvas (registered as the 'stageNode' node type)
 */
function StageNode({ data, selected }: NodeProps<StageNodeType>) {
  const { stage, onEdit } = data;

  return (
    <div
      className={`stage-node${selected ? ' stage-node--selected' : ''}`}
      style={{ borderLeftColor: stage.color || 'var(--border-strong)' }}
      onDoubleClick={() => onEdit(stage)}
    >
      <Handle type="target" position={Position.Left} className="stage-node__handle" />
      <div className="stage-node__header">
        <span className="stage-node__name">{stage.status}</span>
        {stage.conversion && <span className="stage-node__conversion">Conversion</span>}
      </div>
      <Handle type="source" position={Position.Right} className="stage-node__handle" />
    </div>
  );
}

export default StageNode;
