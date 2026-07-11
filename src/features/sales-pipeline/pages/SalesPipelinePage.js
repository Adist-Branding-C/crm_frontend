import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddDealDrawer from '../../../shared/components/drawers/AddDealDrawer';
import { useSalesPipelineData } from '../hooks/useSalesPipelineData';
import PipelineToolbar from '../components/PipelineToolbar';
import PipelineFilters from '../components/PipelineFilters';
import DealPipelineBoard from '../components/DealPipelineBoard';
import LeadPipelineBoard from '../components/LeadPipelineBoard';
import TaskPipelineBoard from '../components/TaskPipelineBoard';
import './SalesPipelinePage.css';
const SalesPipelinePage = () => {
    const { searchQuery, setSearchQuery, showDateFilter, setShowDateFilter, dateFrom, setDateFrom, dateTo, setDateTo, selectedAgent, setSelectedAgent, selectedType, setSelectedType, isDrawerOpen, setIsDrawerOpen, activeView, loading, error, loadingStatusId, loadingLeadStatusId, loadingTaskStatus, fetchLeads, fetchDeals, fetchTasks, loadMoreDeals, loadMoreLeads, loadMoreTasks, filterRef, clearFilters, filteredStatusGroups, filteredLeadGroups, filteredTaskGroups, handleDragStart, handleDragOver, handleDrop, handleSaveDeal, getAvatarColor, } = useSalesPipelineData();
    return (_jsxs(PageContainer, { children: [_jsx(PageHeader, { title: "Sales Pipeline", description: "Manage deals through your sales pipeline stages" }), _jsx("div", { className: "pipeline-toolbar", children: _jsxs("div", { className: "pipeline-left", children: [_jsx(PipelineToolbar, { searchQuery: searchQuery, setSearchQuery: setSearchQuery, activeView: activeView, loading: loading, error: error, fetchLeads: fetchLeads, fetchDeals: fetchDeals, fetchTasks: fetchTasks }), _jsx(PipelineFilters, { showDateFilter: showDateFilter, setShowDateFilter: setShowDateFilter, dateFrom: dateFrom, setDateFrom: setDateFrom, dateTo: dateTo, setDateTo: setDateTo, selectedAgent: selectedAgent, setSelectedAgent: setSelectedAgent, selectedType: selectedType, setSelectedType: setSelectedType, filterRef: filterRef, clearFilters: clearFilters })] }) }), activeView === 'deals' && (_jsx(DealPipelineBoard, { filteredStatusGroups: filteredStatusGroups, loadingStatusId: loadingStatusId, loadMoreDeals: loadMoreDeals, handleDragStart: handleDragStart, handleDragOver: handleDragOver, handleDrop: handleDrop, getAvatarColor: getAvatarColor })), activeView === 'leads' && (_jsx(LeadPipelineBoard, { filteredLeadGroups: filteredLeadGroups, loadingLeadStatusId: loadingLeadStatusId, loadMoreLeads: loadMoreLeads, getAvatarColor: getAvatarColor })), activeView === 'tasks' && (_jsx(TaskPipelineBoard, { filteredTaskGroups: filteredTaskGroups, loadingTaskStatus: loadingTaskStatus, loadMoreTasks: loadMoreTasks, getAvatarColor: getAvatarColor })), _jsx(AddDealDrawer, { isOpen: isDrawerOpen, onClose: () => setIsDrawerOpen(false), onSave: handleSaveDeal })] }));
};
export default SalesPipelinePage;
//# sourceMappingURL=SalesPipelinePage.js.map