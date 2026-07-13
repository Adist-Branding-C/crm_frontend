import { useMemo } from 'react';
import { Filter, ChevronDown, Plus, Building, User, Mail, Phone, Users } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Toast from '../../../shared/components/Toast';
import Modal from '../../../shared/components/Modal';
import Drawer from '../../../shared/components/Drawer';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, Pagination } from '../../../shared/components/table';
import { useToast } from '../../../shared/hooks/useToast';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useTableData } from '../../../shared/hooks/useTableData';
import { useCompanyStatistics } from '../hooks/useCompanyStatistics';
import { useCompanyForm } from '../hooks/useCompanyForm';
import { useCompanyFilters } from '../hooks/useCompanyFilters';
import { useCompanyNavigation } from '../hooks/useCompanyNavigation';
import { companyDataService } from '../services/companyDataService';
import { mapApiToUI } from '../mappers/companyMapper';
import { getCompanyStatusBadge } from '../utils/companyStatusBadge';
import CompaniesStatsGrid from '../components/CompaniesStatsGrid';
import CompaniesFilters from '../components/CompaniesFilters';
import CompanyForm from '../components/CompanyForm';
import CompanyDetails from '../components/CompanyDetails';
import CompanyRowActions from '../components/CompanyRowActions';
import type { Company } from '../types';
import type { GetCompaniesParams } from '../types/request';
import './CompaniesPage.css';

const CompaniesPage = () => {
  const toast = useToast();
  const { stats, refreshStatistics } = useCompanyStatistics();
  const { goToSubscription } = useCompanyNavigation();

  const formDrawer = useDrawer<Company | null>();
  const viewDrawer = useDrawer<Company>();
  const selection = useTableSelection<string>();

  const table = useTableData<Company>({
    fetchFn: async (params) => {
      const applied = filtersState.appliedFiltersRef.current;
      const apiParams: GetCompaniesParams = {
        pageNumber: params.pageNumber,
        limit: params.limit,
        sort_by: 'createdAt',
        sort_order: 'DESC',
      };
      if (params.search) apiParams.search = params.search;
      if (applied.status) apiParams.status = applied.status;
      if (applied.subscriptionStatus) apiParams.subscription_status = applied.subscriptionStatus;
      if (applied.soonExpiring) apiParams.soon_expiring = true;
      if (applied.minLicensedSeats !== '') apiParams.min_licensed_seats = applied.minLicensedSeats;
      if (applied.maxLicensedSeats !== '') apiParams.max_licensed_seats = applied.maxLicensedSeats;
      if (applied.minPerStaffPrice !== '') apiParams.min_per_staff_price = applied.minPerStaffPrice;
      if (applied.maxPerStaffPrice !== '') apiParams.max_per_staff_price = applied.maxPerStaffPrice;

      const response = await companyDataService.getCompanies(apiParams);
      return {
        items: (response.data?.items ?? []).map(mapApiToUI),
        total: response.data?.pagination?.total ?? 0,
      };
    },
  });

  const search = useDebouncedSearch(table.handleSearchChange);
  const filtersState = useCompanyFilters(table.resetToFirstPage);
  const allIds = useMemo(() => table.list.map((company) => company.companyId), [table.list]);

  const companyForm = useCompanyForm({
    editingCompany: formDrawer.item,
    onRefreshList: table.refresh,
    onRefreshStats: refreshStatistics,
    onShowToast: toast.showToastMessage,
    onClose: formDrawer.close,
  });

  return (
    <PageContainer>
      <PageHeader title="Company Management" description="Manage CRM tenants and their subscriptions" />

      <CompaniesStatsGrid stats={stats} />

      <div className="table-container">
        <TableNav searchQuery={search.searchValue} onSearchChange={search.handleSearchChange} searchPlaceholder="Search companies...">
          <button className={`btn btn-secondary ${filtersState.showFilters ? 'active' : ''}`} onClick={filtersState.toggleFilters}>
            <Filter size={16} /> Filter <ChevronDown size={14} className={filtersState.showFilters ? 'rotate' : ''} />
          </button>
          <button className="btn btn-primary" onClick={() => formDrawer.open(null)}>
            <Plus size={16} /> Add Company
          </button>
        </TableNav>

        {filtersState.showFilters && (
          <CompaniesFilters
            initialValues={filtersState.appliedFiltersRef.current}
            onApply={filtersState.applyFilters}
            onClear={filtersState.clearFilters}
          />
        )}

        <Table>
          <THead>
            <TRow>
              <TCell variant="th">
                <input
                  type="checkbox"
                  checked={selection.isAllSelected(table.list.length)}
                  onChange={(e) => selection.handleSelectAll(allIds, e.target.checked)}
                />
              </TCell>
              <TCell variant="th">Company</TCell>
              <TCell variant="th">Contact</TCell>
              <TCell variant="th">Licensed Seats</TCell>
              <TCell variant="th">Leads</TCell>
              <TCell variant="th">Deals</TCell>
              <TCell variant="th">Status</TCell>
              <TCell variant="th">Actions</TCell>
            </TRow>
          </THead>
          <TBody>
            {table.list.length === 0 ? (
              <EmptyState colSpan={8} message="No companies found" />
            ) : (
              table.list.map((company) => (
                <TRow key={company.companyId}>
                  <TCell>
                    <input
                      type="checkbox"
                      checked={selection.isSelected(company.companyId)}
                      onChange={() => selection.handleSelectRow(company.companyId)}
                    />
                  </TCell>
                  <TCell>
                    <div className="company-name-cell">
                      <Building size={16} className="company-icon" />
                      <div>
                        <div className="company-name">{company.name}</div>
                        <div className="company-date">Since {company.createdAt}</div>
                      </div>
                    </div>
                  </TCell>
                  <TCell>
                    <div className="contact-cell">
                      <div><User size={12} /> {company.contactPersonName}</div>
                      <div><Mail size={12} /> {company.email}</div>
                      <div><Phone size={12} /> {company.phone}</div>
                    </div>
                  </TCell>
                  <TCell><div className="stat-cell"><Users size={14} /> {company.licensedSeats}</div></TCell>
                  <TCell>{company.leads.toLocaleString()}</TCell>
                  <TCell>{company.deals}</TCell>
                  <TCell>{getCompanyStatusBadge(company.status)}</TCell>
                  <TCell>
                    <CompanyRowActions company={company} onView={viewDrawer.open} onEdit={formDrawer.open} onManageSubscription={goToSubscription} />
                  </TCell>
                </TRow>
              ))
            )}
          </TBody>
        </Table>

        <Pagination
          currentPage={table.pageNumber}
          totalPages={table.totalPages}
          totalItems={table.totalCount}
          rowsPerPage={table.limit}
          onPageChange={table.setPageNumber}
        />
      </div>

      <Modal isOpen={formDrawer.isOpen} onClose={formDrawer.close} title={formDrawer.item ? 'Edit Company' : 'Add New Company'}>
        <CompanyForm editingCompany={formDrawer.item} onSubmit={companyForm.submitCompany} onCancel={formDrawer.close} />
      </Modal>

      <Drawer isOpen={viewDrawer.isOpen} onClose={viewDrawer.close} title="Company Details">
        {viewDrawer.item && <CompanyDetails company={viewDrawer.item} />}
      </Drawer>

      <Toast
        message={toast.toastMessage}
        type={toast.toastType}
        isVisible={toast.showToast}
        onClose={() => toast.setShowToast(false)}
      />
    </PageContainer>
  );
};

export default CompaniesPage;
