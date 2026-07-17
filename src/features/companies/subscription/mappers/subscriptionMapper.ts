import type { SubscriptionApiItem, SubscriptionHistoryApiItem, RenewalQueueApiItem } from '../types/response';
import type { SubscriptionDetail, SubscriptionHistoryEntry, RenewalQueueEntry } from '../types';

export function mapSubscriptionApiToUI(item: SubscriptionApiItem): SubscriptionDetail {
  return {
    id: item.id,
    companyId: item.companyId,
    validFrom: item.validFrom,
    validUpto: item.validUpto,
    durationInDays: item.durationInDays,
    staffCount: item.staffCount,
    perStaffPrice: item.perStaffPrice,
    totalPrice: item.totalPrice,
    status: item.status,
    remark: item.remark ?? '',
    createdAt: item.createdAt,
  };
}

export function mapHistoryApiToUI(item: SubscriptionHistoryApiItem): SubscriptionHistoryEntry {
  return {
    id: item.id,
    previousStatus: item.previousStatus ?? '',
    newStatus: item.newStatus,
    action: item.action,
    validFrom: item.validFrom,
    validUpto: item.validUpto,
    staffCount: item.staffCount,
    perStaffPrice: item.perStaffPrice,
    totalPrice: item.totalPrice,
    remark: item.remark ?? '',
    createdAt: item.createdAt,
  };
}

export function mapQueueApiToUI(item: RenewalQueueApiItem): RenewalQueueEntry {
  return {
    id: item.id,
    renewalDate: item.renewalDate,
    validFrom: item.validFrom,
    validUpto: item.validUpto,
    durationInDays: item.durationInDays,
    staffCount: item.staffCount,
    perStaffPrice: item.perStaffPrice,
    totalPrice: item.totalPrice,
    immediate: item.immediate,
    isActive: item.isActive,
    createdAt: item.createdAt,
  };
}
