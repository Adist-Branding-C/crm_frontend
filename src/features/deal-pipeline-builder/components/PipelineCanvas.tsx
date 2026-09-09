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
import StageNode from './StageNode';
import type { StageNode as StageNodeType } from '../hooks/useStageGraph';
import './PipelineCanvas.css';

interface PipelineCanvasProps {
  nodes: StageNodeType[];
  edges: Edge[];
  onNodesChange: OnNodesChange<StageNodeType>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onEdgesDelete: (edges: Edge[]) => void;
  onNodeDragStop: OnNodeDrag<StageNodeType>;
}

/**
 * Render-only React Flow canvas for one pipeline's stage graph. Owns no
 * state of its own - node/edge data and every handler come from
 * useStageGraph via DealPipelineCanvasPage.
 *
 * Used by:
 * - DealPipelineCanvasPage
 */
function PipelineCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onEdgesDelete,
  onNodeDragStop,
}: PipelineCanvasProps) {
  const nodeTypes = useMemo(() => ({ stageNode: StageNode }), []);

  return (
    <div className="pipeline-canvas">
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

export default PipelineCanvas;
