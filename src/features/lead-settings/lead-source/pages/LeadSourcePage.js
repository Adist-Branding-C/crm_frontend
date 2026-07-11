import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from 'lucide-react';
import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { useLeadSourceCrud } from '../hooks/useLeadSourceCrud';
import { useLeadSourceDeleteConfirm } from '../hooks/useLeadSourceDeleteConfirm';
import { useLeadSourceFormSubmit } from '../hooks/useLeadSourceFormSubmit';
import { useLeadSourceTableActions } from '../hooks/useLeadSourceTableActions';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, SortToggleButton } from '../../../../shared/components/table';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { ACTION_EDIT, ACTION_ADD } from '../../../../shared/constants/actionLabels';
import './LeadSourcePage.css';
import { EMPTY_LEAD_SOURCE_FORM_DATA, ADD_LEAD_SOURCE_LABEL, LEAD_SOURCE_COLUMN_ADDED_BY, LEAD_SOURCE_COLUMN_SOURCE, } from '../constants';
import { leadSourceService } from '../services';
import { mapApiToUI, mapItemToFormData } from '../mappers/leadSource.mapper';
import { leadSourceValidationSchema } from '../validations/leadSource.validation';
import LeadSourceForm from '../components/LeadSourceForm';
import LeadSourceRow from '../components/LeadSourceRow';
const LeadSourcePage = () => {
    const table = useTableData({
        initialSortOrder: 'DESC',
        fetchFn: async (params) => {
            const response = await leadSourceService.getLeadSources(params.pageNumber, params.limit, params.search, params.sortOrder);
            return {
                items: (response.data?.items ?? []).map(mapApiToUI),
                total: response.data?.pagination?.total ?? 0,
            };
        },
    });
    const search = useDebouncedSearch(table.handleSearchChange);
    const dropdown = useDropdownMenu();
    const drawer = useEditDrawer({
        mapItemToFormData,
        emptyFormData: EMPTY_LEAD_SOURCE_FORM_DATA,
        onOpen: () => table.setError(''),
    });
    const crud = useLeadSourceCrud({ table });
    const deleteConfirm = useLeadSourceDeleteConfirm({ handleDeleteLeadSource: crud.handleDeleteLeadSource });
    const formSubmit = useLeadSourceFormSubmit({
        editingItem: drawer.editingItem,
        closeDrawer: drawer.closeDrawer,
        handleCreateLeadSource: crud.handleCreateLeadSource,
        handleUpdateLeadSource: crud.handleUpdateLeadSource,
    });
    const actions = useLeadSourceTableActions({ table, drawer, dropdown, deleteConfirm });
    return (_jsxs("div", { className: "lead-settings-page", children: [_jsx(PageHeader, { title: "Lead Source", description: "Manage lead source channels" }), _jsx(LeadSettingsSidebar, {}), _jsx("div", { className: "settings-content", children: _jsxs("div", { className: "table-container", children: [_jsxs(TableNav, { searchQuery: search.searchValue, onSearchChange: search.handleSearchChange, rowsPerPage: table.limit, onRowsPerPageChange: actions.handleRowsPerPageChange, children: [_jsx(SortToggleButton, { sortOrder: table.sortOrder, onToggle: table.toggleSortOrder }), _jsxs("button", { className: "btn btn-primary", onClick: drawer.openAddDrawer, children: [_jsx(Plus, { size: 16 }), " ", ADD_LEAD_SOURCE_LABEL] })] }), _jsxs(Table, { wrapperClassName: "table-scroll", className: "data-table", children: [_jsx(THead, { children: _jsxs(TRow, { children: [_jsx(TCell, { variant: "th", children: LABEL_SL_NO }), _jsx(TCell, { variant: "th", children: LEAD_SOURCE_COLUMN_ADDED_BY }), _jsx(TCell, { variant: "th", children: LEAD_SOURCE_COLUMN_SOURCE }), _jsx(TCell, { variant: "th", children: LABEL_ACTIONS })] }) }), _jsx(TBody, { children: table.list.length === 0 ? (_jsx(EmptyState, { colSpan: 4, message: LABEL_NO_DATA })) : (table.list.map((item, idx) => (_jsx(LeadSourceRow, { item: item, index: table.startIndex + idx, isMenuOpen: dropdown.dropdownOpen === item.id, onToggleMenu: (open) => dropdown.toggleDropdown(open ? item.id : null), onEdit: actions.handleEditClick, onDelete: actions.handleDeleteClick }, item.id)))) })] }), _jsx(AdminPagination, { currentPage: table.pageNumber, totalPages: table.totalPages, startIndex: table.startIndex, rowsPerPage: table.limit, totalItems: table.totalCount, onPageChange: table.setPageNumber, onRowsPerPageChange: actions.handleRowsPerPageChange, prevNextOnly: true, alwaysShowNav: true })] }) }), _jsx(DrawerShell, { isOpen: drawer.showDrawer, title: drawer.editingItem ? `${ACTION_EDIT} Lead Source` : `${ACTION_ADD} Lead Source`, onClose: drawer.closeDrawer, children: _jsx(LeadSourceForm, { form: {
                        validationSchema: leadSourceValidationSchema,
                        initialValues: drawer.drawerInitialValues,
                        onSubmit: drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit,
                        onCancel: drawer.closeDrawer,
                        isEditing: !!drawer.editingItem,
                    }, status: {
                        isLoading: table.isLoading,
                        error: table.error,
                        onClearError: actions.clearError,
                    } }) }), _jsx(AdminDeleteModal, { isOpen: !!deleteConfirm.deletingItem, itemName: deleteConfirm.deletingItem?.source, itemType: "lead source", error: table.error, onConfirm: deleteConfirm.handleConfirmDelete, onClose: deleteConfirm.closeDeleteModal })] }));
};
export default LeadSourcePage;
//# sourceMappingURL=LeadSourcePage.js.map