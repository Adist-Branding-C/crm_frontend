import { TRow, TCell } from '../../../../shared/components/table';
import { formatDateTime } from '../../../../shared/utils/dateUtils';
import { renderBadge } from '../../../../shared/utils/badgeUtils';
import type { SubscriptionHistoryRowProps } from '../types/component.types';

const SubscriptionHistoryRow = ({ entry }: SubscriptionHistoryRowProps) => (
  <TRow>
    <TCell>{entry.action}</TCell>
    <TCell>{entry.previousStatus ? <span className={renderBadge(entry.previousStatus)}>{entry.previousStatus}</span> : '—'}</TCell>
    <TCell><span className={renderBadge(entry.newStatus)}>{entry.newStatus}</span></TCell>
    <TCell>{formatDateTime(entry.validFrom)}</TCell>
    <TCell>{formatDateTime(entry.validUpto)}</TCell>
    <TCell>{entry.staffCount}</TCell>
    <TCell>₹{entry.totalPrice.toLocaleString()}</TCell>
    <TCell>{formatDateTime(entry.createdAt)}</TCell>
  </TRow>
);

export default SubscriptionHistoryRow;
