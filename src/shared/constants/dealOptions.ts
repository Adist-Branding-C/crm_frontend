export const DEAL_STATUS_OPTIONS = [
  { value: 'win', label: 'Deal Win' },
  { value: 'lost', label: 'Deal Lost' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'pending', label: 'Pending' },
];

export const DEAL_STATUS_MAP: Record<string, string> = {
  win: 'deal-win',
  lost: 'deal-lost',
  invoice: 'deal-invoice',
  pending: 'deal-pending',
};

export const DEAL_STATUS_LABEL_MAP: Record<string, string> = {
  win: 'Deal Win',
  lost: 'Deal Lost',
  invoice: 'Invoice',
  pending: 'Pending',
};

export const DEAL_TYPE_OPTIONS = [
  { value: 'sales', label: 'Sales' },
  { value: 'registration', label: 'Registration' },
  { value: 'renewal', label: 'Renewal' },
  { value: 'upsell', label: 'Upsell' },
];

export const DEAL_TYPE_MAP: Record<string, string> = {
  sales: 'type-sales',
  registration: 'type-registration',
  renewal: 'type-renewal',
  upsell: 'type-upsell',
};

export const DEAL_TYPE_LABEL_MAP: Record<string, string> = {
  sales: 'Sales',
  registration: 'Registration',
  renewal: 'Renewal',
  upsell: 'Upsell',
};
