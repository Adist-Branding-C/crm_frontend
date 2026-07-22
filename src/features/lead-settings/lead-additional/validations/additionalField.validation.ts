import * as yup from 'yup';
import { FIELD_TYPES } from '../constants/fieldTypes';
import { ERROR_MESSAGES } from '../../constants/messages';

/**
 * Validation schema for adding or editing a lead additional field.
 *
 * Used by:
 * - AdditionalFieldForm (add and edit modes)
 *
 * Notes:
 * - purposeId is only required when connectWithLeadPurpose is checked.
 * - dropdownValues must have at least one entry when fieldType is "dropdown" or "checkbox";
 *   the two cases keep distinct messages (dropdown vs checkbox) to match the original
 *   per-field-type copy the backend/UI has always shown.
 */
export const additionalFieldValidationSchema = yup.object({
  name: yup.string().trim().required(ERROR_MESSAGES.VALIDATION_FIELD_NAME_REQUIRED),
  fieldType: yup.string().required(ERROR_MESSAGES.VALIDATION_FIELD_TYPE_REQUIRED),
  showInFilter: yup.boolean().required(),
  showInList: yup.boolean().required(),
  isRequired: yup.boolean().required(),
  connectWithLeadPurpose: yup.boolean().required(),
  purposeId: yup.string().when('connectWithLeadPurpose', {
    is: true,
    then: (schema) => schema.required(ERROR_MESSAGES.VALIDATION_LEAD_PURPOSE_REQUIRED),
    otherwise: (schema) => schema.notRequired(),
  }),
  dropdownValues: yup.array(yup.string().required()).test(
    'values-required-for-dropdown-or-checkbox',
    ERROR_MESSAGES.VALIDATION_DROPDOWN_VALUES,
    function (value) {
      const fieldType = this.parent.fieldType as string;
      if (fieldType !== FIELD_TYPES.DROPDOWN && fieldType !== FIELD_TYPES.CHECKBOX) return true;
      if (value && value.length > 0) return true;
      const message = fieldType === FIELD_TYPES.CHECKBOX
        ? ERROR_MESSAGES.VALIDATION_CHECKBOX_VALUES
        : ERROR_MESSAGES.VALIDATION_DROPDOWN_VALUES;
      return this.createError({ message });
    },
  ),
});
