// Unused mock data, replaced by the real GET /staff/performance API (see
// services/staffPerformance.service.ts) - kept compiling rather than
// deleted; safe to remove this file if it's confirmed dead.
interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  department: string;
  joinDate: string;
  totalLeads: number;
  converted: number;
  rating: number;
  completedTasks: number;
  pendingTasks: number;
  calls: number;
  emails: number;
  meetings: number;
  deals: number;
  revenue: number;
  followups: number;
  newLeads: number;
  qualifiedLeads: number;
  lostLeads: number;
}

interface Activity {
  id: number;
  type: string;
  title: string;
  time: string;
  status: string;
}

export const STAFF_DATA: StaffMember[] = [
  { id: 1, name: 'John Smith', email: 'john.smith@company.com', role: 'Sales Executive', phone: '+1 234 567 890', department: 'Sales', joinDate: '2024-01-15', totalLeads: 45, converted: 12, rating: 4.8, completedTasks: 78, pendingTasks: 12, calls: 156, emails: 45, meetings: 8, deals: 12, revenue: 45000, followups: 89, newLeads: 23, qualifiedLeads: 18, lostLeads: 5 },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Sales Manager', phone: '+1 234 567 891', department: 'Sales', joinDate: '2023-08-20', totalLeads: 52, converted: 18, rating: 4.9, completedTasks: 95, pendingTasks: 8, calls: 198, emails: 67, meetings: 12, deals: 18, revenue: 78000, followups: 102, newLeads: 28, qualifiedLeads: 22, lostLeads: 4 },
  { id: 3, name: 'Mike Davis', email: 'mike.davis@company.com', role: 'Sales Representative', phone: '+1 234 567 892', department: 'Business Development', joinDate: '2024-03-10', totalLeads: 38, converted: 9, rating: 4.5, completedTasks: 56, pendingTasks: 15, calls: 112, emails: 34, meetings: 5, deals: 9, revenue: 32000, followups: 67, newLeads: 15, qualifiedLeads: 12, lostLeads: 3 },
  { id: 4, name: 'Emily Brown', email: 'emily.b@company.com', role: 'Business Developer', phone: '+1 234 567 893', department: 'Business Development', joinDate: '2023-11-05', totalLeads: 61, converted: 15, rating: 4.7, completedTasks: 82, pendingTasks: 10, calls: 145, emails: 52, meetings: 10, deals: 15, revenue: 55000, followups: 95, newLeads: 32, qualifiedLeads: 20, lostLeads: 8 },
  { id: 5, name: 'Chris Wilson', email: 'chris.w@company.com', role: 'Sales Executive', phone: '+1 234 567 894', department: 'Sales', joinDate: '2024-05-22', totalLeads: 29, converted: 7, rating: 4.3, completedTasks: 45, pendingTasks: 18, calls: 89, emails: 28, meetings: 4, deals: 7, revenue: 28000, followups: 54, newLeads: 12, qualifiedLeads: 9, lostLeads: 2 },
  { id: 6, name: 'Amanda Lee', email: 'amanda.l@company.com', role: 'Account Executive', phone: '+1 234 567 895', department: 'Accounts', joinDate: '2024-02-14', totalLeads: 44, converted: 14, rating: 4.6, completedTasks: 68, pendingTasks: 9, calls: 134, emails: 41, meetings: 9, deals: 14, revenue: 42000, followups: 78, newLeads: 20, qualifiedLeads: 16, lostLeads: 4 },
  { id: 7, name: 'David Miller', email: 'david.m@company.com', role: 'Senior Sales Executive', phone: '+1 234 567 896', department: 'Sales', joinDate: '2023-06-01', totalLeads: 67, converted: 22, rating: 4.9, completedTasks: 112, pendingTasks: 5, calls: 210, emails: 78, meetings: 15, deals: 22, revenue: 95000, followups: 124, newLeads: 35, qualifiedLeads: 28, lostLeads: 6 },
  { id: 8, name: 'Lisa Anderson', email: 'lisa.a@company.com', role: 'Team Lead', phone: '+1 234 567 897', department: 'Sales', joinDate: '2023-09-12', totalLeads: 58, converted: 19, rating: 4.8, completedTasks: 89, pendingTasks: 7, calls: 178, emails: 56, meetings: 11, deals: 19, revenue: 67000, followups: 112, newLeads: 30, qualifiedLeads: 24, lostLeads: 5 },
];

export const RECENT_ACTIVITIES: Activity[] = [
  { id: 1, type: 'call', title: 'Follow-up call with lead', time: '2 hours ago', status: 'completed' },
  { id: 2, type: 'email', title: 'Sent proposal to prospective client', time: '5 hours ago', status: 'completed' },
  { id: 3, type: 'meeting', title: 'Scheduled demo meeting', time: 'Yesterday', status: 'completed' },
  { id: 4, type: 'lead', title: 'Converted new lead to customer', time: 'Yesterday', status: 'completed' },
  { id: 5, type: 'task', title: 'Updated lead status in CRM', time: '2 days ago', status: 'completed' },
];
