import { useState, useCallback } from 'react';
export function useLeadActionMenu() {
    const [openId, setOpenId] = useState(null);
    const [buttonRect, setButtonRect] = useState(null);
    const open = useCallback((id, rect) => {
        setOpenId(id);
        setButtonRect(rect);
    }, []);
    const close = useCallback(() => {
        setOpenId(null);
        setButtonRect(null);
    }, []);
    return { openId, buttonRect, open, close };
}
//# sourceMappingURL=useLeadActionMenu.js.map