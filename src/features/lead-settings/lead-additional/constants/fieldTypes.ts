/**
 * The two additional-field types that need a "values" list attached (the field renders a
 * dropdown of options, or a set of checkboxes built from the same option list).
 *
 * Used by:
 * - AdditionalFieldForm (shows/hides the DropdownValuesInput sub-field)
 * - additionalFieldValidationSchema (requires at least one value for these two types)
 */
export const FIELD_TYPES = {
  DROPDOWN: 'Dropdown',
  CHECKBOX: 'Checkbox',
} as const;
