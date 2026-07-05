import { useAgentPage } from '../hooks/useAgentPage';
import AgentTable from '../components/AgentTable';
import AddAgentDrawer from '../components/AddAgentDrawer';
import DeleteAgentDialog from '../components/DeleteAgentDialog';
import ToastNotification from '../../../../shared/components/ToastNotification';
import './AgentPage.css';

const AgentPage = () => {
  const p = useAgentPage();

  return (
    <>
      <AgentTable
          data={p.data}
          searchQuery={p.searchQuery}
          onSearchChange={p.onSearchChange}
          rowsPerPage={p.rowsPerPage}
          onRowsPerPageChange={p.onRowsPerPageChange}
          totalRecords={p.totalRecords}
          currentPage={p.currentPage}
          totalPages={p.totalPages}
          onPageChange={p.onPageChange}
          dropdownOpen={p.dropdownOpen}
          onToggleDropdown={p.onToggleDropdown}
          onEdit={p.onEdit}
          onDelete={p.onDelete}
          onAdd={p.onAdd}
        />
        <AddAgentDrawer
          isOpen={p.isOpen}
          onClose={p.onClose}
          validationSchema={p.validationSchema}
          initialValues={p.initialValues}
          onSubmit={p.onSubmit}
          isLoading={p.isLoading}
          error={p.error}
          isEditing={p.isEditing}
          designationOptions={p.designationOptions}
          onFetchDesignations={p.onFetchDesignations}
          departmentOptions={p.departmentOptions}
          onFetchDepartments={p.onFetchDepartments}
        />
        <DeleteAgentDialog
          isOpen={!!p.deletingItem}
          itemName={p.itemName}
          onConfirm={p.onConfirmDelete}
          onClose={p.onCloseDelete}
        />
      <ToastNotification
        message={p.toastMessage}
        type={p.toastType}
        visible={p.showToast}
        onClose={p.onCloseToast}
      />
    </>
  );
};

export default AgentPage;
