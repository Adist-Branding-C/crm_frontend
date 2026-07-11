import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageHeader from '../../../shared/components/layout/PageHeader';
import { staffList, activityTypes } from '../constants';
import { useDailyActivityData } from '../hooks/useDailyActivityData';
import ActivitySummaryCard from '../components/ActivitySummaryCard';
import ActivityFilters from '../components/ActivityFilters';
import ActivityTypeFilter from '../components/ActivityTypeFilter';
import ActivityTimeline from '../components/ActivityTimeline';
import ActivityPagination from '../components/ActivityPagination';
import './DailyActivityPage.css';
const DailyActivityPage = () => {
    const { filters, activityTypeFilter, setActivityTypeFilter, currentPage, showStaffDropdown, setShowStaffDropdown, localSearchQuery, setLocalSearchQuery, totalActivities, totalPages, paginatedActivities, selectedStaffName, handleFilterChange, handleApply, handleReset, handlePageChange, getPageNumbers, } = useDailyActivityData();
    return (_jsxs("div", { className: "daily-activity-page", children: [_jsx(PageHeader, { title: "Activity", description: "Logged interactions, aiding in customer relationship management and informed decisions." }), _jsxs("div", { className: "activity-summary-card", children: [_jsx(ActivitySummaryCard, { totalActivities: totalActivities }), _jsx(ActivityFilters, { filters: filters, showStaffDropdown: showStaffDropdown, localSearchQuery: localSearchQuery, selectedStaffName: selectedStaffName, staffList: staffList, onFilterChange: handleFilterChange, onApply: handleApply, onReset: handleReset, onShowStaffDropdownChange: setShowStaffDropdown, onLocalSearchQueryChange: setLocalSearchQuery })] }), _jsx(ActivityTypeFilter, { activityTypeFilter: activityTypeFilter, activityTypes: activityTypes, onChange: setActivityTypeFilter }), _jsx(ActivityTimeline, { activities: paginatedActivities }), _jsx(ActivityPagination, { currentPage: currentPage, totalPages: totalPages, totalActivities: totalActivities, onPageChange: handlePageChange, getPageNumbers: getPageNumbers })] }));
};
export default DailyActivityPage;
//# sourceMappingURL=DailyActivityPage.js.map