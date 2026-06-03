import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Grid, Plus, ChevronDown, X, User, DollarSign, ListChecks, Megaphone, FileText, Phone, UserCircle, Settings, Users, CreditCard, Shield, HelpCircle, LogOut, Building, Check, PhoneCall, Calendar, AlertCircle, Info, Layout } from 'lucide-react';
import type { NotificationIconInfo, TopNavProps } from '../../types/layout';
import './TopNav.css';

const addOptions = [
  { id: 'lead', name: 'Lead', icon: User },
  { id: 'deal', name: 'Deal', icon: DollarSign },
  { id: 'task', name: 'Task', icon: ListChecks },
  { id: 'campaign', name: 'Campaign', icon: Megaphone },
];

const initialNotifications = [
  { id: 1, type: 'lead', title: 'New lead assigned', message: 'Rahul Sharma has been assigned to you', time: '2 mins ago', isRead: false, link: '/leads' },
  { id: 2, type: 'reminder', title: 'Follow-up reminder', message: 'Call Priya Patel today at 4:30 PM', time: '10 mins ago', isRead: false, link: '/user/tasks' },
  { id: 3, type: 'task', title: 'Task completed', message: 'John Doe completed Sales Report task', time: 'Today, 11:20 AM', isRead: false, link: '/user/tasks' },
  { id: 4, type: 'payment', title: 'Payment received', message: 'Subscription payment of ₹5,000 successful', time: 'Yesterday', isRead: true, link: '/user/payment-plans' },
  { id: 5, type: 'call', title: 'Missed call', message: 'You missed a call from +91 98765 43210', time: 'Yesterday, 3:45 PM', isRead: true, link: '/leads' },
  { id: 6, type: 'system', title: 'System update', message: 'CRM dashboard will be under maintenance tonight', time: '2 days ago', isRead: true, link: '/settings' },
  { id: 7, type: 'deal', title: 'Deal won', message: 'Website Development deal has been marked as won', time: '3 days ago', isRead: true, link: '/user/deals' },
];

const notificationIcons: Record<string, NotificationIconInfo> = {
  lead: { icon: User, color: '#3b82f6' },
  task: { icon: ListChecks, color: '#f59e0b' },
  reminder: { icon: Calendar, color: '#8b5cf6' },
  payment: { icon: CreditCard, color: '#10b981' },
  call: { icon: PhoneCall, color: '#14b8a6' },
  system: { icon: Info, color: '#64748b' },
  deal: { icon: DollarSign, color: '#10b981' },
};

const getNotificationIcon = (type: string): NotificationIconInfo => {
  return notificationIcons[type] || { icon: Bell, color: '#64748b' };
};

const searchCategories = [
  { id: 'lead', name: 'Leads', icon: User, color: '#3b82f6' },
  { id: 'deal', name: 'Deals', icon: DollarSign, color: '#10b981' },
  { id: 'task', name: 'Tasks', icon: ListChecks, color: '#f59e0b' },
  { id: 'campaign', name: 'Campaigns', icon: Megaphone, color: '#8b5cf6' },
  { id: 'enquiry', name: 'Enquiries', icon: FileText, color: '#ec4899' },
  { id: 'call', name: 'Calls', icon: Phone, color: '#14b8a6' },
];

const searchResults = [
  { id: 1, category: 'lead', name: 'Rahul Sharma', phone: '9876543210', description: 'New Lead - Hotel' },
  { id: 2, category: 'lead', name: 'Priya Patel', phone: '9876543211', description: 'Hot Lead - Real Estate' },
  { id: 3, category: 'deal', name: 'Website Development', phone: 'DL001', description: 'Deal - ₹1,50,000' },
  { id: 4, category: 'deal', name: 'CRM Implementation', phone: 'DL002', description: 'Deal - ₹2,00,000' },
  { id: 5, category: 'task', name: 'Follow up with Rahul', phone: 'Task-001', description: 'Call Task' },
  { id: 6, category: 'campaign', name: 'Summer Sale 2026', phone: 'Campaign-001', description: 'Active Campaign' },
  { id: 7, category: 'enquiry', name: 'John Doe', phone: '9876543212', description: 'Enquiry - Demo' },
  { id: 8, category: 'call', name: 'Call Log - Priya', phone: 'Call-001', description: 'Incoming Call' },
];

const TopNav = ({ onOpenDrawer }: TopNavProps) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLButtonElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const currentUser = {
    name: 'Sharun das',
    email: 'sharun@company.com',
    role: 'Admin',
    avatar: null
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotificationsDrawer(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  interface NotificationItem {
    id: number;
    type: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    link: string;
  }

  const handleNotificationClick = (notification: NotificationItem) => {
    setNotifications((prev: NotificationItem[]) => prev.map(n => 
      n.id === notification.id ? { ...n, isRead: true } : n
    ));
    if (notification.link) {
      navigate(notification.link);
      setShowNotificationsDrawer(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentOptionIndex((prev) => (prev + 1) % addOptions.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    return searchResults.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    ).slice(0, 8);
  }, [searchQuery]);

  const currentOption = addOptions[currentOptionIndex]!;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      if (filteredResults[selectedIndex]) handleResultClick(filteredResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  interface SearchResult {
    id: number;
    category: string;
    name: string;
    phone: string;
    description: string;
  }

  const handleResultClick = (result: SearchResult) => {
    console.log('Navigate to:', result.category, result);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  interface AddOption {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number }>;
  }

  const handleAddClick = (option: AddOption) => {
    if (onOpenDrawer) {
      onOpenDrawer(option.id);
    }
    setShowAddDropdown(false);
  };

  const getCategoryIcon = (categoryId: string) => {
    const cat = searchCategories.find(c => c.id === categoryId);
    if (cat) {
      const Icon = cat.icon;
      return <Icon size={14} style={{ color: cat.color }} />;
    }
    return null;
  };

  return (
    <div className="topnav">
      <div className="search-container">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search leads, deals, tasks..."
            className="search-input dashboard-search-input"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); setSelectedIndex(-1); }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
          />
          {/* {searchQuery && (
            <button className="clear-search" onClick={() => { setSearchQuery(''); setShowSuggestions(false); }}>
              <X size={14} />
            </button>
          )} */}
        </div>

        {showSuggestions && searchQuery.length >= 2 && (
          <div className="search-suggestions">
            {filteredResults.length > 0 ? (
              <>
                <div className="suggestion-category">
                  Search Results ({filteredResults.length})
                </div>
                {filteredResults.map((result, index) => (
                  <div
                    key={result.id}
                    className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="suggestion-icon">
                      {getCategoryIcon(result.category)}
                    </div>
                    <div className="suggestion-content">
                      <div className="suggestion-name">{result.name}</div>
                      <div className="suggestion-desc">{result.description}</div>
                    </div>
                    <div className="suggestion-category-label">
                      {searchCategories.find(c => c.id === result.category)?.name}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="no-results">No results found</div>
            )}
          </div>
        )}
      </div>

      <div className="topnav-actions">
        <div className="add-button-group">
          <button className="btn-add" onClick={() => setShowAddDropdown(!showAddDropdown)}>
            <span className={`add-text-container ${isAnimating ? 'animating' : ''}`}>
              <Plus size={16} />
              <span className="add-text">Add {currentOption.name}</span>
            </span>
          </button>
          <button className="btn-add-dropdown" onClick={() => setShowAddDropdown(!showAddDropdown)}>
            <ChevronDown size={14} />
          </button>
          {showAddDropdown && (
            <div className="add-dropdown">
              {addOptions.map(option => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.id}
                    className="add-dropdown-item"
                    onClick={() => handleAddClick(option)}
                  >
                    <Icon size={14} />
                    <span>Add {option.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

<div className="icon-btn-container">
          <button 
            className="icon-btn notification-btn" 
            ref={notificationsRef}
            onClick={() => setShowNotificationsDrawer(!showNotificationsDrawer)}
          >
            <Bell size={18} className="bell-icon" />
            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
        </div>

        {showNotificationsDrawer && (
          <div className="notifications-drawer">
            <div className="notifications-backdrop" onClick={() => setShowNotificationsDrawer(false)} />
            <div className="notifications-panel">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <div className="notifications-header-actions">
                  {unreadCount > 0 && (
                    <button className="mark-all-read" onClick={handleMarkAllRead}>
                      <Check size={14} />
                      <span>Mark all read</span>
                    </button>
                  )}
                  <button className="notifications-close" onClick={() => setShowNotificationsDrawer(false)}>
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="notifications-list">
                {notifications.map(notification => {
                  const { icon: Icon, color } = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="notification-indicator" style={{ backgroundColor: color }} />
                      <div className="notification-icon" style={{ backgroundColor: `${color}15`, color }}>
                        <Icon size={16} />
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-message">{notification.message}</div>
                        <div className="notification-time">{notification.time}</div>
                      </div>
                      {!notification.isRead && <div className="notification-dot" />}
                    </div>
                  );
                })}
              </div>
              <div className="notifications-footer">
                <button className="view-all-btn" onClick={() => navigate('/notifications')}>
                  View All Notifications
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="user-profile" ref={profileRef}>
          <div
            className="user-profile-trigger"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div className="avatar">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} />
              ) : (
                <UserIcon />
              )}
            </div>
            <span className="user-name">{currentUser.name}</span>
            <ChevronDown size={14} className="dropdown-icon" />
          </div>

          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-avatar-large">
                  <UserIcon />
                </div>
                <div className="profile-info">
                  <div className="profile-name">{currentUser.name}</div>
                  <div className="profile-email">{currentUser.email}</div>
                  <div className="profile-role">{currentUser.role}</div>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              <div className="profile-dropdown-links">
                <div className="profile-dropdown-item" onClick={() => navigate('/account/profile')}>
                  <UserCircle size={16} />
                  <span>My Profile</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/account')}>
                  <Settings size={16} />
                  <span>Account Settings</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/setup')}>
                  <Layout size={16} />
                  <span>Setup</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/settings/staff')}>
                  <Users size={16} />
                  <span>Team Management</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/settings/notifications')}>
                  <Bell size={16} />
                  <span>Notifications</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/settings/billing')}>
                  <CreditCard size={16} />
                  <span>Billing</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/settings/security')}>
                  <Shield size={16} />
                  <span>Security</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/settings/help')}>
                  <HelpCircle size={16} />
                  <span>Help Center</span>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              <div className="profile-dropdown-footer">
                <div className="profile-dropdown-item logout-item" onClick={() => console.log('Logout')}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => console.log('Switch Workspace')}>
                  <Building size={16} />
                  <span>Switch Workspace</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default TopNav;