import { useCallback, useEffect, useState } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  type Connection,
  type Edge,
  type Node,
  type OnNodeDrag,
} from '@xyflow/react';
import { taskWorkflowService } from '../services/taskworkflow.service';
import { parseApiError } from '../../call-reason/utils/parseApiError';
import { CANVAS_AUTO_LAYOUT } from '../constants/index';
import type { TaskWorkflowDetail, TaskWorkflowStage } from '../types/interface';

export interface TaskStageNodeData extends Record<string, unknown> {
  stage: TaskWorkflowStage;
  displayOrder: number;
  taskCount: number;
  onEdit: (stage: TaskWorkflowStage) => void;
}

export type TaskStageNode = Node<TaskStageNodeData, 'stageNode'>;

/**
 * Builds edges from stage sortOrder — each stage connects to the next
 * stage in sorted order. This is a visual-only representation since the
 * backend does not have a transitions table for task workflows.
 */
function toEdges(stages: TaskWorkflowStage[]): Edge[] {
  const ordered = [...stages].sort((a, b) => a.sortOrder - b.sortOrder);
  return ordered.slice(0, -1).map((stage, index) => ({
    id: `edge-${stage.id}-${ordered[index + 1]!.id}`,
    source: String(stage.id),
    target: String(ordered[index + 1]!.id),
    markerEnd: { type: MarkerType.ArrowClosed },
  }));
}

function toNodes(
  stages: TaskWorkflowStage[],
  onEdit: (stage: TaskWorkflowStage) => void,
  stageCounts: Record<string, number>,
): TaskStageNode[] {
  const ordered = [...stages].sort((a, b) => a.sortOrder - b.sortOrder);
  return ordered.map((stage, index) => ({
    id: String(stage.id),
    type: 'stageNode',
    position: {
      x: stage.positionX ?? index * CANVAS_AUTO_LAYOUT.NODE_GAP_X,
      y: stage.positionY ?? CANVAS_AUTO_LAYOUT.START_Y,
    },
    data: {
      stage,
      displayOrder: index,
      taskCount: stageCounts[stage.id] ?? 0,
      onEdit,
    },
    deletable: false,
  }));
}

/**
 * Owns the canvas's React Flow node/edge state: derives it from the loaded
 * workflow, and keeps sortOrder in sync with the canvas. Dragging a stage
 * past others re-ranks by X position. Edges are visual-only — derived from
 * sortOrder, not persisted to a backend transitions table.
 *
 * Used by:
 * - TaskWorkflowCanvasPage
 */
export function useTaskStageGraph(
  workflowId: number,
  workflow: TaskWorkflowDetail | null,
  onEditStage: (stage: TaskWorkflowStage) => void,
  stageCounts?: Record<string, number>,
) {
  const [nodes, setNodes, onNodesChange] = useNodesState<TaskStageNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [transitionError, setTransitionError] = useState('');

  useEffect(() => {
    if (!workflow) return;
    setNodes(toNodes(workflow.stages, onEditStage, stageCounts ?? {}));
    setEdges(toEdges(workflow.stages));
  }, [workflow, onEditStage, setNodes, setEdges, stageCounts]);

  const applyOrder = useCallback(
    (orderedIds: string[]) => {
      const byId = new Map(nodes.map((n) => [n.id, n]));
      const changed: { id: string; sortOrder: number; x: number }[] = [];

      orderedIds.forEach((id, index) => {
        const n = byId.get(id);
        if (!n) return;
        const x = index * CANVAS_AUTO_LAYOUT.NODE_GAP_X;
        if (n.data.stage.sortOrder !== index) {
          changed.push({ id, sortOrder: index, x });
          void taskWorkflowService.reorderStage(workflowId, Number(id), index);
          void taskWorkflowService.updateStagePosition(workflowId, Number(id), x, n.position.y);
        }
      });

      if (changed.length === 0) return;

      setNodes((prev) =>
        prev.map((n) => {
          const update = changed.find((c) => c.id === n.id);
          if (!update) return n;
          return {
            ...n,
            position: { ...n.position, x: update.x },
            data: {
              ...n.data,
              displayOrder: update.sortOrder,
              stage: { ...n.data.stage, sortOrder: update.sortOrder },
            },
          };
        }),
      );

      // Rebuild visual edges from new sort order
      setEdges((prev) => {
        const idToNode = new Map(
          nodes.map((n) => {
            const update = changed.find((c) => c.id === n.id);
            return [
              n.id,
              {
                ...n,
                position: update ? { ...n.position, x: update.x } : n.position,
                data: {
                  ...n.data,
                  stage: update
                    ? { ...n.data.stage, sortOrder: update.sortOrder }
                    : n.data.stage,
                },
              },
            ];
          }),
        );
        const ordered = [...idToNode.values()]
          .sort((a, b) => a.data.stage.sortOrder - b.data.stage.sortOrder);
        const newEdges = ordered.slice(0, -1).map((stage, index) => ({
          id: `edge-${stage.id}-${ordered[index + 1]!.id}`,
          source: String(stage.id),
          target: String(ordered[index + 1]!.id),
          markerEnd: { type: MarkerType.ArrowClosed },
        }));
        return newEdges;
      });
    },
    [workflowId, nodes, setNodes, setEdges],
  );

  const handleNodeDragStop: OnNodeDrag<TaskStageNode> = useCallback(
    (_event, node) => {
      void taskWorkflowService.updateStagePosition(
        workflowId,
        Number(node.id),
        node.position.x,
        node.position.y,
      );

      const orderedIds = [...nodes]
        .map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
        .sort((a, b) => a.position.x - b.position.x)
        .map((n) => n.id);

      applyOrder(orderedIds);
    },
    [workflowId, nodes, applyOrder],
  );

  const handleConnect = useCallback(
    async (connection: Connection) => {
      if (!connection.source || !connection.target) return;
      if (connection.source === connection.target) return;

      setTransitionError('');

      // Visual-only: add the edge locally and reorder so the target
      // sits right after the source (matching the "board follows arrows" UX).
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            id: `edge-${connection.source}-${connection.target}`,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds,
        ),
      );

      // Reorder: move target right after source in sortOrder
      const source = connection.source;
      const target = connection.target;
      const withoutTarget = [...nodes]
        .sort((a, b) => a.data.stage.sortOrder - b.data.stage.sortOrder)
        .map((n) => n.id)
        .filter((id) => id !== target);
      const sourceIndex = withoutTarget.indexOf(source);
      const orderedIds =
        sourceIndex === -1
          ? [...withoutTarget, target]
          : [
              ...withoutTarget.slice(0, sourceIndex + 1),
              target,
              ...withoutTarget.slice(sourceIndex + 1),
            ];
      applyOrder(orderedIds);
    },
    [nodes, setEdges, applyOrder],
  );

  const handleEdgesDelete = useCallback(
    (deleted: Edge[]) => {
      setTransitionError('');
      // Edges are visual-only for task workflows — when the user deletes
      // one, just let React Flow remove it from local state. It will
      // re-derive from sortOrder on the next page load. No backend call needed.
      void deleted;
    },
    [],
  );

  return {
    nodes,
    edges,
    transitionError,
    onNodesChange,
    onEdgesChange,
    handleNodeDragStop,
    handleConnect,
    handleEdgesDelete,
  };
}
