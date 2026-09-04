/**
 * Primary navigation configuration for the dashboard sidebar.
 *
 * The sidebar renders these groups in order. Items map 1:1 to routes registered
 * in `src/routes`; keep the two in sync when adding or removing a destination.
 * Role-gated destinations (e.g. Companies) are appended by the Sidebar component
 * itself so this file stays a plain, declarative manifest.
 */
import {
  LayoutDashboard,
  MessageCircle,
  DollarSign,
  Kanban,
  ListChecks,
  Calendar,
  Activity,
  Megaphone,
  FileText,
  BarChart3,
  Building,
  Settings,
} from 'lucide-react';
import type { SidebarNavGroup, SidebarNavItem } from '../types/layout';

/** localStorage key persisting the user's collapsed/expanded preference. */
export const SIDEBAR_COLLAPSED_STORAGE_KEY = 'adist:sidebar-collapsed';

/** Viewport width at or below which the sidebar switches to an overlay drawer. */
export const SIDEBAR_MOBILE_QUERY = '(max-width: 900px)';

export const sidebarNavGroups: SidebarNavGroup[] = [
  {
    heading: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: MessageCircle, label: 'Leads', path: '/leads' },
      { icon: DollarSign, label: 'Deals', path: '/user/deals' },
      { icon: Kanban, label: 'Sales Pipeline', path: '/sales-pipeline' },
      { icon: ListChecks, label: 'Tasks', path: '/user/tasks' },
      { icon: Calendar, label: 'Calendar', path: '/calendar' },
      { icon: Activity, label: 'Daily Activity', path: '/daily-activity' },
    ],
  },
  {
    heading: 'Growth',
    items: [
      { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
      { icon: FileText, label: 'Reports', path: '/reports' },
      { icon: BarChart3, label: 'Staff Performance', path: '/staff-performance' },
    ],
  },
];

/** Appended to a dedicated "Admin" group for super admins only. */
export const sidebarAdminItem: SidebarNavItem = { icon: Building, label: 'Companies', path: '/companies' };

/** Rendered in the pinned sidebar footer, separate from the scrolling nav list. */
export const sidebarSettingsItem: SidebarNavItem = { icon: Settings, label: 'Settings', path: '/settings' };
