import type { CompanyApiItem } from '../types/response';
import type { Company, NewCompany } from '../types';

export function mapApiToUI(item: CompanyApiItem): Company {
  return {
    companyId: item.companyId,
    name: item.name,
    contactPersonName: item.contactPersonName,
    email: item.email,
    phone: item.phoneNumber,
    address: item.address ?? '',
    gstNumber: item.gstNumber ?? '',
    dateOfRegistration: item.dateOfRegistration ?? '',
    status: item.status ?? '',
    leads: item.leadsCount,
    licensedSeats: item.licensedSeats,
    deals: item.dealsCount,
    createdAt: item.createdAt ?? '',
  };
}

export function mapCompanyToFormValues(company: Company): NewCompany {
  return {
    name: company.name,
    contactPersonName: company.contactPersonName,
    email: company.email,
    phoneNumber: company.phone,
    address: company.address,
    gstNumber: company.gstNumber,
    dateOfRegistration: company.dateOfRegistration?.slice(0, 10) ?? '',
    status: company.status,
  };
}
