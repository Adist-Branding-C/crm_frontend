import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { Check, X } from 'lucide-react';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useToast } from '../../../../shared/hooks/useToast';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useBranchCrud, useBranchDrawer, useBranchDeleteConfirm, useBranchFormSubmit } from '../hooks';
import { branchService } from '../services/branch.service';
import AddBranchDrawer from '../components/AddBranchDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout } from '../../../../shared/components/settings';
import { BRANCH_TABLE_COLUMNS } from '../constants/branchTableColumns';
import { addBranchValidationSchema, editBranchValidationSchema } from '../validations/branch.validation';
const BranchPage = () => {
    const pagination = useTableData({
        fetchFn: async (params) => {
            const response = await branchService.getAllBranches(params);
            if (response.status) {
                const data = response.data;
                const items = data?.items ?? [];
                return { items, total: data?.total ?? items.length };
            }
            throw new Error(response.message || 'Failed to fetch branches');
        },
    });
    const toast = useToast();
    const crud = useBranchCrud({ pagination, showToastMessage: toast.showToastMessage });
    const drawer = useBranchDrawer();
    const dropdown = useDropdownMenu();
    const deleteConfirm = useBranchDeleteConfirm({ handleDeleteBranch: crud.handleDeleteBranch });
    const formSubmit = useBranchFormSubmit({
        editingItem: drawer.editingItem,
        closeDrawer: drawer.closeDrawer,
        handleAddBranch: crud.handleAddBranch,
        handleUpdateBranch: crud.handleUpdateBranch,
    });
    const handleEditClick = useCallback((item) => {
        drawer.openEditDrawer(item);
        dropdown.closeDropdown();
    }, [drawer.openEditDrawer, dropdown.closeDropdown]);
    const handleDeleteClick = useCallback((item) => {
        deleteConfirm.handleDeleteClick(item);
        dropdown.closeDropdown();
    }, [deleteConfirm.handleDeleteClick, dropdown.closeDropdown]);
    const { handleRowsPerPageChange: setRowsPerPage } = pagination;
    const handleRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
    }, [setRowsPerPage]);
    return (_jsxs("div", { className: "account-page", children: [_jsx(PageHeader, { title: "Account Settings", description: "Manage your login credentials, settings, and preferences" }), _jsx(SettingsTabs, {}), _jsxs("div", { className: "account-content", style: { width: '100%', maxWidth: '100%' }, children: [_jsx(SettingsTableLayout, { searchQuery: pagination.searchQuery, onSearchChange: pagination.handleSearchChange, onAdd: drawer.openAddDrawer, addLabel: "Add Branch", data: pagination.list, columns: BRANCH_TABLE_COLUMNS, startIndex: pagination.startIndex, dropdownOpen: dropdown.dropdownOpen, onToggleDropdown: dropdown.toggleDropdown, onEdit: handleEditClick, onDelete: handleDeleteClick, currentPage: pagination.pageNumber, totalPages: pagination.totalPages, rowsPerPage: pagination.limit, totalItems: pagination.totalCount, onPageChange: pagination.setPageNumber, onRowsPerPageChange: handleRowsPerPageChange }), _jsx(AddBranchDrawer, { visibility: { isOpen: drawer.showDrawer, onClose: drawer.closeDrawer }, form: {
                            validationSchema: drawer.editingItem ? editBranchValidationSchema : addBranchValidationSchema,
                            initialValues: drawer.drawerInitialValues,
                            onSubmit: drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit,
                            isEditing: !!drawer.editingItem,
                        }, status: { isLoading: pagination.isLoading, error: pagination.error } }), _jsx(AdminDeleteModal, { isOpen: !!deleteConfirm.deletingItem, itemName: deleteConfirm.deletingItem?.name || deleteConfirm.deletingItem?.branchName || '', onConfirm: deleteConfirm.handleConfirmDelete, onClose: deleteConfirm.closeDeleteModal }), toast.showToast && (_jsxs("div", { className: `toast-notification toast-${toast.toastType}`, onClick: () => toast.setShowToast(false), children: [toast.toastType === 'success' ? _jsx(Check, { size: 18 }) : _jsx(X, { size: 18 }), _jsx("span", { children: toast.toastMessage })] }))] })] }));
};
export default BranchPage;
//# sourceMappingURL=BranchPage.js.map