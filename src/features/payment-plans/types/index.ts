import type { BillingCycle, CouponDiscountType } from '../../../shared/constants/enums';

export interface Coupon {
  discount: number;
  type: CouponDiscountType;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface PlanConfig {
  users: number;
  billingCycle: BillingCycle;
  addons: string[];
}

export interface MockPlan {
  name: string;
  users: number;
  expiry: string;
  lastPayment: string;
  amount: number;
}

export interface MockPricing {
  crmPerUser: number;
  users: number;
  months: number;
  subtotal: number;
  promoDiscount: number;
  gst: number;
  total: number;
}

export type CouponsMap = Record<string, Coupon>;
