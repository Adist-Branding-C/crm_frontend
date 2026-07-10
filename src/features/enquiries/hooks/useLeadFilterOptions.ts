import { useState, useEffect, useRef } from 'react';
import { staffService } from '../../deal/services/staff.service';
import { leadTypeService } from '../../lead-settings/lead-types/services';
import { leadSourceService } from '../../lead-settings/lead-source/services';
import { leadPurposeService } from '../../lead-settings/lead-purpose/services';
import { leadStatusService } from '../../lead-settings/lead-status/services';
import { leadAdditionalService } from '../../lead-settings/lead-additional/services/leadAdditionalService';
import type { LeadAdditionalApiItem } from '../../lead-settings/lead-additional/types';
import type { LabelValuePair } from '../../../shared/types/common';
import type { AdditionalFieldDef } from '../types';
import type { UseLeadFilterOptionsReturn } from '../types/hook.types';

let cachedTypeOptions: LabelValuePair[] | null = null;
let cachedSourceOptions: LabelValuePair[] | null = null;
let cachedPurposeOptions: LabelValuePair[] | null = null;
let cachedStaffOptions: LabelValuePair[] | null = null;
let cachedStatusOptions: LabelValuePair[] | null = null;
let cachedAdditionalFields: AdditionalFieldDef[] | null = null;

export function useLeadFilterOptions(): UseLeadFilterOptionsReturn {
  const [typeOptions, setTypeOptions] = useState<LabelValuePair[]>(cachedTypeOptions ?? []);
  const [sourceOptions, setSourceOptions] = useState<LabelValuePair[]>(cachedSourceOptions ?? []);
  const [purposeOptions, setPurposeOptions] = useState<LabelValuePair[]>(cachedPurposeOptions ?? []);
  const [staffOptions, setStaffOptions] = useState<LabelValuePair[]>(cachedStaffOptions ?? []);
  const [statusOptions, setStatusOptions] = useState<LabelValuePair[]>(cachedStatusOptions ?? []);
  const [additionalFields, setAdditionalFields] = useState<AdditionalFieldDef[]>(cachedAdditionalFields ?? []);
  const [isLoading, setIsLoading] = useState(!cachedTypeOptions || !cachedStatusOptions);
  const hasLoaded = useRef(!!cachedTypeOptions && !!cachedStatusOptions && !!cachedAdditionalFields);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const load = async () => {
      try {
        const [typeRes, sourceRes, purposeRes, staffRes, statusRes, additionalRes] = await Promise.all([
          leadTypeService.getLeadTypes(1, 100),
          leadSourceService.getLeadSources(1, 100),
          leadPurposeService.getLeadPurposes(1, 100),
          staffService.getStaff(),
          leadStatusService.getLeadStatuses(1, 100),
          leadAdditionalService.getAll(1, 200),
        ]);

        const types = (typeRes?.data?.items ?? []).map((t: { typeId: string; type: string }) => ({ value: t.typeId, label: t.type }));
        const sources = (sourceRes?.data?.items ?? []).map((s: { sourceId: string; source: string }) => ({ value: s.sourceId, label: s.source }));
        const purposes = (purposeRes?.data?.items ?? []).map((p: { purposeId: string; purpose: string }) => ({ value: p.purposeId, label: p.purpose }));

        const staffRaw = staffRes?.data;
        const staffData = Array.isArray(staffRaw) ? staffRaw : staffRaw?.items ?? [];
        const staff = staffData.map((s: { staff_id?: string; id?: string; name: string }) => ({ value: s.staff_id ?? s.id ?? '', label: s.name }));

        const statuses = (statusRes?.data?.items ?? []).map((s: { statusId: string; status: string }) => ({ value: s.statusId, label: s.status }));

        const rawAdditional = additionalRes?.data?.items ?? [];
        const filteredAdditional = rawAdditional
          .filter((f: LeadAdditionalApiItem) => f.showInFilter === true)
          .map((f: LeadAdditionalApiItem) => ({
            fieldId: f.fieldId,
            fieldKey: f.fieldKey,
            name: f.name,
            fieldType: f.fieldType,
            values: f.values ?? [],
            connectWithLeadPurpose: f.connectWithLeadPurpose,
            purposeId: f.purposeId,
          }));

        cachedTypeOptions = types;
        cachedSourceOptions = sources;
        cachedPurposeOptions = purposes;
        cachedStaffOptions = staff;
        cachedStatusOptions = statuses;
        cachedAdditionalFields = filteredAdditional;

        setTypeOptions(types);
        setSourceOptions(sources);
        setPurposeOptions(purposes);
        setStaffOptions(staff);
        setStatusOptions(statuses);
        setAdditionalFields(filteredAdditional);
      } catch {
        // silently fail, filters will have no options
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { typeOptions, sourceOptions, purposeOptions, staffOptions, statusOptions, additionalFields, isLoading };
}
