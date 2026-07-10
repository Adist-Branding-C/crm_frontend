import { memo } from 'react';
import CallTaskActions from './CallTaskActions';
import StatusBadge from '../../../../shared/components/StatusBadge';
import { TRow, TCell } from '../../../../shared/components/table';
import type { CallTaskRowProps } from '../types/index';

const CallTaskRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CallTaskRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.title}</TCell>
    <TCell>{item.scheduledDate}</TCell>
    <TCell>{item.assignedTo?.name ?? '-'}</TCell>
    <TCell><StatusBadge value={item.priority} /></TCell>
    <TCell><StatusBadge value={item.status} /></TCell>
    <TCell>{item.lead?.name ?? '-'}</TCell>
    <TCell>
      <CallTaskActions
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </TCell>
  </TRow>
);

export default memo(CallTaskRow);
