import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const subMenuItems = [
  { id: 'agent', title: 'Agent', link: '/account' },
  { id: 'roles', title: 'Roles', link: '/account/roles' },
  { id: 'department', title: 'Departments', link: '/account/department' },
  { id: 'workmode', title: 'Staff Work Modes', link: '/account/workmode' },
  { id: 'checkout', title: 'Checkout Note', link: '/account/checkout' },
  { id: 'designation', title: 'Designations', link: '/account/designation' },
  { id: 'branch', title: 'Branch', link: '/account/branch' },
  { id: 'mailconfig', title: 'Mail Configuration', link: '/account/mailconfig' },
  { id: 'emailtemplate', title: 'Email Template', link: '/account/emailtemplate' },
  { id: 'whatsapptemplate', title: 'Whatsapp Template', link: '/account/whatsapptemplate' },
  { id: 'profile', title: 'Profile', link: '/account/profile' },
  { id: 'password', title: 'Change Password', link: '/account/password' },
];

const AccountSidebar = ({ activeItem }) => {
  const location = useLocation();
  
  const getCurrentActiveItem = () => {
    const currentPath = location.pathname;
    const active = subMenuItems.find(item => item.link === currentPath);
    return active ? active.id : 'agent';
  };

  const currentActive = activeItem || getCurrentActiveItem();

  return (
    <div className="account-sidebar">
      <div className="account-sidebar-header">
        <div className="account-logo">
          <img src="https://app.getleadcrm.com/backend/images/images-V2/logo-new.svg" alt="Getlead" />
        </div>
        <p>Your plan expires in <span>75 days</span></p>
      </div>
      <div className="account-menu-section">
        <div className="account-menu-title">
          <h4>Account settings</h4>
        </div>
        <div className="account-menu-links">
          {subMenuItems.map((item) => (
            <Link 
              key={item.id}
              to={item.link}
              className={item.id === currentActive ? 'active' : ''}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;