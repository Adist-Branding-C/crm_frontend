import { useState } from 'react';
import { Users, DollarSign, Calendar, Edit2, RefreshCcw, Ban, XOctagon } from 'lucide-react';
import { renderBadge } from '../../../../shared/utils/badgeUtils';
import { formatFollowUpDate } from '../../../../shared/utils/dateUtils';
import AdminConfirmationModal from '../../../../shared/components/crud/AdminConfirmationModal';
import StatCard from '../../../../shared/components/StatCard';
import EditStaffCountModal from './EditStaffCountModal';
import UpdateSubscriptionStatusModal from './UpdateSubscriptionStatusModal';
import { getDaysRemainingLabel } from '../utils/subscriptionDate.util';
import type { SubscriptionOverviewCardProps, CancelAction } from '../types/component.types';

const SubscriptionOverviewCard = ({ subscription, isSaving, error, onClearError, onUpdateStaffCount, onUpdateStatus, onCancelSubscription }: SubscriptionOverviewCardProps) => {
  const [showStaffCountModal, setShowStaffCountModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [cancelAction, setCancelAction] = useState<CancelAction>(null);

  const handleConfirmCancel = async () => {
    if (!cancelAction) return;
    const success = await onCancelSubscription({ mode: cancelAction === 'thisMonth' ? 'ThisMonth' : 'Spot' });
    if (success) setCancelAction(null);
  };

  return (
    <div className="card subscription-overview-card">
      <div className="card-header">
        <h5>Current Subscription</h5>
        <span className={renderBadge(subscription.status)}>{subscription.status}</span>
      </div>
      <div className="card-body">
        {subscription.status === 'Expired' && (
          <div className="alert alert-danger">This company's subscription has expired.</div>
        )}

        <div className="subscription-stats-grid">
          <StatCard icon={Users} iconColor="#8b5cf6" iconBackground="#8b5cf620" value={subscription.staffCount} label="Staff Seats" />
          <StatCard icon={DollarSign} iconColor="#10b981" iconBackground="#10b98120" value={`₹${subscription.totalPrice.toLocaleString()}`} label="Total Price" />
          <StatCard icon={Calendar} iconColor="#3b82f6" iconBackground="#3b82f620" value={getDaysRemainingLabel(subscription.validUpto, subscription.status)} label="Valid Until" />
        </div>

        <div className="detail-grid">
          <div className="detail-item"><label>Valid From</label><span>{formatFollowUpDate(subscription.validFrom)}</span></div>
          <div className="detail-item"><label>Valid Upto</label><span>{formatFollowUpDate(subscription.validUpto)}</span></div>
          <div className="detail-item"><label>Duration (days)</label><span>{subscription.durationInDays}</span></div>
          <div className="detail-item"><label>Per-Staff Price</label><span>₹{subscription.perStaffPrice.toLocaleString()}</span></div>
          <div className="detail-item full-width"><label>Remark</label><span>{subscription.remark || '—'}</span></div>
        </div>

        <div className="subscription-actions">
          <button type="button" className="btn btn-secondary" onClick={() => setShowStaffCountModal(true)}>
            <Edit2 size={16} /> Edit Staff Count
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setShowStatusModal(true)}>
            <RefreshCcw size={16} /> Change Status
          </button>
          <button type="button" className="btn btn-danger" onClick={() => setCancelAction('thisMonth')}>
            <Ban size={16} /> Cancel This Month
          </button>
          <button type="button" className="btn btn-danger" onClick={() => setCancelAction('spot')}>
            <XOctagon size={16} /> Spot Cancel
          </button>
        </div>
      </div>

      <EditStaffCountModal
        isOpen={showStaffCountModal}
        subscription={subscription}
        isSaving={isSaving}
        error={error}
        onClearError={onClearError}
        onSubmit={async (values) => {
          const success = await onUpdateStaffCount(values);
          if (success) setShowStaffCountModal(false);
          return success;
        }}
        onClose={() => setShowStaffCountModal(false)}
      />

      <UpdateSubscriptionStatusModal
        isOpen={showStatusModal}
        subscription={subscription}
        isSaving={isSaving}
        error={error}
        onClearError={onClearError}
        onSubmit={async (values) => {
          const success = await onUpdateStatus(values);
          if (success) setShowStatusModal(false);
          return success;
        }}
        onClose={() => setShowStatusModal(false)}
      />

      <AdminConfirmationModal
        isOpen={cancelAction !== null}
        title={cancelAction === 'thisMonth' ? 'Cancel This Month' : 'Spot Cancel Subscription'}
        message={
          cancelAction === 'thisMonth'
            ? 'This cancels the current billing period immediately. If a renewal is scheduled in the queue, it will be applied right away so the next period starts now instead of waiting.'
            : 'This cancels the subscription immediately AND removes any scheduled renewal from the queue. No further renewal will occur.'
        }
        confirmText={cancelAction === 'thisMonth' ? 'Cancel This Month' : 'Spot Cancel'}
        confirmButtonVariant="danger"
        isLoading={isSaving}
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelAction(null)}
      />
    </div>
  );
};

export default SubscriptionOverviewCard;
