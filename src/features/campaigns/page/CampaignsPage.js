import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo, useRef } from 'react';
import { Download, Plus } from 'lucide-react';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useRowDropdown } from '../../../shared/hooks/useRowDropdown';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useFetchCampaigns } from '../hooks/useFetchCampaigns';
import { useCampaignSubmitHandlers } from '../hooks/useCampaignSubmitHandlers';
import { useCampaignExport } from '../hooks/useCampaignExport';
import { useToast } from '../../task-settings/hooks/useToast';
import { CampaignMapper } from '../mappers/campaign.mapper';
import { campaignValidationSchema } from '../validations/index';
import { ADD_CAMPAIGN_INITIAL_VALUES } from '../constants/index';
import { LABEL_NO_DATA } from '../../../shared/constants/labels';
import CampaignForm from '../components/CampaignForm';
import CampaignRow from '../components/CampaignRow';
import DeleteCampaignDialog from '../components/DeleteCampaignDialog';
import ToastNotification from '../../task-settings/components/ToastNotification';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Drawer from '../../../shared/components/Drawer';
import Modal from '../../../shared/components/Modal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import './CampaignsPage.css';
const CampaignsPage = () => {
    const fetch = useFetchCampaigns();
    const addDrawer = useDrawer();
    const editDrawer = useDrawer();
    const deleteDialog = useDrawer();
    const dropdown = useRowDropdown();
    const toast = useToast();
    const { handleExportCSV } = useCampaignExport(fetch.campaignList);
    const formBodyRef = useRef(null);
    const handlers = useCampaignSubmitHandlers({
        onAddSuccess: addDrawer.close,
        onEditSuccess: editDrawer.close,
        onDeleteSuccess: deleteDialog.close,
        editingItem: editDrawer.item,
        deletingItem: deleteDialog.item,
    }, fetch, toast);
    const { searchValue, handleSearchInput } = useDebouncedSearch(fetch.searchQuery, fetch.handleSearchChange);
    const editInitialValues = useMemo(() => CampaignMapper.toFormValues(editDrawer.item), [editDrawer.item]);
    const handleView = useCallback((_campaign) => { }, []);
    const handleAssignClick = useCallback((_campaign) => { }, []);
    return (_jsxs(PageContainer, { children: [_jsx(PageHeader, { title: "Campaigns", description: "Manage campaign tasks and activities." }), _jsxs("div", { className: "table-container", children: [_jsxs(TableNav, { searchQuery: searchValue, onSearchChange: handleSearchInput, rowsPerPage: fetch.limit, onRowsPerPageChange: fetch.handleRowsPerPageChange, children: [_jsxs("button", { className: "btn btn-secondary", onClick: handleExportCSV, style: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }, children: [_jsx(Download, { size: 16 }), "Export"] }), _jsxs("button", { className: "btn btn-primary", onClick: () => addDrawer.open(), style: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }, children: [_jsx(Plus, { size: 16 }), " Campaign"] })] }), _jsxs(Table, { wrapperClassName: "table-scroll", className: "data-table", children: [_jsx(THead, { children: _jsxs(TRow, { children: [_jsx(TCell, { variant: "th", children: "Sl No" }), _jsx(TCell, { variant: "th", children: "Name" }), _jsx(TCell, { variant: "th", children: "Type" }), _jsx(TCell, { variant: "th", children: "Total Tasks" }), _jsx(TCell, { variant: "th", children: "Completed Tasks" }), _jsx(TCell, { variant: "th", children: "Completed %" }), _jsx(TCell, { variant: "th", children: "Created By" }), _jsx(TCell, { variant: "th", children: "Created At" }), _jsx(TCell, { variant: "th", children: "Actions" })] }) }), _jsx(TBody, { children: fetch.campaignList.length === 0 ? (_jsx(EmptyState, { colSpan: 9, message: LABEL_NO_DATA })) : (fetch.campaignList.map((campaign) => (_jsx(CampaignRow, { campaign: campaign, dropdownOpen: dropdown.dropdownOpen, onToggleDropdown: dropdown.toggleDropdown, onView: handleView, onEdit: editDrawer.open, onAssign: handleAssignClick, onDelete: deleteDialog.open }, campaign.id)))) })] }), _jsx(Pagination, { currentPage: fetch.pageNumber, totalPages: fetch.totalPages, totalItems: fetch.totalCount, rowsPerPage: fetch.limit, onPageChange: fetch.setPageNumber })] }), _jsx(Drawer, { ref: formBodyRef, isOpen: addDrawer.isOpen, onClose: addDrawer.close, title: "Add Campaign", children: _jsx(CampaignForm, { editingItem: null, validationSchema: campaignValidationSchema, initialValues: ADD_CAMPAIGN_INITIAL_VALUES, onSubmit: handlers.handleAddSubmit, isLoading: fetch.isLoading, error: fetch.error, onCancel: addDrawer.close, scrollContainerRef: formBodyRef }) }), _jsx(Drawer, { ref: formBodyRef, isOpen: editDrawer.isOpen, onClose: editDrawer.close, title: "Edit Campaign", children: _jsx(CampaignForm, { editingItem: editDrawer.item, validationSchema: campaignValidationSchema, initialValues: editInitialValues, onSubmit: handlers.handleEditSubmit, isLoading: fetch.isLoading, error: fetch.error, onCancel: editDrawer.close, scrollContainerRef: formBodyRef }) }), _jsx(Modal, { isOpen: deleteDialog.isOpen, onClose: deleteDialog.close, title: "Confirm Delete", maxWidth: "450px", children: _jsx(DeleteCampaignDialog, { itemName: deleteDialog.item?.name || '', onConfirm: handlers.handleConfirmDelete, onCancel: deleteDialog.close }) }), _jsx(ToastNotification, { message: toast.toastMessage, type: toast.toastType, visible: toast.showToast, onClose: () => toast.setShowToast(false) })] }));
};
export default CampaignsPage;
//# sourceMappingURL=CampaignsPage.js.map