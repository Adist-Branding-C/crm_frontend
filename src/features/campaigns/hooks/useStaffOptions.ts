import { useState, useEffect, useRef, useCallback } from 'react';
import { agentService } from '../../account-settings/agent/services/agent.service';
import type { Agent } from '../types';
import type { AgentItem } from '../../account-settings/agent/types/agent.types';

/**
 * Loads the agent/staff options for the campaign form's Agents multi-select, scoped to the
 * currently-selected campaign type (only Lead Campaign and Data Pool need agents at all).
 *
 * Notes:
 * - Caches the fetched list in a ref rather than refetching per type change, since both
 *   campaign types draw from the same agent pool; clearCache() resets it for a fresh Add form.
 */
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

    let cancelled = false;

    const loadAgents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await agentService.getAllAgents({ pageNumber: 1, limit: 10 });
        const rawItems = (res.data as { items?: unknown[] })?.items ?? [];
        const items = rawItems as AgentItem[];
        const mapped: Agent[] = !Array.isArray(items) ? [] : items.map((a: AgentItem) => {
          const agent: Agent = { id: String(a.staff_id), name: String(a.name ?? a.fullName ?? '') };
          if (a.email) agent.email = a.email;
          if (a.phone_number || a.phone || a.phoneNumber) agent.designation = String(a.phone_number ?? a.phone ?? a.phoneNumber ?? '');
          return agent;
        });

        if (cancelled) return;
        cachedAgents.current = mapped;
        setAgents(mapped);
      } catch (err: unknown) {
        if (cancelled) return;
        const axiosErr = err as { response?: { data?: { message?: string } }; message?: string };
        setError(axiosErr?.response?.data?.message || axiosErr?.message || 'Failed to load staff');
        setAgents([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadAgents();
    return () => { cancelled = true; };
  }, [selectedType]);

  const clearCache = useCallback(() => {
    cachedAgents.current = null;
  }, []);

  return { selectedType, setSelectedType, agents, isLoading, error, clearCache };
}
