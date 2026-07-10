import { useState, useEffect, useRef } from 'react';
import { agentService } from '../../account-settings/agent/services/agent.service';
import type { Agent } from '../types';
import type { AgentItem } from '../../account-settings/agent/types/agent.types';

export function useStaffOptions() {
  const [selectedType, setSelectedType] = useState('');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cachedAgents = useRef<Agent[] | null>(null);

  useEffect(() => {
    if (selectedType !== 'Data Pool' && selectedType !== 'Lead Campaign') {
      setAgents([]);
      setError(null);
      return;
    }

    if (cachedAgents.current) {
      setAgents(cachedAgents.current);
      return;
    }

    setIsLoading(true);
    setError(null);
    agentService.getAllAgents({ pageNumber: 1, limit: 10 })
      .then(res => {
        const rawItems = (res.data as { items?: unknown[] })?.items ?? [];
        const items = rawItems as AgentItem[];
        if (!Array.isArray(items) || items.length === 0) {
          const empty: Agent[] = [];
          cachedAgents.current = empty;
          setAgents(empty);
          return;
        }
        const mapped: Agent[] = items.map((a: AgentItem) => {
          const agent: Agent = { id: String(a.staff_id), name: String(a.name ?? a.fullName ?? '') };
          if (a.email) agent.email = a.email;
          if (a.phone_number || a.phone || a.phoneNumber) agent.designation = String(a.phone_number ?? a.phone ?? a.phoneNumber ?? '');
          return agent;
        });
        cachedAgents.current = mapped;
        setAgents(mapped);
      })
      .catch(err => {
        setError(err?.response?.data?.message || err?.message || 'Failed to load staff');
        setAgents([]);
      })
      .finally(() => setIsLoading(false));
  }, [selectedType]);

  const clearCache = () => {
    cachedAgents.current = null;
  };

  return { selectedType, setSelectedType, agents, isLoading, error, clearCache };
}
