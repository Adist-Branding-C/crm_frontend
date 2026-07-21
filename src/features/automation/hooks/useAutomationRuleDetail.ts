import { useEffect, useState } from 'react';
import { automationApiService } from '../services';
import type { AutomationRule } from '../types/interface';

export function useAutomationRuleDetail(id: string | undefined) {
  const [rule, setRule] = useState<AutomationRule | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setRule(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError('');

    automationApiService.getOne(id)
      .then((response) => {
        if (cancelled) return;
        if (response.status && response.data) {
          setRule(response.data);
        } else {
          setError(response.message || 'Failed to load automation');
        }
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load automation');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { rule, isLoading, error };
}
