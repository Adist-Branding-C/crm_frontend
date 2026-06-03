import { Link } from 'react-router-dom';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { settingsItems } from '../constants';
import './SettingsPage.css';

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <PageHeader title="Settings" description="Manage your account settings and preferences" />

      <div className="settings-grid">
        {settingsItems.map((item) => (
          <Link key={item.id} to={item.link} className="settings-card">
            <div className="settings-icon">
              {item.icon}
            </div>
            <h6>{item.title}</h6>
            <p>{item.description}</p>
            <div className="settings-link">
              <p>{item.title.toLowerCase()} settings</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
