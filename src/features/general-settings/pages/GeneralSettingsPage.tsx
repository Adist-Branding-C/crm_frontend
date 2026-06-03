import { Check } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { timezones, currencies } from '../constants';
import { useGeneralSettingsData } from '../hooks/useGeneralSettingsData';
import './GeneralSettingsPage.css';

const GeneralSettingsPage = () => {
  const {
    settings,
    showToast,
    handleToggle,
    handleSelectChange,
  } = useGeneralSettingsData();

  return (
    <div className="general-settings-page">
      <PageHeader
        title="General Settings"
        description="Configure your general application settings"
        breadcrumb={false}
      />

      <div className="settings-card">
        <div className="card-header">
          <h3>General Settings</h3>
        </div>

        <div className="settings-grid">
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
