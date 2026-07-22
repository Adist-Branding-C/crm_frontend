import { useEffect, useState } from 'react';
import { staffService } from '../../deal/services/staff.service';
import { leadPurposeService } from '../../lead-settings/lead-purpose/services';
import { leadStatusService } from '../../lead-settings/lead-status/services';
import { leadSourceService } from '../../lead-settings/lead-source/services';
import { departmentService } from '../../account-settings/department/services/department.service';
import { campaignApiService } from '../../campaigns/services';
import type { SelectOption } from '../types';

export interface AutomationLookupOptions {
  staffOptions: SelectOption[];
  departmentOptions: SelectOption[];
  campaignOptions: SelectOption[];
  statusOptions: SelectOption[];
  sourceOptions: SelectOption[];
  purposeOptions: SelectOption[];
  isLoading: boolean;
}

/**
 * Real lookup lists for the Rule Builder's dropdowns (staff/department/campaign/lead
 * status/source/purpose) — these used to be hardcoded mock arrays (staff-11, dept-sales-north,
 * camp-101...) that didn't correspond to anything in the database, so a rule saved through
 * the UI would submit ids the backend either rejects or silently can't resolve.
 */
export function useAutomationLookupOptions(): AutomationLookupOptions {
  const [staffOptions, setStaffOptions] = useState<SelectOption[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<SelectOption[]>([]);
  const [campaignOptions, setCampaignOptions] = useState<SelectOption[]>([]);
  const [statusOptions, setStatusOptions] = useState<SelectOption[]>([]);
  const [sourceOptions, setSourceOptions] = useState<SelectOption[]>([]);
  const [purposeOptions, setPurposeOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        const [staffRes, statusRes, sourceRes, purposeRes, departmentRes, campaignRes] = await Promise.all([
          staffService.getStaff(),
          leadStatusService.getLeadStatuses(1, 100),
          leadSourceService.getLeadSources(1, 100),
          leadPurposeService.getLeadPurposes(1, 100),
          departmentService.getAllDepartments({ pageNumber: 1, limit: 100 }),
          campaignApiService.getAll({ pageNumber: 1, limit: 100 }),
        ]);
        if (cancelled) return;

        const staffRaw = staffRes?.data;
        const staffData = Array.isArray(staffRaw) ? staffRaw : (staffRaw as { items?: unknown[] })?.items ?? [];
        setStaffOptions((staffData as { name: string; staff_id?: string; id?: string }[]).map((s) => ({
          value: s.staff_id ?? s.id ?? '',
          label: s.name,
        })));

        const statusData = statusRes?.data?.items ?? [];
        setStatusOptions((statusData as { statusId: string; status: string }[]).map((s) => ({
          value: s.statusId,
          label: s.status,
        })));

        const sourceData = sourceRes?.data?.items ?? [];
        setSourceOptions((sourceData as { sourceId: string; source: string }[]).map((s) => ({
          value: s.sourceId,
          label: s.source,
        })));

        const purposeRaw = purposeRes?.data;
        const purposeData = Array.isArray(purposeRaw) ? purposeRaw : (purposeRaw as { items?: unknown[] })?.items ?? [];
        setPurposeOptions((purposeData as { purposeId?: string; purpose: string }[]).map((p) => ({
          value: p.purposeId ?? '',
          label: p.purpose,
        })));

        const departmentData = departmentRes?.data?.items ?? [];
        setDepartmentOptions(departmentData.map((d) => ({
          value: String(d.id),
          label: d.departmentName ?? d.name ?? '',
        })));

        const campaignData = campaignRes?.data?.items ?? [];
        setCampaignOptions(campaignData.map((c) => ({
          value: String(c.id),
          label: c.name,
        })));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  return { staffOptions, departmentOptions, campaignOptions, statusOptions, sourceOptions, purposeOptions, isLoading };
}
