import CampaignToolbar from '../components/CampaignToolbar';
import CampaignTable from '../components/CampaignTable';
import CampaignDrawer from '../components/CampaignDrawer';
import CampaignForm from '../components/CampaignForm';
import { TABLE_COLUMNS } from '../constants/campaign.constants';
import { useCampaignPage } from '../hooks';
import './CampaignPage.css';

const CampaignPage = () => {
  const page = useCampaignPage();

  return (
    <>
      <CampaignToolbar
        search={page.search}
        onSearchChange={page.handleSearchChange}
        onExport={page.handleExport}
        onAdd={page.openAdd}
      />
      <CampaignTable
        data={page.campaigns}
        columns={TABLE_COLUMNS}
        sortConfig={page.sortConfig}
        actionMenuOpen={page.actionMenuOpen}
        currentPage={page.currentPage}
        totalPages={page.totalPages}
        totalItems={page.totalItems}
        startIndex={page.startIndex}
        rowsPerPage={page.rowsPerPage}
        onSort={page.handleSort}
        onToggleActionMenu={page.setActionMenuOpen}
        onDelete={page.handleDelete}
        onEdit={page.openEdit}
        onPageChange={page.setCurrentPage}
        onRowsPerPageChange={page.handleRowsPerPageChange}
      />
      <CampaignDrawer
        isOpen={page.isOpen}
        onClose={page.close}
        title={page.mode === 'edit' ? 'Edit Campaign' : 'Add Campaign'}
      >
        <CampaignForm
          mode={page.mode}
          formData={page.formData}
          errors={page.errors}
          agents={page.agents}
          isLoadingAgents={page.isLoadingAgents}
          onFieldChange={page.handleFieldChange}
          onAgentChange={page.handleAgentChange}
          onTypeChange={page.handleTypeChange}
          onSubmit={page.handleSubmit}
          onCancel={page.close}
        />
      </CampaignDrawer>
      {page.successMessage && (
        <div className="campaign-toast">{page.successMessage}</div>
      )}
    </>
  );
};

export default CampaignPage;
