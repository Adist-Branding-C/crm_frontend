import type { SubscriptionTotalPreviewProps } from '../types/component.types';

/** Live-computed "{label}: ₹{total}" line, shared by every seat-pricing form in this module. */
const SubscriptionTotalPreview = ({ staffCount, perStaffPrice, label = 'Total' }: SubscriptionTotalPreviewProps) => (
  <div className="subscription-total-preview">
    {label}: <strong>₹{((Number(staffCount) || 0) * (Number(perStaffPrice) || 0)).toLocaleString()}</strong>
  </div>
);

export default SubscriptionTotalPreview;
