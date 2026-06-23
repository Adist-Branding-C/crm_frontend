import React from 'react';
import { CheckCircle, MessageCircle, Home, LayoutDashboard, Flame, DollarSign, CheckSquare, Megaphone, ListChecks, HeartPulse, Network, Users, BookOpen, Settings, UserCircle, Bell, FileText, Calendar, Activity, BarChart3, Kanban, Building, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: MessageCircle, label: 'Leads', path: '/leads' },
    { icon: Bell, label: 'Followup Required', path: '/followup-required' },
    { icon: Flame, label: 'Spotlight', path: '/spotlight' },
    { icon: DollarSign, label: 'Deals', path: '/user/deals' },
    { icon: Kanban, label: 'Sales Pipeline', path: '/sales-pipeline' },
    { icon: ListChecks, label: 'Tasks', path: '/user/tasks' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Activity, label: 'Daily Activity', path: '/daily-activity' },
    { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: BarChart3, label: 'Staff Performance', path: '/staff-performance' },
    { icon: Building, label: 'Companies', path: '/companies' },
  ];

  return (
    <>
      {isOpen && <div className="mobile-sidebar-backdrop" onClick={onClose} />}
      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <div className="logo-circle">
            <CheckCircle size={20} color="#fff" />
          </div>
          <button className="mobile-sidebar-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="mobile-sidebar-nav">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
          <NavLink
            to="/settings"
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
