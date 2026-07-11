import { useState, useEffect } from 'react';
import { activityService } from '../services/activityService';
import { ERROR_MESSAGES } from '../constants/messages';
export function useLeadActivities(leadId, isOpen) {
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!isOpen || !leadId) {
            setActivities([]);
            setError(null);
            return;
        }
        let cancelled = false;
        const fetchActivities = async () => {
            setIsLoading(true);
            setError(null);
            const entityId = String(leadId);
            try {
                const response = await activityService.getActivities({
                    entityType: 'lead',
                    entityId,
                });
                if (!cancelled) {
                    const items = response?.data?.items ?? [];
                    setActivities(items);
                }
            }
            catch {
                if (!cancelled) {
                    setError(ERROR_MESSAGES.FETCH_ACTIVITIES);
                }
            }
            finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };
        fetchActivities();
        return () => {
            cancelled = true;
        };
    }, [leadId, isOpen]);
    return { activities, isLoading, error };
}
//# sourceMappingURL=useLeadActivities.js.map