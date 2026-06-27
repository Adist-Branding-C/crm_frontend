import { useState, useEffect } from 'react';
import { activityService } from '../services/activityService';

export function useLeadActivities(leadId: number | undefined, isOpen: boolean) {
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      } catch {
        if (!cancelled) {
          setError('Failed to load activities.');
        }
      } finally {
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
