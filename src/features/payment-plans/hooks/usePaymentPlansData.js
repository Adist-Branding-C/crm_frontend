import { useState, useCallback } from 'react';
import { mockPricing, validCoupons, addonsList } from '../constants';
import { BillingCycle, CouponDiscountType } from '../../../shared/constants/enums';
export function usePaymentPlansData() {
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponMessage, setCouponMessage] = useState('');
    const [showCustomizeModal, setShowCustomizeModal] = useState(false);
    const [planConfig, setPlanConfig] = useState({
        users: 9,
        billingCycle: BillingCycle.YEARLY,
        addons: [],
    });
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const calculatePrice = useCallback(() => {
        let base = mockPricing.crmPerUser * planConfig.users * (planConfig.billingCycle === BillingCycle.YEARLY ? 12 : 1);
        let addonTotal = planConfig.addons.reduce((sum, addon) => {
            const addonPrice = addonsList.find(a => a.id === addon)?.price || 0;
            return sum + addonPrice * (planConfig.billingCycle === BillingCycle.YEARLY ? 12 : 1);
        }, 0);
        return base + addonTotal;
    }, [planConfig]);
    const calculateGst = useCallback((amount) => amount * 0.18, []);
    const calculateTotal = useCallback(() => {
        const base = calculatePrice();
        let discount = 0;
        if (appliedCoupon) {
            if (appliedCoupon.type === CouponDiscountType.PERCENT) {
                discount = base * (appliedCoupon.discount / 100);
            }
            else {
                discount = appliedCoupon.discount;
            }
        }
        let subtotal = base - discount;
        let gst = calculateGst(subtotal);
        return subtotal + gst;
    }, [calculatePrice, appliedCoupon, calculateGst]);
    const handleApplyCoupon = useCallback(() => {
        const coupon = validCoupons[couponCode.toUpperCase()];
        if (coupon) {
            setAppliedCoupon(coupon);
            setCouponMessage('Coupon applied successfully!');
        }
        else {
            setAppliedCoupon(null);
            setCouponMessage('Invalid coupon code');
        }
    }, [couponCode]);
    const toggleAddon = useCallback((addonId) => {
        setPlanConfig(prev => ({
            ...prev,
            addons: prev.addons.includes(addonId)
                ? prev.addons.filter(id => id !== addonId)
                : [...prev.addons, addonId],
        }));
    }, []);
    const incrementUsers = useCallback(() => {
        setPlanConfig(p => ({ ...p, users: p.users + 1 }));
    }, []);
    const decrementUsers = useCallback(() => {
        setPlanConfig(p => ({ ...p, users: Math.max(1, p.users - 1) }));
    }, []);
    const setBillingCycle = useCallback((cycle) => {
        setPlanConfig(p => ({ ...p, billingCycle: cycle }));
    }, []);
    return {
        couponCode, setCouponCode,
        appliedCoupon, setAppliedCoupon,
        couponMessage, setCouponMessage,
        showCustomizeModal, setShowCustomizeModal,
        planConfig, setPlanConfig,
        showPaymentModal, setShowPaymentModal,
        calculatePrice, calculateGst, calculateTotal,
        handleApplyCoupon, toggleAddon,
        incrementUsers, decrementUsers, setBillingCycle,
    };
}
//# sourceMappingURL=usePaymentPlansData.js.map