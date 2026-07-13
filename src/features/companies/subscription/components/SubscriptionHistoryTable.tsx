import { Table, THead, TBody, TRow, TCell, EmptyState } from '../../../../shared/components/table';
import SubscriptionHistoryRow from './SubscriptionHistoryRow';
import type { SubscriptionHistoryTableProps } from '../types/component.types';

const COLUMN_COUNT = 8;

const SubscriptionHistoryTable = ({ history, isLoading }: SubscriptionHistoryTableProps) => (
  <div className="card subscription-history-card">
    <div className="card-header">
      <h5>Subscription History</h5>
    </div>
    <div className="card-body">
      <div className="table-container">
        <Table>
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
              history.map((entry) => <SubscriptionHistoryRow key={entry.id} entry={entry} />)
            )}
          </TBody>
        </Table>
      </div>
    </div>
  </div>
);

export default SubscriptionHistoryTable;
