import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './GeneralSettings.css';

const GeneralSettingsPage = () => {
  const [settings, setSettings] = useState({
    globalSearch: true,
    searchNumberMasking: false,
    enableWebSound: true,
    enableAttendanceStatus: true,
    enableIvrAppNotification: false,
    staffChangeEnquirySource: false,
    timezone: 'Asia/Kolkata',
    enableBranchFilter: true,
    enableWebNotification: true,
    enableWebIvrCalling: false,
    currency: 'INR',
    enableDeletedAgentFilter: false,
  });

  const [showToast, setShowToast] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    showSaveToast();
  };

  const handleSelectChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    showSaveToast();
  };

  const showSaveToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const timezones = [
    { value: 'Asia/Kolkata', label: 'Asia/Kolkata' },
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'America/New_York' },
    { value: 'Europe/London', label: 'Europe/London' },
    { value: 'Asia/Dubai', label: 'Asia/Dubai' },
  ];

  const currencies = [
    { value: 'INR', label: 'INR' },
    { value: 'USD', label: 'USD' },
    { value: 'AED', label: 'AED' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
  ];

  return (
    <div className="general-settings-page">
      <PageHeader 
        title="General Settings" 
        description="Configure your general application settings" 
      />

      <div className="settings-card">
        <div className="card-header">
          <h3>General Settings</h3>
        </div>

        <div className="settings-grid">
          {/* Left Column */}
          <div className="settings-column">
            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Global Search</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-switch ${settings.globalSearch ? 'active' : ''}`}
                  onClick={() => handleToggle('globalSearch')}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            </div>

            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Search Number Masking</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-switch ${settings.searchNumberMasking ? 'active' : ''}`}
                  onClick={() => handleToggle('searchNumberMasking')}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            </div>

            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Enable Web Sound</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-switch ${settings.enableWebSound ? 'active' : ''}`}
                  onClick={() => handleToggle('enableWebSound')}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            </div>

            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Enable Attendance Status</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-switch ${settings.enableAttendanceStatus ? 'active' : ''}`}
                  onClick={() => handleToggle('enableAttendanceStatus')}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            </div>

            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Enable IVR App Notification</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-switch ${settings.enableIvrAppNotification ? 'active' : ''}`}
                  onClick={() => handleToggle('enableIvrAppNotification')}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            </div>

            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Staff can change Enquiry Source</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-switch ${settings.staffChangeEnquirySource ? 'active' : ''}`}
                  onClick={() => handleToggle('staffChangeEnquirySource')}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            </div>

            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Time Zone</span>
              </div>
              <div className="setting-control">
                <select 
                  className="settings-select"
                  value={settings.timezone}
                  onChange={(e) => handleSelectChange('timezone', e.target.value)}
                >
                  <option value="">Select Timezone</option>
                  {timezones.map(tz => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="settings-column">
            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Enable branch vise filter</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-switch ${settings.enableBranchFilter ? 'active' : ''}`}
                  onClick={() => handleToggle('enableBranchFilter')}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            </div>

            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Enable Web Notification</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-switch ${settings.enableWebNotification ? 'active' : ''}`}
                  onClick={() => handleToggle('enableWebNotification')}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            </div>

            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Enable Web IVR Calling</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-switch ${settings.enableWebIvrCalling ? 'active' : ''}`}
                  onClick={() => handleToggle('enableWebIvrCalling')}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            </div>

            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Currency</span>
              </div>
              <div className="setting-control">
                <select 
                  className="settings-select"
                  value={settings.currency}
                  onChange={(e) => handleSelectChange('currency', e.target.value)}
                >
                  <option value="">Select ...</option>
                  {currencies.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="settings-row">
              <div className="setting-label">
                <span className="label-text">Enable Deleted Agent in filter</span>
              </div>
              <div className="setting-control">
                <button 
                  className={`toggle-switch ${settings.enableDeletedAgentFilter ? 'active' : ''}`}
                  onClick={() => handleToggle('enableDeletedAgentFilter')}
                >
                  <span className="toggle-knob" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <Check size={18} />
          <span>Settings updated</span>
        </div>
      )}
    </div>
  );
};

export default GeneralSettingsPage;