import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, User, Phone, Clock, Filter, RotateCcw, Activity as ActivityIcon, ChevronDown, CheckCircle, Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './DailyActivity.css';

const staffList = [
  { id: 1, name: 'All Staff' },
  { id: 2, name: 'Rameesa' },
  { id: 3, name: 'Ameen' },
  { id: 4, name: 'Shameena' },
  { id: 5, name: 'Junaid' },
  { id: 6, name: 'Fathima' },
  { id: 7, name: 'Fida Fathima' },
  { id: 8, name: 'Nandana K' },
  { id: 9, name: 'Aysha' },
  { id: 10, name: 'Nesri' },
];

const activityTypes = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Task Added' },
  { id: 3, name: 'Lead Added' },
  { id: 4, name: 'Task Updated' },
  { id: 5, name: 'New Deal' },
  { id: 6, name: 'Deal Update' },
  { id: 7, name: 'Deal Task' },
  { id: 8, name: 'Deal Note Added' },
  { id: 9, name: 'Note Added' },
  { id: 10, name: 'Call Log Added' },
  { id: 11, name: 'Email Log Added' },
  { id: 12, name: 'Meeting Log Added' },
  { id: 13, name: 'Status Updated' },
  { id: 14, name: 'Sent Email' },
  { id: 15, name: 'Purpose Updated' },
  { id: 16, name: 'Voice Note Added' },
  { id: 17, name: 'File Note Added' },
];

const sampleActivities = [
  {
    id: 1,
    type: 'Note Added',
    user: 'Rameesa',
    relatedLead: '919446705481 | Shan Nizar Pathummal Bevi',
    description: 'for neighbour, +2, Egypt and Uzbekistan interested',
    timestamp: '2026-04-25 11:55:00',
    timeAgo: '1 minute ago',
    badge: 'Lead'
  },
  {
    id: 2,
    type: 'Call Log Added',
    user: 'Ameen',
    relatedLead: '919625128014 | Rahul Sharma',
    description: 'Discussed pricing and requested callback',
    timestamp: '2026-04-25 11:52:00',
    timeAgo: '4 minutes ago',
    badge: 'Lead'
  },
  {
    id: 3,
    type: 'Task Added',
    user: 'Shameena',
    relatedLead: '919745612345 | Priya Patel',
    description: 'Follow up on demo scheduled for tomorrow',
    timestamp: '2026-04-25 11:48:00',
    timeAgo: '8 minutes ago',
    badge: 'Task'
  },
  {
    id: 4,
    type: 'New Deal',
    user: 'Junaid',
    relatedLead: '919895623456 | Amit Kumar',
    description: 'New deal worth 5L for CRM implementation',
    timestamp: '2026-04-25 11:45:00',
    timeAgo: '11 minutes ago',
    badge: 'Deal'
  },
  {
    id: 5,
    type: 'Lead Added',
    user: 'Fathima',
    relatedLead: '919945678901 | Sneha Reddy',
    description: 'New lead from website inquiry - interested in sales package',
    timestamp: '2026-04-25 11:42:00',
    timeAgo: '14 minutes ago',
    badge: 'Lead'
  },
  {
    id: 6,
    type: 'Deal Note Added',
    user: 'Rameesa',
    relatedLead: '919625128014 | Vikram Singh',
    description: 'Client requested discount on annual plan',
    timestamp: '2026-04-25 11:38:00',
    timeAgo: '18 minutes ago',
    badge: 'Deal'
  },
  {
    id: 7,
    type: 'Task Updated',
    user: 'Fida Fathima',
    relatedLead: '919745612346 | Ananya Gupta',
    description: 'Task marked as completed - demo conducted successfully',
    timestamp: '2026-04-25 11:35:00',
    timeAgo: '21 minutes ago',
    badge: 'Task'
  },
  {
    id: 8,
    type: 'Status Updated',
    user: 'Nandana K',
    relatedLead: '919895623457 | Rajesh Verma',
    description: 'Status changed from New to Contacted',
    timestamp: '2026-04-25 11:32:00',
    timeAgo: '24 minutes ago',
    badge: 'Lead'
  },
  {
    id: 9,
    type: 'Meeting Log Added',
    user: 'Aysha',
    relatedLead: '919945678902 | Kavitha Nair',
    description: 'Quarterly review meeting completed - client satisfied',
    timestamp: '2026-04-25 11:28:00',
    timeAgo: '28 minutes ago',
    badge: 'Lead'
  },
  {
    id: 10,
    type: 'Sent Email',
    user: 'Nesri',
    relatedLead: '919625128015 | Arun Pillai',
    description: 'Quote document sent for review',
    timestamp: '2026-04-25 11:25:00',
    timeAgo: '31 minutes ago',
    badge: 'Lead'
  },
  {
    id: 11,
    type: 'Deal Task',
    user: 'Rameesa',
    relatedLead: '919895623458 | Lakshmi Menon',
    description: 'Task created - prepare proposal document',
    timestamp: '2026-04-25 11:22:00',
    timeAgo: '34 minutes ago',
    badge: 'Deal'
  },
  {
    id: 12,
    type: 'Email Log Added',
    user: 'Junaid',
    relatedLead: '919945678903 | Suresh Iyer',
    description: 'Follow-up email sent regarding renewal',
    timestamp: '2026-04-25 11:18:00',
    timeAgo: '38 minutes ago',
    badge: 'Lead'
  },
  {
    id: 13,
    type: 'Purpose Updated',
    user: 'Fathima',
    relatedLead: '919745612347 | Meera Das',
    description: 'Purpose changed from Support to Sales',
    timestamp: '2026-04-25 11:15:00',
    timeAgo: '41 minutes ago',
    badge: 'Lead'
  },
  {
    id: 14,
    type: 'Voice Note Added',
    user: 'Shameena',
    relatedLead: '919625128016 | John Doe',
    description: 'Audio note - client discussion summary',
    timestamp: '2026-04-25 11:12:00',
    timeAgo: '44 minutes ago',
    badge: 'Lead'
  },
  {
    id: 15,
    type: 'File Note Added',
    user: 'Ameen',
    relatedLead: '919895623459 | Jane Smith',
    description: 'Contract document uploaded for review',
    timestamp: '2026-04-25 11:08:00',
    timeAgo: '48 minutes ago',
    badge: 'Lead'
  },
  {
    id: 16,
    type: 'Deal Update',
    user: 'Rameesa',
    relatedLead: '919625128017 | Mike Johnson',
    description: 'Deal amount updated from 3L to 4.5L',
    timestamp: '2026-04-25 11:05:00',
    timeAgo: '51 minutes ago',
    badge: 'Deal'
  },
  {
    id: 17,
    type: 'Note Added',
    user: 'Fida Fathima',
    relatedLead: '919945678904 | Sarah Lee',
    description: 'Important client - prioritize follow up',
    timestamp: '2026-04-25 11:02:00',
    timeAgo: '54 minutes ago',
    badge: 'Lead'
  },
  {
    id: 18,
    type: 'Call Log Added',
    user: 'Nandana K',
    relatedLead: '919745612348 | Tom Harris',
    description: 'Morning check-in call completed',
    timestamp: '2026-04-25 10:58:00',
    timeAgo: '58 minutes ago',
    badge: 'Lead'
  },
  {
    id: 19,
    type: 'Task Added',
    user: 'Aysha',
    relatedLead: '919895623460 | Alice Brown',
    description: 'Schedule demo for next week',
    timestamp: '2026-04-25 10:55:00',
    timeAgo: '1 hour ago',
    badge: 'Task'
  },
  {
    id: 20,
    type: 'Lead Added',
    user: 'Nesri',
    relatedLead: '919625128018 | Bob Wilson',
    description: 'New lead from referral - high potential',
    timestamp: '2026-04-25 10:52:00',
    timeAgo: '1 hour ago',
    badge: 'Lead'
  },
];

const DailyActivity = () => {
  const [filters, setFilters] = useState({
    date: '2026-04-25',
    startTime: '',
    endTime: '',
    staff: 1,
    type: 1
  });
  const [activityTypeFilter, setActivityTypeFilter] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showStaffDropdown, setShowStaffDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [completedActivities, setCompletedActivities] = useState([]);
  const rowsPerPage = 10;

  const filteredActivities = useMemo(() => {
    let filtered = [...sampleActivities];

    if (filters.staff !== 1) {
      const staff = staffList.find(s => s.id === filters.staff);
      filtered = filtered.filter(a => a.user === staff.name);
    }

    if (activityTypeFilter !== 1) {
      const type = activityTypes.find(t => t.id === activityTypeFilter);
      filtered = filtered.filter(a => a.type === type.name);
    }

    if (filters.date) {
      filtered = filtered.filter(a => a.timestamp.startsWith(filters.date));
    }

    if (filters.startTime) {
      filtered = filtered.filter(a => {
        const time = a.timestamp.split(' ')[1];
        return time >= filters.startTime;
      });
    }

    if (filters.endTime) {
      filtered = filtered.filter(a => {
        const time = a.timestamp.split(' ')[1];
        return time <= filters.endTime;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter(a => 
        a.relatedLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [filters, activityTypeFilter, searchQuery]);

  const totalActivities = filteredActivities.length;
  const totalPages = Math.ceil(totalActivities / rowsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleReset = () => {
    setFilters({
      date: '2026-04-25',
      startTime: '',
      endTime: '',
      staff: 1,
      type: 1
    });
    setActivityTypeFilter(1);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleMarkComplete = (activityId) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId]);
    }
  };

  const isActivityCompleted = (activityId) => {
    return completedActivities.includes(activityId);
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const selectedStaffName = staffList.find(s => s.id === filters.staff)?.name || 'All Staff';
  const selectedTypeName = activityTypes.find(t => t.id === activityTypeFilter)?.name || 'All';

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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
            <div key={activity.id} className={`timeline-card ${isActivityCompleted(activity.id) ? 'completed' : ''}`}>
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

export default DailyActivity;