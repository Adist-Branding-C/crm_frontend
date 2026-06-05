import { Plus } from 'lucide-react';
import { useAgentPage } from '../hooks';
import AddAgentDrawer from '../components/AddAgentDrawer';
import DeleteAgentModal from '../components/DeleteAgentModal';
import AgentTable from '../components/AgentTable';
import './AgentPage.css';

const AgentPage = () => {
  const {
    agent,
    searchQuery, setSearchQuery,
    rowsPerPage, setRowsPerPage,
    showDrawer,
    dropdownOpen, onToggleDropdown,
    editingItem,
    deletingItem,
    filteredData,
    totalRecords,
    drawerInitialValues,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleSubmit,
    handleEditSubmit,
  } = useAgentPage();

  return (
    <>
      <div className="task-panel">
        <span className="usage-quote">
          <span className="usage-count">{totalRecords}</span> / <span className="usage-total">{totalRecords}</span> Staffs Used
        </span>
        <div className="task-nav">
          <button className="btn btn-primary" onClick={handleAddClick}>
            <Plus size={16} /> Add Staff
          </button>
        </div>
      </div>
      <div className="agent-table-wrapper">
        <AgentTable
          data={filteredData.slice(0, rowsPerPage)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          totalRecords={totalRecords}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>
      <AddAgentDrawer
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        validationSchema={editingItem ? agent.editValidationSchema : agent.validationSchema}
        initialValues={drawerInitialValues}
        onSubmit={editingItem ? handleEditSubmit : handleSubmit}
        isLoading={agent.isLoading}
        error={agent.error}
        isEditing={!!editingItem}
        designationOptions={agent.designationOptions}
        onFetchDesignations={agent.fetchDesignations}
      />
      <DeleteAgentModal
        isOpen={!!deletingItem}
        itemName={deletingItem?.fullName || deletingItem?.name || ''}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />
    </>
  );
};

export default AgentPage;
