import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { FileText, Tag, Globe, Layers, PlusCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './LeadSettings.css';

const menuItems = [
  { id: 'purpose', label: 'Purpose', link: '/settings/lead-settings/purpose', icon: FileText },
  { id: 'status', label: 'Status', link: '/settings/lead-settings/status', icon: Tag },
  { id: 'source', label: 'Source', link: '/settings/lead-settings/source', icon: Globe },
  { id: 'types', label: 'Types', link: '/settings/lead-settings/types', icon: Layers },
  { id: 'additional', label: 'Additional Fields', link: '/settings/lead-settings/additional', icon: PlusCircle },
];

const LeadSettingsLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/settings/lead-settings') {
      navigate('/settings/lead-settings/purpose', { replace: true });
    }
  }, [location.pathname, navigate]);

  const isRoot = location.pathname === '/settings/lead-settings';
  
  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Settings" description="Configure lead purposes, statuses, sources and types" />

      <div className="lead-settings-layout">
        <div className="settings-menu">
          {menuItems.map(item => (
            <Link
              key={item.id}
              to={item.link}
              className={`menu-item ${location.pathname === item.link ? 'active' : ''}`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="settings-content">
          {!isRoot && <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default LeadSettingsLayout;