import { useCallback } from 'react';
export function useAvatarColor() {
    const getAvatarColor = useCallback((name) => {
        if (!name) {
            return '#6b7280';
        }
        const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899'];
        return colors[name.charCodeAt(0) % colors.length] ?? '#6b7280';
    }, []);
    return { getAvatarColor };
}
//# sourceMappingURL=useAvatarColor.js.map