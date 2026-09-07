import { useState, useEffect } from 'react';
import { dealFormOptionsService } from '../services/dealFormOptions.service';
import { dealPipelineService } from '../../deal-pipeline-builder/services/dealPipeline.service';
import type { LabelValuePair } from '../../../shared/types/common';
import type { DealPipelineItem } from '../../deal-pipeline-builder/types/interface';

// Carries the lead's own phone/countryCode/agent data alongside the option
// label/value so DealForm can auto-fill Mobile and Assign Agent on selection
// without a second lookup.
export interface DealLeadOption extends LabelValuePair {
  phone?: string | null;
  countryCode?: string | null;
  agentId?: string | number | null;
  agentName?: string | null;
}

export interface DealStaffOption extends LabelValuePair {
  rawId?: string | number | null;
}

// Stages come back company-wide (the legacy deal-settings/status endpoint
// isn't pipeline-scoped) - pipelineId lets DealForm filter to the ones that
// belong to whichever pipeline is currently selected.
export interface DealStageOption extends LabelValuePair {
  pipelineId: number;
  outcome?: 'OPEN' | 'WON' | 'LOST';
}

interface UseDealFormOptionsReturn {
  leads: DealLeadOption[];
  staff: DealStaffOption[];
  statuses: DealStageOption[];
  pipelines: DealPipelineItem[];
  isLoadingLeads: boolean;
  isLoadingStaff: boolean;
  isLoadingStatuses: boolean;
  isLoadingPipelines: boolean;
}

interface DealFormOptionsData {
  leads: DealLeadOption[];
  staff: DealStaffOption[];
  statuses: DealStageOption[];
  pipelines: DealPipelineItem[];
}

const EMPTY_OPTIONS: DealFormOptionsData = { leads: [], staff: [], statuses: [], pipelines: [] };

// Module-scoped cache: shared across every DealForm/drawer mount for the lifetime of
// the page, so leads/staff/statuses/pipelines are fetched only once instead of on every
// Add/Edit Deal drawer opening.
let dealFormOptionsCache: DealFormOptionsData | null = null;
let dealFormOptionsRequest: Promise<DealFormOptionsData> | null = null;

async function fetchDealFormOptions(): Promise<DealFormOptionsData> {
  const [leadsResult, staffResult, statusesResult, pipelinesResult] = await Promise.allSettled([
    dealFormOptionsService.getLeads(1, 100),
    dealFormOptionsService.getStaff(1, 100),
    // A company's stages are split across pipelines now, not one flat list -
    // 200 comfortably covers realistic multi-pipeline stage counts (the old
    // limit of 10 assumed a single flat list and would silently truncate).
    dealFormOptionsService.getStatuses(1, 200),
    dealPipelineService.getAllPipelines(),
  ]);

  const leads = leadsResult.status === 'fulfilled'
    ? (() => {
      const data = leadsResult.value?.data;
      const items = Array.isArray(data) ? data : data?.items ?? [];
      return items.map((l: {
        id: string | number; name?: string; leadName?: string;
        phone?: string | null; countryCode?: string | null;
        agentId?: string | number | null;
        assignedStaff?: { staff_id?: string; name?: string } | null;
      }) => ({
        label: l.name || l.leadName || 'Unknown',
        value: String(l.id),
        phone: l.phone ?? null,
        countryCode: l.countryCode ?? null,
        agentId: l.agentId ?? l.assignedStaff?.staff_id ?? null,
        agentName: l.assignedStaff?.name ?? null,
      }));
    })()
    : [];

  const staff = staffResult.status === 'fulfilled'
    ? (() => {
      const data = staffResult.value?.data;
      const items = Array.isArray(data) ? data : data?.items ?? [];
      return items.map((s: { id?: string | number; staff_id?: string; name?: string; fullName?: string; staffName?: string }) => ({ label: s.name || s.fullName || s.staffName || 'Unknown', value: String(s.staff_id ?? s.id ?? ''), rawId: s.id ?? null }));
    })()
    : [];

  const statuses = statusesResult.status === 'fulfilled'
    ? (() => {
      const data = statusesResult.value?.data;
      const items = Array.isArray(data) ? data : data?.items ?? [];
      return items.map((s: { id: string | number; name?: string; dealStatus?: string; pipelineId: number; outcome?: 'OPEN' | 'WON' | 'LOST' }) => ({
        label: s.name || s.dealStatus || 'Unknown',
        value: String(s.id),
        pipelineId: s.pipelineId,
        outcome: s.outcome,
      }));
    })()
    : [];

  const pipelines = pipelinesResult.status === 'fulfilled' ? pipelinesResult.value : [];

  return { leads, staff, statuses, pipelines };
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
    pipelines: data.pipelines,
    isLoadingLeads: isLoading,
    isLoadingStaff: isLoading,
    isLoadingStatuses: isLoading,
    isLoadingPipelines: isLoading,
  };
}
