import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageHeader from '../../../shared/components/layout/PageHeader';
import { useFacebookLeadData } from '../hooks/useFacebookLeadData';
import FilterCard from '../components/FilterCard';
import SummaryCards from '../components/SummaryCards';
import LeadsTable from '../components/LeadsTable';
import LeadsPagination from '../components/LeadsPagination';
import LeadDetailsModal from '../components/LeadDetailsModal';
import ClearConfirmModal from '../components/ClearConfirmModal';
import './FacebookViewLeadsPage.css';
const FacebookViewLeadsPage = () => {
    const d = useFacebookLeadData();
    return (_jsxs("div", { className: "facebook-view-leads-page", children: [_jsx(PageHeader, { title: "Facebook Lead Requests", description: "View and manage Facebook lead form submissions", breadcrumb: [
                    { label: 'GL Connect', link: '/user/gl-connect' },
                    { label: 'Facebook Integration', link: '/facebook/workflows' },
                    { label: 'View Leads' }
                ] }), _jsx(FilterCard, { filters: d.filters, onFilterChange: d.handleFilterChange, onClearClick: () => d.setShowClearConfirm(true) }), _jsx(SummaryCards, { stats: d.stats }), _jsx(LeadsTable, { data: d.paginatedLeads, onViewDetails: d.handleViewDetails, rowsPerPage: d.rowsPerPage, onRowsPerPageChange: d.handleRowsPerPageChange, onSearchChange: (v) => d.handleFilterChange('search', v) }), d.filteredLeads.length > 0 && (_jsx(LeadsPagination, { currentPage: d.currentPage, totalPages: d.totalPages, totalItems: d.filteredLeads.length, rowsPerPage: d.rowsPerPage, onPageChange: d.setCurrentPage })), _jsx(LeadDetailsModal, { isOpen: d.showDetailsModal, lead: d.selectedLead, onClose: () => { d.setShowDetailsModal(false); d.setSelectedLead(null); } }), _jsx(ClearConfirmModal, { isOpen: d.showClearConfirm, onConfirm: d.handleClear, onClose: () => d.setShowClearConfirm(false) })] }));
};
export default FacebookViewLeadsPage;
//# sourceMappingURL=FacebookViewLeadsPage.js.map