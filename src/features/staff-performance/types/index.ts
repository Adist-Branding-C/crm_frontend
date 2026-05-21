export interface StaffMember {
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

export interface Activity {
  id: number;
  type: string;
  title: string;
  time: string;
  status: string;
}
