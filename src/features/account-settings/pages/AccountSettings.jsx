import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import AgentPage from '../agent/pages/AgentPage';
import './AccountSettings.css';

const AccountSettings = () => {
  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <AgentPage />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
