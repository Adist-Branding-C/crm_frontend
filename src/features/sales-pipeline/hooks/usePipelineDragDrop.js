import { useState, useCallback } from 'react';
export function usePipelineDragDrop(setStatusGroups) {
    const [draggedDeal, setDraggedDeal] = useState(null);
    const handleDragStart = useCallback((_e, deal) => {
        setDraggedDeal(deal);
    }, []);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);
    const handleDrop = useCallback((e, targetStatusId) => {
        e.preventDefault();
        if (!draggedDeal)
            return;
        setStatusGroups(prevGroups => {
            const sourceGroup = prevGroups.find(g => g.deals.some(d => d.id === draggedDeal.id));
            if (!sourceGroup)
                return prevGroups;
            const currentStatusId = sourceGroup.statusId;
            if (currentStatusId === targetStatusId) {
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
//# sourceMappingURL=usePipelineDragDrop.js.map