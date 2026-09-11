import { useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import EscalationRuleRow from '../components/EscalationRuleRow';
import { useEscalationRules } from '../hooks/useEscalationRules';
import { useToast } from '../../../../shared/hooks/useToast';
import { SETTINGS_TABS } from '../../constants/index';
import { ESCALATION_PRIORITIES } from '../constants';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { EscalationRuleFormData } from '../types/request';
import './EscalationRules.css';

/**
 * Task Settings > Escalation Rules tab - the fixed High / Medium / Low SLA tiers
 * rendered as three editable rows (no create/delete). Each row is its own Formik
 * form saving through the useEscalationRules hook with toast feedback.
 */
const EscalationRulesPage = () => {
  const { rows, isLoading, error, updatingId, updateRow } = useEscalationRules();
  const toast = useToast();

  const handleSave = useCallback(
    async (id: number, payload: EscalationRuleFormData) => {
      const result = await updateRow(id, payload);
      toast.showToastMessage(result.message, result.success ? 'success' : 'error');
    },
    [updateRow, toast],
  );

  const orderedRows = rows
    .slice()
    .sort(
      (a, b) =>
        ESCALATION_PRIORITIES.indexOf(a.priority) - ESCALATION_PRIORITIES.indexOf(b.priority),
    );

  return (
    <div className="task-settings-page">
      <PageHeader title="Task Settings" description="Manage task configurations and settings" />
      <SettingsTabs items={SETTINGS_TABS} />
      <div className="account-content">
        <div className="escalation-rules-wrapper">
          <div className="escalation-rules-head">
            <span>Priority</span>
            <span>Notify After</span>
            <span>Recipients</span>
            <span>Channels</span>
            <span />
          </div>

          {isLoading ? (
            <div className="escalation-rules-loading">
              <Loader2 size={24} className="spin" /> Loading escalation rules...
            </div>
          ) : error ? (
            <ErrorMessage message={error} />
          ) : orderedRows.length === 0 ? (
            <div className="escalation-rules-empty">No escalation rules configured.</div>
          ) : (
            orderedRows.map((row) => (
              <EscalationRuleRow
                key={row.id}
                row={row}
                isSaving={updatingId === row.id}
                onSave={(payload) => handleSave(row.id, payload)}
              />
            ))
          )}
        </div>
      </div>
      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />
    </div>
  );
};

export default EscalationRulesPage;