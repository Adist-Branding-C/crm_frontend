export interface Company {
  companyId: string;
  name: string;
  contactPersonName: string;
  email: string;
  phone: string;
  address: string;
  gstNumber: string;
  dateOfRegistration: string;
  status: string;
  leads: number;
  licensedSeats: number;
  deals: number;
  createdAt: string;
}

export interface CompanyFilters {
  status: string;
  subscriptionStatus: string;
  soonExpiring: boolean;
  minLicensedSeats: number | '';
  maxLicensedSeats: number | '';
  minPerStaffPrice: number | '';
  maxPerStaffPrice: number | '';
}

export interface CompanyStats {
  totalCompanies: number;
  expiredCustomers: number;
  soonExpire: number;
  totalStaff: number;
  licensedSeats: number;
  totalRevenue: number;
}

export interface NewCompany {
  name: string;
  contactPersonName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gstNumber: string;
  dateOfRegistration: string;
  status: string;
}
