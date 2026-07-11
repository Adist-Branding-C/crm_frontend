import { useState } from 'react';
import { CalendarPlus, Edit2, XCircle, Zap } from 'lucide-react';
import AdminConfirmationModal from '../../../../shared/components/crud/AdminConfirmationModal';
import { formatFollowUpDate } from '../../../../shared/utils/dateUtils';
import RenewalQueueFormModal from './RenewalQueueFormModal';
import type { RenewalQueueFormValues } from './RenewalQueueFormModal';
import type { RenewalQueueEntry } from '../types';
import type { CreateRenewalQueuePayload, UpdateRenewalQueuePayload } from '../types/request';

interface Props {
  companyId: string;
  queue: RenewalQueueEntry | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onCreate: (payload: CreateRenewalQueuePayload) => Promise<boolean>;
  onUpdate: (payload: UpdateRenewalQueuePayload) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
  onApplyNow: () => Promise<boolean>;
}

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

const RenewalQueueSection = ({ companyId, queue, isLoading, isSaving, error, onClearError, onCreate, onUpdate, onDelete, onApplyNow }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'delete' | 'apply' | null>(null);

  const handleFormSubmit = async (values: RenewalQueueFormValues): Promise<boolean> => {
    const durationInDays = Number(values.durationInDays);
    const staffCount = Number(values.staffCount);
    const perStaffPrice = Number(values.perStaffPrice);
    const validUpto = addDays(values.validFrom, durationInDays);

    const success = queue
      ? await onUpdate({
          renewalDate: new Date(values.renewalDate).toISOString(),
          validFrom: new Date(values.validFrom).toISOString(),
          validUpto,
          durationInDays,
          staffCount,
          perStaffPrice,
          immediate: values.immediate,
        })
      : await onCreate({
          companyId,
          renewalDate: new Date(values.renewalDate).toISOString(),
          validFrom: new Date(values.validFrom).toISOString(),
          validUpto,
          durationInDays,
          staffCount,
          perStaffPrice,
          immediate: values.immediate,
        });

    if (success) setShowForm(false);
    return success;
  };

  const handleConfirm = async () => {
    const success = confirmAction === 'delete' ? await onDelete() : confirmAction === 'apply' ? await onApplyNow() : false;
    if (success) setConfirmAction(null);
  };

  if (isLoading) {
    return (
      <div className="card subscription-renewal-card">
        <div className="card-header"><h5>Renewal Queue</h5></div>
        <div className="card-body"><p className="subscription-empty-hint">Loading...</p></div>
      </div>
    );
  }

  return (
    <div className="card subscription-renewal-card">
      <div className="card-header">
        <h5>Renewal Queue</h5>
        {!queue && (
          <button type="button" className="btn btn-secondary" onClick={() => setShowForm(true)}>
            <CalendarPlus size={16} /> Schedule Renewal
          </button>
        )}
      </div>
      <div className="card-body">
        {queue ? (
          <>
            <div className="detail-grid">
              <div className="detail-item"><label>Renewal Date</label><span>{formatFollowUpDate(queue.renewalDate)}</span></div>
              <div className="detail-item"><label>New Valid From</label><span>{formatFollowUpDate(queue.validFrom)}</span></div>
              <div className="detail-item"><label>New Valid Upto</label><span>{formatFollowUpDate(queue.validUpto)}</span></div>
              <div className="detail-item"><label>New Staff Count</label><span>{queue.staffCount}</span></div>
              <div className="detail-item"><label>New Per-Staff Price</label><span>₹{queue.perStaffPrice.toLocaleString()}</span></div>
              <div className="detail-item"><label>New Total Price</label><span>₹{queue.totalPrice.toLocaleString()}</span></div>
            </div>
            <div className="subscription-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(true)}>
                <Edit2 size={16} /> Edit
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setConfirmAction('apply')}>
                <Zap size={16} /> Apply Now
              </button>
              <button type="button" className="btn btn-danger" onClick={() => setConfirmAction('delete')}>
                <XCircle size={16} /> Cancel Schedule
              </button>
            </div>
          </>
        ) : (
          <p className="subscription-empty-hint">No renewal scheduled for this company.</p>
        )}
      </div>

      <RenewalQueueFormModal
        isOpen={showForm}
        editingQueue={queue}
        isSaving={isSaving}
        error={error}
        onClearError={onClearError}
        onSubmit={handleFormSubmit}
        onClose={() => setShowForm(false)}
      />

      <AdminConfirmationModal
        isOpen={confirmAction !== null}
        title={confirmAction === 'delete' ? 'Cancel Scheduled Renewal' : 'Apply Renewal Now'}
        message={
          confirmAction === 'delete'
            ? 'Are you sure you want to cancel this scheduled renewal?'
            : 'Apply this renewal to the subscription right now instead of waiting for the renewal date?'
        }
        confirmText={confirmAction === 'delete' ? 'Cancel Schedule' : 'Apply Now'}
        confirmButtonVariant={confirmAction === 'delete' ? 'danger' : 'primary'}
        isLoading={isSaving}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
};

export default RenewalQueueSection;
