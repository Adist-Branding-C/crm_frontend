// Blank Formik initial state for AddBranchDrawer's "add" mode (account-settings/branch).
export const ADD_BRANCH_INITIAL_VALUES = {
    name: '',
    description: '',
    status: '',
};
/**
 * Maps backend branch field names to frontend Formik field names.
 *
 * Used by:
 * - useBranchCrud (create/update branch error handling, via shared applyFieldErrors)
 */
export const BRANCH_FIELD_MAP = {
    branch_name: 'name',
};
/**
 * Keyword -> field fallback used when the backend returns a plain message with no field-scoped
 * errors (e.g. a generic "Branch name already exists" string). Order matters; first match wins.
 *
 * Used by:
 * - useBranchCrud (create/update branch error handling, via shared applyFieldErrors)
 */
export const BRANCH_FIELD_ERROR_FALLBACKS = [
    { keyword: 'name', field: 'name' },
    { keyword: 'branch', field: 'name' },
];
//# sourceMappingURL=branch.constants.js.map