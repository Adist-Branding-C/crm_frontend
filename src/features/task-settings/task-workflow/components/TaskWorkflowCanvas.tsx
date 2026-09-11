import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type OnNodeDrag,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TaskStageNode from './TaskStageNode';
import type { TaskStageNode as TaskStageNodeType } from '../hooks/useTaskStageGraph';
import './TaskWorkflowCanvas.css';

interface TaskWorkflowCanvasProps {
  nodes: TaskStageNodeType[];
  edges: Edge[];
  onNodesChange: OnNodesChange<TaskStageNodeType>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onEdgesDelete: (edges: Edge[]) => void;
  onNodeDragStop: OnNodeDrag<TaskStageNodeType>;
}

/**
 * Render-only React Flow canvas for one workflow's stage graph. Owns no
 * state of its own — node/edge data and every handler come from
 * useTaskStageGraph via TaskWorkflowCanvasPage.
 */
function TaskWorkflowCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onEdgesDelete,
  onNodeDragStop,
}: TaskWorkflowCanvasProps) {
  const nodeTypes = useMemo(() => ({ stageNode: TaskStageNode }), []);

  return (
    <div className="task-pipeline-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.4}
        maxZoom={1.5}
      >
        <Background gap={20} />
        <Controls />
        <MiniMap pannable zoomable />
      </ReactFlow>
    </div>
  );
}

export default TaskWorkflowCanvas;
