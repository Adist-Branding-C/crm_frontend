import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Shield, Building2, Clock, FileText, MapPinned, Mail, MessageSquare, User, Lock, Briefcase, Plus, Minus } from 'lucide-react';
import type { TabItem, SettingsTabsProps } from '../types/layout';

const defaultTabs: TabItem[] = [
  { id: 'agent', title: 'Agent', link: '/account', icon: Users },
  { id: 'roles', title: 'Roles', link: '/account/roles', icon: Shield },
  { id: 'department', title: 'Departments', link: '/account/department', icon: Building2 },
  { id: 'workmode', title: 'Staff Work Modes', link: '/account/workmode', icon: Clock },
  { id: 'checkout', title: 'Checkout Note', link: '/account/checkout', icon: FileText },
  { id: 'designation', title: 'Designations', link: '/account/designation', icon: Briefcase },
  { id: 'branch', title: 'Branch', link: '/account/branch', icon: MapPinned },
  { id: 'mailconfig', title: 'Mail Configuration', link: '/account/mailconfig', icon: Mail },
  { id: 'emailtemplate', title: 'Email Template', link: '/account/emailtemplate', icon: Mail },
  { id: 'whatsapptemplate', title: 'Whatsapp Template', link: '/account/whatsapptemplate', icon: MessageSquare },
  { id: 'profile', title: 'Profile', link: '/account/profile', icon: User },
  { id: 'password', title: 'Change Password', link: '/account/password', icon: Lock },
];

const SettingsTabs = ({ items = defaultTabs }: SettingsTabsProps) => {
  const location = useLocation();
  const [limit, setLimit] = useState(8);

  return (
    <div className="settings-tabs">
      {items.slice(0, limit).map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.id}
            to={item.link}
            className={`settings-tab ${location.pathname === item.link ? 'active' : ''}`}
          >
            <Icon size={16} />
            <span style={{ paddingLeft: '10px' }}>{item.title}</span>
          </Link>
        );
      })}

      {items.length > 8 && (
        <span
          onClick={() => setLimit(limit > 8 ? 8 : items.length)}
          className={`settings-tab ${location.pathname === items[8]?.link ? 'active' : ''}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLimit(limit > 8 ? 8 : items.length); }}
        >
          {limit > 8 ? <Minus size={16} /> : <Plus size={16} />}
          <span style={{ paddingLeft: '10px' }}>{limit > 8 ? 'Reset' : 'More'}</span>
        </span>
      )}
    </div>
  );
};

export default SettingsTabs;
