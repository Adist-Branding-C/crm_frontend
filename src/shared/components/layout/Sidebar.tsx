import React, { useState } from 'react';
import { CheckCircle, MessageCircle, Home, LayoutDashboard, DollarSign, CheckSquare, Megaphone, ListChecks, HeartPulse, Network, Users, BookOpen, Settings, UserCircle, Bell, FileText, Calendar, Activity, BarChart3, Kanban, Building } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import './Sidebar.css';

interface TooltipState {
  label: string;
  top: number;
  left: number;
}

const Sidebar = () => {
  const { user } = useAuth();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const showTooltip = (label: string) => (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ label, top: rect.top + rect.height / 2, left: rect.right + 10 });
  };
  const hideTooltip = () => setTooltip(null);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: MessageCircle, label: 'Leads', path: '/leads' },
    // { icon: UserCircle, label: 'Enquiries', path: '/enquiries' },
    { icon: DollarSign, label: 'Deals', path: '/user/deals' },
    { icon: Kanban, label: 'Sales Pipeline', path: '/sales-pipeline' },
    { icon: ListChecks, label: 'Tasks', path: '/user/tasks' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Activity, label: 'Daily Activity', path: '/daily-activity' },
    { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: BarChart3, label: 'Staff Performance', path: '/staff-performance' },
    ...(user?.isSuperAdmin ? [{ icon: Building, label: 'Companies', path: '/companies' }] : []),
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-circle">
          <img src="/favicon.png" alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
        </div>
      </div>
      <div className="sidebar-nav">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              aria-label={item.label}
              end={item.path === '/home'}
              onMouseEnter={showTooltip(item.label)}
              onMouseLeave={hideTooltip}
            >
              <Icon size={20} className="nav-icon" />
            </NavLink>
          );
        })}

        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          aria-label="Settings"
          end
          onMouseEnter={showTooltip('Settings')}
          onMouseLeave={hideTooltip}
        >
          <Settings size={20} className="nav-icon" />
        </NavLink>
      </div>

      {tooltip && (
        <div className="nav-tooltip" style={{ top: tooltip.top, left: tooltip.left }}>
          {tooltip.label}
        </div>
      )}
    </div>
  );
};

export default Sidebar;