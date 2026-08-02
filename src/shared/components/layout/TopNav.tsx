import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Grid, Plus, ChevronDown, X, User, DollarSign, ListChecks, Megaphone, UserCircle, Settings, Users, CreditCard, HelpCircle, LogOut, Building, Check, PhoneCall, Calendar, AlertCircle, Info, Layout, Link as LinkIcon, Clock } from 'lucide-react';
import type { NotificationIconInfo, TopNavProps } from '../../types/layout';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';
import { useRecentSearches } from '../../hooks/useRecentSearches';
import { useGlobalLeadSearch } from '../../../features/enquiries/hooks/useGlobalLeadSearch';
import type { LeadSearchApiItem } from '../../../features/enquiries/types/response';
import { useNotifications } from '../../../features/notifications/hooks/useNotifications';
import { NotificationType } from '../../../features/notifications/types';
import './TopNav.css';

const addOptions = [
  { id: 'lead', name: 'Lead', icon: User },
  { id: 'deal', name: 'Deal', icon: DollarSign },
  { id: 'task', name: 'Task', icon: ListChecks },
  { id: 'campaign', name: 'Campaign', icon: Megaphone },
];

const notificationIcons: Record<string, NotificationIconInfo> = {
  [NotificationType.NEW_LEAD_ASSIGNED]: { icon: User, color: '#3b82f6' },
  [NotificationType.TASK_ASSIGNED]: { icon: ListChecks, color: '#f59e0b' },
  [NotificationType.FOLLOWUP_REMINDER]: { icon: Calendar, color: '#8b5cf6' },
  [NotificationType.DEAL_WON]: { icon: DollarSign, color: '#10b981' },
  [NotificationType.DEAL_LOST]: { icon: AlertCircle, color: '#ef4444' },
  [NotificationType.AUTOMATION_DIGEST]: { icon: Info, color: '#64748b' },
};

const getNotificationIcon = (type: string): NotificationIconInfo => {
  return notificationIcons[type] || { icon: Bell, color: '#64748b' };
};

const TopNav = ({ onOpenDrawer }: TopNavProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [committedQuery, setCommittedQuery] = useState('');
  const { searchValue: searchQuery, handleSearchChange: setSearchQuery, resetSearch } = useDebouncedSearch(setCommittedQuery);
  const { results: searchResults, isLoading: isSearchLoading } = useGlobalLeadSearch(committedQuery);
  const { recent: recentSearches, addRecent } = useRecentSearches();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLButtonElement>(null);
  const notificationsDrawerRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);


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
      if (
        notificationsRef.current && 
        !notificationsRef.current.contains(event.target as Node) &&
        notificationsDrawerRef.current &&
        !notificationsDrawerRef.current.contains(event.target as Node)
      ) {
        setShowNotificationsDrawer(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    markAllAsRead();
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.isRead) {
      markAsRead([notification.id]);
    }
    
    let link = notification.link;
    if (!link) {
      switch (notification.type) {
        case NotificationType.NEW_LEAD_ASSIGNED:
        case NotificationType.FOLLOWUP_REMINDER:
          link = '/leads';
          break;
        case NotificationType.TASK_ASSIGNED:
          link = '/tasks';
          break;
        case NotificationType.DEAL_WON:
        case NotificationType.DEAL_LOST:
          link = '/deals';
          break;
        default:
          break;
      }
    }

    if (link) {
      navigate(link);
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

  const currentOption = addOptions[currentOptionIndex]!;

  const navigateToLead = (phone: string) => {
    navigate(`/leads?search=${encodeURIComponent(phone)}`);
  };

  const handleResultClick = (result: LeadSearchApiItem) => {
    addRecent({ id: result.id, name: result.name, phone: result.phone });
    setSearchQuery('');
    resetSearch();
    setShowSuggestions(false);
    navigateToLead(result.phone);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      if (searchResults[selectedIndex]) handleResultClick(searchResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
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

  return (
    <div className="topnav">
      <div className="search-container" ref={searchContainerRef}>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search leads..."
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
            {isSearchLoading ? (
              <div className="no-results">Searching...</div>
            ) : searchResults.length > 0 ? (
              <>
                <div className="suggestion-category">
                  Leads ({searchResults.length})
                </div>
                {searchResults.map((result, index) => (
                  <div
                    key={result.id}
                    className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="suggestion-icon">
                      <User size={14} style={{ color: '#3b82f6' }} />
                    </div>
                    <div className="suggestion-content">
                      <div className="suggestion-name">{result.name}</div>
                      <div className="suggestion-desc">{result.phone}{result.source ? ` • ${result.source}` : ''}</div>
                    </div>
                    {result.status && (
                      <div className="suggestion-category-label">{result.status}</div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="no-results">No results found</div>
            )}
          </div>
        )}

        {showSuggestions && searchQuery.length < 2 && recentSearches.length > 0 && (
          <div className="search-suggestions">
            <div className="suggestion-category">Recent</div>
            {recentSearches.map((entry) => (
              <div
                key={entry.id}
                className="suggestion-item"
                onClick={() => { setShowSuggestions(false); navigateToLead(entry.phone); }}
              >
                <div className="suggestion-icon">
                  <Clock size={14} style={{ color: '#6b7280' }} />
                </div>
                <div className="suggestion-content">
                  <div className="suggestion-name">{entry.name}</div>
                  <div className="suggestion-desc">{entry.phone}</div>
                </div>
              </div>
            ))}
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
            <div className="notifications-panel" ref={notificationsDrawerRef}>
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
                        <div className="notification-message">{notification.notification}</div>
                        <div className="notification-time">{notification.time ? new Date(notification.time).toLocaleString() : ''}</div>
                      </div>
                      {!notification.isRead && <div className="notification-dot" />}
                    </div>
                  );
                })}
              </div>
              <div className="notifications-footer">
                <button className="view-all-btn" onClick={() => navigate('/user/notifications-users')}>
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
                <div className="profile-dropdown-item" onClick={() => navigate('/user/connect')}>
                  <LinkIcon size={16} />
                  <span>Connect</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/settings/staff')}>
                  <Users size={16} />
                  <span>Team Management</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/user/notifications-users')}>
                  <Bell size={16} />
                  <span>Notifications</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/settings/billing')}>
                  <CreditCard size={16} />
                  <span>Billing</span>
                </div>
                <div className="profile-dropdown-item" onClick={() => navigate('/settings/help')}>
                  <HelpCircle size={16} />
                  <span>Help Center</span>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              <div className="profile-dropdown-footer">
                <div className="profile-dropdown-item logout-item" onClick={() => logout()}>
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