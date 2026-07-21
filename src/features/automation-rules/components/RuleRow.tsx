import { memo } from 'react';
import { Edit2, ScrollText, Trash2 } from 'lucide-react';
import { TRow, TCell } from '../../../shared/components/table';
import TriggerTypeBadge from './TriggerTypeBadge';
import RuleToggleSwitch from './RuleToggleSwitch';
import type { AutomationRule } from '../types';

interface RuleRowProps {
  rule: AutomationRule;
  isToggling: boolean;
  onToggle: (rule: AutomationRule) => void;
  onEdit: (rule: AutomationRule) => void;
  onViewLogs: (rule: AutomationRule) => void;
  onDelete: (rule: AutomationRule) => void;
}

const RuleRow = ({ rule, isToggling, onToggle, onEdit, onViewLogs, onDelete }: RuleRowProps) => (
  <TRow>
    <TCell>
      <div style={{ fontWeight: 600 }}>{rule.name}</div>
      {rule.description && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rule.description}</div>}
    </TCell>
    <TCell><TriggerTypeBadge triggerType={rule.triggerType} /></TCell>
    <TCell>
      <RuleToggleSwitch checked={rule.isActive} loading={isToggling} onChange={() => onToggle(rule)} />
    </TCell>
    <TCell>{new Date(rule.updatedAt).toLocaleDateString()}</TCell>
    <TCell>
      <div className="automation-row-actions">
        <button className="automation-icon-btn" title="Edit rule" onClick={() => onEdit(rule)}>
          <Edit2 size={16} />
        </button>
        <button className="automation-icon-btn" title="View execution logs" onClick={() => onViewLogs(rule)}>
          <ScrollText size={16} />
        </button>
        <button className="automation-icon-btn danger" title="Delete rule" onClick={() => onDelete(rule)}>
          <Trash2 size={16} />
        </button>
      </div>
    </TCell>
  </TRow>
);

export default memo(RuleRow);
