import { LayoutDashboard, MessageCircle, Bell, Flame, DollarSign, Kanban, ListChecks, Calendar, Activity, Megaphone, FileText, BarChart3, Building } from 'lucide-react';

export const menuItems = [
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
