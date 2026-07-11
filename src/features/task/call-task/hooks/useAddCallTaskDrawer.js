import { useState, useCallback } from 'react';
export function useAddCallTaskDrawer(onOpen) {
    const [showAddDrawer, setShowAddDrawer] = useState(false);
    const openAddDrawer = useCallback(() => {
        onOpen?.();
        setShowAddDrawer(true);
    }, [onOpen]);
    const closeAddDrawer = useCallback(() => setShowAddDrawer(false), []);
    return { showAddDrawer, openAddDrawer, closeAddDrawer };
}
//# sourceMappingURL=useAddCallTaskDrawer.js.map