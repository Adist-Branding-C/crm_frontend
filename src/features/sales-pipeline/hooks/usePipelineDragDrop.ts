import { useState, useCallback } from 'react';
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { dealService } from '../../deal/services/deal.service';
import { leadService } from '../../deal/services/lead.service';
import { taskApiService } from '../../task/task/services';
import type {
  PipelineDeal,
  PipelineStatusGroup,
  Lead,
  LeadStatusGroup,
  Task,
  TaskStatusGroup,
  DragPayload,
} from '../types';

function moveDeal(
  groups: PipelineStatusGroup[],
  deal: PipelineDeal,
  fromStatusId: number,
  toStatusId: number,
): PipelineStatusGroup[] {
  const updatedDeal = { ...deal, statusId: toStatusId };
  return groups.map((group) => {
    if (group.statusId === fromStatusId) {
      return {
        ...group,
        deals: group.deals.filter((d) => d.id !== deal.id),
        count: group.count - 1,
      };
    }
    if (group.statusId === toStatusId) {
      return {
        ...group,
        deals: [...group.deals, updatedDeal],
        count: group.count + 1,
      };
    }
    return group;
  });
}

function moveLead(
  groups: LeadStatusGroup[],
  lead: Lead,
  fromStatusId: string,
  toStatusId: string,
): LeadStatusGroup[] {
  return groups.map((group) => {
    if (group.statusId === fromStatusId) {
      return {
        ...group,
        leads: group.leads.filter((l) => l.id !== lead.id),
        count: group.count - 1,
      };
    }
    if (group.statusId === toStatusId) {
      return {
        ...group,
        leads: [...group.leads, lead],
        count: group.count + 1,
      };
    }
    return group;
  });
}

function moveTask(
  groups: TaskStatusGroup[],
  task: Task,
  fromStatus: string,
  toStatus: string,
): TaskStatusGroup[] {
  const updatedTask = { ...task, status: toStatus };
  return groups.map((group) => {
    if (group.status === fromStatus) {
      return {
        ...group,
        items: group.items.filter((t) => t.id !== task.id),
        count: group.count - 1,
      };
    }
    if (group.status === toStatus) {
      return {
        ...group,
        items: [...group.items, updatedTask],
        count: group.count + 1,
      };
    }
    return group;
  });
}


export function usePipelineDragDrop(
  setStatusGroups: React.Dispatch<React.SetStateAction<PipelineStatusGroup[]>>,
  setLeadGroups: React.Dispatch<React.SetStateAction<LeadStatusGroup[]>>,
  setTaskGroups: React.Dispatch<React.SetStateAction<TaskStatusGroup[]>>,
  onError?: (message: string) => void,
) {
  const [activeItem, setActiveItem] = useState<DragPayload | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const payload = event.active.data.current as DragPayload | undefined;
    setActiveItem(payload ?? null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveItem(null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const payload = active.data.current as DragPayload | undefined;
      setActiveItem(null);

      if (!over || !payload) return;

      if (payload.type === 'deal') {
        const { deal } = payload;
        const targetStatusId = over.data.current?.statusId as number;
        const sourceStatusId = deal.statusId;
        if (targetStatusId === undefined || sourceStatusId === targetStatusId)
          return;

        setStatusGroups((prev) =>
          moveDeal(prev, deal, sourceStatusId, targetStatusId),
        );

        dealService
          .updateDeal(String(deal.id), { statusId: targetStatusId })
          .catch(() => {
            setStatusGroups((prev) =>
              moveDeal(
                prev,
                { ...deal, statusId: targetStatusId },
                targetStatusId,
                sourceStatusId,
              ),
            );
            onError?.('Failed to move deal. Please try again.');
          });
        return;
      }

      if (payload.type === 'lead') {
        const { lead, fromStatusId } = payload;
        const targetStatusId = over.data.current?.statusId as string;
        if (!targetStatusId || fromStatusId === targetStatusId) return;

        setLeadGroups((prev) =>
          moveLead(prev, lead, fromStatusId, targetStatusId),
        );

        if (!lead.leadId) {
          setLeadGroups((prev) =>
            moveLead(prev, lead, targetStatusId, fromStatusId),
          );
          onError?.('This lead is missing an identifier and cannot be moved.');
          return;
        }

        leadService
          .updateLead(lead.leadId, { statusId: targetStatusId })
          .catch(() => {
            setLeadGroups((prev) =>
              moveLead(prev, lead, targetStatusId, fromStatusId),
            );
            onError?.('Failed to move lead. Please try again.');
          });
        return;
      }

      if (payload.type === 'task') {
        const { task } = payload;
        const targetStatus = over.data.current?.status as string;
        const fromStatus = task.status;
        if (!targetStatus || fromStatus === targetStatus) return;

        setTaskGroups((prev) => moveTask(prev, task, fromStatus, targetStatus));

        taskApiService
          .update(task.id, { status: targetStatus })
          .catch(() => {
            setTaskGroups((prev) =>
              moveTask(
                prev,
                { ...task, status: targetStatus },
                targetStatus,
                fromStatus,
              ),
            );
            onError?.('Failed to move task. Please try again.');
          });
      }
    },
    [setStatusGroups, setLeadGroups, setTaskGroups, onError],
  );

  return {
    sensors,
    activeItem,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
