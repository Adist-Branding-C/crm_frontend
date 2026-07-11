import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
            filtered = filtered.filter(a => a.relatedLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return filtered;
    }, [filters, activityTypeFilter, searchQuery]);
    const totalActivities = filteredActivities.length;
    const totalPages = Math.ceil(totalActivities / rowsPerPage);
    const paginatedActivities = filteredActivities.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
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
    return (_jsxs("div", { className: "daily-activity-page", children: [_jsx(PageHeader, { title: "Activity", description: "Logged interactions, aiding in customer relationship management and informed decisions." }), _jsxs("div", { className: "activity-summary-card", children: [_jsxs("div", { className: "activity-count-section", children: [_jsx("div", { className: "activity-count-icon", children: _jsx(ActivityIcon, { size: 24 }) }), _jsxs("div", { className: "activity-count-info", children: [_jsx("span", { className: "activity-count-label", children: "Activity Count" }), _jsx("span", { className: "activity-count-number", children: totalActivities })] })] }), _jsxs("div", { className: "activity-filters-section", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date" }), _jsx("input", { type: "date", value: filters.date, onChange: (e) => handleFilterChange('date', e.target.value), className: "filter-input" })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Start Time" }), _jsx("input", { type: "time", value: filters.startTime, onChange: (e) => handleFilterChange('startTime', e.target.value), className: "filter-input" })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "End Time" }), _jsx("input", { type: "time", value: filters.endTime, onChange: (e) => handleFilterChange('endTime', e.target.value), className: "filter-input" })] }), _jsxs("div", { className: "filter-group dropdown-group", children: [_jsx("label", { children: "Staff" }), _jsxs("div", { className: "filter-select-trigger", onClick: () => setShowStaffDropdown(!showStaffDropdown), children: [_jsx("span", { children: selectedStaffName }), _jsx(ChevronDown, { size: 16 })] }), showStaffDropdown && (_jsxs("div", { className: "filter-dropdown", children: [_jsxs("div", { className: "dropdown-search", children: [_jsx(Search, { size: 14 }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx("div", { className: "dropdown-list", children: staffList.map(staff => (_jsx("div", { className: `dropdown-item ${filters.staff === staff.id ? 'selected' : ''}`, onClick: () => {
                                                        handleFilterChange('staff', staff.id);
                                                        setShowStaffDropdown(false);
                                                    }, children: staff.name }, staff.id))) })] }))] }), _jsxs("div", { className: "filter-buttons", children: [_jsxs("button", { className: "apply-btn", children: [_jsx(Filter, { size: 16 }), "Apply Filter"] }), _jsxs("button", { className: "reset-btn", onClick: handleReset, children: [_jsx(RotateCcw, { size: 16 }), "Reset"] })] })] })] }), _jsx("div", { className: "activity-type-filter", children: _jsxs("div", { className: "activity-type-dropdown-group", children: [_jsx("label", { children: "Activity Type" }), _jsx("select", { className: "filter-select", value: activityTypeFilter, onChange: (e) => {
                                setActivityTypeFilter(Number(e.target.value));
                                setCurrentPage(1);
                            }, children: activityTypes.map(type => (_jsx("option", { value: type.id, children: type.name }, type.id))) })] }) }), _jsx("div", { className: "activity-timeline", children: paginatedActivities.length === 0 ? (_jsxs("div", { className: "empty-state", children: [_jsx(ActivityIcon, { size: 48 }), _jsx("p", { children: "No activity found for selected filters" })] })) : (paginatedActivities.map(activity => (_jsx("div", { className: `timeline-card ${isActivityCompleted(activity.id) ? 'completed' : ''}`, children: _jsxs("div", { className: "timeline-content", children: [_jsxs("div", { className: "timeline-meta", children: [_jsx("span", { className: "time-ago", children: activity.timeAgo }), _jsxs("span", { className: "timestamp", children: ["\u2022 ", activity.timestamp.split(' ')[1]] })] }), _jsxs("div", { className: "timeline-body", children: [_jsx("div", { className: "timeline-avatar", children: activity.user.charAt(0) }), _jsxs("div", { className: "timeline-details", children: [_jsxs("div", { className: "timeline-title", children: [_jsxs("span", { className: "activity-type-text", children: [activity.type, " by "] }), _jsx("span", { className: "user-name", children: activity.user })] }), _jsxs("div", { className: "timeline-related-lead", children: [_jsx(Phone, { size: 12 }), _jsx("span", { children: activity.relatedLead })] }), _jsx("div", { className: "timeline-description", children: activity.description }), _jsx("div", { className: "timeline-badges", children: _jsx("span", { className: `badge ${activity.badge.toLowerCase()}`, children: activity.badge }) })] })] })] }) }, activity.id)))) }), totalActivities > 0 && (_jsxs("div", { className: "pagination", children: [_jsxs("button", { className: "pagination-btn prev", onClick: () => setCurrentPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1, children: [_jsx(ChevronLeft, { size: 16 }), "Prev"] }), _jsx("div", { className: "pagination-numbers", children: getPageNumbers().map(page => (_jsx("button", { className: `pagination-number ${currentPage === page ? 'active' : ''}`, onClick: () => setCurrentPage(page), children: page }, page))) }), _jsxs("button", { className: "pagination-btn next", onClick: () => setCurrentPage(Math.min(totalPages, currentPage + 1)), disabled: currentPage === totalPages, children: ["Next", _jsx(ChevronRight, { size: 16 })] })] }))] }));
};
export default DailyActivity;
//# sourceMappingURL=DailyActivity.js.map