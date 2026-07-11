interface Props {
  staffCount: number | '';
  perStaffPrice: number | '';
  label?: string;
}

/** Live-computed "{label}: ₹{total}" line, shared by every seat-pricing form in this module. */
const SubscriptionTotalPreview = ({ staffCount, perStaffPrice, label = 'Total' }: Props) => (
  <div className="subscription-total-preview">
    {label}: <strong>₹{((Number(staffCount) || 0) * (Number(perStaffPrice) || 0)).toLocaleString()}</strong>
  </div>
);

export default SubscriptionTotalPreview;
