import { DEFAULT_COUNTRY_CODE } from '../../../shared/constants/countryCodes';
/**
 * Blank Formik initial values for the Add Lead form's fixed fields.
 *
 * Used by:
 * - AddLeadDrawer (merged with per-additional-field blanks and, in edit mode,
 *   the lead's existing values)
 */
export const BASE_INITIAL_VALUES = {
    name: '',
    phone: '',
    countryCode: DEFAULT_COUNTRY_CODE,
    email: '',
    agentId: '',
    purposeId: '',
    typeId: '',
    statusId: '',
    sourceId: '',
    nextFollowUp: '',
    notes: '',
    location: '',
    address: '',
};
//# sourceMappingURL=addLead.constants.js.map