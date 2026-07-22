import { useEffect, useState } from 'react';
import { staffService } from '../../deal/services/staff.service';
import { leadPurposeService } from '../../lead-settings/lead-purpose/services';
import { leadTypeService } from '../../lead-settings/lead-types/services';
import { leadStatusService } from '../../lead-settings/lead-status/services';
import { leadSourceService } from '../../lead-settings/lead-source/services';
import { leadAdditionalService } from '../../lead-settings/lead-additional/services/leadAdditionalService';
import type { LeadAdditionalApiItem } from '../../lead-settings/lead-additional/types';
import type { LabelValuePair } from '../../../shared/types/common';
import { ERROR_MESSAGES } from '../constants/messages';

interface UseLeadFormOptionsResult {
  staffOptions: LabelValuePair[];
  purposeOptions: LabelValuePair[];
  typeOptions: LabelValuePair[];
  statusOptions: LabelValuePair[];
  sourceOptions: LabelValuePair[];
  additionalFieldDefs: LeadAdditionalApiItem[];
  loadError: string;
}

/**
 * Loads the lookup option lists (staff, purpose, type, status, source) and
 * additional-field definitions shared by lead create/edit UIs.
 *
 * Used by:
 * - LeadDetailDrawer / LeadDetailDrawer.jsx (inline "More Info" field editing)
 *
 * Notes:
 * - Mirrors AddLeadDrawer's own inline dropdown-loading effect; kept as a
 *   separate hook rather than refactoring AddLeadDrawer to avoid touching
 *   the already-working add/edit lead form.
 */
export function useLeadFormOptions(enabled: boolean): UseLeadFormOptionsResult {
  const [staffOptions, setStaffOptions] = useState<LabelValuePair[]>([]);
  const [purposeOptions, setPurposeOptions] = useState<LabelValuePair[]>([]);
  const [typeOptions, setTypeOptions] = useState<LabelValuePair[]>([]);
  const [statusOptions, setStatusOptions] = useState<LabelValuePair[]>([]);
  const [sourceOptions, setSourceOptions] = useState<LabelValuePair[]>([]);
  const [additionalFieldDefs, setAdditionalFieldDefs] = useState<LeadAdditionalApiItem[]>([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!enabled) return;
    setLoadError('');

    const loadDropdowns = async () => {
      try {
        const [staffRes, purposeRes, typeRes, statusRes, sourceRes, additionalFieldsRes] = await Promise.all([
          staffService.getStaff(),
          leadPurposeService.getLeadPurposes(1, 100),
          leadTypeService.getLeadTypes(1, 100),
          leadStatusService.getLeadStatuses(1, 100),
          leadSourceService.getLeadSources(1, 100),
          leadAdditionalService.getAll(1, 200),
        ]);

        const staffRaw = staffRes?.data;
        const staffData = Array.isArray(staffRaw) ? staffRaw : staffRaw?.items ?? [];
        setStaffOptions(staffData.map((s: { name: string; staff_id?: string; id?: string }) => ({
          value: s.staff_id ?? s.id ?? '',
          label: s.name,
        })));

        const purposeRaw = purposeRes?.data;
        const purposeData = Array.isArray(purposeRaw) ? purposeRaw : purposeRaw?.items ?? [];
        setPurposeOptions(purposeData.map((p: { purposeId?: string; id?: number; purpose: string }) => ({
          value: p.purposeId ?? '',
          label: p.purpose,
        })));

        const typeData = typeRes?.data?.items ?? [];
        setTypeOptions(typeData.map((t: { typeId: string; type: string }) => ({
          value: t.typeId,
          label: t.type,
        })));

        const statusData = statusRes?.data?.items ?? [];
        setStatusOptions(statusData.map((s: { statusId: string; status: string }) => ({
          value: s.statusId,
          label: s.status,
        })));

        const sourceData = sourceRes?.data?.items ?? [];
        setSourceOptions(sourceData.map((s: { sourceId: string; source: string }) => ({
          value: s.sourceId,
          label: s.source,
        })));

        const addFieldsData = additionalFieldsRes?.data?.items ?? [];
        setAdditionalFieldDefs(addFieldsData);
      } catch {
        setLoadError(ERROR_MESSAGES.LOAD_FORM_OPTIONS);
      }
    };

    loadDropdowns();
  }, [enabled]);

  return { staffOptions, purposeOptions, typeOptions, statusOptions, sourceOptions, additionalFieldDefs, loadError };
}
