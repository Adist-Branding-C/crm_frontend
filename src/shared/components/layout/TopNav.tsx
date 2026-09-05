

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Bell, Plus, ChevronDown, X, User, DollarSign, ListChecks, Megaphone,
  UserCircle, Settings, HelpCircle, LogOut, Building, Check, Calendar, AlertCircle,
  Info, Sun, Moon, Monitor,
} from 'lucide-react';
import type { NotificationIconInfo, TopNavProps } from '../../types/layout';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import type { ThemeMode } from '../../constants/theme';
import { useCommandPalette } from '../../hooks/useCommandPalette';
import { useCurrentStaff } from '../../../features/account-settings/agent/hooks/useCurrentStaff';
import { useNotifications } from '../../../features/notifications/hooks/useNotifications';
import { NotificationType } from '../../../features/notifications/types';
import type { NotificationItem } from '../../../features/notifications/types';
import { tint } from '../../utils/color';
import CommandPalette from './CommandPalette';
import './TopNav.css';

const addOptions = [
  { id: 'lead', name: 'Lead', icon: User },
  { id: 'deal', name: 'Deal', icon: DollarSign },
  { id: 'task', name: 'Task', icon: ListChecks },
  { id: 'campaign', name: 'Campaign', icon: Megaphone },
];

const themeOptions: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

const notificationIcons: Record<string, NotificationIconInfo> = {
  [NotificationType.NEW_LEAD_ASSIGNED]: { icon: User, color: 'var(--info)' },
  [NotificationType.TASK_ASSIGNED]: { icon: ListChecks, color: 'var(--warning)' },
  [NotificationType.FOLLOWUP_REMINDER]: { icon: Calendar, color: 'var(--category-purple-text)' },
  [NotificationType.DEAL_WON]: { icon: DollarSign, color: 'var(--success)' },
  [NotificationType.DEAL_LOST]: { icon: AlertCircle, color: 'var(--danger)' },
  [NotificationType.AUTOMATION_DIGEST]: { icon: Info, color: 'var(--text-tertiary)' },
};

const getNotificationIcon = (type: string): NotificationIconInfo =>
  notificationIcons[type] || { icon: Bell, color: 'var(--text-tertiary)' };

const isMac = typeof navigator !== 'undefined' && /Mac|iP(hone|ad|od)/.test(navigator.userAgent);

const TopNav = ({ onOpenDrawer }: TopNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { currentStaff, isLoading: isStaffLoading, clearCurrentStaff } = useCurrentStaff();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { mode: themeMode, setMode: setThemeMode } = useTheme();
  const palette = useCommandPalette();

  const [openMenu, setOpenMenu] = useState<null | 'new' | 'notif' | 'profile'>(null);
  const barRef = useRef<HTMLElement>(null);

  const currentUser = {
    name: currentStaff?.name ?? '',
    email: currentStaff?.email ?? '',
    role: currentStaff?.isSuperAdmin ? 'SUPER ADMIN' : currentStaff?.isAdmin ? 'ADMIN' : 'STAFF',
    avatar: null as string | null,
    initial: currentStaff?.name ? currentStaff.name.charAt(0).toUpperCase() : '',
  };

  const handleLogout = () => {
    clearCurrentStaff();
    logout();
  };

  useEffect(() => {
    const onDown = (event: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  useEffect(() => setOpenMenu(null), [location.pathname]);

  const handleQuickCreate = (id: string) => {
    setOpenMenu(null);
    onOpenDrawer?.(id);
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.isRead) markAsRead([notification.id]);
    let link = notification.link;
    if (!link) {
      if (notification.type === NotificationType.TASK_ASSIGNED) link = '/tasks';
      else if (notification.type === NotificationType.DEAL_WON || notification.type === NotificationType.DEAL_LOST) link = '/deals';
      else link = '/leads';
    }
    setOpenMenu(null);
    navigate(link);
  };

  return (
    <header className="topnav" ref={barRef}>
      <button
        type="button"
        className="topnav__command"
        onClick={palette.open}
        aria-haspopup="dialog"
        aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
      >
        <Search size={18} className="topnav__command-icon" />
        <span className="topnav__command-text">Search, create, or jump to&hellip;</span>
        <kbd className="topnav__kbd">{isMac ? '⌘' : 'Ctrl'} K</kbd>
      </button>

      <div className="topnav__actions">
        <div className="topnav__menu-anchor">
          <button
            type="button"
            className="topnav__new"
            onClick={() => setOpenMenu((m) => (m === 'new' ? null : 'new'))}
            aria-haspopup="menu"
            aria-expanded={openMenu === 'new'}
          >
            <Plus size={16} />
            <span className="topnav__new-label">New</span>
            <ChevronDown size={14} className={`topnav__new-caret${openMenu === 'new' ? ' is-open' : ''}`} />
          </button>
          {openMenu === 'new' && (
            <div className="topnav__pop topnav__pop--menu" role="menu">
              {addOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="menuitem"
                    className="topnav__menu-item"
                    onClick={() => handleQuickCreate(option.id)}
                  >
                    <Icon size={15} />
                    <span>New {option.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="topnav__menu-anchor">
          <button
            type="button"
            className="topnav__icon-btn"
            onClick={() => setOpenMenu((m) => (m === 'notif' ? null : 'notif'))}
            aria-haspopup="dialog"
            aria-expanded={openMenu === 'notif'}
            aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="topnav__badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
            )}
          </button>
          {openMenu === 'notif' && (
            <div className="topnav__pop topnav__pop--notif" role="dialog" aria-label="Notifications">
              <div className="notif-head">
                <span className="notif-head-title">Notifications</span>
                <div className="notif-head-actions">
                  {unreadCount > 0 && (
                    <button type="button" className="notif-mark" onClick={() => markAllAsRead()}>
                      <Check size={13} /> Mark all read
                    </button>
                  )}
                  <button type="button" className="notif-close" aria-label="Close" onClick={() => setOpenMenu(null)}>
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div className="notif-empty">You&rsquo;re all caught up</div>
                ) : (
                  notifications.slice(0, 12).map((notification) => {
                    const { icon: Icon, color } = getNotificationIcon(notification.type);
                    return (
                      <button
                        key={notification.id}
                        type="button"
                        className={`notif-item${!notification.isRead ? ' is-unread' : ''}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <span className="notif-item-icon" style={{ backgroundColor: tint(color, 14), color }}>
                          <Icon size={15} />
                        </span>
                        <span className="notif-item-body">
                          <span className="notif-item-title">{notification.title}</span>
                          <span className="notif-item-msg">{notification.notification}</span>
                          <span className="notif-item-time">
                            {notification.time ? new Date(notification.time).toLocaleString() : ''}
                          </span>
                        </span>
                        {!notification.isRead && <span className="notif-item-dot" />}
                      </button>
                    );
                  })
                )}
              </div>
              {/* Hidden: Notification Settings page disabled per client request (2026-09-04) */}
              {/* <button
                type="button"
                className="notif-foot"
                onClick={() => { setOpenMenu(null); navigate('/user/notifications-users'); }}
              >
                View all notifications
              </button> */}
            </div>
          )}
        </div>

        <div className="topnav__menu-anchor user-profile">
          <button
            type="button"
            className="user-profile-trigger"
            onClick={() => setOpenMenu((m) => (m === 'profile' ? null : 'profile'))}
            aria-haspopup="menu"
            aria-expanded={openMenu === 'profile'}
          >
            {isStaffLoading ? (
              <>
                <span className="avatar avatar-skeleton" />
                <span className="user-name user-name-skeleton" />
              </>
            ) : (
              <>
                <span className="avatar">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="" />
                  ) : currentUser.initial ? (
                    <span className="avatar-initial">{currentUser.initial}</span>
                  ) : (
                    <UserIcon />
                  )}
                </span>
                <span className="user-name">{currentUser.name}</span>
              </>
            )}
            <ChevronDown size={14} className="dropdown-icon" />
          </button>

          {openMenu === 'profile' && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-avatar-large">
                  {currentUser.initial ? <span className="avatar-initial">{currentUser.initial}</span> : <UserIcon />}
                </div>
                <div className="profile-info">
                  <div className="profile-name">{currentUser.name}</div>
                  <div className="profile-email">{currentUser.email}</div>
                  <div className="profile-role">{currentUser.role}</div>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              <div className="profile-dropdown-links">
                <button type="button" className="profile-dropdown-item" onClick={() => { setOpenMenu(null); navigate('/account/profile'); }}>
                  <UserCircle size={16} />
                  <span>My Profile</span>
                </button>
                <button type="button" className="profile-dropdown-item" onClick={() => { setOpenMenu(null); navigate('/account'); }}>
                  <Settings size={16} />
                  <span>Account Settings</span>
                </button>
                <button type="button" className="profile-dropdown-item" onClick={() => { setOpenMenu(null); navigate('/settings/help'); }}>
                  <HelpCircle size={16} />
                  <span>Help Center</span>
                </button>
              </div>

              <div className="profile-dropdown-divider" />

              <div className="profile-theme" role="group" aria-label="Appearance">
                <span className="profile-theme__label">Appearance</span>
                <div className="profile-theme__options">
                  {themeOptions.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      className={`profile-theme__option${themeMode === value ? ' is-active' : ''}`}
                      aria-pressed={themeMode === value}
                      onClick={() => setThemeMode(value)}
                    >
                      <Icon size={15} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              <div className="profile-dropdown-footer">
                <button type="button" className="profile-dropdown-item logout-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
                <button type="button" className="profile-dropdown-item" onClick={() => navigate('/companies')}>
                  <Building size={16} />
                  <span>Switch Workspace</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CommandPalette isOpen={palette.isOpen} onClose={palette.close} onQuickCreate={(t) => onOpenDrawer?.(t)} />
    </header>
  );
};

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default TopNav;
