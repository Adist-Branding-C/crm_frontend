import type { Agent, DealType, Stage, Deal } from '../types';

export const salesAgents: Agent[] = [
  { id: 1, name: 'All Agents' },
  { id: 2, name: 'John Doe' },
  { id: 3, name: 'Jane Smith' },
  { id: 4, name: 'Mike Johnson' },
  { id: 5, name: 'Emily Brown' },
];

export const dealTypes: DealType[] = [
  { id: 1, name: 'All Types' },
  { id: 2, name: 'New Business' },
  { id: 3, name: 'Renewal' },
  { id: 4, name: 'Expansion' },
  { id: 5, name: 'Upsell' },
];

export const pipelineStages: Stage[] = [
  { id: 1, name: 'New Lead', color: '#6366f1' },
  { id: 2, name: 'Qualified', color: '#8b5cf6' },
  { id: 3, name: 'Meeting Scheduled', color: '#06b6d4' },
  { id: 4, name: 'Proposal Sent', color: '#f59e0b' },
  { id: 5, name: 'Negotiation', color: '#f97316' },
  { id: 6, name: 'Closed Won', color: '#10b981' },
  { id: 7, name: 'Closed Lost', color: '#ef4444' },
];

export const sampleDeals: Deal[] = [
  { id: 1, title: 'TechCorp Enterprise Deal', value: 45000, stage: 1, contact: 'John Doe', company: 'TechCorp', probability: 20, nextAction: 'Follow up call', dueDate: '2025-05-15' },
  { id: 2, title: 'Startup Growth Package', value: 12000, stage: 2, contact: 'Sarah Smith', company: 'StartupXYZ', probability: 40, nextAction: 'Send proposal', dueDate: '2025-05-18' },
  { id: 3, title: 'Annual Contract Renewal', value: 28000, stage: 3, contact: 'Mike Johnson', company: 'GlobalTech', probability: 60, nextAction: 'Demo meeting', dueDate: '2025-05-20' },
  { id: 4, title: 'Enterprise License', value: 95000, stage: 4, contact: 'Emily Brown', company: 'MegaCorp', probability: 70, nextAction: 'Review terms', dueDate: '2025-05-22' },
  { id: 5, title: 'SMB Package Deal', value: 8500, stage: 5, contact: 'David Lee', company: 'SmallBiz Inc', probability: 85, nextAction: 'Contract review', dueDate: '2025-05-25' },
  { id: 6, title: 'Consulting Services', value: 15000, stage: 6, contact: 'Lisa Anderson', company: 'ConsultPro', probability: 100, nextAction: 'Sign contract', dueDate: '2025-05-10' },
  { id: 7, title: 'Marketing Agency Deal', value: 6500, stage: 7, contact: 'James Wilson', company: 'AdAgency', probability: 0, nextAction: 'Lost - Budget', dueDate: '2025-04-28' },
  { id: 8, title: 'Retail POS System', value: 22000, stage: 1, contact: 'Amanda Lee', company: 'ShopMart', probability: 15, nextAction: 'Initial call', dueDate: '2025-05-16' },
  { id: 9, title: 'Cloud Migration', value: 35000, stage: 2, contact: 'Chris Taylor', company: 'DataFlow', probability: 35, nextAction: 'Discovery call', dueDate: '2025-05-19' },
  { id: 10, title: 'Security Software', value: 18000, stage: 4, contact: 'Rachel Kim', company: 'SecureNet', probability: 65, nextAction: 'Send quote', dueDate: '2025-05-21' },
];
