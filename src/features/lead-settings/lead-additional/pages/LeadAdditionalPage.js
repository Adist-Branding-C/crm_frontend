import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useAsyncOptions } from '../../../../shared/hooks/useAsyncOptions';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { useLeadAdditionalCrud } from '../hooks/useLeadAdditionalCrud';
import { useLeadAdditionalDeleteConfirm } from '../hooks/useLeadAdditionalDeleteConfirm';
import { useLeadAdditionalFormSubmit } from '../hooks/useLeadAdditionalFormSubmit';
import { useLeadAdditionalTableActions } from '../hooks/useLeadAdditionalTableActions';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, SortToggleButton } from '../../../../shared/components/table';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import AdditionalFieldForm from '../components/AdditionalFieldForm';
import AdditionalFieldRow from '../components/AdditionalFieldRow';
import { leadAdditionalService } from '../services/leadAdditionalService';
import { leadPurposeService } from '../../lead-purpose/services';
import { mapApiToUI, mapPurposeApiToUI, mapItemToFormData } from '../mappers/additionalField.mapper';
import { additionalFieldValidationSchema } from '../validations/additionalField.validation';
import { EMPTY_ADDITIONAL_FIELD_FORM_DATA } from '../constants/form.constants';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { LEAD_ADDITIONAL_COLUMN_ADDED_BY, LEAD_ADDITIONAL_COLUMN_FIELD, LEAD_ADDITIONAL_COLUMN_TYPE, LEAD_ADDITIONAL_COLUMN_VALUES, LEAD_ADDITIONAL_COLUMN_IN_FILTER, LEAD_ADDITIONAL_COLUMN_IN_LIST, LEAD_ADDITIONAL_COLUMN_REQUIRED, LEAD_ADDITIONAL_COLUMN_PURPOSE, } from '../constants';
import './LeadAdditionalPage.css';
const LeadAdditionalPage = () => {
    const table = useTableData({
        initialSortOrder: 'DESC',
        fetchFn: async (params) => {
            const response = await leadAdditionalService.getAll(params.pageNumber, params.limit, params.search, params.sortOrder);
            return {
                items: (response.data?.items ?? []).map(mapApiToUI),
                total: response.data?.pagination?.total ?? 0,
            };
        },
    });
    const search = useDebouncedSearch(table.handleSearchChange);
    const dropdown = useDropdownMenu();
    const purposeOptions = useAsyncOptions(() => leadPurposeService.getLeadPurposes(1, 100).then((r) => r.data?.items ?? []), mapPurposeApiToUI);
    const drawer = useEditDrawer({
        mapItemToFormData,
        emptyFormData: EMPTY_ADDITIONAL_FIELD_FORM_DATA,
        onOpen: () => table.setError(''),
    });
    const crud = useLeadAdditionalCrud({ table });
    const deleteConfirm = useLeadAdditionalDeleteConfirm({ handleDeleteAdditionalField: crud.handleDeleteAdditionalField });
    const formSubmit = useLeadAdditionalFormSubmit({
        editingItem: drawer.editingItem,
        closeDrawer: drawer.closeDrawer,
        handleCreateAdditionalField: crud.handleCreateAdditionalField,
        handleUpdateAdditionalField: crud.handleUpdateAdditionalField,
    });
    const actions = useLeadAdditionalTableActions({ table, drawer, dropdown, deleteConfirm, crud });
    return (_jsxs("div", { className: "lead-settings-page", children: [_jsx(PageHeader, { title: "Lead Settings", description: "Configure lead purposes, statuses, sources and types" }), _jsx(LeadSettingsSidebar, {}), _jsx("div", { className: "settings-content", children: _jsxs("div", { className: "additional-fields-layout", children: [_jsx(AdditionalFieldForm, { form: {
                                validationSchema: additionalFieldValidationSchema,
                                initialValues: drawer.drawerInitialValues,
                                onSubmit: drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit,
                                isEditing: !!drawer.editingItem,
                                editingFieldName: drawer.editingItem?.field,
                                onCancelEdit: drawer.closeDrawer,
                            }, status: {
                                isSaving: crud.isSaving,
                                error: crud.error,
                                onClearError: actions.clearError,
                            }, purposes: purposeOptions.options }), _jsxs("div", { className: "additional-table-panel", children: [_jsx(TableNav, { searchQuery: search.searchValue, onSearchChange: search.handleSearchChange, rowsPerPage: table.limit, onRowsPerPageChange: actions.handleRowsPerPageChange, children: _jsx(SortToggleButton, { sortOrder: table.sortOrder, onToggle: table.toggleSortOrder }) }), _jsx("div", { className: "table-container", children: _jsxs(Table, { wrapperClassName: "table-scroll", className: "data-table", children: [_jsx(THead, { children: _jsxs(TRow, { children: [_jsx(TCell, { variant: "th", children: LABEL_SL_NO }), _jsx(TCell, { variant: "th", children: LEAD_ADDITIONAL_COLUMN_ADDED_BY }), _jsx(TCell, { variant: "th", children: LEAD_ADDITIONAL_COLUMN_FIELD }), _jsx(TCell, { variant: "th", children: LEAD_ADDITIONAL_COLUMN_TYPE }), _jsx(TCell, { variant: "th", children: LEAD_ADDITIONAL_COLUMN_VALUES }), _jsx(TCell, { variant: "th", children: LEAD_ADDITIONAL_COLUMN_IN_FILTER }), _jsx(TCell, { variant: "th", children: LEAD_ADDITIONAL_COLUMN_IN_LIST }), _jsx(TCell, { variant: "th", children: LEAD_ADDITIONAL_COLUMN_REQUIRED }), _jsx(TCell, { variant: "th", children: LEAD_ADDITIONAL_COLUMN_PURPOSE }), _jsx(TCell, { variant: "th", children: LABEL_ACTIONS })] }) }), _jsx(TBody, { children: table.list.length === 0 ? (_jsx(EmptyState, { colSpan: 10, message: LABEL_NO_DATA })) : (table.list.map((item, idx) => (_jsx(AdditionalFieldRow, { item: item, index: table.startIndex + idx, isMenuOpen: dropdown.dropdownOpen === item.id, onToggleMenu: (open) => dropdown.toggleDropdown(open ? item.id : null), onEdit: actions.handleEditClick, onDelete: actions.handleDeleteClick }, item.id)))) })] }) }), _jsx(AdminPagination, { currentPage: table.pageNumber, totalPages: table.totalPages, startIndex: table.startIndex, rowsPerPage: table.limit, totalItems: table.totalCount, onPageChange: table.setPageNumber, onRowsPerPageChange: actions.handleRowsPerPageChange, prevNextOnly: true, alwaysShowNav: true })] })] }) }), _jsx(AdminDeleteModal, { isOpen: !!deleteConfirm.deletingItem, itemName: deleteConfirm.deletingItem?.field, itemType: "additional field", error: crud.deleteError, onConfirm: deleteConfirm.handleConfirmDelete, onClose: deleteConfirm.closeDeleteModal })] }));
};
export default LeadAdditionalPage;
//# sourceMappingURL=LeadAdditionalPage.js.map