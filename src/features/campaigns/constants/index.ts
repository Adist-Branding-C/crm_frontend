import type { Campaign } from '../types';

export const SAMPLE_CAMPAIGNS: Campaign[] = [
  { id: 1, slNo: 1, name: 'Q1 Promo Campaign', type: 'Email', totalTasks: 150, completedTasks: 120, completedPercent: 80, createdBy: 'Admin', createdAt: '2024-01-10' },
  { id: 2, slNo: 2, name: 'New Year Sale', type: 'SMS', totalTasks: 200, completedTasks: 180, completedPercent: 90, createdBy: 'Admin', createdAt: '2024-01-08' },
  { id: 3, slNo: 3, name: 'Product Launch', type: 'WhatsApp', totalTasks: 100, completedTasks: 45, completedPercent: 45, createdBy: 'John Doe', createdAt: '2024-01-05' },
  { id: 4, slNo: 4, name: 'Winter Sale', type: 'Email', totalTasks: 250, completedTasks: 250, completedPercent: 100, createdBy: 'Admin', createdAt: '2024-01-02' },
  { id: 5, slNo: 5, name: 'Referral Drive', type: 'Social', totalTasks: 80, completedTasks: 20, completedPercent: 25, createdBy: 'Jane Smith', createdAt: '2023-12-28' },
];
