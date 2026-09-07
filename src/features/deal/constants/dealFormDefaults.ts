import type { DealFormData } from '../../../shared/types/drawers';
import { DEFAULT_COUNTRY_CODE } from '../../../shared/constants/countryCodes';
import { DEFAULT_CURRENCY } from '../../../shared/constants/currencies';

/**
 * Blank Formik initial values for the Add/Edit Deal form's fixed fields.
 *
 * Used by:
 * - DealPage (merged with per-additional-field blanks and, in edit mode,
 *   the deal's existing values)
 */
export const DEAL_FORM_DEFAULT_VALUES: DealFormData = {
  dealName: '',
  lead: '',
  leadId: '',
  mobile: '',
  mobileCountryCode: DEFAULT_COUNTRY_CODE,
  mobileNumber: '',
  amount: '',
  currency: DEFAULT_CURRENCY,
  status: '',
  statusId: '',
  pipelineId: '',
  stageId: '',
  priority: 'Medium',
  type: 'New',
  lostReason: '',
  startDate: '',
  endDate: '',
  closeDate: '',
  assignAgent: '',
  agentId: '',
};
