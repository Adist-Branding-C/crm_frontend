import { CouponDiscountType } from '../../../shared/constants/enums';
export const mockPlan = {
    name: 'Professional',
    users: 9,
    expiry: '2026-Jul-08',
    lastPayment: '2026-Apr-08',
    amount: 19084,
};
export const mockPricing = {
    crmPerUser: 599,
    users: 9,
    months: 12,
    subtotal: 64692,
    promoDiscount: 0,
    gst: 11644.56,
    total: 76337,
};
export const validCoupons = {
    'SAVE10': { discount: 10, type: CouponDiscountType.PERCENT },
    'WELCOME': { discount: 500, type: CouponDiscountType.FIXED },
    'ANNUAL20': { discount: 20, type: CouponDiscountType.PERCENT },
};
export const addonsList = [
    { id: 'whatsapp', name: 'WhatsApp Integration', price: 499 },
    { id: 'email', name: 'Email Campaigns', price: 399 },
    { id: 'sms', name: 'SMS Credits', price: 299 },
    { id: 'api', name: 'API Access', price: 699 },
];
//# sourceMappingURL=index.js.map