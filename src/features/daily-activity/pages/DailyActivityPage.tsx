import PageHeader from '../../../shared/components/layout/PageHeader';
import ToastNotification from '../../../shared/components/ToastNotification';
import { activityTypes } from '../constants';
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
    staffSearchQuery,
    setStaffSearchQuery,
    totalActivities,
    totalPages,
    paginatedActivities,
    selectedStaffName,
    staffOptions,
    pageNumbers,
    handleFilterChange,
    handleStaffSelect,
    handleApply,
    handleReset,
    handlePageChange,
    toast,
  } = useDailyActivityData();

  return (
    <div className="daily-activity-page">
      <PageHeader
        title="Activity"
        description="Logged interactions, aiding in customer relationship management and informed decisions."
      />

      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />

      <div className="activity-summary-card">
        <ActivitySummaryCard totalActivities={totalActivities} />
        <ActivityFilters
          filters={filters}
          showStaffDropdown={showStaffDropdown}
          staffSearchQuery={staffSearchQuery}
          selectedStaffName={selectedStaffName}
          staffList={staffOptions}
          onFilterChange={handleFilterChange}
          onStaffSelect={handleStaffSelect}
          onApply={handleApply}
          onReset={handleReset}
          onShowStaffDropdownChange={setShowStaffDropdown}
          onStaffSearchQueryChange={setStaffSearchQuery}
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
        pageNumbers={pageNumbers}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DailyActivityPage;
