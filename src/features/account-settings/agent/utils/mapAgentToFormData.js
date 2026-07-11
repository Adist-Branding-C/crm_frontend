/**
 * Maps a fetched AgentItem to the Formik shape used by the Add/Edit Staff drawer.
 *
 * Used by:
 * - useAgentDrawer (derives the drawer's initial values in edit mode)
 * - useAgentFormSubmit (derives the "original" values for the edit dirty-check)
 *
 * Notes:
 * - Single source of truth for this mapping so both call sites can't drift apart.
 */
export function mapAgentToFormData(item) {
    return {
        fullName: item.fullName || item.name || '',
        email: item.email || '',
        phone: item.phone || item.phone_number || item.phoneNumber || item.mobile || '',
        password: '',
        confirmPassword: '',
        designationId: item.designationId || String(item.designation_id ?? item.designation ?? ''),
        status: item.status || '',
    };
}
//# sourceMappingURL=mapAgentToFormData.js.map