import { useState, useCallback } from 'react';
import { Download, Star, X, Plus, Minus, Check, CreditCard } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import type { Coupon, PlanConfig } from '../types';
import { mockPlan, mockPricing, validCoupons, addonsList } from '../constants';
import '../../../pages/PaymentPlans.css';

const PaymentPlansPage = () => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponMessage, setCouponMessage] = useState('');
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [planConfig, setPlanConfig] = useState<PlanConfig>({
    users: 9,
    billingCycle: 'yearly',
    addons: [],
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const calculatePrice = useCallback(() => {
    let base = mockPricing.crmPerUser * planConfig.users * (planConfig.billingCycle === 'yearly' ? 12 : 1);
    let addonTotal = planConfig.addons.reduce((sum, addon) => {
      const addonPrice = addonsList.find(a => a.id === addon)?.price || 0;
      return sum + addonPrice * (planConfig.billingCycle === 'yearly' ? 12 : 1);
    }, 0);
    return base + addonTotal;
  }, [planConfig]);

  const calculateGst = (amount: number) => amount * 0.18;

  const calculateTotal = useCallback(() => {
    const base = calculatePrice();
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percent') {
        discount = base * (appliedCoupon.discount / 100);
      } else {
        discount = appliedCoupon.discount;
      }
    }
    let subtotal = base - discount;
    let gst = calculateGst(subtotal);
    return subtotal + gst;
  }, [calculatePrice, appliedCoupon]);

  const handleApplyCoupon = () => {
    const coupon = validCoupons[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponMessage('Coupon applied successfully!');
    } else {
      setAppliedCoupon(null);
      setCouponMessage('Invalid coupon code');
    }
  };

  const toggleAddon = (addonId: string) => {
    setPlanConfig(prev => ({
      ...prev,
      addons: prev.addons.includes(addonId)
        ? prev.addons.filter(id => id !== addonId)
        : [...prev.addons, addonId],
    }));
  };

  return (
    <div className="payment-plans-page">
      <PageHeader
        title="Payment Plans"
        description="Manage your subscription plan, add-ons and billing"
        breadcrumb={false}
        action={
          <div className="header-actions">
            <span className="expiry-notice">Your plan expires in 75 days</span>
            <button className="btn btn-warning">Home</button>
            <button className="profile-btn">D</button>
          </div>
        }
      />

      <div className="payment-layout">
        <div className="billing-sidebar">
          <div className="logo-section">
            <h2 className="logo">GETLEAD</h2>
            <p className="expiry-text">Your plan expires in 75 days</p>
          </div>

          <div className="billing-step-card">
            <span className="step-badge">01</span>
            <div className="step-content">
              <h5>Billing</h5>
              <p>Choose your plan and manage billing details</p>
            </div>
          </div>

          <div className="download-section">
            <h5>Download GetLead App</h5>
            <div className="app-icons">
              <button className="app-store-btn">
                <CreditCard size={20} />
                App Store
              </button>
              <button className="play-store-btn">
                <Download size={20} />
                Play Store
              </button>
            </div>
          </div>
        </div>

        <div className="center-content">
          <div className="content-header">
            <h2>Plan, add-ons and billing</h2>
            <p className="account-info">
              Dear <strong>Dr Expert Edulinks</strong>
              <span className="account-id">Account Id : C5C8CD46</span>
            </p>
            <p className="subtitle">Choose your plan, explore additional features, and manage billing details</p>
          </div>

          <div className="plans-cards">
            <div className="plan-card existing-plan">
              <div className="card-header">
                <span className="card-badge">Existing plan</span>
              </div>
              <div className="plan-details">
                <div className="user-badge">
                  <Star size={16} />
                  {mockPlan.users} Users
                </div>
                <div className="plan-meta">
                  <p>Expiry: {mockPlan.expiry}</p>
                  <p>Last payment: {mockPlan.lastPayment}</p>
                </div>
              </div>
              <div className="price-divider" />
              <div className="plan-price">
                <span className="currency">₹</span>
                <span className="amount">{mockPlan.amount}</span>
              </div>
            </div>

            <div
              className="plan-card customize-plan"
              onClick={() => setShowCustomizeModal(true)}
            >
              <div className="rocket-icon">🚀</div>
              <h4>Customize your plan</h4>
              <p>Customize your plan for ease of use</p>
            </div>
          </div>
        </div>

        <div className="pricing-summary">
          <h4>Pricing summary</h4>

          <div className="price-breakdown">
            <div className="price-row">
              <span>Users</span>
              <span>CRM ₹{mockPricing.crmPerUser} x {planConfig.users} x {planConfig.billingCycle === 'yearly' ? '12' : '1'}</span>
              <span className="row-value">₹{calculatePrice().toLocaleString()}</span>
            </div>

            {appliedCoupon && (
              <div className="price-row promo-discount">
                <span>Promo discount</span>
                <span className="row-value">-₹{appliedCoupon.type === 'percent'
                  ? (calculatePrice() * appliedCoupon.discount / 100).toFixed(0)
                  : appliedCoupon.discount
                }</span>
              </div>
            )}

            <div className="price-row">
              <span>GST</span>
              <span className="row-value">₹{calculateGst(calculatePrice() - (appliedCoupon?.discount || 0)).toFixed(2)}</span>
            </div>
          </div>

          <div className="price-divider" />

          <div className="price-row total">
            <span>Total amount</span>
            <span className="row-value">₹{calculateTotal().toLocaleString()}</span>
          </div>

          <div className="coupon-section">
            <button className="coupon-link">
              See all coupon codes
            </button>
            <div className="coupon-input">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                className="apply-btn"
                onClick={handleApplyCoupon}
                disabled={!couponCode}
              >
                Apply
              </button>
            </div>
            {couponMessage && (
              <p className={`coupon-message ${appliedCoupon ? 'success' : 'error'}`}>
                {couponMessage}
              </p>
            )}
          </div>

          <div className="payment-due">
            <span>You have to pay:</span>
            <span className="due-amount">₹{calculateTotal().toLocaleString()}</span>
          </div>

          <button
            className="btn btn-primary btn-large"
            onClick={() => setShowPaymentModal(true)}
          >
            Proceed to payment
          </button>
        </div>
      </div>

      {showCustomizeModal && (
        <div className="modal-overlay" onClick={() => setShowCustomizeModal(false)}>
          <div className="modal-content customize-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Customize your plan</h3>
              <button className="modal-close" onClick={() => setShowCustomizeModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="config-section">
                <label>Number of Users</label>
                <div className="user-counter">
                  <button
                    onClick={() => setPlanConfig(p => ({ ...p, users: Math.max(1, p.users - 1) }))}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="user-count">{planConfig.users}</span>
                  <button
                    onClick={() => setPlanConfig(p => ({ ...p, users: p.users + 1 }))}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="config-section">
                <label>Billing Cycle</label>
                <div className="billing-toggle">
                  <button
                    className={planConfig.billingCycle === 'monthly' ? 'active' : ''}
                    onClick={() => setPlanConfig(p => ({ ...p, billingCycle: 'monthly' }))}
                  >
                    Monthly
                  </button>
                  <button
                    className={planConfig.billingCycle === 'yearly' ? 'active' : ''}
                    onClick={() => setPlanConfig(p => ({ ...p, billingCycle: 'yearly' }))}
                  >
                    Yearly
                    {planConfig.billingCycle === 'yearly' && <span className="save-tag">Save 20%</span>}
                  </button>
                </div>
              </div>

              <div className="config-section">
                <label>Add-ons</label>
                <div className="addons-list">
                  {addonsList.map(addon => (
                    <div
                      key={addon.id}
                      className={`addon-item ${planConfig.addons.includes(addon.id) ? 'selected' : ''}`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <div className="addon-check">
                        {planConfig.addons.includes(addon.id) && <Check size={16} />}
                      </div>
                      <div className="addon-info">
                        <span className="addon-name">{addon.name}</span>
                        <span className="addon-price">₹{addon.price}/month</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="custom-total">
                <span>Total:</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => setShowPaymentModal(true)}
              >
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Payment</h3>
              <button className="modal-close" onClick={() => setShowPaymentModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="payment-summary">
                <div className="payment-row">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
              <p className="payment-note">
                Payment functionality would be integrated with a payment gateway here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPlansPage;
