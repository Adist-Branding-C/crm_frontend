import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import PageContainer from '../../../shared/components/layout/PageContainer';
import { staffPerformanceService } from '../services/staffPerformance.service';
import type { StaffDetailViewProps, StaffPerformanceItem } from '../types';
import KpiCard from './KpiCard';

const StaffDetailView = ({ staff }: StaffDetailViewProps) => {
  const [detailDateFrom, setDetailDateFrom] = useState('');
  const [detailDateTo, setDetailDateTo] = useState('');
  const [detailShowFilters, setDetailShowFilters] = useState(false);
  const [metrics, setMetrics] = useState<StaffPerformanceItem>(staff);
  const detailFilterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailFilterRef.current && !detailFilterRef.current.contains(event.target as Node)) {
        setDetailShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Re-fetch the whole company's performance list scoped to this staff
  // member's own date filter and pick out their row - the list endpoint is
  // already company-scoped and cheap enough not to warrant a dedicated
  // single-staff+date-range endpoint yet.
  useEffect(() => {
    if (!detailDateFrom && !detailDateTo) {
      setMetrics(staff);
      return;
    }
    let cancelled = false;
    staffPerformanceService
      .getStaffPerformance(detailDateFrom || undefined, detailDateTo || undefined)
      .then((response) => {
        if (cancelled) return;
        const match = response.data.find((s) => s.staffId === staff.staffId);
        setMetrics(match ?? { ...staff, totalLeadsAssigned: 0, convertedLeads: 0, conversionRate: 0 });
      });
    return () => {
      cancelled = true;
    };
  }, [detailDateFrom, detailDateTo, staff]);

  return (
    <PageContainer className="sp-detail-page">
      <Link to="/staff-performance" className="back-link">
        <ArrowLeft size={18} /> Back to Staff List
      </Link>

      <div className="profile-section">
        <div className="profile-avatar">{staff.name.charAt(0)}</div>
        <div className="profile-info">
          <h1 className="profile-name">{staff.name}</h1>
          <p className="profile-role">{staff.designation ?? 'Not assigned'}</p>
          <div className="contact-info">
            <span><Users size={14} /> {staff.designation ?? 'No designation'}</span>
          </div>
        </div>
        <div className="rating-badge">
          <div className="rating-value">{metrics.conversionRate}%</div>
          <div className="rating-label">Conversion Rate</div>
        </div>
      </div>

      <div className="stats-grid">
        <KpiCard title="Leads Assigned" value={metrics.totalLeadsAssigned} />
        <KpiCard title="Converted" value={metrics.convertedLeads} />
        <KpiCard title="Conversion Rate" value={`${metrics.conversionRate}%`} />
      </div>

      <div className="performance-table-section">
        <div className="section-header">
          <h2 className="section-title">Performance Metrics</h2>
          <div className="filter-wrapper" ref={detailFilterRef}>
            <button
              className={`filter-btn ${detailShowFilters ? 'active' : ''}`}
              onClick={() => setDetailShowFilters(!detailShowFilters)}
            >
              Date Filter
            </button>
            {detailShowFilters && (
              <div className="filter-dropdown">
                <div className="filter-header">
                  <span>Filter by Date</span>
                  <button className="clear-btn" onClick={() => { setDetailDateFrom(''); setDetailDateTo(''); setDetailShowFilters(false); }}>Clear</button>
                </div>
                <div className="filter-inputs">
                  <div className="input-group">
                    <label>From</label>
                    <input type="date" value={detailDateFrom} onChange={(e) => setDetailDateFrom(e.target.value)} className="date-input" />
                  </div>
                  <div className="input-group">
                    <label>To</label>
                    <input type="date" value={detailDateTo} onChange={(e) => setDetailDateTo(e.target.value)} className="date-input" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <table className="performance-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Leads Assigned</td><td>{metrics.totalLeadsAssigned}</td></tr>
            <tr><td>Converted Leads</td><td>{metrics.convertedLeads}</td></tr>
            <tr><td>Conversion Rate</td><td>{metrics.conversionRate}%</td></tr>
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
};

export default StaffDetailView;
