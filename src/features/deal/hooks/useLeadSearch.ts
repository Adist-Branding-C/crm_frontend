import { useState, useCallback, useEffect } from 'react';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { leadService } from '../services/lead.service';
import type { LeadOption } from '../types';

export function useLeadSearch() {
  const [leads, setLeads] = useState<LeadOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeads = useCallback(async (value: string) => {
    setIsLoading(true);
    try {
      const response = await leadService.getLeads(value || undefined);
      const data = response?.data ?? response ?? [];
      const items = Array.isArray(data) ? data : [];
      setLeads(items.map((lead: any) => ({ label: lead.name, value: lead.id })));
    } catch {
      setLeads([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { searchValue, handleSearchChange } = useDebouncedSearch(fetchLeads, 400);

  useEffect(() => {
    handleSearchChange('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { leads, isLoading, search: searchValue, setSearch: handleSearchChange };
}
