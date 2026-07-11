import { useState, useEffect, useRef } from 'react';
import { staffService } from '../../deal/services/staff.service';
import { leadTypeService } from '../../lead-settings/lead-types/services';
import { leadSourceService } from '../../lead-settings/lead-source/services';
import { leadPurposeService } from '../../lead-settings/lead-purpose/services';
import { leadStatusService } from '../../lead-settings/lead-status/services';
import { leadAdditionalService } from '../../lead-settings/lead-additional/services/leadAdditionalService';
let cachedTypeOptions = null;
let cachedSourceOptions = null;
let cachedPurposeOptions = null;
let cachedStaffOptions = null;
let cachedStatusOptions = null;
let cachedAdditionalFields = null;
export function useLeadFilterOptions() {
    const [typeOptions, setTypeOptions] = useState(cachedTypeOptions ?? []);
    const [sourceOptions, setSourceOptions] = useState(cachedSourceOptions ?? []);
    const [purposeOptions, setPurposeOptions] = useState(cachedPurposeOptions ?? []);
    const [staffOptions, setStaffOptions] = useState(cachedStaffOptions ?? []);
    const [statusOptions, setStatusOptions] = useState(cachedStatusOptions ?? []);
    const [additionalFields, setAdditionalFields] = useState(cachedAdditionalFields ?? []);
    const [isLoading, setIsLoading] = useState(!cachedTypeOptions || !cachedStatusOptions);
    const hasLoaded = useRef(!!cachedTypeOptions && !!cachedStatusOptions && !!cachedAdditionalFields);
    useEffect(() => {
        if (hasLoaded.current)
            return;
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
                const types = (typeRes?.data?.items ?? []).map((t) => ({ value: t.typeId, label: t.type }));
                const sources = (sourceRes?.data?.items ?? []).map((s) => ({ value: s.sourceId, label: s.source }));
                const purposes = (purposeRes?.data?.items ?? []).map((p) => ({ value: p.purposeId, label: p.purpose }));
                const staffRaw = staffRes?.data;
                const staffData = Array.isArray(staffRaw) ? staffRaw : staffRaw?.items ?? [];
                const staff = staffData.map((s) => ({ value: s.staff_id ?? s.id ?? '', label: s.name }));
                const statuses = (statusRes?.data?.items ?? []).map((s) => ({ value: s.statusId, label: s.status }));
                const rawAdditional = additionalRes?.data?.items ?? [];
                const filteredAdditional = rawAdditional
                    .filter((f) => f.showInFilter === true)
                    .map((f) => ({
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
            }
            catch {
                // silently fail, filters will have no options
            }
            finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);
    return { typeOptions, sourceOptions, purposeOptions, staffOptions, statusOptions, additionalFields, isLoading };
}
//# sourceMappingURL=useLeadFilterOptions.js.map