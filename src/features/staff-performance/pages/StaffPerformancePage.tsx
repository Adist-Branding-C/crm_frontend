import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer from '../../../shared/components/layout/PageContainer';
import { useStaffPerformanceData } from '../hooks/useStaffPerformanceData';
import StaffDetailView from '../components/StaffDetailView';
import StaffListHeader from '../components/StaffListHeader';
import './StaffPerformancePage.css';

const StaffPerformancePage = () => {
  const {
    id,
    staff,
    searchQuery,
    setSearchQuery,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    showFilters,
    setShowFilters,
    filterRef,
    filteredStaff,
    clearFilters,
    loading,
    error,
  } = useStaffPerformanceData();

  if (id && staff) {
    return <StaffDetailView staff={staff} />;
  }

  return (
    <PageContainer className="sp-page">
      <StaffListHeader />
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-wrapper" ref={filterRef}>
            <button
              className={`filter-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              Date Filter
            </button>
            {showFilters && (
              <div className="filter-dropdown">
                <div className="filter-header">
                  <span>Filter by Date</span>
                  <button className="clear-btn" onClick={clearFilters}>Clear</button>
                </div>
                <div className="filter-inputs">
                  <div className="input-group">
                    <label>From</label>
                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="date-input" />
                  </div>
                  <div className="input-group">
                    <label>To</label>
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="date-input" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && <div className="sp-status">Loading staff performance...</div>}
      {error && <div className="sp-status sp-status-error">{error}</div>}

      {!loading && !error && (
        <div className="staff-grid">
          {filteredStaff.map(s => (
            <Link key={s.staffId} to={`/staff-performance/${s.staffId}`} className="staff-card">
              <div className="staff-card-avatar">{s.name.charAt(0)}</div>
              <div className="staff-card-info">
                <div className="staff-card-name">{s.name}</div>
                <div className="staff-card-role">{s.designation ?? 'Not assigned'}</div>
              </div>
              <div className="staff-card-stats">
                <div className="staff-stat">
                  <span>{s.totalLeadsAssigned}</span>
                  <label>Leads</label>
                </div>
                <div className="staff-stat">
                  <span>{s.convertedLeads}</span>
                  <label>Converted</label>
                </div>
                <div className="staff-stat">
                  <span>{s.conversionRate}%</span>
                  <label>Conversion Rate</label>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default StaffPerformancePage;
