import type { Agent, CalendarTask } from '../types';

export const AGENTS: Agent[] = [
  { id: 1, name: 'All Agents' },
  { id: 2, name: 'Fida Fathima' },
  { id: 3, name: 'Nandana K' },
  { id: 4, name: 'Rameesa' },
  { id: 5, name: 'Aysha' },
  { id: 6, name: 'Nesri' },
  { id: 7, name: 'Rahmath' },
  { id: 8, name: 'Lana' },
  { id: 9, name: 'Dilshana' },
];

export const SAMPLE_TASKS: CalendarTask[] = [
  { id: 1, title: 'Call Back Shameena chappangakattil', category: 'Call', description: 'Call customer regarding follow-up discussion.', contactName: 'Shameena chappangakattil', contactPhone: '917025128014', assignedTo: 'Rameesa', dueDate: '2026-04-25', dueTime: '11:30', addedOn: '2026-04-25', addedTime: '10:25', addedBy: 'Rameesa', status: 'pending', priority: 'high' },
  { id: 2, title: 'Follow up with Rahul Sharma', category: 'Follow-up', description: 'Discuss quote and close the deal.', contactName: 'Rahul Sharma', contactPhone: '9876543210', assignedTo: 'Rameesa', dueDate: '2026-04-25', dueTime: '14:00', addedOn: '2026-04-24', addedTime: '16:30', addedBy: 'Fida Fathima', status: 'pending', priority: 'medium' },
  { id: 3, title: 'Demo meeting with Priya Patel', category: 'Meeting', description: 'Product demo for new CRM features.', contactName: 'Priya Patel', contactPhone: '9876543211', assignedTo: 'Rameesa', dueDate: '2026-04-26', dueTime: '10:00', addedOn: '2026-04-25', addedTime: '09:00', addedBy: 'Nandana K', status: 'pending', priority: 'high' },
  { id: 4, title: 'Call Amit Kumar', category: 'Call', description: 'Discuss renewal options.', contactName: 'Amit Kumar', contactPhone: '9876543212', assignedTo: 'Rameesa', dueDate: '2026-04-26', dueTime: '15:30', addedOn: '2026-04-25', addedTime: '11:00', addedBy: 'Rameesa', status: 'completed', priority: 'low' },
  { id: 5, title: 'Meeting with Sneha Reddy', category: 'Meeting', description: 'Quarterly review meeting.', contactName: 'Sneha Reddy', contactPhone: '9876543213', assignedTo: 'Fida Fathima', dueDate: '2026-04-27', dueTime: '11:00', addedOn: '2026-04-26', addedTime: '14:00', addedBy: 'Fida Fathima', status: 'pending', priority: 'medium' },
  { id: 6, title: 'Follow up Vikram Singh', category: 'Follow-up', description: 'Send proposal document.', contactName: 'Vikram Singh', contactPhone: '9876543214', assignedTo: 'Nandana K', dueDate: '2026-04-27', dueTime: '16:00', addedOn: '2026-04-26', addedTime: '10:30', addedBy: 'Nandana K', status: 'pending', priority: 'high' },
  { id: 7, title: 'Call Rajesh Verma', category: 'Call', description: 'Annual contract discussion.', contactName: 'Rajesh Verma', contactPhone: '9876543216', assignedTo: 'Rameesa', dueDate: '2026-04-28', dueTime: '09:30', addedOn: '2026-04-27', addedTime: '15:00', addedBy: 'Rameesa', status: 'pending', priority: 'medium' },
  { id: 8, title: 'Check-in with Kavitha Nair', category: 'Check-in', description: 'Morning check-in call.', contactName: 'Kavitha Nair', contactPhone: '9876543217', assignedTo: 'Aysha', dueDate: '2026-04-25', dueTime: '08:00', addedOn: '2026-04-24', addedTime: '17:00', addedBy: 'Aysha', status: 'pending', priority: 'low' },
  { id: 9, title: 'Call Lakshmi Menon', category: 'Call', description: 'Support call for technical issue.', contactName: 'Lakshmi Menon', contactPhone: '9876543219', assignedTo: 'Nesri', dueDate: '2026-04-29', dueTime: '10:00', addedOn: '2026-04-28', addedTime: '12:00', addedBy: 'Nesri', status: 'pending', priority: 'high' },
  { id: 10, title: 'Follow up Suresh Iyer', category: 'Follow-up', description: 'Negotiate final pricing.', contactName: 'Suresh Iyer', contactPhone: '9876543220', assignedTo: 'Rameesa', dueDate: '2026-04-30', dueTime: '14:30', addedOn: '2026-04-29', addedTime: '11:00', addedBy: 'Rameesa', status: 'pending', priority: 'medium' },
  { id: 11, title: 'Call Meera Das', category: 'Call', description: 'Demo follow-up discussion.', contactName: 'Meera Das', contactPhone: '9876543221', assignedTo: 'Fida Fathima', dueDate: '2026-04-25', dueTime: '16:00', addedOn: '2026-04-25', addedTime: '08:30', addedBy: 'Fida Fathima', status: 'pending', priority: 'low' },
  { id: 12, title: 'Meeting with John Doe', category: 'Meeting', description: 'Client onboarding meeting.', contactName: 'John Doe', contactPhone: '9876543222', assignedTo: 'Rameesa', dueDate: '2026-05-01', dueTime: '10:00', addedOn: '2026-04-30', addedTime: '09:00', addedBy: 'Rameesa', status: 'pending', priority: 'high' },
  { id: 13, title: 'Call Ananya Gupta', category: 'Call', description: 'Quote discussion.', contactName: 'Ananya Gupta', contactPhone: '9876543215', assignedTo: 'Rahmath', dueDate: '2026-04-26', dueTime: '13:00', addedOn: '2026-04-25', addedTime: '14:00', addedBy: 'Rahmath', status: 'pending', priority: 'medium' },
  { id: 14, title: 'Follow up Arun Pillai', category: 'Follow-up', description: 'Discuss requirements.', contactName: 'Arun Pillai', contactPhone: '9876543218', assignedTo: 'Lana', dueDate: '2026-05-02', dueTime: '15:00', addedOn: '2026-05-01', addedTime: '10:00', addedBy: 'Lana', status: 'pending', priority: 'low' },
  { id: 15, title: 'Check-in Dilshana', category: 'Check-in', description: 'Morning update.', contactName: 'Dilshana', contactPhone: '9876543223', assignedTo: 'Fida Fathima', dueDate: '2026-04-28', dueTime: '08:30', addedOn: '2026-04-27', addedTime: '16:00', addedBy: 'Fida Fathima', status: 'pending', priority: 'low' },
];

export const TODAY = new Date(2026, 3, 25);
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
