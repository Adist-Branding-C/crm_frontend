import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Users, Calendar } from 'lucide-react';
import PageContainer from '../../../shared/components/layout/PageContainer';
import { RECENT_ACTIVITIES } from '../constants';
import type { StaffDetailViewProps } from '../types';
import KpiCard from './KpiCard';
import ActivityIcon from './ActivityIcon';

const StaffDetailView = ({ staff }: StaffDetailViewProps) => {
  const [detailDateFrom, setDetailDateFrom] = useState('');
  const [detailDateTo, setDetailDateTo] = useState('');
  const [detailShowFilters, setDetailShowFilters] = useState(false);
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

  const conversionRate = useMemo(() => Math.round((staff.converted / staff.totalLeads) * 100), [staff.converted, staff.totalLeads]);
  const taskCompletion = useMemo(() => Math.round((staff.completedTasks / (staff.completedTasks + staff.pendingTasks)) * 100), [staff.completedTasks, staff.pendingTasks]);
  const avgDealValue = useMemo(() => Math.round(staff.revenue / staff.deals), [staff.revenue, staff.deals]);

  return (
    <PageContainer className="sp-detail-page">
      <Link to="/staff-performance" className="back-link">
        <ArrowLeft size={18} /> Back to Staff List
      </Link>

      <div className="profile-section">
        <div className="profile-avatar">{staff.name.charAt(0)}</div>
        <div className="profile-info">
          <h1 className="profile-name">{staff.name}</h1>
          <p className="profile-role">{staff.role}</p>
          <div className="contact-info">
            <span><Mail size={14} /> {staff.email}</span>
            <span><Phone size={14} /> {staff.phone}</span>
            <span><Users size={14} /> {staff.department}</span>
            <span><Calendar size={14} /> Joined {staff.joinDate}</span>
          </div>
        </div>
        <div className="rating-badge">
          <div className="rating-value">{staff.rating}</div>
          <div className="rating-label">Rating</div>
        </div>
      </div>

      <div className="stats-grid">
        <KpiCard title="Total Leads" value={staff.totalLeads} />
        <KpiCard title="Converted" value={staff.converted} />
        <KpiCard title="Conversion Rate" value={`${conversionRate}%`} />
        <KpiCard title="Revenue" value={`$${staff.revenue.toLocaleString()}`} />
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
            <tr><td>Total Leads</td><td>{staff.totalLeads}</td></tr>
            <tr><td>Converted Leads</td><td>{staff.converted}</td></tr>
            <tr><td>Conversion Rate</td><td>{conversionRate}%</td></tr>
            <tr><td>Deals Closed</td><td>{staff.deals}</td></tr>
            <tr><td>Total Revenue</td><td>${staff.revenue.toLocaleString()}</td></tr>
            <tr><td>Avg Deal Value</td><td>${avgDealValue.toLocaleString()}</td></tr>
            <tr><td>Completed Tasks</td><td>{staff.completedTasks}</td></tr>
            <tr><td>Pending Tasks</td><td>{staff.pendingTasks}</td></tr>
            <tr><td>Task Completion</td><td>{taskCompletion}%</td></tr>
            <tr><td>Calls Made</td><td>{staff.calls}</td></tr>
            <tr><td>Emails Sent</td><td>{staff.emails}</td></tr>
            <tr><td>Meetings</td><td>{staff.meetings}</td></tr>
            <tr><td>Follow-ups</td><td>{staff.followups}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          {RECENT_ACTIVITIES.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon"><ActivityIcon type={activity.type} /></div>
              <div className="activity-content">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default StaffDetailView;
