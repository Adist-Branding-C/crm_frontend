import { useRef, useEffect, useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Toast from '../../../shared/components/Toast';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { useToast } from '../../../shared/hooks/useToast';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { Filter, ChevronDown, Plus } from 'lucide-react';
import { useCompaniesList } from '../hooks/useCompaniesList';
import { useCompanyStatistics } from '../hooks/useCompanyStatistics';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, Pagination } from '../../../shared/components/table';
import CompaniesStatsGrid from '../components/CompaniesStatsGrid';
import CompaniesFilters from '../components/CompaniesFilters';
import CompanyRow from '../components/CompanyRow';
import AddCompanyModal from '../components/AddCompanyModal';
import CompanyViewDrawer from '../components/CompanyViewDrawer';
import { LABEL_NO_DATA } from '../../../shared/constants/labels';
import type { Company, CompanyFilters } from '../types';
import './CompaniesPage.css';

const COMPANY_TABLE_COLUMN_COUNT = 8;

const DEFAULT_ROWS_PER_PAGE = 10;

const CompaniesPage = () => {
  const toast = useToast();
  const crud = useCompaniesList(toast.showToastMessage);
  const { stats, refreshStatistics } = useCompanyStatistics();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
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
    crud.fetchCompanies(1, rowsPerPage, value, appliedStatusRef.current);
  });

  const initialFetchDone = useRef(false);
  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    crud.fetchCompanies(1, rowsPerPage, '', '');
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    crud.fetchCompanies(page, rowsPerPage, searchValue, appliedStatusRef.current);
  };

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = Number(e.target.value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    crud.fetchCompanies(1, newRowsPerPage, searchValue, appliedStatusRef.current);
  };

  const handleApplyFilters = () => {
    appliedStatusRef.current = filters.status;
    setShowFilters(false);
    setCurrentPage(1);
    crud.fetchCompanies(1, rowsPerPage, searchValue, filters.status);
  };

  const handleClearFilters = () => {
    setFilters({ status: '' });
    appliedStatusRef.current = '';
    setShowFilters(false);
    setCurrentPage(1);
    crud.fetchCompanies(1, rowsPerPage, searchValue, '');
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

      <TableNav
        searchQuery={searchValue}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search companies..."
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      >
        <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} /> Filter <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
        <button className="btn btn-primary" onClick={() => formDrawer.open(null)}>
          <Plus size={16} /> Add Company
        </button>
      </TableNav>

      {showFilters && (
        <CompaniesFilters
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
          onClose={handleApplyFilters}
        />
      )}

      <Table wrapperClassName="table-container" className="enquiries-table">
        <THead>
          <TRow>
            <TCell variant="th">
              <input type="checkbox" checked={selection.selectedIds.length === crud.companies.length && crud.companies.length > 0} onChange={handleSelectAll} />
            </TCell>
            <TCell variant="th">Company</TCell>
            <TCell variant="th">Contact</TCell>
            <TCell variant="th">Staff</TCell>
            <TCell variant="th">Leads</TCell>
            <TCell variant="th">Deals</TCell>
            <TCell variant="th">Status</TCell>
            <TCell variant="th">Actions</TCell>
          </TRow>
        </THead>
        <TBody>
          {crud.companies.length === 0 ? (
            <EmptyState colSpan={COMPANY_TABLE_COLUMN_COUNT} message={LABEL_NO_DATA} />
          ) : (
            crud.companies.map((company) => (
              <CompanyRow
                key={company.companyId}
                company={company}
                isSelected={selection.selectedIds.includes(company.companyId)}
                onSelectRow={selection.handleSelectRow}
                onView={(c) => viewDrawer.open(c)}
                onEdit={(c) => formDrawer.open(c)}
                onDelete={(companyId) => {
                  const company = crud.companies.find(c => c.companyId === companyId);
                  if (company) deleteConfirm.handleDeleteClick(company);
                }}
              />
            ))
          )}
        </TBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={crud.totalPages}
        totalItems={crud.total}
        rowsPerPage={rowsPerPage}
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
