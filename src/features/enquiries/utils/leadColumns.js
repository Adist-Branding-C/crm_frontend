import { COLUMNS } from '../constants';
/**
 * Builds the full leads-table column list: the fixed COLUMNS plus one dynamic
 * column per distinct additional-field name present across the given leads.
 *
 * Used by:
 * - EnquiriesPage (table header and row rendering)
 */
export function getLeadColumns(leads) {
    const fieldNames = new Set();
    for (const lead of leads) {
        for (const field of lead.additionalFields) {
            fieldNames.add(field.name);
        }
    }
    const dynamicColumns = Array.from(fieldNames).map(name => ({ key: name, label: name }));
    return [...COLUMNS, ...dynamicColumns];
}
//# sourceMappingURL=leadColumns.js.map