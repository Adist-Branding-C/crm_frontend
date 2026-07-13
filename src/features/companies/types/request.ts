export interface GetCompaniesParams {
  pageNumber: number;
  limit: number;
  search?: string;
  status?: string;
  subscription_status?: string;
  soon_expiring?: boolean;
  min_licensed_seats?: number;
  max_licensed_seats?: number;
  min_per_staff_price?: number;
  max_per_staff_price?: number;
  sort_by?: string;
  sort_order?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CompanyStatisticsParams {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CreateCompanyPayload {
  name: string;
  contactPersonName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  gstNumber?: string;
  dateOfRegistration?: string;
  status?: string;
}

export type UpdateCompanyPayload = Partial<CreateCompanyPayload>;
