import type { AddLeadFormValues } from '../../../shared/types/drawers';

/**
 * Blank Formik initial values for the Add Lead form's fixed fields.
 *
 * Used by:
 * - AddLeadDrawer (merged with per-additional-field blanks and, in edit mode,
 *   the lead's existing values)
 */
export const BASE_INITIAL_VALUES: AddLeadFormValues = {
  name: '',
  phone: '',
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
