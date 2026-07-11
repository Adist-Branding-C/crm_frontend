import { useRef, useEffect, useState, useCallback } from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Toast from '../../../shared/components/Toast';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { useToast } from '../../../shared/hooks/useToast';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useCompaniesList } from '../hooks/useCompaniesList';
import { useCompanyStatistics } from '../hooks/useCompanyStatistics';
import CompaniesStatsGrid from '../components/CompaniesStatsGrid';
import CompaniesToolbar from '../components/CompaniesToolbar';
import CompaniesFilters from '../components/CompaniesFilters';
import CompaniesTable from '../components/CompaniesTable';
import CompaniesPagination from '../components/CompaniesPagination';
import AddCompanyModal from '../components/AddCompanyModal';
import CompanyViewDrawer from '../components/CompanyViewDrawer';
import type { Company, CompanyFilters } from '../types';
import './CompaniesPage.css';

const ROWS_PER_PAGE = 10;

const CompaniesPage = () => {
  const toast = useToast();
  const crud = useCompaniesList(toast.showToastMessage);
  const { stats, refreshStatistics } = useCompanyStatistics();

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<CompanyFilters>({ status: '' });
  const appliedStatusRef = useRef('');

  const formDrawer = useDrawer<Company | null>();
  const viewDrawer = useDrawer<Company>();
  const selection = useTableSelection<string>();

  const handleDeleteCompany = useCallback((company: Company) => crud.deleteCompany(company.companyId), [crud]);
  const deleteConfirm = useDeleteConfirmation<Company>(handleDeleteCompany);

  const { searchValue, handleSearchChange } = useDebouncedSearch((value) => {
    setCurrentPage(1);
    crud.fetchCompanies(1, ROWS_PER_PAGE, value, appliedStatusRef.current);
  });

  const initialFetchDone = useRef(false);
  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    crud.fetchCompanies(1, ROWS_PER_PAGE, '', '');
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    crud.fetchCompanies(page, ROWS_PER_PAGE, searchValue, appliedStatusRef.current);
  };

  const handleApplyFilters = () => {
    appliedStatusRef.current = filters.status;
    setShowFilters(false);
    setCurrentPage(1);
    crud.fetchCompanies(1, ROWS_PER_PAGE, searchValue, filters.status);
  };

  const handleClearFilters = () => {
    setFilters({ status: '' });
    appliedStatusRef.current = '';
    setShowFilters(false);
    setCurrentPage(1);
    crud.fetchCompanies(1, ROWS_PER_PAGE, searchValue, '');
  };

  const handleSelectAll = () => {
    const allIds = crud.companies.map(c => c.companyId);
    selection.handleSelectAll(allIds, selection.selectedIds.length !== allIds.length);
  };

  const handleSaved = (action: 'created' | 'updated') => {
    crud.handleCompanySaved(action);
    refreshStatistics();
  };

  const handleDeleted = async () => {
    await deleteConfirm.handleConfirmDelete();
    refreshStatistics();
  };

  return (
    <PageContainer>
      <PageHeader title="Company Management" description="Manage CRM tenants and their subscriptions" />

      <CompaniesStatsGrid stats={stats} />

      <CompaniesToolbar
        searchQuery={searchValue}
        onSearchChange={handleSearchChange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onAddCompany={() => formDrawer.open(null)}
      />

      {showFilters && (
        <CompaniesFilters
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
          onClose={handleApplyFilters}
        />
      )}

      <CompaniesTable
        data={crud.companies}
        selectedRows={selection.selectedIds}
        onSelectAll={handleSelectAll}
        onSelectRow={selection.handleSelectRow}
        onView={(company) => viewDrawer.open(company)}
        onEdit={(company) => formDrawer.open(company)}
        onDelete={(companyId) => {
          const company = crud.companies.find(c => c.companyId === companyId);
          if (company) deleteConfirm.handleDeleteClick(company);
        }}
      />

      <CompaniesPagination
        currentPage={currentPage}
        totalPages={crud.totalPages}
        startIndex={(currentPage - 1) * ROWS_PER_PAGE}
        rowsPerPage={ROWS_PER_PAGE}
        totalItems={crud.total}
        onPageChange={handlePageChange}
      />

      <AddCompanyModal
        isOpen={formDrawer.isOpen}
        editingCompany={formDrawer.item}
        onSaved={handleSaved}
        onClose={formDrawer.close}
      />

      <CompanyViewDrawer
        isOpen={viewDrawer.isOpen}
        viewingCompany={viewDrawer.item}
        onClose={viewDrawer.close}
      />

      <AdminDeleteModal
        isOpen={!!deleteConfirm.deletingItem}
        itemName={deleteConfirm.deletingItem?.name}
        itemType="company"
        onConfirm={handleDeleted}
        onClose={deleteConfirm.closeDeleteModal}
      />

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
