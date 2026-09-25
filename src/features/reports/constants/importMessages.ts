import type { ImportMasterNotCreatableReason } from '../types';

/**
 * User-facing copy for the pre-import review step. Counts are pluralised here so
 * the components stay render-only.
 */
const plural = (count: number, singular: string, pluralForm: string): string =>
  count === 1 ? singular : pluralForm;

export const IMPORT_MESSAGES = {
  missingMaster: (count: number, columnLabel: string, value: string): string =>
    `${count} ${plural(count, 'lead has', 'leads have')} ${columnLabel} '${value}' which does not exist. Would you like to create it?`,

  inactiveMaster: (count: number, columnLabel: string, value: string): string =>
    `${count} ${plural(count, 'lead uses', 'leads use')} ${columnLabel} '${value}', which is inactive. ${plural(count, 'It', 'They')} will be skipped — reactivate it and upload again to import ${plural(count, 'it', 'them')}.`,

  invalidField: (count: number, field: string): string =>
    `${count} ${plural(count, 'record has', 'records have')} invalid ${field} and will be skipped.`,

  warning: (count: number, message: string): string =>
    `${count} ${plural(count, 'row', 'rows')}: ${message}`,

  createChoice: (value: string): string => `Create '${value}' and import these leads`,
  skipChoice: 'Skip these leads',

  readySummary: (ready: number, pending: number, unfixable: number): string =>
    `${ready} ready to import · ${pending} waiting on a new value · ${unfixable} will be skipped`,

  notCreatable: (reason: ImportMasterNotCreatableReason | null, max: number): string => {
    switch (reason) {
      case 'NOT_ADMIN':
        return 'Only admins can create new values. These leads will be skipped.';
      case 'TOO_MANY_NEW_VALUES':
        return `This sheet has more than ${max} new values of this type. Fix the file, or these leads will be skipped.`;
      case 'VALUE_TOO_LONG':
        return 'This value is longer than 255 characters. These leads will be skipped.';
      default:
        return 'This value cannot be created from an import. These leads will be skipped.';
    }
  },

  nothingToImport: 'None of the rows in this file can be imported. Fix the file and upload it again.',
  truncated: 'Only the most frequent issues are listed. Fix these and upload again to see the rest.',
  exampleRow: (row: number, value: string | null): string =>
    `Example: row ${row}${value ? ` — "${value}"` : ''}`,
} as const;

export const IMPORT_REVIEW_TITLES = {
  missing: 'New values found',
  inactive: 'Inactive values',
  invalid: 'Rows that will be skipped',
  warnings: 'Heads up',
} as const;
