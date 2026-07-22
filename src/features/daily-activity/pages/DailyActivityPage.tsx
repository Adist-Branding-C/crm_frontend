import { useState, useEffect, useCallback, useMemo } from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import ToastNotification from '../../../shared/components/ToastNotification';
import { useToast } from '../../../shared/hooks/useToast';
import { useSearchFilter } from '../../../shared/hooks/useSearchFilter';
import { activityTypes, PAGE_WINDOW, DEFAULT_FILTERS } from '../constants';
import { computePageNumbers } from '../utils/activityHelpers';
import { useStaffOptions } from '../hooks/useStaffOptions';
import { useStaffDropdown } from '../hooks/useStaffDropdown';
import { useActivityFilters } from '../hooks/useActivityFilters';
import { useActivitiesFetch } from '../hooks/useActivitiesFetch';
import ActivitySummaryCard from '../components/ActivitySummaryCard';
import ActivityFilters from '../components/ActivityFilters';
import ActivityTypeFilter from '../components/ActivityTypeFilter';
import ActivityTimeline from '../components/ActivityTimeline';
import ActivityPagination from '../components/ActivityPagination';
import type { StaffOption } from '../types';
import './DailyActivityPage.css';

const STAFF_SEARCH_FIELDS: (keyof StaffOption)[] = ['name'];

const DailyActivityPage = () => {
  const toast = useToast();
  const onError = useCallback(
    (message: string) => toast.showToastMessage(message, 'error'),
    [toast.showToastMessage],
  );

  const { staffOptions, fetchStaffOptions } = useStaffOptions(onError);
  const staffSearch = useSearchFilter(staffOptions, STAFF_SEARCH_FIELDS);
  const staffDropdown = useStaffDropdown();

  useEffect(() => {
    fetchStaffOptions();
  }, [fetchStaffOptions]);
  const activityFilters = useActivityFilters();
  const { activities, pagination, isLoading, fetchActivities } = useActivitiesFetch(onError);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchActivities(1, DEFAULT_FILTERS, '');
  }, [fetchActivities]);

  const handleApply = useCallback(() => {
    const { appliedFilters, appliedActivityType } = activityFilters.applyFilters();
    setCurrentPage(1);
    fetchActivities(1, appliedFilters, appliedActivityType);
  }, [activityFilters, fetchActivities]);

  const handleReset = useCallback(() => {
    const { appliedFilters, appliedActivityType } = activityFilters.resetFilters();
    setCurrentPage(1);
    fetchActivities(1, appliedFilters, appliedActivityType);
  }, [activityFilters, fetchActivities]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    fetchActivities(page, activityFilters.appliedFilters, activityFilters.appliedActivityType);
  }, [activityFilters.appliedFilters, activityFilters.appliedActivityType, fetchActivities]);

  const handleStaffSelect = useCallback((staffId: string) => {
    activityFilters.handleFilterChange('staff', staffId);
    staffDropdown.setIsOpen(false);
  }, [activityFilters.handleFilterChange, staffDropdown.setIsOpen]);

  const totalActivities = pagination?.total ?? 0;
  const totalPages = pagination?.total_pages ?? 1;

  const selectedStaffName = useMemo(
    () => staffOptions.find((s) => s.id === activityFilters.filters.staff)?.name || 'All Staff',
    [staffOptions, activityFilters.filters.staff],
  );

  const pageNumbers = useMemo(
    () => computePageNumbers(currentPage, totalPages, PAGE_WINDOW),
    [currentPage, totalPages],
  );

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
          filters={activityFilters.filters}
          showStaffDropdown={staffDropdown.isOpen}
          staffSearchQuery={staffSearch.query}
          selectedStaffName={selectedStaffName}
          staffList={staffSearch.filteredData}
          isLoading={isLoading}
          onFilterChange={activityFilters.handleFilterChange}
          onStaffSelect={handleStaffSelect}
          onApply={handleApply}
          onReset={handleReset}
          onShowStaffDropdownChange={staffDropdown.setIsOpen}
          onStaffSearchQueryChange={staffSearch.setQuery}
        />
      </div>

      <ActivityTypeFilter
        activityTypeFilter={activityFilters.activityTypeFilter}
        activityTypes={activityTypes}
        isLoading={isLoading}
        onChange={activityFilters.setActivityTypeFilter}
      />

      <ActivityTimeline
        activities={activities}
        isLoading={isLoading}
      />

      {activities.length > 0 && (
        <ActivityPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalActivities={totalActivities}
          pageNumbers={pageNumbers}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default DailyActivityPage;
