import { useState, useEffect, useRef } from 'react';
import { agentService } from '../../account-settings/agent/services/agent.service';
import type { Agent } from '../types';
import type { AgentItem } from '../../account-settings/agent/types/agent.types';

const PAGE_SIZE = 100;
// Safety ceiling so a misbehaving `pagination.total` from the backend can
// never turn this into an unbounded fetch loop.
const MAX_AGENTS = 5000;

function mapAgent(a: AgentItem): Agent {
  const agent: Agent = { id: String(a.staff_id), name: String(a.name ?? a.fullName ?? '') };
  if (a.email) agent.email = a.email;
  if (a.phone_number || a.phone || a.phoneNumber) agent.designation = String(a.phone_number ?? a.phone ?? a.phoneNumber ?? '');
  return agent;
}

let agentCachePromise: Promise<Agent[]> | null = null;

export async function fetchAllAgents(forceRefresh = false): Promise<Agent[]> {
  if (agentCachePromise && !forceRefresh) {
    return agentCachePromise;
  }

  agentCachePromise = (async () => {
    const all: Agent[] = [];
    let pageNumber = 1;

  while (all.length < MAX_AGENTS) {
    const res = await agentService.getAllAgents({ pageNumber, limit: PAGE_SIZE });
    const items = ((res.data as { items?: unknown[] })?.items ?? []) as AgentItem[];
    if (!Array.isArray(items) || items.length === 0) break;

    all.push(...items.map(mapAgent));

    const total = (res.data as { pagination?: { total?: number } })?.pagination?.total;
    if (items.length < PAGE_SIZE) break;
    if (typeof total === 'number' && all.length >= total) break;

    pageNumber += 1;
  }

    return all;
  })();

  try {
    return await agentCachePromise;
  } catch (err) {
    agentCachePromise = null;
    throw err;
  }
}

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
    fetchAllAgents()
      .then((mapped) => {
        cachedAgents.current = mapped;
        setAgents(mapped);
      })
      .catch((err) => {
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
