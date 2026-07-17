import { addDays } from '../utils/subscriptionDate.util';
import type { CreateSubscriptionPayload, CreateRenewalQueuePayload, UpdateRenewalQueuePayload } from '../types/request';
import type { AssignSubscriptionFormValues, RenewalQueueFormValues } from '../types/component.types';

export function mapAssignFormToPayload(companyId: string, values: AssignSubscriptionFormValues): CreateSubscriptionPayload {
  const durationInDays = Number(values.durationInDays);
  const staffCount = Number(values.staffCount);
  const perStaffPrice = Number(values.perStaffPrice);
  const payload: CreateSubscriptionPayload = {
    companyId,
    validFrom: new Date(values.validFrom).toISOString(),
    validUpto: addDays(values.validFrom, durationInDays),
    durationInDays,
    staffCount,
    perStaffPrice,
    totalPrice: staffCount * perStaffPrice,
  };
  if (values.remark.trim()) payload.remark = values.remark.trim();
  return payload;
}

export function mapRenewalQueueFormToCreatePayload(companyId: string, values: RenewalQueueFormValues): CreateRenewalQueuePayload {
  const durationInDays = Number(values.durationInDays);
  const staffCount = Number(values.staffCount);
  const perStaffPrice = Number(values.perStaffPrice);
  return {
    companyId,
    renewalDate: new Date(values.renewalDate).toISOString(),
    validFrom: new Date(values.validFrom).toISOString(),
    validUpto: addDays(values.validFrom, durationInDays),
    durationInDays,
    staffCount,
    perStaffPrice,
    immediate: values.immediate,
  };
}

export function mapRenewalQueueFormToUpdatePayload(values: RenewalQueueFormValues): UpdateRenewalQueuePayload {
  const durationInDays = Number(values.durationInDays);
  const staffCount = Number(values.staffCount);
  const perStaffPrice = Number(values.perStaffPrice);
  return {
    renewalDate: new Date(values.renewalDate).toISOString(),
    validFrom: new Date(values.validFrom).toISOString(),
    validUpto: addDays(values.validFrom, durationInDays),
    durationInDays,
    staffCount,
    perStaffPrice,
    immediate: values.immediate,
  };
}
