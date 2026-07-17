import { memo } from 'react';
import MeetingOutcomeActions from './MeetingOutcomeActions';
import SettingsStatusBadge from '../../../../shared/components/settings/SettingsStatusBadge';
import { TRow, TCell } from '../../../../shared/components/table';
import type { MeetingOutcomeRowProps } from '../types/index';

const MeetingOutcomeRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: MeetingOutcomeRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.name || '-'}</TCell>
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
