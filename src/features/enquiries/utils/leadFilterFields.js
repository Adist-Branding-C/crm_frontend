/**
 * Additional fields visible in the leads filter panel for the current filter state:
 * fields not tied to a lead purpose are always shown; purpose-tied fields only show
 * once a purpose filter is selected, and only for that purpose.
 *
 * Used by:
 * - EnquiriesFilters
 */
export function getVisibleAdditionalFields(fields, enquiryPurpose) {
    return fields.filter((f) => {
        if (!f.connectWithLeadPurpose)
            return true;
        if (!enquiryPurpose)
            return false;
        return f.purposeId === enquiryPurpose;
    });
}
//# sourceMappingURL=leadFilterFields.js.map