import type { CompanyApiItem } from '../types/response';
import type { Company } from '../types';

/** Not backed by any API yet - deals/subscriptions have no per-company backend data. */
export const STAFF_COUNT_PLACEHOLDER = '—';
export const MOCK_DEALS_COUNT = 0;

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
    staffCount: STAFF_COUNT_PLACEHOLDER,
    deals: MOCK_DEALS_COUNT,
    createdAt: item.createdAt ?? '',
  };
}
