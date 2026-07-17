export interface CreateSubscriptionPayload {
  companyId: string;
  validFrom: string;
  /**
   * Required by the backend DTO's validation but always recomputed server-side from
   * validFrom + durationInDays (AddSubscriptionDto/SubscriptionFieldMapper.addMapper) -
   * send the client-computed preview value so the form stays consistent with what the
   * server will end up storing.
   */
  validUpto: string;
  durationInDays: number;
  staffCount: number;
  perStaffPrice: number;
  /** Same as validUpto - required by validation, recomputed server-side. */
  totalPrice: number;
  remark?: string;
}

export interface UpdateStaffCountPayload {
  staffCount: number;
  perStaffPrice: number;
}

export interface UpdateSubscriptionStatusPayload {
  status: string;
  remark?: string;
}

export interface CreateRenewalQueuePayload {
  companyId: string;
  renewalDate: string;
  validFrom: string;
  validUpto: string;
  durationInDays: number;
  staffCount: number;
  perStaffPrice: number;
  immediate?: boolean;
}

export interface UpdateRenewalQueuePayload {
  renewalDate?: string;
  validFrom?: string;
  validUpto?: string;
  durationInDays?: number;
  staffCount?: number;
  perStaffPrice?: number;
  immediate?: boolean;
  isActive?: boolean;
}
