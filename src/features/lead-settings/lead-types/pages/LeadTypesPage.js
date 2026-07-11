import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from 'lucide-react';
import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { useLeadTypeCrud } from '../hooks/useLeadTypeCrud';
import { useLeadTypeDeleteConfirm } from '../hooks/useLeadTypeDeleteConfirm';
import { useLeadTypeFormSubmit } from '../hooks/useLeadTypeFormSubmit';
import { useLeadTypeTableActions } from '../hooks/useLeadTypeTableActions';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, SortToggleButton } from '../../../../shared/components/table';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { ACTION_EDIT, ACTION_ADD } from '../../../../shared/constants/actionLabels';
import './LeadTypesPage.css';
import { EMPTY_LEAD_TYPE_FORM_DATA, ADD_LEAD_TYPE_LABEL, LEAD_TYPE_COLUMN_ADDED_BY, LEAD_TYPE_COLUMN_TYPE } from '../constants';
import { leadTypeService } from '../services';
import { mapApiToUI, mapItemToFormData } from '../mappers/leadType.mapper';
import { leadTypeValidationSchema } from '../validations/leadType.validation';
import LeadTypeForm from '../components/LeadTypeForm';
import LeadTypeRow from '../components/LeadTypeRow';
const LeadTypesPage = () => {
    const table = useTableData({
        initialSortOrder: 'DESC',
        fetchFn: async (params) => {
            const response = await leadTypeService.getLeadTypes(params.pageNumber, params.limit, params.search, params.sortOrder);
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
        emptyFormData: EMPTY_LEAD_TYPE_FORM_DATA,
        onOpen: () => table.setError(''),
    });
    const crud = useLeadTypeCrud({ table });
    const deleteConfirm = useLeadTypeDeleteConfirm({ handleDeleteLeadType: crud.handleDeleteLeadType });
    const formSubmit = useLeadTypeFormSubmit({
        editingItem: drawer.editingItem,
        closeDrawer: drawer.closeDrawer,
        handleCreateLeadType: crud.handleCreateLeadType,
        handleUpdateLeadType: crud.handleUpdateLeadType,
    });
    const actions = useLeadTypeTableActions({ table, drawer, dropdown, deleteConfirm });
    return (_jsxs("div", { className: "lead-settings-page", children: [_jsx(PageHeader, { title: "Lead Types", description: "Define lead categories" }), _jsx(LeadSettingsSidebar, {}), _jsx("div", { className: "settings-content", children: _jsxs("div", { className: "table-container", children: [_jsxs(TableNav, { searchQuery: search.searchValue, onSearchChange: search.handleSearchChange, rowsPerPage: table.limit, onRowsPerPageChange: actions.handleRowsPerPageChange, children: [_jsx(SortToggleButton, { sortOrder: table.sortOrder, onToggle: table.toggleSortOrder }), _jsxs("button", { className: "btn btn-primary", onClick: drawer.openAddDrawer, children: [_jsx(Plus, { size: 16 }), " ", ADD_LEAD_TYPE_LABEL] })] }), _jsxs(Table, { wrapperClassName: "table-scroll", className: "data-table", children: [_jsx(THead, { children: _jsxs(TRow, { children: [_jsx(TCell, { variant: "th", children: LABEL_SL_NO }), _jsx(TCell, { variant: "th", children: LEAD_TYPE_COLUMN_ADDED_BY }), _jsx(TCell, { variant: "th", children: LEAD_TYPE_COLUMN_TYPE }), _jsx(TCell, { variant: "th", children: LABEL_ACTIONS })] }) }), _jsx(TBody, { children: table.list.length === 0 ? (_jsx(EmptyState, { colSpan: 4, message: LABEL_NO_DATA })) : (table.list.map((item, idx) => (_jsx(LeadTypeRow, { item: item, index: table.startIndex + idx, isMenuOpen: dropdown.dropdownOpen === item.id, onToggleMenu: (open) => dropdown.toggleDropdown(open ? item.id : null), onEdit: actions.handleEditClick, onDelete: actions.handleDeleteClick }, item.id)))) })] }), _jsx(AdminPagination, { currentPage: table.pageNumber, totalPages: table.totalPages, startIndex: table.startIndex, rowsPerPage: table.limit, totalItems: table.totalCount, onPageChange: table.setPageNumber, onRowsPerPageChange: actions.handleRowsPerPageChange, prevNextOnly: true, alwaysShowNav: true })] }) }), _jsx(DrawerShell, { isOpen: drawer.showDrawer, title: drawer.editingItem ? `${ACTION_EDIT} Lead Type` : `${ACTION_ADD} Lead Type`, onClose: drawer.closeDrawer, children: _jsx(LeadTypeForm, { form: {
                        validationSchema: leadTypeValidationSchema,
                        initialValues: drawer.drawerInitialValues,
                        onSubmit: drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit,
                        onCancel: drawer.closeDrawer,
                        isEditing: !!drawer.editingItem,
                    }, status: {
                        isLoading: table.isLoading,
                        error: table.error,
                        onClearError: actions.clearError,
                    } }) }), _jsx(AdminDeleteModal, { isOpen: !!deleteConfirm.deletingItem, itemName: deleteConfirm.deletingItem?.type, itemType: "lead type", error: table.error, onConfirm: deleteConfirm.handleConfirmDelete, onClose: deleteConfirm.closeDeleteModal })] }));
};
export default LeadTypesPage;
//# sourceMappingURL=LeadTypesPage.js.map