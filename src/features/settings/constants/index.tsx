import { Settings, Users, DollarSign, Clock, CreditCard, Link as LinkIcon, Kanban, Workflow } from 'lucide-react';

export const settingsItems = [
  { id: 'account', title: 'Account', description: 'Manage your login credentials, settings, and preferences', link: '/account', icon: <Settings size={24} /> },
  { id: 'leads', title: 'Lead Settings', description: 'Configure status, source, purpose, and custom fields for seamless management', link: '/settings/lead-settings/types', icon: <Users size={24} /> },
  { id: 'deals', title: 'Deal Settings', description: 'Adjust Deal settings, and custom fields for streamlined management', link: '/user/deal-types', icon: <DollarSign size={24} /> },
  { id: 'tasks', title: 'Task Settings', description: 'Organize task categories, priorities, and customizations for improved productivity', link: '/user/call_status', icon: <Clock size={24} /> },
  { id: 'custom-pipeline', title: 'Custom Pipeline', description: 'Define custom pipeline structures and grouping for leads, deals, and tasks', link: '/settings/custom-pipeline', icon: <Kanban size={24} /> },
  { id: 'automation', title: 'Automation Rules', description: 'Automate lead assignment, tasks, notifications, and webhooks', link: '/automation-rules', icon: <Workflow size={24} /> },
  { id: 'subscriptions', title: 'Subscriptions', description: 'View, modify, or cancel your active services and memberships', link: '/user/payment-plans', icon: <CreditCard size={24} /> },
  { id: 'connect', title: 'Connect', description: 'Connect your third-party integrations to Leadist', link: '/user/connect', icon: <LinkIcon size={24} /> },
];
