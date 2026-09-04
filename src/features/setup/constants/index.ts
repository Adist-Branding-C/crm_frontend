import type { Stage } from '../types';

export const DEFAULT_STAGES: Stage[] = [
  { id: 1, name: 'New Lead', color: 'var(--primary)' },
  { id: 2, name: 'Initial Contact', color: 'var(--category-purple-text)' },
  { id: 3, name: 'Needs Identified', color: '#a855f7' },
  { id: 4, name: 'Proposal Sent', color: '#d946ef' },
  { id: 5, name: 'Follow Up 1', color: 'var(--category-pink-text)' },
  { id: 6, name: 'Follow Up 2', color: '#f43f5e' },
  { id: 7, name: 'Demo Scheduled', color: 'var(--category-orange-text)' },
  { id: 8, name: 'Demo Completed', color: 'var(--warning)' },
  { id: 9, name: 'Quote Sent', color: '#eab308' },
  { id: 10, name: 'Negotiation', color: '#84cc16' },
  { id: 11, name: 'Meeting Booked', color: 'var(--success)' },
  { id: 12, name: 'Contract Sent', color: 'var(--success)' },
  { id: 13, name: 'Payment Pending', color: 'var(--chart-6)' },
  { id: 14, name: 'Payment Received', color: 'var(--chart-6)' },
  { id: 15, name: 'Converted', color: 'var(--success)' },
];
