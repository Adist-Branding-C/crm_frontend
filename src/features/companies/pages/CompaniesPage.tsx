import React from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import { useCompaniesData } from '../hooks/useCompaniesData';
import CompaniesStatsGrid from '../components/CompaniesStatsGrid';
import CompaniesToolbar from '../components/CompaniesToolbar';
import CompaniesFilters from '../components/CompaniesFilters';
import CompaniesTable from '../components/CompaniesTable';
import CompaniesPagination from '../components/CompaniesPagination';
import AddCompanyModal from '../components/AddCompanyModal';
import CompanyViewDrawer from '../components/CompanyViewDrawer';
import type { SortConfig } from '../../../shared/hooks/useTableSorting';
import './CompaniesPage.css';

const CompaniesPage = () => {
  const d = useCompaniesData();

  return (
    <PageContainer>
      <PageHeader title="Company Management" description="Manage CRM tenants and their subscriptions" />

      <CompaniesStatsGrid stats={d.stats} />

      <CompaniesToolbar
        searchQuery={d.searchQuery}
        onSearchChange={d.setSearchQuery}
        showFilters={d.showFilters}
        onToggleFilters={() => d.setShowFilters(!d.showFilters)}
        onAddCompany={d.handleAddCompany}
      />

      {d.showFilters && (
        <CompaniesFilters
          filters={d.filters}
          onFilterChange={d.setFilters}
          onClearFilters={() => { d.setFilters({ plan: '', status: '' }); d.setShowFilters(false); }}
          onClose={() => d.setShowFilters(false)}
        />
      )}

      <CompaniesTable
        data={d.paginatedCompanies}
        sortConfig={d.sortConfig as SortConfig}
        onSort={d.handleSort}
        selectedRows={d.selectedRows}
        onSelectAll={d.handleSelectAll}
        onSelectRow={d.handleSelectRow}
        onView={d.handleView}
        onEdit={d.handleEdit}
        onDelete={d.handleDelete}
      />

      <CompaniesPagination
        currentPage={d.currentPage}
        totalPages={d.totalPages}
        startIndex={d.startIndex}
        rowsPerPage={d.rowsPerPage}
        totalItems={d.filteredCompanies.length}
        onPageChange={d.setCurrentPage}
      />

      <AddCompanyModal
        isOpen={d.showAddModal}
        editingCompany={d.editingCompany}
        newCompany={d.newCompany}
        onNewCompanyChange={d.setNewCompany}
        onSave={d.handleSaveCompany}
        onClose={() => d.setShowAddModal(false)}
      />

      <CompanyViewDrawer
        isOpen={d.isViewDrawerOpen}
        viewingCompany={d.viewingCompany}
        activeTab={d.activeTab}
        onTabChange={d.setActiveTab}
        showRenewalModal={d.showRenewalModal}
        renewalData={d.renewalData}
        onRenewalDataChange={d.setRenewalData}
        onOpenRenewal={() => d.setShowRenewalModal(true)}
        onCloseRenewal={() => d.setShowRenewalModal(false)}
        onClose={() => d.setIsViewDrawerOpen(false)}
      />
    </PageContainer>
  );
};

export default CompaniesPage;
