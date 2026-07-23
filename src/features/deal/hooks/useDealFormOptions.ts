import { useState, useEffect } from 'react';
import { dealFormOptionsService } from '../services/dealFormOptions.service';
import type { LabelValuePair } from '../../../shared/types/common';

interface UseDealFormOptionsReturn {
  leads: LabelValuePair[];
  staff: LabelValuePair[];
  statuses: LabelValuePair[];
  types: LabelValuePair[];
  isLoadingLeads: boolean;
  isLoadingStaff: boolean;
  isLoadingStatuses: boolean;
  isLoadingTypes: boolean;
}

interface DealFormOptionsData {
  leads: LabelValuePair[];
  staff: LabelValuePair[];
  statuses: LabelValuePair[];
  types: LabelValuePair[];
}

const EMPTY_OPTIONS: DealFormOptionsData = { leads: [], staff: [], statuses: [], types: [] };

// Module-scoped cache: shared across every DealForm/drawer mount for the lifetime of
// the page, so leads/staff/statuses/types are fetched only once instead of on every
// Add/Edit Deal drawer opening.
let dealFormOptionsCache: DealFormOptionsData | null = null;
let dealFormOptionsRequest: Promise<DealFormOptionsData> | null = null;

async function fetchDealFormOptions(): Promise<DealFormOptionsData> {
  const [leadsResult, staffResult, statusesResult, typesResult] = await Promise.allSettled([
    dealFormOptionsService.getLeads(1, 100),
    dealFormOptionsService.getStaff(1, 100),
    dealFormOptionsService.getStatuses(1, 10),
    dealFormOptionsService.getTypes(1, 10),
  ]);

  const leads = leadsResult.status === 'fulfilled'
    ? (() => {
      const data = leadsResult.value?.data;
      const items = Array.isArray(data) ? data : data?.items ?? [];
      return items.map((l: { id: string | number; name?: string; leadName?: string }) => ({ label: l.name || l.leadName || 'Unknown', value: l.id }));
    })()
    : [];

  const staff = staffResult.status === 'fulfilled'
    ? (() => {
      const data = staffResult.value?.data;
      const items = Array.isArray(data) ? data : data?.items ?? [];
      return items.map((s: { id: string | number; name?: string; fullName?: string; staffName?: string }) => ({ label: s.name || s.fullName || s.staffName || 'Unknown', value: s.id }));
    })()
    : [];

  const statuses = statusesResult.status === 'fulfilled'
    ? (() => {
      const data = statusesResult.value?.data;
      const items = Array.isArray(data) ? data : data?.items ?? [];
      return items.map((s: { id: string | number; name?: string; dealStatus?: string }) => ({ label: s.name || s.dealStatus || 'Unknown', value: s.id }));
    })()
    : [];

  const types = typesResult.status === 'fulfilled'
    ? (() => {
      const data = typesResult.value?.data;
      const items = Array.isArray(data) ? data : data?.items ?? [];
      return items.map((t: { id: string | number; name?: string; dealType?: string }) => ({ label: t.name || t.dealType || 'Unknown', value: t.id }));
    })()
    : [];

  return { leads, staff, statuses, types };
}

export function useDealFormOptions(): UseDealFormOptionsReturn {
  const [data, setData] = useState<DealFormOptionsData>(dealFormOptionsCache ?? EMPTY_OPTIONS);
  const [isLoading, setIsLoading] = useState(dealFormOptionsCache === null);

  useEffect(() => {
    if (dealFormOptionsCache) {
      setData(dealFormOptionsCache);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    if (!dealFormOptionsRequest) {
      dealFormOptionsRequest = fetchDealFormOptions().finally(() => {
        dealFormOptionsRequest = null;
      });
    }

    dealFormOptionsRequest.then((result) => {
      dealFormOptionsCache = result;
      if (!cancelled) {
        setData(result);
        setIsLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, []);

  return {
    leads: data.leads,
    staff: data.staff,
    statuses: data.statuses,
    types: data.types,
    isLoadingLeads: isLoading,
    isLoadingStaff: isLoading,
    isLoadingStatuses: isLoading,
    isLoadingTypes: isLoading,
  };
}
