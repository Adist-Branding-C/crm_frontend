import { useCallback, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useToast } from '../../../../shared/hooks/useToast';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useAgentCrud, useAgentDesignationOptions, useAgentDepartmentOptions, useAgentDrawer, useAgentDeleteConfirm, useAgentFormSubmit } from '../hooks';
import { agentService } from '../services/agent.service';
import AddAgentDrawer from '../components/AddAgentDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import ToastNotification from '../../../../shared/components/ToastNotification';
import { SettingsTableLayout } from '../../../../shared/components/settings';
import { AGENT_TABLE_COLUMNS } from '../constants/agentTableColumns';
import { addAgentValidationSchema, editAgentValidationSchema } from '../validations/agent.validation';
import type { AgentItem } from '../types/agent.types';
import UpdatePasswordModal from '../components/UpdatePasswordModal';
import { mapAgentToFormData } from '../utils/mapAgentToFormData';

const AgentPage = () => {
  const pagination = useTableData<AgentItem>({
    fetchFn: async (params) => {
      const response = await agentService.getAllAgents(params);
      if (response.status) {
        const data = response.data;
        const items = data?.items ?? [];
        return { items, total: data?.pagination?.total ?? items.length };
      }
      throw new Error(response.message || 'Failed to fetch agents');
    },
  });
  const toast = useToast();
  const crud = useAgentCrud({ pagination, showToastMessage: toast.showToastMessage });
  const designation = useAgentDesignationOptions();
  const department = useAgentDepartmentOptions();
  const drawer = useAgentDrawer();
  const dropdown = useDropdownMenu<number>();
  const deleteConfirm = useAgentDeleteConfirm({ handleDeleteAgent: crud.handleDeleteAgent });
  const formSubmit = useAgentFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleAddAgent: crud.handleAddAgent,
    handleUpdateAgent: crud.handleUpdateAgent,
  });

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [updatingPasswordItem, setUpdatingPasswordItem] = useState<AgentItem | null>(null);

  const startIndex = (pagination.pageNumber - 1) * pagination.limit;
  const totalPages = useMemo(() => Math.ceil(pagination.totalCount / pagination.limit) || 1, [pagination.totalCount, pagination.limit]);

  const handleEditClick = useCallback((item: AgentItem) => {
    drawer.openEditDrawer(item);
    dropdown.closeDropdown();
  }, [drawer.openEditDrawer, dropdown.closeDropdown]);

  const handleDeleteClick = useCallback((item: AgentItem) => {
    deleteConfirm.handleDeleteClick(item);
    dropdown.closeDropdown();
  }, [deleteConfirm.handleDeleteClick, dropdown.closeDropdown]);

  const handleUpdatePasswordClick = useCallback((item: AgentItem) => {
    setUpdatingPasswordItem(item);
    setPasswordModalOpen(true);
    dropdown.closeDropdown();
  }, [dropdown.closeDropdown]);

  const handleUpdatePasswordSubmit = useCallback(async (values: any, { setSubmitting, setFieldError }: any) => {
    if (!updatingPasswordItem) return;
    const mappedData = mapAgentToFormData(updatingPasswordItem);
    const success = await crud.handleUpdateAgent(
      String(updatingPasswordItem.staff_id),
      { ...mappedData, password: values.password } as any,
      { setSubmitting, setFieldError } as any,
      'Password updated successfully'
    );
    if (success) {
      setPasswordModalOpen(false);
      setUpdatingPasswordItem(null);
    }
  }, [updatingPasswordItem, crud]);

  const { handleRowsPerPageChange: setRowsPerPage } = pagination;
  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  }, [setRowsPerPage]);

  return (
    <>
      <SettingsTableLayout
        searchQuery={pagination.searchQuery}
        onSearchChange={pagination.handleSearchChange}
        onAdd={drawer.openAddDrawer}
        addLabel="Add Staff"
        data={pagination.list}
        columns={AGENT_TABLE_COLUMNS}
        startIndex={startIndex}
        dropdownOpen={dropdown.dropdownOpen}
        onToggleDropdown={dropdown.toggleDropdown}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onUpdatePassword={handleUpdatePasswordClick}
        currentPage={pagination.pageNumber}
        totalPages={totalPages}
        rowsPerPage={pagination.limit}
        totalItems={pagination.totalCount}
        onPageChange={pagination.setPageNumber}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <AddAgentDrawer
        visibility={{ isOpen: drawer.showDrawer, onClose: drawer.closeDrawer }}
        form={{
          validationSchema: drawer.editingItem ? editAgentValidationSchema : addAgentValidationSchema,
          initialValues: drawer.drawerInitialValues,
          onSubmit: drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit,
          isEditing: !!drawer.editingItem,
        }}
        status={{ isLoading: pagination.isLoading, error: pagination.error }}
        designation={{ options: designation.designationOptions, onFetch: designation.fetchDesignations }}
        department={{ options: department.departmentOptions, onFetch: department.fetchDepartments }}
      />
      <AdminDeleteModal
        isOpen={!!deleteConfirm.deletingItem}
        itemName={deleteConfirm.deletingItem?.fullName || deleteConfirm.deletingItem?.name || ''}
        onConfirm={deleteConfirm.handleConfirmDelete}
        onClose={deleteConfirm.closeDeleteModal}
      />
      <UpdatePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => { setPasswordModalOpen(false); setUpdatingPasswordItem(null); }}
        onSubmit={handleUpdatePasswordSubmit}
      />
      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />
    </>
  );
};

export default AgentPage;
