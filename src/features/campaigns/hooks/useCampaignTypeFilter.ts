import { useState, useEffect } from 'react';
import { campaignService } from '../services/campaign.service';
import type { Agent } from '../types/campaign.types';

export function useCampaignTypeFilter() {
  const [selectedType, setSelectedType] = useState('');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedType !== 'Data Pool') {
      setAgents([]);
      return;
    }
    setIsLoading(true);
    campaignService.getAgents()
      .then(res => {
        const items = (res.data?.data?.items ?? res.data?.items ?? []) as { id: string; name: string }[];
        setAgents(Array.isArray(items) ? items.map(a => ({ id: a.id, name: a.name })) : []);
      })
      .catch(() => setAgents([]))
      .finally(() => setIsLoading(false));
  }, [selectedType]);

  return { selectedType, setSelectedType, agents, isLoading };
}
