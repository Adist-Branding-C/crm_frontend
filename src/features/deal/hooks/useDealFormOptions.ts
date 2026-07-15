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

export function useDealFormOptions(): UseDealFormOptionsReturn {
  const [leads, setLeads] = useState<LabelValuePair[]>([]);
  const [staff, setStaff] = useState<LabelValuePair[]>([]);
  const [statuses, setStatuses] = useState<LabelValuePair[]>([]);
  const [types, setTypes] = useState<LabelValuePair[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [isLoadingStaff, setIsLoadingStaff] = useState(true);
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      const [leadsResult, staffResult, statusesResult, typesResult] = await Promise.allSettled([
        dealFormOptionsService.getLeads(1, 100),
        dealFormOptionsService.getStaff(1, 100),
        dealFormOptionsService.getStatuses(1, 10),
        dealFormOptionsService.getTypes(1, 10),
      ]);

      if (cancelled) return;

      if (leadsResult.status === 'fulfilled') {
        const data = leadsResult.value?.data;
        const items = Array.isArray(data) ? data : data?.items ?? [];
        setLeads(items.map((l: { id: string | number; name?: string; leadName?: string }) => ({ label: l.name || l.leadName || 'Unknown', value: l.id })));
      }
      setIsLoadingLeads(false);

      if (staffResult.status === 'fulfilled') {
        const data = staffResult.value?.data;
        const items = Array.isArray(data) ? data : data?.items ?? [];
        setStaff(items.map((s: { id: string | number; name?: string; fullName?: string; staffName?: string }) => ({ label: s.name || s.fullName || s.staffName || 'Unknown', value: s.id })));
      }
      setIsLoadingStaff(false);

      if (statusesResult.status === 'fulfilled') {
        const data = statusesResult.value?.data;
        const items = Array.isArray(data) ? data : data?.items ?? [];
        setStatuses(items.map((s: { id: string | number; name?: string; dealStatus?: string }) => ({ label: s.name || s.dealStatus || 'Unknown', value: s.id })));
      }
      setIsLoadingStatuses(false);

      if (typesResult.status === 'fulfilled') {
        const data = typesResult.value?.data;
        const items = Array.isArray(data) ? data : data?.items ?? [];
        setTypes(items.map((t: { id: string | number; name?: string; dealType?: string }) => ({ label: t.name || t.dealType || 'Unknown', value: t.id })));
      }
      setIsLoadingTypes(false);
    };

    fetchAll();

    return () => { cancelled = true; };
  }, []);

  return { leads, staff, statuses, types, isLoadingLeads, isLoadingStaff, isLoadingStatuses, isLoadingTypes };
}
