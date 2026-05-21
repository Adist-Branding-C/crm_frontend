import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Users, Calendar, TrendingUp, Search, PhoneCall, MessageSquare, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import { STAFF_DATA, RECENT_ACTIVITIES } from '../constants';
import type { StaffMember } from '../types';
import '../../../pages/StaffPerformance.css';

const KpiCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className="card kpi-card primary-outline">
    <div className="kpi-value">{value}</div>
    <div className="kpi-footer">
      <span className="kpi-title">{title}</span>
    </div>
  </div>
);

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'call': return <PhoneCall size={16} />;
    case 'email': return <MessageSquare size={16} />;
    case 'meeting': return <Users size={16} />;
    default: return <CheckCircle2 size={16} />;
  }
};

const StaffDetailView = ({ staff }: { staff: StaffMember }) => {
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

  const conversionRate = Math.round((staff.converted / staff.totalLeads) * 100);
  const taskCompletion = Math.round((staff.completedTasks / (staff.completedTasks + staff.pendingTasks)) * 100);
  const avgDealValue = Math.round(staff.revenue / staff.deals);

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

const StaffListHeader = () => (
  <PageHeader
    title="Staff Performance"
    description="Track and analyze team performance metrics"
  />
);

const StaffPerformancePage = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (id) {
    const staffId = parseInt(id, 10);
    const staff = !isNaN(staffId) && staffId > 0 ? STAFF_DATA.find(s => s.id === staffId) : null;
    if (staff) {
      return <StaffDetailView staff={staff} />;
    }
  }

  const filteredStaff = STAFF_DATA.filter(s => {
    const matchesSearch = searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
                  <button className="clear-btn" onClick={() => { setDateFrom(''); setDateTo(''); setShowFilters(false); }}>Clear</button>
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

      <div className="staff-grid">
        {filteredStaff.map(s => (
          <Link key={s.id} to={`/staff-performance/${s.id}`} className="staff-card">
            <div className="staff-card-avatar">{s.name.charAt(0)}</div>
            <div className="staff-card-info">
              <div className="staff-card-name">{s.name}</div>
              <div className="staff-card-role">{s.role}</div>
            </div>
            <div className="staff-card-stats">
              <div className="staff-stat">
                <span>{s.totalLeads}</span>
                <label>Leads</label>
              </div>
              <div className="staff-stat">
                <span>{s.converted}</span>
                <label>Converted</label>
              </div>
              <div className="staff-stat">
                <span>{s.rating}</span>
                <label>Rating</label>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
};

export default StaffPerformancePage;
