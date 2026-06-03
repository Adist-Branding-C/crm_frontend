import type { ReactNode, ComponentType } from 'react';

export interface BreadcrumbItem {
  label: string;
  link?: string | null;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  breadcrumb?: BreadcrumbItem[] | false;
}

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export interface NotificationIconInfo {
  icon: ComponentType<{ size?: number }>;
  color: string;
}

export interface TopNavProps {
  onOpenDrawer: (type: string) => void;
}

export interface TabItem {
  id: string;
  title: string;
  link: string;
  icon: ComponentType<{ size?: number }>;
}

export interface SettingsTabsProps {
  items?: TabItem[];
}
