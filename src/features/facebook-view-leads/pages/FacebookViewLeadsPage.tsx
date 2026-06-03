import React from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { useFacebookLeadData } from '../hooks/useFacebookLeadData';
import FilterCard from '../components/FilterCard';
import SummaryCards from '../components/SummaryCards';
import LeadsTable from '../components/LeadsTable';
import LeadsPagination from '../components/LeadsPagination';
import LeadDetailsModal from '../components/LeadDetailsModal';
import ClearConfirmModal from '../components/ClearConfirmModal';
import './FacebookViewLeadsPage.css';

const FacebookViewLeadsPage: React.FC = () => {
  const d = useFacebookLeadData();

  return (
    <div className="facebook-view-leads-page">
      <PageHeader
        title="Facebook Lead Requests"
        description="View and manage Facebook lead form submissions"
        breadcrumb={[
          { label: 'GL Connect', link: '/user/gl-connect' },
          { label: 'Facebook Integration', link: '/facebook/workflows' },
          { label: 'View Leads' }
        ]}
      />

      <FilterCard
        filters={d.filters}
        onFilterChange={d.handleFilterChange}
        onClearClick={() => d.setShowClearConfirm(true)}
      />

      <SummaryCards stats={d.stats} />

      <LeadsTable
        data={d.paginatedLeads}
        onViewDetails={d.handleViewDetails}
        rowsPerPage={d.rowsPerPage}
        onRowsPerPageChange={d.handleRowsPerPageChange}
        onSearchChange={(v) => d.handleFilterChange('search', v)}
      />

      {d.filteredLeads.length > 0 && (
        <LeadsPagination
          currentPage={d.currentPage}
          totalPages={d.totalPages}
          totalItems={d.filteredLeads.length}
          rowsPerPage={d.rowsPerPage}
          onPageChange={d.setCurrentPage}
        />
      )}

      <LeadDetailsModal
        isOpen={d.showDetailsModal}
        lead={d.selectedLead}
        onClose={() => { d.setShowDetailsModal(false); d.setSelectedLead(null); }}
      />

      <ClearConfirmModal
        isOpen={d.showClearConfirm}
        onConfirm={d.handleClear}
        onClose={() => d.setShowClearConfirm(false)}
      />
    </div>
  );
};

export default FacebookViewLeadsPage;
