import { useState, useCallback, useMemo } from 'react';
import { ImportValidationMapper } from '../mappers/importValidation.mapper';
import type { ImportMasterChoice, ImportMasterDecision, ImportValidationReport } from '../types';

/**
 * The user's create/skip choice per missing master value. Only overrides are stored; the
 * effective choice falls back to the report's default (create when creatable, else skip),
 * so a new report needs no state syncing.
 */
export function useImportDecisions(report: ImportValidationReport | null) {
  const [overrides, setOverrides] = useState<Record<string, ImportMasterChoice>>({});

  const choices = useMemo<Record<string, ImportMasterChoice>>(
    () => (report ? { ...ImportValidationMapper.defaultChoices(report), ...overrides } : {}),
    [report, overrides],
  );

  const createMasters = useMemo<ImportMasterDecision[]>(
    () => (report ? ImportValidationMapper.toCreateMasters(report, choices) : []),
    [report, choices],
  );

  const canContinue = useMemo(
    () => (report ? ImportValidationMapper.canImportAnything(report, choices) : false),
    [report, choices],
  );

  const setChoice = useCallback((key: string, choice: ImportMasterChoice) => {
    setOverrides((prev) => ({ ...prev, [key]: choice }));
  }, []);

  const reset = useCallback(() => setOverrides({}), []);

  return { choices, createMasters, canContinue, setChoice, reset };
}
