import { Plus } from 'lucide-react';
import { useAgent, useAgentDrawer, useAgentDropdown, useAgentFilters, useAgentActions } from '../hooks';
import AddAgentDrawer from '../components/AddAgentDrawer';
import DeleteAgentModal from '../components/DeleteAgentModal';
import AgentTable from '../components/AgentTable';
import './AgentPage.css';

const AgentPage = () => {
  const agent = useAgent();
  const drawer = useAgentDrawer();
  const dropdown = useAgentDropdown();
  const filters = useAgentFilters(agent.agentList);
  const actions = useAgentActions({ agent, drawer });

  return (
    <>
      <div className="task-panel">
        <span className="usage-quote">
          <span className="usage-count">{filters.totalRecords}</span> / <span className="usage-total">{filters.totalRecords}</span> Staffs Used
        </span>
        <div className="task-nav">
          <button className="btn btn-primary" onClick={drawer.openAddDrawer}>
            <Plus size={16} /> Add Staff
          </button>
        </div>
      </div>
      <div className="agent-table-wrapper">
        <AgentTable
          data={filters.filteredData.slice(0, filters.rowsPerPage)}
          searchQuery={filters.searchQuery}
          onSearchChange={filters.setSearchQuery}
          rowsPerPage={filters.rowsPerPage}
          onRowsPerPageChange={filters.setRowsPerPage}
          totalRecords={filters.totalRecords}
          dropdownOpen={dropdown.dropdownOpen}
          onToggleDropdown={dropdown.toggleDropdown}
          onEdit={(item) => { drawer.openEditDrawer(item); dropdown.closeDropdown(); }}
          onDelete={(item) => { actions.handleDeleteClick(item); dropdown.closeDropdown(); }}
        />
      </div>
      <AddAgentDrawer
        isOpen={drawer.showDrawer}
        onClose={drawer.closeDrawer}
        validationSchema={drawer.editingItem ? agent.editValidationSchema : agent.validationSchema}
        initialValues={drawer.drawerInitialValues}
        onSubmit={drawer.editingItem ? actions.handleEditSubmit : actions.handleSubmit}
        isLoading={agent.isLoading}
        error={agent.error}
        isEditing={!!drawer.editingItem}
        designationOptions={agent.designationOptions}
        onFetchDesignations={agent.fetchDesignations}
      />
      <DeleteAgentModal
        isOpen={!!actions.deletingItem}
        itemName={actions.deletingItem?.fullName || actions.deletingItem?.name || ''}
        onConfirm={actions.handleConfirmDelete}
        onClose={actions.closeDeleteModal}
      />
    </>
  );
};

export default AgentPage;
