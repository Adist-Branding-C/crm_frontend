import { useState } from 'react';
import { Users, DollarSign, Calendar, Edit2, RefreshCcw } from 'lucide-react';
import { renderBadge } from '../../../../shared/utils/badgeUtils';
import { formatFollowUpDate } from '../../../../shared/utils/dateUtils';
import EditStaffCountModal from './EditStaffCountModal';
import UpdateSubscriptionStatusModal from './UpdateSubscriptionStatusModal';
import type { SubscriptionDetail } from '../types';
import type { UpdateStaffCountPayload, UpdateSubscriptionStatusPayload } from '../types/request';

interface Props {
  subscription: SubscriptionDetail;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onUpdateStaffCount: (payload: UpdateStaffCountPayload) => Promise<boolean>;
  onUpdateStatus: (payload: UpdateSubscriptionStatusPayload) => Promise<boolean>;
}

function getDaysRemainingLabel(validUpto: string): string {
  const diffDays = Math.ceil((new Date(validUpto).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diffDays > 0) return `${diffDays} day${diffDays === 1 ? '' : 's'} remaining`;
  if (diffDays === 0) return 'Expires today';
  return `Expired ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago`;
}

const SubscriptionOverviewCard = ({ subscription, isSaving, error, onClearError, onUpdateStaffCount, onUpdateStatus }: Props) => {
  const [showStaffCountModal, setShowStaffCountModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <div className="card subscription-overview-card">
      <div className="card-header">
        <h5>Current Subscription</h5>
        <span className={renderBadge(subscription.status)}>{subscription.status}</span>
      </div>
      <div className="card-body">
        <div className="subscription-stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#8b5cf620' }}><Users size={20} color="#8b5cf6" /></div>
            <div className="stat-info">
              <span className="stat-label">Staff Seats</span>
              <span className="stat-value">{subscription.staffCount}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#10b98120' }}><DollarSign size={20} color="#10b981" /></div>
            <div className="stat-info">
              <span className="stat-label">Total Price</span>
              <span className="stat-value">₹{subscription.totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#3b82f620' }}><Calendar size={20} color="#3b82f6" /></div>
            <div className="stat-info">
              <span className="stat-label">Valid Until</span>
              <span className="stat-value">{getDaysRemainingLabel(subscription.validUpto)}</span>
            </div>
          </div>
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
    </div>
  );
};

export default SubscriptionOverviewCard;
