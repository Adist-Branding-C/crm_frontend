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
  const {
    filters,
    activityTypeFilter,
    setActivityTypeFilter,
    currentPage,
    showStaffDropdown,
    setShowStaffDropdown,
    localSearchQuery,
    setLocalSearchQuery,
    totalActivities,
    totalPages,
    paginatedActivities,
    selectedStaffName,
    handleFilterChange,
    handleApply,
    handleReset,
    handlePageChange,
    getPageNumbers,
  } = useDailyActivityData();

  return (
    <div className="daily-activity-page">
      <PageHeader
        title="Activity"
        description="Logged interactions, aiding in customer relationship management and informed decisions."
      />

      <div className="activity-summary-card">
        <ActivitySummaryCard totalActivities={totalActivities} />
        <ActivityFilters
          filters={filters}
          showStaffDropdown={showStaffDropdown}
          localSearchQuery={localSearchQuery}
          selectedStaffName={selectedStaffName}
          staffList={staffList}
          onFilterChange={handleFilterChange}
          onApply={handleApply}
          onReset={handleReset}
          onShowStaffDropdownChange={setShowStaffDropdown}
          onLocalSearchQueryChange={setLocalSearchQuery}
        />
      </div>

      <ActivityTypeFilter
        activityTypeFilter={activityTypeFilter}
        activityTypes={activityTypes}
        onChange={setActivityTypeFilter}
      />

      <ActivityTimeline
        activities={paginatedActivities}
      />

      <ActivityPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalActivities={totalActivities}
        onPageChange={handlePageChange}
        getPageNumbers={getPageNumbers}
      />
    </div>
  );
};

export default DailyActivityPage;
