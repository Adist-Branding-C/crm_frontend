export interface PlanHistory {
  plan: string;
  startDate: string;
  endDate: string;
  price: number;
}

export interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: string;
  staffCount: number;
  leads: number;
  deals: number;
  revenue: number;
  status: string;
  createdAt: string;
  expiryDate: string;
  plansHistory: PlanHistory[];
}

export interface CompanyFilters {
  plan: string;
  status: string;
}

export interface CompanyStats {
  totalCompanies: number;
  expiredCustomers: number;
  soonExpire: number;
  totalStaff: number;
  totalRevenue: number;
}
