import { useEffect, useState } from 'react';
import { fetchAllAgents } from './useStaffOptions';
import type { Agent } from '../types';

export function useAgentFilterOptions() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetchAllAgents()
      .then((result) => {
        if (!cancelled) setAgents(result);
      })
      .catch(() => {
        if (!cancelled) setAgents([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { agents, isLoading };
}
