/**
 * Primary application navigation.
 *
 * Renders as one of three presentations driven entirely by `useSidebar`:
 *  - expanded rail (default): logo + wordmark, grouped icon/label links
 *  - collapsed rail: icon-only, with a floating label tooltip on hover/focus
 *  - mobile overlay: full-width drawer with a backdrop and a fixed open trigger
 *
 * This component is render-only; all state lives in `useSidebar`.
 */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronsLeft, Menu, X } from 'lucide-react';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useSidebar } from '../../hooks/useSidebar';
import {
  sidebarAdminItem,
  sidebarNavGroups,
  sidebarSettingsItem,
} from '../../constants/sidebar';
import type { SidebarNavGroup, SidebarNavItem } from '../../types/layout';
import './Sidebar.css';

interface TooltipTarget {
  label: string;
  top: number;
}

interface SidebarLinkProps {
  item: SidebarNavItem;
  collapsed: boolean;
  onNavigate: () => void;
  onPeek: (label: string) => (event: React.SyntheticEvent<HTMLElement>) => void;
  onPeekEnd: () => void;
}

const SidebarLink = ({ item, collapsed, onNavigate, onPeek, onPeekEnd }: SidebarLinkProps) => {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      end={item.path === sidebarSettingsItem.path}
      className={({ isActive }) => `sidebar-item${isActive ? ' is-active' : ''}`}
      aria-label={item.label}
      onClick={onNavigate}
      onMouseEnter={onPeek(item.label)}
      onMouseLeave={onPeekEnd}
      onFocus={onPeek(item.label)}
      onBlur={onPeekEnd}
    >
      <span className="sidebar-item__icon">
        <Icon size={20} />
      </span>
      <span className="sidebar-item__label">{item.label}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const { user } = useAuth();
  const { collapsed, isMobile, mobileOpen, toggleCollapsed, openMobile, closeMobile } = useSidebar();
  const [tooltip, setTooltip] = useState<TooltipTarget | null>(null);

  const groups: SidebarNavGroup[] = user?.isSuperAdmin
    ? [...sidebarNavGroups, { heading: 'Admin', items: [sidebarAdminItem] }]
    : sidebarNavGroups;

  const handlePeek = (label: string) => (event: React.SyntheticEvent<HTMLElement>) => {
    if (!collapsed) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({ label, top: rect.top + rect.height / 2 });
  };
  const handlePeekEnd = () => setTooltip(null);

  const linkProps = {
    collapsed,
    onNavigate: closeMobile,
    onPeek: handlePeek,
    onPeekEnd: handlePeekEnd,
  };

  return (
    <>
      {isMobile && !mobileOpen && (
        <button
          type="button"
          className="sidebar-trigger"
          onClick={openMobile}
          aria-label="Open navigation"
          aria-controls="primary-sidebar"
          aria-expanded={mobileOpen}
        >
          <Menu size={20} />
        </button>
      )}

      {isMobile && mobileOpen && (
        <div className="sidebar-backdrop" onClick={closeMobile} aria-hidden="true" />
      )}

      <aside
        id="primary-sidebar"
        className="sidebar"
        data-collapsed={collapsed}
        data-mobile={isMobile}
        data-open={mobileOpen}
      >
        <div className="sidebar__header">
          <NavLink to="/dashboard" className="sidebar__brand" onClick={closeMobile} aria-label="Go to dashboard">
            <img src="/logo.png" alt="" className="sidebar__logo" />
          </NavLink>

          {isMobile ? (
            <button type="button" className="sidebar__icon-btn" onClick={closeMobile} aria-label="Close navigation">
              <X size={18} />
            </button>
          ) : (
            <button
              type="button"
              className="sidebar__icon-btn sidebar__collapse-btn"
              onClick={toggleCollapsed}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-pressed={collapsed}
            >
              <ChevronsLeft size={18} />
            </button>
          )}
        </div>

        <nav className="sidebar__nav" aria-label="Primary">
          {groups.map((group) => (
            <div className="sidebar__group" key={group.heading}>
              <p className="sidebar__group-heading">{group.heading}</p>
              {group.items.map((item) => (
                <SidebarLink key={item.path} item={item} {...linkProps} />
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <SidebarLink item={sidebarSettingsItem} {...linkProps} />
        </div>
      </aside>

      {tooltip && (
        <div className="sidebar-tooltip" role="tooltip" style={{ top: tooltip.top }}>
          {tooltip.label}
        </div>
      )}
    </>
  );
};

export default Sidebar;
