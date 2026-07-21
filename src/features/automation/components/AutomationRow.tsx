import { memo } from 'react';
import { TRow, TCell, RowActionsMenu } from '../../../shared/components/table';
import { AUTOMATION_TRIGGER_TYPE_LABEL } from '../constants';
import { formatDisplayDate, getTriggerTypeBadgeClass } from '../utils/automation.utils';
import type { AutomationRowProps } from '../types';

const AutomationRow = ({ automation, dropdownOpen, onToggleDropdown, onEdit, onDelete, onToggleStatus }: AutomationRowProps) => (
  <TRow>
    <TCell>{automation.slNo}</TCell>
    <TCell>{automation.name}</TCell>
    <TCell>
      <span className={getTriggerTypeBadgeClass(automation.triggerType)}>
        {AUTOMATION_TRIGGER_TYPE_LABEL[automation.triggerType]}
      </span>
    </TCell>
    <TCell>{formatDisplayDate(automation.createdAt)}</TCell>
    <TCell>
      <label className="toggle-switch" title={automation.isActive ? 'Active' : 'Inactive'}>
        <input
          type="checkbox"
          checked={automation.isActive}
          onChange={() => onToggleStatus(automation)}
        />
        <span className="toggle-slider" />
      </label>
    </TCell>
    <TCell>
      <RowActionsMenu
        isOpen={dropdownOpen === automation.id}
        onToggle={(open) => onToggleDropdown(open ? automation.id : null)}
        onEdit={() => onEdit(automation)}
        onDelete={() => onDelete(automation)}
      />
    </TCell>
  </TRow>
);

export default memo(AutomationRow);
