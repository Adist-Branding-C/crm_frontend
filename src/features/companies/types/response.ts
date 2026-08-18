export interface CompanyApiItem {
  id: string;
  companyId: string;
  name: string;
  contactPersonName: string;
  email: string;
  phoneNumber: string;
  countryCode?: string | null;
  address: string | null;
  gstNumber: string | null;
  dateOfRegistration: string | null;
  status: string | null;
  leadsCount: number;
  createdAt: string | null;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface CompanyListData {
  items: CompanyApiItem[];
  pagination: PaginationInfo;
}

export interface CreateCompanyData {
  companyId: string;
  apiToken: string;
}

export interface CompanyStatisticsData {
  totalCompanies: number;
  expired: number;
  soonExpired: number;
  totalStaff: number;
  totalRevenue: number;
  total: number;
}
