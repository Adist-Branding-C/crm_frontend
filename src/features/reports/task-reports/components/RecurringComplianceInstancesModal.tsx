import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from '../../../../shared/components/Modal';
import {
  Table,
  THead,
  TBody,
  TRow,
  TCell,
  EmptyState,
  Pagination,
} from '../../../../shared/components/table';
import { RECURRING_STATUS_META } from '../constants/recurringCompliance.data';
import { useTaskRecurringComplianceInstances } from '../hooks/useTaskRecurringComplianceInstances';
import RecurringTaskInstanceRow from './RecurringTaskInstanceRow';
import {
  formatExpectedActual,
  getComplianceTone,
} from '../utils/recurringCompliance.util';
import type { RecurringTaskComplianceRow as RecurringTaskChain } from '../types';

const DEFAULT_PAGE_SIZE = 10;

const INSTANCE_COLUMNS = [
  { key: 'dueDate', label: 'Due Date' },
  { key: 'completedAt', label: 'Completed At' },
  { key: 'status', label: 'Status' },
  { key: 'regeneratedNext', label: 'Regenerated Next?' },
];

interface RecurringComplianceInstancesModalProps {
  isOpen: boolean;
  chain: RecurringTaskChain | null;
  onClose: () => void;
}

/**
 * Drill-down modal for the Recurring Task Compliance report. Shows one recurring
 * chain's instance-level history (Due Date, Completed At, Status, Regenerated
 * Next?) with its own pagination.
 *
 * Used by:
 * - TaskRecurringComplianceReport
 */
const RecurringComplianceInstancesModal = ({
  isOpen,
  chain,
  onClose,
}: RecurringComplianceInstancesModalProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    instances,
    pagination,
    isLoading,
    error,
    fetchInstances,
  } = useTaskRecurringComplianceInstances();

  useEffect(() => {
    if (!isOpen || !chain) return;
    setPageNumber(1);
  }, [isOpen, chain]);

  useEffect(() => {
    if (!isOpen || !chain) return;
    fetchInstances({ taskId: chain.taskId, pageNumber, limit: DEFAULT_PAGE_SIZE });
  }, [isOpen, chain, pageNumber, fetchInstances]);

  if (!isOpen || !chain) return null;

  const statusMeta = RECURRING_STATUS_META[chain.status] ?? RECURRING_STATUS_META.broken;
  const tone = getComplianceTone(chain.complianceRate);

  return (
    <Modal isOpen onClose={onClose} title={chain.taskName} maxWidth="760px">
      <div className="recurring-chain-summary">
        <span className="recurring-summary-chip">
          Expected / Actual
          <strong>{formatExpectedActual(chain)}</strong>
        </span>
        <span className="recurring-summary-chip">
          Compliance Rate
          <strong className={`recurring-compliance-rate tone-${tone}`}>
            {chain.complianceRate}%
          </strong>
        </span>
        <span className="recurring-summary-chip">
          Status
          <strong>
            <span className={`status-badge recurring-status-badge ${statusMeta.className}`}>
              {statusMeta.emoji} {statusMeta.label}
            </span>
          </strong>
        </span>
      </div>

      <div className="table-container">
        <Table wrapperClassName="table-scroll" className="enquiries-table">
          <THead>
            <TRow>
              {INSTANCE_COLUMNS.map((col) => (
                <TCell key={col.key} variant="th">
                  {col.label}
                </TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {!isLoading && instances.length === 0 ? (
              <EmptyState colSpan={INSTANCE_COLUMNS.length} message="No instances for this recurring chain" />
            ) : (
              instances.map((row) => (
                <RecurringTaskInstanceRow key={row.instanceId} row={row} />
              ))
            )}
          </TBody>
        </Table>

        {isLoading && (
          <div className="table-loading">
            <Loader2 size={24} className="spin" /> Loading...
          </div>
        )}

        {error && !isLoading && <div className="report-load-error">{error}</div>}
      </div>

      {pagination && pagination.total > 0 && !isLoading && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.total_pages}
          totalItems={pagination.total}
          rowsPerPage={pagination.limit}
          onPageChange={setPageNumber}
        />
      )}
    </Modal>
  );
};

export default RecurringComplianceInstancesModal;