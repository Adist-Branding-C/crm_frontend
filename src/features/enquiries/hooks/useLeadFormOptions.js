import { useEffect, useState } from 'react';
import { staffService } from '../../deal/services/staff.service';
import { leadPurposeService } from '../../lead-settings/lead-purpose/services';
import { leadTypeService } from '../../lead-settings/lead-types/services';
import { leadStatusService } from '../../lead-settings/lead-status/services';
import { leadSourceService } from '../../lead-settings/lead-source/services';
import { leadAdditionalService } from '../../lead-settings/lead-additional/services/leadAdditionalService';
import { ERROR_MESSAGES } from '../constants/messages';
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
export function useLeadFormOptions(enabled) {
    const [staffOptions, setStaffOptions] = useState([]);
    const [purposeOptions, setPurposeOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [sourceOptions, setSourceOptions] = useState([]);
    const [additionalFieldDefs, setAdditionalFieldDefs] = useState([]);
    const [loadError, setLoadError] = useState('');
    useEffect(() => {
        if (!enabled)
            return;
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
                setStaffOptions(staffData.map((s) => ({
                    value: s.staff_id ?? s.id ?? '',
                    label: s.name,
                })));
                const purposeRaw = purposeRes?.data;
                const purposeData = Array.isArray(purposeRaw) ? purposeRaw : purposeRaw?.items ?? [];
                setPurposeOptions(purposeData.map((p) => ({
                    value: p.purposeId ?? '',
                    label: p.purpose,
                })));
                const typeData = typeRes?.data?.items ?? [];
                setTypeOptions(typeData.map((t) => ({
                    value: t.typeId,
                    label: t.type,
                })));
                const statusData = statusRes?.data?.items ?? [];
                setStatusOptions(statusData.map((s) => ({
                    value: s.statusId,
                    label: s.status,
                })));
                const sourceData = sourceRes?.data?.items ?? [];
                setSourceOptions(sourceData.map((s) => ({
                    value: s.sourceId,
                    label: s.source,
                })));
                const addFieldsData = additionalFieldsRes?.data?.items ?? [];
                setAdditionalFieldDefs(addFieldsData);
            }
            catch {
                setLoadError(ERROR_MESSAGES.LOAD_FORM_OPTIONS);
            }
        };
        loadDropdowns();
    }, [enabled]);
    return { staffOptions, purposeOptions, typeOptions, statusOptions, sourceOptions, additionalFieldDefs, loadError };
}
//# sourceMappingURL=useLeadFormOptions.js.map