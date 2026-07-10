import { COLUMNS } from '../constants';
import type { Lead } from '../types';
import type { Column } from '../../../shared/types/table';

/**
 * Builds the full leads-table column list: the fixed COLUMNS plus one dynamic
 * column per distinct additional-field name present across the given leads.
 *
 * Used by:
 * - EnquiriesPage (table header and row rendering)
 */
export function getLeadColumns(leads: Lead[]): Column[] {
  const fieldNames = new Set<string>();
  for (const lead of leads) {
    for (const field of lead.additionalFields) {
      fieldNames.add(field.name);
    }
  }
  const dynamicColumns: Column[] = Array.from(fieldNames).map(name => ({ key: name, label: name }));
  return [...COLUMNS, ...dynamicColumns];
}
