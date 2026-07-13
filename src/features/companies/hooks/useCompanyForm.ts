import { useCallback } from 'react';
import { companyDataService } from '../services/companyDataService';
import { getErrorMessage } from '../../../shared/utils/error';
import type { NewCompany } from '../types';
import type { CreateCompanyPayload } from '../types/request';
import type { UseCompanyFormParams } from '../types/component.types';

/**
 * Owns the create/update API call for a company - CRUD for one entity - and everything that
 * should happen right after a successful submit (refresh the list, refresh the stats grid,
 * toast, close the drawer). Composing those steps here, rather than in the page, keeps
 * CompaniesPage from having to chain multiple hooks' actions together for one user action; the
 * page only ever calls the single submitCompany function this hook returns.
 *
 * Used by:
 * - CompaniesPage
 */
export function useCompanyForm({ editingCompany, onRefreshList, onRefreshStats, onShowToast, onClose }: UseCompanyFormParams) {
  const submitCompany = useCallback(async (values: NewCompany): Promise<void> => {
    const payload: CreateCompanyPayload = {
      name: values.name.trim(),
      contactPersonName: values.contactPersonName.trim(),
      email: values.email.trim(),
      phoneNumber: values.phoneNumber.trim(),
      status: values.status,
    };
    if (values.address.trim()) payload.address = values.address.trim();
    if (values.gstNumber.trim()) payload.gstNumber = values.gstNumber.trim();
    if (values.dateOfRegistration) payload.dateOfRegistration = values.dateOfRegistration;

    try {
      if (editingCompany) {
        await companyDataService.updateCompany(editingCompany.companyId, payload);
      } else {
        await companyDataService.createCompany(payload);
      }
    } catch (err: unknown) {
      throw new Error(getErrorMessage(err, 'An unexpected error occurred'));
    }

    onRefreshList();
    onShowToast(editingCompany ? 'Company updated successfully' : 'Company created successfully', 'success');
    onRefreshStats();
    onClose();
  }, [editingCompany, onRefreshList, onRefreshStats, onShowToast, onClose]);

  return { submitCompany };
}
