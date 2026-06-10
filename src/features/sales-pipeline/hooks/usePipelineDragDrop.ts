import { useState, useCallback } from 'react';
import type { PipelineDeal, PipelineStatusGroup } from '../types/pipeline.types';

export function usePipelineDragDrop(
  setStatusGroups: React.Dispatch<React.SetStateAction<PipelineStatusGroup[]>>
) {
  const [draggedDeal, setDraggedDeal] = useState<PipelineDeal | null>(null);

  const handleDragStart = useCallback((_e: React.DragEvent, deal: PipelineDeal) => {
    setDraggedDeal(deal);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetStatusId: number) => {
    e.preventDefault();
    if (!draggedDeal) return;

    setStatusGroups(prevGroups => {
      const sourceGroup = prevGroups.find(g => g.deals.some(d => d.id === draggedDeal.id));
      if (!sourceGroup) return prevGroups;

      const currentStatusId = sourceGroup.statusId;
      if (currentStatusId === targetStatusId) {
        setDraggedDeal(null);
        return prevGroups;
      }

      const updatedDeal = { ...draggedDeal, statusId: targetStatusId };

      return prevGroups.map(group => {
        if (group.statusId === currentStatusId) {
          return {
            ...group,
            deals: group.deals.filter(d => d.id !== draggedDeal.id),
            count: group.count - 1,
          };
        }
        if (group.statusId === targetStatusId) {
          return {
            ...group,
            deals: [...group.deals, updatedDeal],
            count: group.count + 1,
          };
        }
        return group;
      });
    });

    setDraggedDeal(null);
  }, [draggedDeal, setStatusGroups]);

  return { draggedDeal, handleDragStart, handleDragOver, handleDrop };
}
