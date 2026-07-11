/**
 * Blank Formik initial state for AdditionalFieldForm's "add" mode.
 *
 * Used by:
 * - LeadAdditionalPage (useEditDrawer, seeds the form in add mode)
 *
 * Notes:
 * - Does not include a "currentDropdownValue" field - the text the user is currently typing
 *   into the dropdown/checkbox value input is transient UI state owned by AdditionalFieldForm
 *   itself, not part of the submitted payload.
 */
export const EMPTY_ADDITIONAL_FIELD_FORM_DATA = {
    name: '',
    fieldType: '',
    showInFilter: false,
    showInList: false,
    isRequired: false,
    connectWithLeadPurpose: false,
    purposeId: '',
    dropdownValues: [],
};
//# sourceMappingURL=form.constants.js.map