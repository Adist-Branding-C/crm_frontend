import { useCallback, useEffect, useState } from 'react';
import { escalationRulesApiService } from '../services';
import type { EscalationRuleItem } from '../types/interface';
import type { EscalationRuleFormData } from '../types/request';

interface UpdateResult {
  success: boolean;
  message: string;
}

/**
 * Owns the task SLA escalation rule data on the Escalation Rules settings page -
 * loads the fixed 3 priority tiers on mount and updates a single tier on save.
 *
 * Used by:
 * - EscalationRulesPage.
 *
 * Notes:
 * - The update is intentionally row-scoped (updatingId tracks which tier is saving)
 *   so the page can disable just that row's Save button.
 * - Kept as a single hook because fetch and update share the same row state; there
 *   is no second consumer or distinct lifecycle to justify splitting it.
 */
export function useEscalationRules() {
  const [rows, setRows] = useState<EscalationRuleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await escalationRulesApiService.fetchAll();
      if (response.status === false) {
        setError(response.message || 'Failed to load escalation rules');
        return;
      }
      setRows(response.data ?? []);
    } catch {
      setError('Failed to load escalation rules');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const updateRow = useCallback(
    async (id: number, data: EscalationRuleFormData): Promise<UpdateResult> => {
      setUpdatingId(id);
      try {
        const response = await escalationRulesApiService.update(id, data);
        if (response.data) {
          setRows((prev) =>
            prev.map((row) => (row.id === id ? { ...row, ...response.data! } : row)),
          );
        }
        return {
          success: response.status !== false,
          message: response.message || 'Escalation rule updated successfully',
        };
      } catch {
        return { success: false, message: 'Failed to update escalation rule. Please try again.' };
      } finally {
        setUpdatingId(null);
      }
    },
    [],
  );

  return { rows, isLoading, error, updatingId, updateRow, reload };
}