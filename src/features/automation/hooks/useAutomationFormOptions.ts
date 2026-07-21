import { useEffect, useState } from 'react';
import { leadSourceService } from '../../lead-settings/lead-source/services';
import { leadStatusService } from '../../lead-settings/lead-status/services';
import { leadPurposeService } from '../../lead-settings/lead-purpose/services';
import { staffService } from '../../deal/services/staff.service';
import { departmentService } from '../../account-settings/department/services/department.service';
import { campaignApiService } from '../../campaigns/services';
import type { LabelValuePair } from '../../../shared/types/common';

interface UseAutomationFormOptionsResult {
  sourceOptions: LabelValuePair[];
  statusOptions: LabelValuePair[];
  purposeOptions: LabelValuePair[];
  staffOptions: LabelValuePair[];
  departmentOptions: LabelValuePair[];
  campaignOptions: LabelValuePair[];
  isLoading: boolean;
  loadError: string;
}

/**
 * Loads every master-data option list the automation builder's trigger-config
 * and action-config sections need, in parallel. Modeled directly on
 * src/features/enquiries/hooks/useLeadFormOptions.ts - same "fetch several
 * lookup lists via Promise.all, map each into LabelValuePair[]" shape.
 *
 * No new backend endpoints - reuses each domain's existing paginated list
 * endpoint with a large limit, same pattern already used everywhere else in
 * this app for dropdown options.
 */
export function useAutomationFormOptions(): UseAutomationFormOptionsResult {
  const [sourceOptions, setSourceOptions] = useState<LabelValuePair[]>([]);
  const [statusOptions, setStatusOptions] = useState<LabelValuePair[]>([]);
  const [purposeOptions, setPurposeOptions] = useState<LabelValuePair[]>([]);
  const [staffOptions, setStaffOptions] = useState<LabelValuePair[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<LabelValuePair[]>([]);
  const [campaignOptions, setCampaignOptions] = useState<LabelValuePair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const [sourceRes, statusRes, purposeRes, staffRes, departmentRes, campaignRes] = await Promise.all([
          leadSourceService.getLeadSources(1, 100),
          leadStatusService.getLeadStatuses(1, 100),
          leadPurposeService.getLeadPurposes(1, 100),
          staffService.getStaff(),
          departmentService.getAllDepartments({ pageNumber: 1, limit: 100 }),
          campaignApiService.getAll({ pageNumber: 1, limit: 100 }),
        ]);
        if (cancelled) return;

        const sourceData = sourceRes?.data?.items ?? [];
        setSourceOptions(sourceData.map((s: { sourceId: string; source: string }) => ({ value: s.sourceId, label: s.source })));

        const statusData = statusRes?.data?.items ?? [];
        setStatusOptions(statusData.map((s: { statusId: string; status: string }) => ({ value: s.statusId, label: s.status })));

        const purposeData = purposeRes?.data?.items ?? [];
        setPurposeOptions(purposeData.map((p: { purposeId?: string; purpose: string }) => ({ value: p.purposeId ?? '', label: p.purpose })));

        const staffRaw = staffRes?.data;
        const staffData = Array.isArray(staffRaw) ? staffRaw : staffRaw?.items ?? [];
        setStaffOptions(staffData.map((s: { name: string; staff_id?: string; id?: string }) => ({ value: s.staff_id ?? s.id ?? '', label: s.name })));

        const departmentData = departmentRes?.data?.items ?? [];
        setDepartmentOptions(departmentData.map((d: { id: number | string; departmentName?: string; name?: string }) => ({
          value: String(d.id),
          label: d.departmentName ?? d.name ?? '',
        })));

        const campaignData = campaignRes?.data?.items ?? [];
        setCampaignOptions(campaignData.map((c: { id: number | string; name: string }) => ({ value: String(c.id), label: c.name })));
      } catch {
        if (!cancelled) setLoadError('Failed to load form options');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { sourceOptions, statusOptions, purposeOptions, staffOptions, departmentOptions, campaignOptions, isLoading, loadError };
}
