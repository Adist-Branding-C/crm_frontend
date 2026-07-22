export interface GetCompaniesParams {
  pageNumber: number;
  limit: number;
  search?: string;
  status?: string;
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
