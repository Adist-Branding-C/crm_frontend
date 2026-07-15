import { useState, useEffect } from 'react';
import { dealFormOptionsService } from '../services/dealFormOptions.service';

interface Option {
  label: string;
  value: string | number;
}

interface UseDealFormOptionsReturn {
  leads: Option[];
  staff: Option[];
  statuses: Option[];
  types: Option[];
  isLoadingLeads: boolean;
  isLoadingStaff: boolean;
  isLoadingStatuses: boolean;
  isLoadingTypes: boolean;
}

export function useDealFormOptions(): UseDealFormOptionsReturn {
  const [leads, setLeads] = useState<Option[]>([]);
  const [staff, setStaff] = useState<Option[]>([]);
  const [statuses, setStatuses] = useState<Option[]>([]);
  const [types, setTypes] = useState<Option[]>([]);
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
        setLeads(items.map((l: any) => ({ label: l.name || l.leadName || l.label || 'Unknown', value: l.id })));
      }
      setIsLoadingLeads(false);

      if (staffResult.status === 'fulfilled') {
        const data = staffResult.value?.data;
        const items = Array.isArray(data) ? data : data?.items ?? [];
        setStaff(items.map((s: any) => ({ label: s.name || s.fullName || s.staffName || 'Unknown', value: s.id })));
      }
      setIsLoadingStaff(false);

      if (statusesResult.status === 'fulfilled') {
        const data = statusesResult.value?.data;
        const items = Array.isArray(data) ? data : data?.items ?? [];
        setStatuses(items.map((s: any) => ({ label: s.name || s.dealStatus || s.label || 'Unknown', value: s.id })));
      }
      setIsLoadingStatuses(false);

      if (typesResult.status === 'fulfilled') {
        const data = typesResult.value?.data;
        const items = Array.isArray(data) ? data : data?.items ?? [];
        setTypes(items.map((t: any) => ({ label: t.name || t.dealType, value: t.id })));
      }
      setIsLoadingTypes(false);
    };

    fetchAll();

    return () => { cancelled = true; };
  }, []);

  return { leads, staff, statuses, types, isLoadingLeads, isLoadingStaff, isLoadingStatuses, isLoadingTypes };
}
