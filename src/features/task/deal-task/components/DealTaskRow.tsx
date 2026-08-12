import { memo } from 'react';
import { TRow, TCell } from '../../../../shared/components/table';
import StatusBadge from '../../../../shared/components/StatusBadge';
import RowActions from '../../common/components/RowActions';
import { formatTime12hr } from '../../../../shared/utils/dateUtils';
import type { DealTaskItem } from '../types';

interface DealTaskRowProps {
  item: DealTaskItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DealTaskItem) => void;
  onDelete: (item: DealTaskItem) => void;
}

/**
 * Same layout as the shared TaskItemRow, but the association column shows the
 * linked deal instead of a lead — Deal Task has no lead of its own.
 * Falls back to `leadId` (today's actual API field for this association) until
 * the backend deploys `dealId` under its own name.
 */
const DealTaskRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: DealTaskRowProps) => (
  <TRow>
    <TCell>{index}</TCell>
    <TCell>{item.title}</TCell>
    <TCell className="truncate-cell"><span title={item.description}>{item.description}</span></TCell>
    <TCell>{item.scheduledDate}</TCell>
    <TCell>{formatTime12hr(item.scheduledTime)}</TCell>
    <TCell>{item.assignedTo?.name ?? '-'}</TCell>
    <TCell>{item.assignedBy?.name ?? '-'}</TCell>
    <TCell><StatusBadge value={item.priority} /></TCell>
    <TCell><StatusBadge value={item.status} /></TCell>
    <TCell>{item.dealId?.title ?? item.leadId?.name ?? '-'}</TCell>
    <TCell>
      <RowActions item={item} dropdownOpen={dropdownOpen} onToggleDropdown={onToggleDropdown} onEdit={onEdit} onDelete={onDelete} />
    </TCell>
  </TRow>
);

export default memo(DealTaskRow);
