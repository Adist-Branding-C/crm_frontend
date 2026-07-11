import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Search, Download, MapPin, MessageSquare, Phone, Video, Star, X, Plus, Minus, Check, CreditCard } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './PaymentPlans.css';
const mockPlan = {
    name: 'Professional',
    users: 9,
    expiry: '2026-Jul-08',
    lastPayment: '2026-Apr-08',
    amount: 19084,
};
const mockPricing = {
    crmPerUser: 599,
    users: 9,
    months: 12,
    subtotal: 64692,
    promoDiscount: 0,
    gst: 11644.56,
    total: 76337,
};
const validCoupons = {
    'SAVE10': { discount: 10, type: 'percent' },
    'WELCOME': { discount: 500, type: 'fixed' },
    'ANNUAL20': { discount: 20, type: 'percent' },
};
const PaymentPlansPage = () => {
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponMessage, setCouponMessage] = useState('');
    const [showCustomizeModal, setShowCustomizeModal] = useState(false);
    const [planConfig, setPlanConfig] = useState({
        users: 9,
        billingCycle: 'yearly',
        addons: [],
    });
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const addonsList = [
        { id: 'whatsapp', name: 'WhatsApp Integration', price: 499 },
        { id: 'email', name: 'Email Campaigns', price: 399 },
        { id: 'sms', name: 'SMS Credits', price: 299 },
        { id: 'api', name: 'API Access', price: 699 },
    ];
    const calculatePrice = () => {
        let base = mockPricing.crmPerUser * planConfig.users * (planConfig.billingCycle === 'yearly' ? 12 : 1);
        let addonTotal = planConfig.addons.reduce((sum, addon) => {
            const addonPrice = addonsList.find(a => a.id === addon)?.price || 0;
            return sum + addonPrice * (planConfig.billingCycle === 'yearly' ? 12 : 1);
        }, 0);
        return base + addonTotal;
    };
    const calculateGst = (amount) => amount * 0.18;
    const calculateTotal = () => {
        const base = calculatePrice();
        let discount = 0;
        if (appliedCoupon) {
            if (appliedCoupon.type === 'percent') {
                discount = base * (appliedCoupon.discount / 100);
            }
            else {
                discount = appliedCoupon.discount;
            }
        }
        let subtotal = base - discount;
        let gst = calculateGst(subtotal);
        return subtotal + gst;
    };
    const handleApplyCoupon = () => {
        const coupon = validCoupons[couponCode.toUpperCase()];
        if (coupon) {
            setAppliedCoupon(coupon);
            setCouponMessage('Coupon applied successfully!');
        }
        else {
            setAppliedCoupon(null);
            setCouponMessage('Invalid coupon code');
        }
    };
    const toggleAddon = (addonId) => {
        setPlanConfig(prev => ({
            ...prev,
            addons: prev.addons.includes(addonId)
                ? prev.addons.filter(id => id !== addonId)
                : [...prev.addons, addonId]
        }));
    };
    return (_jsxs("div", { className: "payment-plans-page", children: [_jsx(PageHeader, { title: "Payment Plans", description: "Manage your subscription plan, add-ons and billing", action: _jsxs("div", { className: "header-actions", children: [_jsx("span", { className: "expiry-notice", children: "Your plan expires in 75 days" }), _jsx("button", { className: "btn btn-warning", children: "Home" }), _jsx("button", { className: "profile-btn", children: "D" })] }) }), _jsxs("div", { className: "payment-layout", children: [_jsxs("div", { className: "billing-sidebar", children: [_jsxs("div", { className: "logo-section", children: [_jsx("h2", { className: "logo", children: "GETLEAD" }), _jsx("p", { className: "expiry-text", children: "Your plan expires in 75 days" })] }), _jsxs("div", { className: "billing-step-card", children: [_jsx("span", { className: "step-badge", children: "01" }), _jsxs("div", { className: "step-content", children: [_jsx("h5", { children: "Billing" }), _jsx("p", { children: "Choose your plan and manage billing details" })] })] }), _jsxs("div", { className: "download-section", children: [_jsx("h5", { children: "Download GetLead App" }), _jsxs("div", { className: "app-icons", children: [_jsxs("button", { className: "app-store-btn", children: [_jsx(CreditCard, { size: 20 }), "App Store"] }), _jsxs("button", { className: "play-store-btn", children: [_jsx(Download, { size: 20 }), "Play Store"] })] })] })] }), _jsxs("div", { className: "center-content", children: [_jsxs("div", { className: "content-header", children: [_jsx("h2", { children: "Plan, add-ons and billing" }), _jsxs("p", { className: "account-info", children: ["Dear ", _jsx("strong", { children: "Dr Expert Edulinks" }), _jsx("span", { className: "account-id", children: "Account Id : C5C8CD46" })] }), _jsx("p", { className: "subtitle", children: "Choose your plan, explore additional features, and manage billing details" })] }), _jsxs("div", { className: "plans-cards", children: [_jsxs("div", { className: "plan-card existing-plan", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-badge", children: "Existing plan" }) }), _jsxs("div", { className: "plan-details", children: [_jsxs("div", { className: "user-badge", children: [_jsx(Star, { size: 16 }), mockPlan.users, " Users"] }), _jsxs("div", { className: "plan-meta", children: [_jsxs("p", { children: ["Expiry: ", mockPlan.expiry] }), _jsxs("p", { children: ["Last payment: ", mockPlan.lastPayment] })] })] }), _jsx("div", { className: "price-divider" }), _jsxs("div", { className: "plan-price", children: [_jsx("span", { className: "currency", children: "\u20B9" }), _jsx("span", { className: "amount", children: mockPlan.amount })] })] }), _jsxs("div", { className: "plan-card customize-plan", onClick: () => setShowCustomizeModal(true), children: [_jsx("div", { className: "rocket-icon", children: "\uD83D\uDE80" }), _jsx("h4", { children: "Customize your plan" }), _jsx("p", { children: "Customize your plan for ease of use" })] })] })] }), _jsxs("div", { className: "pricing-summary", children: [_jsx("h4", { children: "Pricing summary" }), _jsxs("div", { className: "price-breakdown", children: [_jsxs("div", { className: "price-row", children: [_jsx("span", { children: "Users" }), _jsxs("span", { children: ["CRM \u20B9", mockPricing.crmPerUser, " x ", planConfig.users, " x ", planConfig.billingCycle === 'yearly' ? '12' : '1'] }), _jsxs("span", { className: "row-value", children: ["\u20B9", calculatePrice().toLocaleString()] })] }), appliedCoupon && (_jsxs("div", { className: "price-row promo-discount", children: [_jsx("span", { children: "Promo discount" }), _jsxs("span", { className: "row-value", children: ["-\u20B9", appliedCoupon.type === 'percent'
                                                        ? (calculatePrice() * appliedCoupon.discount / 100).toFixed(0)
                                                        : appliedCoupon.discount] })] })), _jsxs("div", { className: "price-row", children: [_jsx("span", { children: "GST" }), _jsxs("span", { className: "row-value", children: ["\u20B9", calculateGst(calculatePrice() - (appliedCoupon?.discount || 0)).toFixed(2)] })] })] }), _jsx("div", { className: "price-divider" }), _jsxs("div", { className: "price-row total", children: [_jsx("span", { children: "Total amount" }), _jsxs("span", { className: "row-value", children: ["\u20B9", calculateTotal().toLocaleString()] })] }), _jsxs("div", { className: "coupon-section", children: [_jsx("button", { className: "coupon-link", children: "See all coupon codes" }), _jsxs("div", { className: "coupon-input", children: [_jsx("input", { type: "text", placeholder: "Enter coupon code", value: couponCode, onChange: (e) => setCouponCode(e.target.value) }), _jsx("button", { className: "apply-btn", onClick: handleApplyCoupon, disabled: !couponCode, children: "Apply" })] }), couponMessage && (_jsx("p", { className: `coupon-message ${appliedCoupon ? 'success' : 'error'}`, children: couponMessage }))] }), _jsxs("div", { className: "payment-due", children: [_jsx("span", { children: "You have to pay:" }), _jsxs("span", { className: "due-amount", children: ["\u20B9", calculateTotal().toLocaleString()] })] }), _jsx("button", { className: "btn btn-primary btn-large", onClick: () => setShowPaymentModal(true), children: "Proceed to payment" })] })] }), showCustomizeModal && (_jsx("div", { className: "modal-overlay", onClick: () => setShowCustomizeModal(false), children: _jsxs("div", { className: "modal-content customize-modal", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h3", { children: "Customize your plan" }), _jsx("button", { className: "modal-close", onClick: () => setShowCustomizeModal(false), children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "modal-body", children: [_jsxs("div", { className: "config-section", children: [_jsx("label", { children: "Number of Users" }), _jsxs("div", { className: "user-counter", children: [_jsx("button", { onClick: () => setPlanConfig(p => ({ ...p, users: Math.max(1, p.users - 1) })), children: _jsx(Minus, { size: 18 }) }), _jsx("span", { className: "user-count", children: planConfig.users }), _jsx("button", { onClick: () => setPlanConfig(p => ({ ...p, users: p.users + 1 })), children: _jsx(Plus, { size: 18 }) })] })] }), _jsxs("div", { className: "config-section", children: [_jsx("label", { children: "Billing Cycle" }), _jsxs("div", { className: "billing-toggle", children: [_jsx("button", { className: planConfig.billingCycle === 'monthly' ? 'active' : '', onClick: () => setPlanConfig(p => ({ ...p, billingCycle: 'monthly' })), children: "Monthly" }), _jsxs("button", { className: planConfig.billingCycle === 'yearly' ? 'active' : '', onClick: () => setPlanConfig(p => ({ ...p, billingCycle: 'yearly' })), children: ["Yearly", planConfig.billingCycle === 'yearly' && _jsx("span", { className: "save-tag", children: "Save 20%" })] })] })] }), _jsxs("div", { className: "config-section", children: [_jsx("label", { children: "Add-ons" }), _jsx("div", { className: "addons-list", children: addonsList.map(addon => (_jsxs("div", { className: `addon-item ${planConfig.addons.includes(addon.id) ? 'selected' : ''}`, onClick: () => toggleAddon(addon.id), children: [_jsx("div", { className: "addon-check", children: planConfig.addons.includes(addon.id) && _jsx(Check, { size: 16 }) }), _jsxs("div", { className: "addon-info", children: [_jsx("span", { className: "addon-name", children: addon.name }), _jsxs("span", { className: "addon-price", children: ["\u20B9", addon.price, "/month"] })] })] }, addon.id))) })] }), _jsxs("div", { className: "custom-total", children: [_jsx("span", { children: "Total:" }), _jsxs("span", { children: ["\u20B9", calculateTotal().toLocaleString()] })] })] }), _jsx("div", { className: "modal-footer", children: _jsx("button", { className: "btn btn-primary", onClick: () => setShowPaymentModal(true), children: "Proceed to payment" }) })] }) })), showPaymentModal && (_jsx("div", { className: "modal-overlay", onClick: () => setShowPaymentModal(false), children: _jsxs("div", { className: "modal-content payment-modal", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h3", { children: "Payment" }), _jsx("button", { className: "modal-close", onClick: () => setShowPaymentModal(false), children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "modal-body", children: [_jsx("div", { className: "payment-summary", children: _jsxs("div", { className: "payment-row", children: [_jsx("span", { children: "Total Amount" }), _jsxs("span", { children: ["\u20B9", calculateTotal().toLocaleString()] })] }) }), _jsx("p", { className: "payment-note", children: "Payment functionality would be integrated with a payment gateway here." })] })] }) }))] }));
};
export default PaymentPlansPage;
//# sourceMappingURL=PaymentPlans.js.map