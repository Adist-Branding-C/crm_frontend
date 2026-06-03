import { ChevronLeft, ChevronRight, Search, Phone, Filter, RotateCcw, Activity as ActivityIcon, ChevronDown } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { staffList, activityTypes } from '../constants';
import { useDailyActivityData } from '../hooks/useDailyActivityData';
import './DailyActivityPage.css';

const DailyActivityPage = () => {
  const {
    filters,
    setFilters,
    activityTypeFilter,
    setActivityTypeFilter,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    showStaffDropdown,
    setShowStaffDropdown,
    localSearchQuery,
    setLocalSearchQuery,
    completedActivities,
    rowsPerPage,
    totalActivities,
    totalPages,
    paginatedActivities,
    selectedStaffName,
    handleFilterChange,
    handleReset,
    handleMarkComplete,
    getPageNumbers,
  } = useDailyActivityData();
  return (
    <div className="daily-activity-page">
      <PageHeader
        title="Activity"
        description="Logged interactions, aiding in customer relationship management and informed decisions."
      />

      <div className="activity-summary-card">
        <div className="activity-count-section">
          <div className="activity-count-icon">
            <ActivityIcon size={24} />
          </div>
          <div className="activity-count-info">
            <span className="activity-count-label">Activity Count</span>
            <span className="activity-count-number">{totalActivities}</span>
          </div>
        </div>

        <div className="activity-filters-section">
          <div className="filter-group">
            <label>Date</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>Start Time</label>
            <input
              type="time"
              value={filters.startTime}
              onChange={(e) => handleFilterChange('startTime', e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>End Time</label>
            <input
              type="time"
              value={filters.endTime}
              onChange={(e) => handleFilterChange('endTime', e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group dropdown-group">
            <label>Staff</label>
            <div
              className="filter-select-trigger"
              onClick={() => setShowStaffDropdown(!showStaffDropdown)}
            >
              <span>{selectedStaffName}</span>
              <ChevronDown size={16} />
            </div>
            {showStaffDropdown && (
              <div className="filter-dropdown">
                <div className="dropdown-search">
                  <Search size={14} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                  />
                </div>
                <div className="dropdown-list">
                  {staffList.map(staff => (
                    <div
                      key={staff.id}
                      className={`dropdown-item ${filters.staff === staff.id ? 'selected' : ''}`}
                      onClick={() => {
                        handleFilterChange('staff', staff.id);
                        setShowStaffDropdown(false);
                      }}
                    >
                      {staff.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="filter-buttons">
            <button className="apply-btn">
              <Filter size={16} />
              Apply Filter
            </button>
            <button className="reset-btn" onClick={handleReset}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="activity-type-filter">
        <div className="activity-type-dropdown-group">
          <label>Activity Type</label>
          <select
            className="filter-select"
            value={activityTypeFilter}
            onChange={(e) => {
              setActivityTypeFilter(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {activityTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="activity-timeline">
        {paginatedActivities.length === 0 ? (
          <div className="empty-state">
            <ActivityIcon size={48} />
            <p>No activity found for selected filters</p>
          </div>
        ) : (
          paginatedActivities.map(activity => (
            <div key={activity.id} className={`timeline-card ${completedActivities.includes(activity.id) ? 'completed' : ''}`}>
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span className="time-ago">{activity.timeAgo}</span>
                  <span className="timestamp">• {activity.timestamp.split(' ')[1]}</span>
                </div>

                <div className="timeline-body">
                  <div className="timeline-avatar">
                    {activity.user.charAt(0)}
                  </div>

                  <div className="timeline-details">
                    <div className="timeline-title">
                      <span className="activity-type-text">{activity.type} by </span>
                      <span className="user-name">{activity.user}</span>
                    </div>

                    <div className="timeline-related-lead">
                      <Phone size={12} />
                      <span>{activity.relatedLead}</span>
                    </div>

                    <div className="timeline-description">
                      {activity.description}
                    </div>

                    <div className="timeline-badges">
                      <span className={`badge ${activity.badge.toLowerCase()}`}>{activity.badge}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {totalActivities > 0 && (
        <div className="pagination">
          <button
            className="pagination-btn prev"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
            Prev
          </button>

          <div className="pagination-numbers">
            {getPageNumbers().map(page => (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="pagination-btn next"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyActivityPage;
