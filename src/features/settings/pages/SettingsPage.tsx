import { Link } from 'react-router-dom';
import { Settings, Users, DollarSign, Clock, Bell, CreditCard, Link as LinkIcon, Globe } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import '../../../pages/Settings.css';

const settingsItems = [
  { id: 'account', title: 'Account', description: 'Manage your login credentials, settings, and preferences', link: '/account', icon: <Settings size={24} /> },
  { id: 'leads', title: 'Lead Settings', description: 'Configure status, source, purpose, and custom fields for seamless management', link: '/settings/lead-settings/purpose', icon: <Users size={24} /> },
  { id: 'deals', title: 'Deal Settings', description: 'Adjust Deal settings, and custom fields for streamlined management', link: '/user/deal-types', icon: <DollarSign size={24} /> },
  { id: 'tasks', title: 'Task Settings', description: 'Organize task categories, priorities, and customizations for improved productivity', link: '/user/call_status', icon: <Clock size={24} /> },
  { id: 'notifications', title: 'Notifications', description: 'Customize alerts, messages, and updates for your account', link: '/user/notifications-users', icon: <Bell size={24} /> },
  { id: 'subscriptions', title: 'Subscriptions', description: 'View, modify, or cancel your active services and memberships', link: '/user/payment-plans', icon: <CreditCard size={24} /> },
  { id: 'glconnect', title: 'GL Connect', description: 'Connect your third party integration to Getlead CRM', link: '/user/gl-connect', icon: <LinkIcon size={24} /> },
  { id: 'general', title: 'General', description: 'Manage your general settings, and preferences', link: '/user/general-settings', icon: <Globe size={24} /> },
];

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
