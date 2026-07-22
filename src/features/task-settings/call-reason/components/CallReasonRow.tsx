import { memo } from 'react';
import CallReasonActions from './CallReasonActions';
import SettingsStatusBadge from '../../../../shared/components/settings/SettingsStatusBadge';
import { TRow, TCell } from '../../../../shared/components/table';
import type { CallReasonRowProps } from '../types/index';

/**
 * Renders a single call-reason table row; memoized since the list can re-render often while
 * only one row's data actually changes. Purely presentational — click handling is delegated to
 * the parent via onEdit/onDelete/onToggleDropdown.
 */
const CallReasonRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CallReasonRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.name || '-'}</TCell>
    <TCell>
      <SettingsStatusBadge status={item.status} />
    </TCell>
    <TCell>
      <CallReasonActions
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </TCell>
  </TRow>
);

export default memo(CallReasonRow);
