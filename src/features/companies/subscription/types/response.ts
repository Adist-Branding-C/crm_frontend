export interface SubscriptionCompanyRef {
  companyId: string;
  name: string;
}

export interface SubscriptionApiItem {
  id: string;
  companyId: string;
  validFrom: string;
  validUpto: string;
  durationInDays: number;
  staffCount: number;
  perStaffPrice: number;
  totalPrice: number;
  status: string;
  remark: string | null;
  createdAt: string;
  updatedAt: string;
  company?: SubscriptionCompanyRef;
}

export interface SubscriptionHistoryApiItem {
  id: string;
  companyId: string;
  previousStatus: string | null;
  newStatus: string;
  validFrom: string;
  validUpto: string;
  durationInDays: number;
  staffCount: number;
  perStaffPrice: number;
  totalPrice: number;
  remark: string | null;
  action: string;
  createdAt: string;
}

export interface RenewalQueueApiItem {
  id: string;
  companyId: string;
  renewalDate: string;
  staffCount: number;
  isActive: boolean;
  validFrom: string;
  validUpto: string;
  durationInDays: number;
  perStaffPrice: number;
  totalPrice: number;
  immediate: boolean;
  createdAt: string;
}
