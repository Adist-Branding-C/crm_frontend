import { memo } from 'react';
import MeetingOutcomeActions from './MeetingOutcomeActions';
import CreatedByCell from '../../components/CreatedByCell';
import SettingsStatusBadge from '../../../../shared/components/settings/SettingsStatusBadge';
import { TRow, TCell } from '../../../../shared/components/table';
import type { MeetingOutcomeRowProps } from '../types/index';

/**
 * Renders a single meeting-outcome table row; memoized since the list can re-render often while
 * only one row's data actually changes. Purely presentational — click handling is delegated to
 * the parent via onEdit/onDelete/onToggleDropdown.
 */
const MeetingOutcomeRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: MeetingOutcomeRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.name || '-'}</TCell>
    <CreatedByCell createdByName={item.createdByName} />
    <TCell>
      <SettingsStatusBadge status={item.status} />
    </TCell>
    <TCell>
      <MeetingOutcomeActions
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </TCell>
  </TRow>
);

export default memo(MeetingOutcomeRow);
