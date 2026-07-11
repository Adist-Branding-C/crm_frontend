import { Table, THead, TBody, TRow, TCell, EmptyState } from '../../../../shared/components/table';
import { formatDateTime } from '../../../../shared/utils/dateUtils';
import { renderBadge } from '../../../../shared/utils/badgeUtils';
import type { SubscriptionHistoryEntry } from '../types';

interface Props {
  history: SubscriptionHistoryEntry[];
  isLoading: boolean;
}

const COLUMN_COUNT = 8;

const SubscriptionHistoryTable = ({ history, isLoading }: Props) => (
  <div className="card subscription-history-card">
    <div className="card-header">
      <h5>Subscription History</h5>
    </div>
    <div className="card-body">
      <div className="table-container">
        <Table wrapperClassName="table-scroll" className="data-table">
          <THead>
            <TRow>
              <TCell variant="th">Action</TCell>
              <TCell variant="th">Previous Status</TCell>
              <TCell variant="th">New Status</TCell>
              <TCell variant="th">Valid From</TCell>
              <TCell variant="th">Valid Upto</TCell>
              <TCell variant="th">Staff Count</TCell>
              <TCell variant="th">Total Price</TCell>
              <TCell variant="th">Date</TCell>
            </TRow>
          </THead>
          <TBody>
            {isLoading ? (
              <EmptyState colSpan={COLUMN_COUNT} message="Loading..." />
            ) : history.length === 0 ? (
              <EmptyState colSpan={COLUMN_COUNT} message="No history yet" />
            ) : (
              history.map((entry) => (
                <TRow key={entry.id}>
                  <TCell>{entry.action}</TCell>
                  <TCell>{entry.previousStatus ? <span className={renderBadge(entry.previousStatus)}>{entry.previousStatus}</span> : '—'}</TCell>
                  <TCell><span className={renderBadge(entry.newStatus)}>{entry.newStatus}</span></TCell>
                  <TCell>{formatDateTime(entry.validFrom)}</TCell>
                  <TCell>{formatDateTime(entry.validUpto)}</TCell>
                  <TCell>{entry.staffCount}</TCell>
                  <TCell>₹{entry.totalPrice.toLocaleString()}</TCell>
                  <TCell>{formatDateTime(entry.createdAt)}</TCell>
                </TRow>
              ))
            )}
          </TBody>
        </Table>
      </div>
    </div>
  </div>
);

export default SubscriptionHistoryTable;
