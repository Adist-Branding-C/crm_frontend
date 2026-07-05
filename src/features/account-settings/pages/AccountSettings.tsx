import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import AgentPage from '../agent/page/AgentPage';
import './AccountSettings.css';

const AccountSettings = () => {
  return (
    <div className="account-page">
      <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
      <SettingsTabs />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <AgentPage />
      </div>
    </div>
  );
};

export default AccountSettings;
