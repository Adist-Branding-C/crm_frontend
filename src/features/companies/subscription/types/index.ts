export interface SubscriptionDetail {
  id: string;
  companyId: string;
  validFrom: string;
  validUpto: string;
  durationInDays: number;
  staffCount: number;
  perStaffPrice: number;
  totalPrice: number;
  status: string;
  remark: string;
  createdAt: string;
}

export interface SubscriptionHistoryEntry {
  id: string;
  previousStatus: string;
  newStatus: string;
  action: string;
  validFrom: string;
  validUpto: string;
  staffCount: number;
  perStaffPrice: number;
  totalPrice: number;
  remark: string;
  createdAt: string;
}

export interface RenewalQueueEntry {
  id: string;
  renewalDate: string;
  validFrom: string;
  validUpto: string;
  durationInDays: number;
  staffCount: number;
  perStaffPrice: number;
  totalPrice: number;
  immediate: boolean;
  isActive: boolean;
  createdAt: string;
}
