import React, { useState } from 'react';
import { Rocket, Bell } from 'lucide-react';
import './FeesManagementBanner.css';
import ToastNotification from '../../../../shared/components/ToastNotification';

const FeesManagementBanner: React.FC = () => {
  const [hasNotified, setHasNotified] = useState(() => localStorage.getItem('notifiedFeesManagement') === 'true');
  const [showToast, setShowToast] = useState(false);

  const handleNotifyClick = () => {
    localStorage.setItem('notifiedFeesManagement', 'true');
    setHasNotified(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <div className="fees-banner-container">
        <div className="fees-banner-content">
          <div className="fees-banner-icon">
            <Rocket size={32} strokeWidth={2} />
          </div>
          <div className="fees-banner-text">
            <h2 className="fees-banner-title">Fees Management On the way!</h2>
            <p className="fees-banner-description">
              We are actively building a comprehensive Fees Management module. Get ready for advanced tools to seamlessly track your billing, manage subscriptions, and collect payments.
            </p>
          </div>
        </div>
        <div className={`fees-banner-action ${hasNotified ? 'fees-banner-action--hidden' : ''}`}>
          <button className="fees-banner-btn" onClick={handleNotifyClick} tabIndex={hasNotified ? -1 : 0}>
            <Bell size={18} />
            Notify Me
          </button>
        </div>
      </div>
      
      <ToastNotification 
        isVisible={showToast}
        type="success" 
        message="Thanks for your interest! We'll notify you when it's ready." 
        onDismiss={() => setShowToast(false)} 
      />
    </>
  );
};

export default FeesManagementBanner;
