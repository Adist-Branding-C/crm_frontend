import { useCallback, useMemo } from 'react';
import { useEmailTemplate, useEmailTemplateDrawer, useEmailTemplateDropdown, useEmailTemplateFilters, useEmailTemplateActions } from './index';
export function useEmailTemplatePage() {
    const emailTemplate = useEmailTemplate();
    const drawer = useEmailTemplateDrawer();
    const dropdown = useEmailTemplateDropdown();
    const filters = useEmailTemplateFilters(emailTemplate.emailTemplateList);
    const actions = useEmailTemplateActions({ emailTemplate, drawer });
    const startIndex = (emailTemplate.pageNumber - 1) * emailTemplate.limit;
    const totalPages = useMemo(() => Math.ceil(emailTemplate.totalCount / emailTemplate.limit) || 1, [emailTemplate.totalCount, emailTemplate.limit]);
    const handleEditClick = useCallback((item) => {
        drawer.openEditDrawer(item);
        dropdown.closeDropdown();
    }, [drawer.openEditDrawer, dropdown.closeDropdown]);
    const handleDeleteClick = useCallback((item) => {
        actions.handleDeleteClick(item);
        dropdown.closeDropdown();
    }, [actions.handleDeleteClick, dropdown.closeDropdown]);
    const { handleRowsPerPageChange: setRowsPerPage } = emailTemplate;
    const handleRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
    }, [setRowsPerPage]);
    return {
        emailTemplate,
        searchQuery: emailTemplate.searchQuery,
        handleSearchChange: emailTemplate.handleSearchChange,
        rowsPerPage: emailTemplate.limit,
        handleRowsPerPageChange,
        pageNumber: emailTemplate.pageNumber,
        setPageNumber: emailTemplate.setPageNumber,
        totalCount: emailTemplate.totalCount,
        startIndex,
        totalPages,
        showDrawer: drawer.showDrawer,
        dropdownOpen: dropdown.dropdownOpen,
        onToggleDropdown: dropdown.toggleDropdown,
        editingItem: drawer.editingItem,
        deletingItem: actions.deletingItem,
        filteredData: filters.filteredData,
        drawerInitialValues: drawer.drawerInitialValues,
        handleAddClick: drawer.openAddDrawer,
        handleCloseDrawer: drawer.closeDrawer,
        handleEditClick,
        handleDeleteClick,
        handleConfirmDelete: actions.handleConfirmDelete,
        handleCloseDeleteModal: actions.closeDeleteModal,
        handleSubmit: actions.handleSubmit,
        handleEditSubmit: actions.handleEditSubmit,
    };
}
//# sourceMappingURL=useEmailTemplatePage.js.map