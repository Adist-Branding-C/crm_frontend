import React from 'react';
import { CheckCircle, MessageCircle, Home, LayoutDashboard, DollarSign, CheckSquare, Megaphone, ListChecks, HeartPulse, Network, Users, BookOpen, Settings, UserCircle, Bell, FileText, Calendar, Activity, BarChart3, Kanban, Building } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
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
    { icon: Building, label: 'Companies', path: '/companies' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-circle">
          <CheckCircle size={20} color="#fff" />
        </div>
      </div>
      <div className="sidebar-nav">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink key={index} to={item.path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} title={item.label} end={item.path === '/home'}>
              <Icon size={20} className="nav-icon" />
            </NavLink>
          );
        })}

        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} title="Settings" end>
          <Settings size={20} className="nav-icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;