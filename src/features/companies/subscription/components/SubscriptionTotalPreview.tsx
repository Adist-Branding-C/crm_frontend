import type { SubscriptionTotalPreviewProps } from '../types/component.types';
import { calculateTotalPrice } from '../utils/subscriptionPricing.util';

/** Live-computed "{label}: ₹{total}" line, shared by every seat-pricing form in this module. */
const SubscriptionTotalPreview = ({ staffCount, perStaffPrice, durationInDays, label = 'Total' }: SubscriptionTotalPreviewProps) => (
  <div className="subscription-total-preview">
    {label}: <strong>₹{calculateTotalPrice(Number(staffCount) || 0, Number(perStaffPrice) || 0, Number(durationInDays) || 0).toLocaleString()}</strong>
  </div>
);

export default SubscriptionTotalPreview;
