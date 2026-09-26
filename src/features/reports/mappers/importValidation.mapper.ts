import type {
  ImportMasterChoice,
  ImportMasterDecision,
  ImportMasterEntity,
  ImportValidationReport,
} from '../types';

/**
 * Pure helpers turning the server's pre-validation report into what the review
 * step needs (decision keys, defaults, the createMasters payload). The server
 * re-validates everything on confirm, so none of this is a security boundary.
 */
export class ImportValidationMapper {
  static masterKey(entity: ImportMasterEntity, value: string): string {
    return `${entity}:${value.trim().toLowerCase()}`;
  }

  static hasIssues(report: ImportValidationReport): boolean {
    return (
      report.missingMasters.length > 0 ||
      report.inactiveMasters.length > 0 ||
      report.invalidFields.length > 0 ||
      report.warnings.length > 0
    );
  }

  /** Creatable values default to "create" (the task's Confirm); everything else is skip-only. */
  static defaultChoices(report: ImportValidationReport): Record<string, ImportMasterChoice> {
    const choices: Record<string, ImportMasterChoice> = {};
    for (const item of report.missingMasters) {
      choices[ImportValidationMapper.masterKey(item.entity, item.value)] = item.creatable ? 'create' : 'skip';
    }
    return choices;
  }

  static toCreateMasters(
    report: ImportValidationReport,
    choices: Record<string, ImportMasterChoice>,
  ): ImportMasterDecision[] {
    return report.missingMasters
      .filter((item) => item.creatable && choices[ImportValidationMapper.masterKey(item.entity, item.value)] === 'create')
      .map((item) => ({ entity: item.entity, value: item.value }));
  }

  /** False only when it is certain that no row can be imported. */
  static canImportAnything(report: ImportValidationReport, choices: Record<string, ImportMasterChoice>): boolean {
    return report.readyRows > 0 || ImportValidationMapper.toCreateMasters(report, choices).length > 0;
  }
}
