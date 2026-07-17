import { memo } from 'react';
import CallStatusActions from './CallStatusActions';
import SettingsStatusBadge from '../../../../shared/components/settings/SettingsStatusBadge';
import { TRow, TCell } from '../../../../shared/components/table';
import type { CallStatusRowProps } from '../types/index';

const CallStatusRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CallStatusRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.name || '-'}</TCell>
    <TCell>
      <SettingsStatusBadge status={item.status} />
    </TCell>
    <TCell>
      <CallStatusActions
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </TCell>
  </TRow>
);

export default memo(CallStatusRow);
