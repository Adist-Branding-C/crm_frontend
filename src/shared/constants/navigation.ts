import { Settings, Tag, Layers, Activity, Target, User, DollarSign, ListChecks, Megaphone, Bell, Calendar, CreditCard, Info, PhoneCall, FileText, Phone, Search } from 'lucide-react';
import type { TabItem, NotificationIconInfo } from '../types/layout';

export const addOptions = [
  { id: 'lead', name: 'Lead', icon: User },
  { id: 'deal', name: 'Deal', icon: DollarSign },
  { id: 'task', name: 'Task', icon: ListChecks },
  { id: 'campaign', name: 'Campaign', icon: Megaphone },
];

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  link: string;
}

export const initialNotifications: Notification[] = [
  { id: 1, type: 'lead', title: 'New lead assigned', message: 'Rahul Sharma has been assigned to you', time: '2 mins ago', isRead: false, link: '/leads' },
  { id: 2, type: 'reminder', title: 'Follow-up reminder', message: 'Call Priya Patel today at 4:30 PM', time: '10 mins ago', isRead: false, link: '/user/tasks' },
  { id: 3, type: 'task', title: 'Task completed', message: 'John Doe completed Sales Report task', time: 'Today, 11:20 AM', isRead: false, link: '/user/tasks' },
  { id: 4, type: 'payment', title: 'Payment received', message: 'Subscription payment of ₹5,000 successful', time: 'Yesterday', isRead: true, link: '/user/payment-plans' },
  { id: 5, type: 'call', title: 'Missed call', message: 'You missed a call from +91 98765 43210', time: 'Yesterday, 3:45 PM', isRead: true, link: '/leads' },
  { id: 6, type: 'system', title: 'System update', message: 'CRM dashboard will be under maintenance tonight', time: '2 days ago', isRead: true, link: '/settings' },
  { id: 7, type: 'deal', title: 'Deal won', message: 'Website Development deal has been marked as won', time: '3 days ago', isRead: true, link: '/user/deals' },
];

export const notificationIcons: Record<string, NotificationIconInfo> = {
  lead: { icon: User, color: 'var(--info)' },
  task: { icon: ListChecks, color: 'var(--warning)' },
  reminder: { icon: Calendar, color: 'var(--category-purple-text)' },
  payment: { icon: CreditCard, color: 'var(--success)' },
  call: { icon: PhoneCall, color: 'var(--chart-6)' },
  system: { icon: Info, color: 'var(--text-tertiary)' },
  deal: { icon: DollarSign, color: 'var(--success)' },
};

export const searchCategories = [
  { id: 'lead', name: 'Leads', icon: User, color: 'var(--info)' },
  { id: 'deal', name: 'Deals', icon: DollarSign, color: 'var(--success)' },
  { id: 'task', name: 'Tasks', icon: ListChecks, color: 'var(--warning)' },
  { id: 'campaign', name: 'Campaigns', icon: Megaphone, color: 'var(--category-purple-text)' },
  { id: 'enquiry', name: 'Enquiries', icon: FileText, color: 'var(--category-pink-text)' },
  { id: 'call', name: 'Calls', icon: Phone, color: 'var(--chart-6)' },
];

export const searchResults = [
  { id: 1, category: 'lead', name: 'Rahul Sharma', phone: '9876543210', description: 'New Lead - Hotel' },
  { id: 2, category: 'lead', name: 'Priya Patel', phone: '9876543211', description: 'Hot Lead - Real Estate' },
  { id: 3, category: 'deal', name: 'Website Development', phone: 'DL001', description: 'Deal - ₹1,50,000' },
  { id: 4, category: 'deal', name: 'CRM Implementation', phone: 'DL002', description: 'Deal - ₹2,00,000' },
  { id: 5, category: 'task', name: 'Follow up with Rahul', phone: 'Task-001', description: 'Call Task' },
  { id: 6, category: 'campaign', name: 'Summer Sale 2026', phone: 'Campaign-001', description: 'Active Campaign' },
  { id: 7, category: 'enquiry', name: 'John Doe', phone: '9876543212', description: 'Enquiry - Demo' },
  { id: 8, category: 'call', name: 'Call Log - Priya', phone: 'Call-001', description: 'Incoming Call' },
];

export const leadTabs: TabItem[] = [
  // { id: 'lead', title: 'Lead', link: '/settings', icon: Settings },
  { id: 'types', title: 'Type', link: '/settings/lead-settings/types', icon: Tag },
  { id: 'source', title: 'Lead Source', link: '/settings/lead-settings/source', icon: Layers },
  { id: 'status', title: 'Lead Status', link: '/settings/lead-settings/status', icon: Activity },
  { id: 'purpose', title: 'Lead Purpose', link: '/settings/lead-settings/purpose', icon: Target },
];
