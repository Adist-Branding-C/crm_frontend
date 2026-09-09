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
import { dealPipelineService } from '../services/dealPipeline.service';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import { CANVAS_AUTO_LAYOUT } from '../constants/dealPipelineBuilder.constants';
import type { DealPipelineDetail, DealStageItem } from '../types/interface';

export interface StageNodeData extends Record<string, unknown> {
  stage: DealStageItem;
  onEdit: (stage: DealStageItem) => void;
}

export type StageNode = Node<StageNodeData, 'stageNode'>;

function toNodes(stages: DealStageItem[], onEdit: (stage: DealStageItem) => void): StageNode[] {
  const ordered = [...stages].sort((a, b) => a.sortOrder - b.sortOrder);
  return ordered.map((stage, index) => ({
    id: String(stage.id),
    type: 'stageNode',
    position: {
      x: stage.positionX ?? index * CANVAS_AUTO_LAYOUT.NODE_GAP_X,
      y: stage.positionY ?? CANVAS_AUTO_LAYOUT.START_Y,
    },
    data: { stage, onEdit },
    // Stage deletion has to go through the reassignment flow in the edit
    // drawer (async, may need a target stage picked first) - a keyboard/
    // selection delete on the canvas can't safely do that mid-flight, so
    // nodes are undeletable here; transitions (edges) stay deletable.
    deletable: false,
  }));
}

function toEdges(pipeline: DealPipelineDetail): Edge[] {
  return pipeline.transitions
    .filter((t) => t.fromStageId !== null)
    .map((t) => ({
      id: String(t.id),
      source: String(t.fromStageId),
      target: String(t.toStageId),
      markerEnd: { type: MarkerType.ArrowClosed },
    }));
}

/**
 * Owns the canvas's React Flow node/edge state: derives it from the loaded
 * pipeline, and keeps sortOrder - what the Kanban board's column order
 * actually reads - in sync with the canvas in two ways: dragging a stage
 * past others re-ranks by X position, and drawing a transition arrow
 * fromStage -> toStage moves toStage to sit right after fromStage (so the
 * board follows the arrows, not just left-to-right position). Also
 * creates/deletes the transitions themselves as edges are drawn/removed.
 * Does not own stage CRUD (add/edit/delete stage) - that's
 * useStageFormDrawer - or the pipeline fetch itself (useDealPipelineDetail),
 * per the project's single-responsibility hook standard.
 *
 * Used by:
 * - DealPipelineCanvasPage
 */
export function useStageGraph(
  pipelineId: number,
  pipeline: DealPipelineDetail | null,
  onEditStage: (stage: DealStageItem) => void,
) {
  const [nodes, setNodes, onNodesChange] = useNodesState<StageNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [transitionError, setTransitionError] = useState('');

  useEffect(() => {
    if (!pipeline) return;
    setNodes(toNodes(pipeline.stages, onEditStage));
    setEdges(toEdges(pipeline));
  }, [pipeline, onEditStage, setNodes, setEdges]);

  // Applies a new left-to-right stage order: persists sortOrder (what the
  // Kanban board's column order actually reads) and re-lays-out each
  // node's X position to match, for every node whose rank in `orderedIds`
  // differs from its current sortOrder - shared by dragging a stage past
  // others and by drawing a transition arrow (which now also reorders, so
  // "the board follows the arrows" instead of the two being independent).
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
          void dealPipelineService.reorderStage(pipelineId, Number(id), index);
          void dealPipelineService.updateStagePosition(pipelineId, Number(id), x, n.position.y);
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
            data: { ...n.data, stage: { ...n.data.stage, sortOrder: update.sortOrder } },
          };
        }),
      );
    },
    [pipelineId, nodes, setNodes],
  );

  const handleNodeDragStop: OnNodeDrag<StageNode> = useCallback(
    (_event, node) => {
      // Fire-and-forget: the drag itself already updated local RF state, so
      // the canvas stays responsive even if this persist call fails - the
      // position just reverts to its last-saved spot on the next reload,
      // which is an acceptable, low-stakes failure mode for a UI layout detail.
      void dealPipelineService.updateStagePosition(
        pipelineId,
        Number(node.id),
        node.position.x,
        node.position.y,
      );

      // Left-to-right canvas order also drives the Kanban board's column
      // order (sortOrder) - re-rank every stage by X position after each
      // drag (moving one stage past others re-ranks everyone between its
      // old and new spot, not just the dragged node).
      const orderedIds = [...nodes]
        .map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
        .sort((a, b) => a.position.x - b.position.x)
        .map((n) => n.id);

      applyOrder(orderedIds);
    },
    [pipelineId, nodes, applyOrder],
  );

  const handleConnect = useCallback(
    async (connection: Connection) => {
      if (!connection.source || !connection.target) return;
      if (connection.source === connection.target) return;

      setTransitionError('');
      try {
        const response = await dealPipelineService.createTransition(pipelineId, {
          fromStageId: Number(connection.source),
          toStageId: Number(connection.target),
        });
        if (response.status && response.data) {
          setEdges((eds) =>
            addEdge(
              {
                ...connection,
                id: String(response.data!.id),
                markerEnd: { type: MarkerType.ArrowClosed },
              },
              eds,
            ),
          );

          // "The board follows the arrows": drawing fromStage -> toStage
          // means toStage comes right after fromStage, so move it there in
          // the sortOrder the Kanban board actually reads - same reorder
          // path a manual drag uses, just derived from the connection
          // instead of an X position.
          const source = connection.source!;
          const target = connection.target!;
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
        } else {
          setTransitionError(response.message || 'Could not save that connection');
        }
      } catch (err) {
        // Drawn edge is never added to local state on failure, so it just
        // vanishes on its own - this is the only feedback the admin gets
        // for why (e.g. a non-admin staff member is blocked from editing
        // the pipeline, or the same connection already exists).
        setTransitionError(parseApiError(err).message);
      }
    },
    [pipelineId, nodes, setEdges, applyOrder],
  );

  const handleEdgesDelete = useCallback(
    (deleted: Edge[]) => {
      setTransitionError('');
      deleted.forEach((edge) => {
        dealPipelineService.deleteTransition(pipelineId, Number(edge.id)).catch((err) => {
          setTransitionError(parseApiError(err).message);
          // The edge was already removed from local state by React Flow's
          // default delete handling - put it back since the delete didn't
          // actually persist.
          setEdges((eds) => (eds.some((e) => e.id === edge.id) ? eds : [...eds, edge]));
        });
      });
    },
    [pipelineId, setEdges],
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
