import { Check, X } from 'lucide-react';
import { useAgentPage } from '../hooks';
import AddAgentDrawer from '../components/AddAgentDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import { SettingsTableLayout, SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { AgentItem } from '../types/agent.types';

const AgentPage = () => {
  const {
    agent,
    searchQuery, handleSearchChange,
    rowsPerPage, handleRowsPerPageChange,
    pageNumber, setPageNumber,
    totalCount,
    showDrawer,
    dropdownOpen, onToggleDropdown,
    editingItem,
    deletingItem,
    filteredData,
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

  const startIndex = (pageNumber - 1) * rowsPerPage;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  const columns: Column<AgentItem>[] = [
    { key: 'fullName', label: 'Name', render: (item) => item.fullName || item.name || '-' },
    { key: 'email', label: 'Email' },
    { key: 'mobile', label: 'Mobile', render: (item) => item.mobile || item.phone || item.phone_number || item.phoneNumber || '-' },
    { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
  ];

  return (
    <>
      <SettingsTableLayout
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAdd={handleAddClick}
        addLabel="Add Staff"
        data={filteredData}
        columns={columns}
        startIndex={startIndex}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        currentPage={pageNumber}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalItems={totalCount}
        onPageChange={setPageNumber}
        onRowsPerPageChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
      />
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
      <AdminDeleteModal
        isOpen={!!deletingItem}
        itemName={deletingItem?.fullName || deletingItem?.name || ''}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />
      {agent.showToast && (
        <div className={`toast-notification toast-${agent.toastType}`} onClick={() => agent.setShowToast(false)}>
          {agent.toastType === 'success' ? <Check size={18} /> : <X size={18} />}
          <span>{agent.toastMessage}</span>
        </div>
      )}
    </>
  );
};

export default AgentPage;
