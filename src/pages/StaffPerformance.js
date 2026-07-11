import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Users, Calendar, TrendingUp, Search, PhoneCall, MessageSquare, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import { KpiCard } from '../components/widgets/Cards';
import './StaffPerformance.css';
const staffData = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', role: 'Sales Executive', phone: '+1 234 567 890', department: 'Sales', joinDate: '2024-01-15', totalLeads: 45, converted: 12, rating: 4.8, completedTasks: 78, pendingTasks: 12, calls: 156, emails: 45, meetings: 8, deals: 12, revenue: 45000, followups: 89, newLeads: 23, qualifiedLeads: 18, lostLeads: 5 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Sales Manager', phone: '+1 234 567 891', department: 'Sales', joinDate: '2023-08-20', totalLeads: 52, converted: 18, rating: 4.9, completedTasks: 95, pendingTasks: 8, calls: 198, emails: 67, meetings: 12, deals: 18, revenue: 78000, followups: 102, newLeads: 28, qualifiedLeads: 22, lostLeads: 4 },
    { id: 3, name: 'Mike Davis', email: 'mike.davis@company.com', role: 'Sales Representative', phone: '+1 234 567 892', department: 'Business Development', joinDate: '2024-03-10', totalLeads: 38, converted: 9, rating: 4.5, completedTasks: 56, pendingTasks: 15, calls: 112, emails: 34, meetings: 5, deals: 9, revenue: 32000, followups: 67, newLeads: 15, qualifiedLeads: 12, lostLeads: 3 },
    { id: 4, name: 'Emily Brown', email: 'emily.b@company.com', role: 'Business Developer', phone: '+1 234 567 893', department: 'Business Development', joinDate: '2023-11-05', totalLeads: 61, converted: 15, rating: 4.7, completedTasks: 82, pendingTasks: 10, calls: 145, emails: 52, meetings: 10, deals: 15, revenue: 55000, followups: 95, newLeads: 32, qualifiedLeads: 20, lostLeads: 8 },
    { id: 5, name: 'Chris Wilson', email: 'chris.w@company.com', role: 'Sales Executive', phone: '+1 234 567 894', department: 'Sales', joinDate: '2024-05-22', totalLeads: 29, converted: 7, rating: 4.3, completedTasks: 45, pendingTasks: 18, calls: 89, emails: 28, meetings: 4, deals: 7, revenue: 28000, followups: 54, newLeads: 12, qualifiedLeads: 9, lostLeads: 2 },
    { id: 6, name: 'Amanda Lee', email: 'amanda.l@company.com', role: 'Account Executive', phone: '+1 234 567 895', department: 'Accounts', joinDate: '2024-02-14', totalLeads: 44, converted: 14, rating: 4.6, completedTasks: 68, pendingTasks: 9, calls: 134, emails: 41, meetings: 9, deals: 14, revenue: 42000, followups: 78, newLeads: 20, qualifiedLeads: 16, lostLeads: 4 },
    { id: 7, name: 'David Miller', email: 'david.m@company.com', role: 'Senior Sales Executive', phone: '+1 234 567 896', department: 'Sales', joinDate: '2023-06-01', totalLeads: 67, converted: 22, rating: 4.9, completedTasks: 112, pendingTasks: 5, calls: 210, emails: 78, meetings: 15, deals: 22, revenue: 95000, followups: 124, newLeads: 35, qualifiedLeads: 28, lostLeads: 6 },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.a@company.com', role: 'Team Lead', phone: '+1 234 567 897', department: 'Sales', joinDate: '2023-09-12', totalLeads: 58, converted: 19, rating: 4.8, completedTasks: 89, pendingTasks: 7, calls: 178, emails: 56, meetings: 11, deals: 19, revenue: 67000, followups: 112, newLeads: 30, qualifiedLeads: 24, lostLeads: 5 },
];
const recentActivities = [
    { id: 1, type: 'call', title: 'Follow-up call with lead', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'email', title: 'Sent proposal to prospective client', time: '5 hours ago', status: 'completed' },
    { id: 3, type: 'meeting', title: 'Scheduled demo meeting', time: 'Yesterday', status: 'completed' },
    { id: 4, type: 'lead', title: 'Converted new lead to customer', time: 'Yesterday', status: 'completed' },
    { id: 5, type: 'task', title: 'Updated lead status in CRM', time: '2 days ago', status: 'completed' },
];
export default function StaffPerformance() {
    const path = window.location.pathname || '';
    const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
    const parts = cleanPath.split('/');
    const lastPart = parts[parts.length - 1];
    const staffId = parseInt(lastPart);
    const staff = (!isNaN(staffId) && staffId > 0) ? staffData.find(s => s.id === staffId) : null;
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const filterRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const filteredStaff = staffData.filter(s => {
        const matchesSearch = searchQuery === '' ||
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.department.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });
    const [detailDateFrom, setDetailDateFrom] = useState('');
    const [detailDateTo, setDetailDateTo] = useState('');
    const [detailShowFilters, setDetailShowFilters] = useState(false);
    const detailFilterRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailFilterRef.current && !detailFilterRef.current.contains(event.target)) {
                setDetailShowFilters(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleToggleFilters = () => {
        setDetailShowFilters(!detailShowFilters);
    };
    if (staff) {
        const conversionRate = Math.round((staff.converted / staff.totalLeads) * 100);
        const taskCompletion = Math.round((staff.completedTasks / (staff.completedTasks + staff.pendingTasks)) * 100);
        const avgDealValue = Math.round(staff.revenue / staff.deals);
        return React.createElement(PageContainer, { className: 'sp-detail-page' }, React.createElement(Link, { to: '/staff-performance', className: 'back-link' }, React.createElement(ArrowLeft, { size: 18 }), ' Back to Staff List'), React.createElement('div', { className: 'profile-section' }, React.createElement('div', { className: 'profile-avatar' }, staff.name.charAt(0)), React.createElement('div', { className: 'profile-info' }, React.createElement('h1', { className: 'profile-name' }, staff.name), React.createElement('p', { className: 'profile-role' }, staff.role), React.createElement('div', { className: 'contact-info' }, React.createElement('span', null, React.createElement(Mail, { size: 14 }), ' ', staff.email), React.createElement('span', null, React.createElement(Phone, { size: 14 }), ' ', staff.phone), React.createElement('span', null, React.createElement(Users, { size: 14 }), ' ', staff.department), React.createElement('span', null, React.createElement(Calendar, { size: 14 }), ' Joined ', staff.joinDate))), React.createElement('div', { className: 'rating-badge' }, React.createElement('div', { className: 'rating-value' }, staff.rating), React.createElement('div', { className: 'rating-label' }, 'Rating'))), React.createElement('div', { className: 'stats-grid' }, React.createElement(KpiCard, { title: 'Total Leads', value: staff.totalLeads, isPrimary: true }), React.createElement(KpiCard, { title: 'Converted', value: staff.converted, isPrimary: true }), React.createElement(KpiCard, { title: 'Conversion Rate', value: conversionRate + '%', isPrimary: true }), React.createElement(KpiCard, { title: 'Revenue', value: '$' + staff.revenue.toLocaleString(), isPrimary: true })), React.createElement('div', { className: 'performance-table-section' }, React.createElement('div', { className: 'section-header' }, React.createElement('h2', { className: 'section-title' }, 'Performance Metrics'), React.createElement('div', { className: 'filter-wrapper', ref: detailFilterRef }, React.createElement('button', {
            className: `filter-btn ${detailShowFilters ? 'active' : ''}`,
            onClick: handleToggleFilters
        }, 'Date Filter'), detailShowFilters && React.createElement('div', { className: 'filter-dropdown' }, React.createElement('div', { className: 'filter-header' }, React.createElement('span', null, 'Filter by Date'), React.createElement('button', {
            className: 'clear-btn',
            onClick: () => { setDetailDateFrom(''); setDetailDateTo(''); setDetailShowFilters(false); }
        }, 'Clear')), React.createElement('div', { className: 'filter-inputs' }, React.createElement('div', { className: 'input-group' }, React.createElement('label', null, 'From'), React.createElement('input', {
            type: 'date',
            value: detailDateFrom,
            onChange: (e) => setDetailDateFrom(e.target.value),
            className: 'date-input'
        })), React.createElement('div', { className: 'input-group' }, React.createElement('label', null, 'To'), React.createElement('input', {
            type: 'date',
            value: detailDateTo,
            onChange: (e) => setDetailDateTo(e.target.value),
            className: 'date-input'
        })))))), React.createElement('table', { className: 'performance-table' }, React.createElement('thead', null, React.createElement('tr', null, React.createElement('th', null, 'Metric'), React.createElement('th', null, 'Value'))), React.createElement('tbody', null, React.createElement('tr', null, React.createElement('td', null, 'Total Leads'), React.createElement('td', null, staff.totalLeads)), React.createElement('tr', null, React.createElement('td', null, 'Converted Leads'), React.createElement('td', null, staff.converted)), React.createElement('tr', null, React.createElement('td', null, 'Conversion Rate'), React.createElement('td', null, conversionRate + '%')), React.createElement('tr', null, React.createElement('td', null, 'Deals Closed'), React.createElement('td', null, staff.deals)), React.createElement('tr', null, React.createElement('td', null, 'Total Revenue'), React.createElement('td', null, '$' + staff.revenue.toLocaleString())), React.createElement('tr', null, React.createElement('td', null, 'Avg Deal Value'), React.createElement('td', null, '$' + avgDealValue.toLocaleString())), React.createElement('tr', null, React.createElement('td', null, 'Completed Tasks'), React.createElement('td', null, staff.completedTasks)), React.createElement('tr', null, React.createElement('td', null, 'Pending Tasks'), React.createElement('td', null, staff.pendingTasks)), React.createElement('tr', null, React.createElement('td', null, 'Task Completion'), React.createElement('td', null, taskCompletion + '%')), React.createElement('tr', null, React.createElement('td', null, 'Calls Made'), React.createElement('td', null, staff.calls)), React.createElement('tr', null, React.createElement('td', null, 'Emails Sent'), React.createElement('td', null, staff.emails)), React.createElement('tr', null, React.createElement('td', null, 'Meetings'), React.createElement('td', null, staff.meetings)), React.createElement('tr', null, React.createElement('td', null, 'Follow-ups'), React.createElement('td', null, staff.followups))))), React.createElement('div', { className: 'activity-section' }, React.createElement('h2', { className: 'section-title' }, 'Recent Activity'), React.createElement('div', { className: 'activity-list' }, recentActivities.map(activity => React.createElement('div', { key: activity.id, className: 'activity-item' }, React.createElement('div', { className: 'activity-icon' }, activity.type === 'call' ? React.createElement(PhoneCall, { size: 16 }) :
            activity.type === 'email' ? React.createElement(MessageSquare, { size: 16 }) :
                activity.type === 'meeting' ? React.createElement(Users, { size: 16 }) :
                    React.createElement(CheckCircle2, { size: 16 })), React.createElement('div', { className: 'activity-content' }, React.createElement('div', { className: 'activity-title' }, activity.title), React.createElement('div', { className: 'activity-time' }, activity.time)))))));
    }
    return React.createElement(PageContainer, { className: 'sp-page' }, React.createElement(PageHeader, {
        title: 'Staff Performance',
        description: 'Track and analyze team performance metrics'
    }), React.createElement('div', { className: 'toolbar' }, React.createElement('div', { className: 'toolbar-left' }, React.createElement('div', { className: 'search-box' }, React.createElement(Search, { size: 18, className: 'search-icon' }), React.createElement('input', {
        type: 'text',
        placeholder: 'Search staff...',
        value: searchQuery,
        onChange: (e) => setSearchQuery(e.target.value),
        className: 'search-input'
    })), React.createElement('div', { className: 'filter-wrapper', ref: filterRef }, React.createElement('button', {
        className: `filter-btn ${showFilters ? 'active' : ''}`,
        onClick: () => setShowFilters(!showFilters)
    }, 'Date Filter'), showFilters && React.createElement('div', { className: 'filter-dropdown' }, React.createElement('div', { className: 'filter-header' }, React.createElement('span', null, 'Filter by Date'), React.createElement('button', {
        className: 'clear-btn',
        onClick: () => { setDateFrom(''); setDateTo(''); setShowFilters(false); }
    }, 'Clear')), React.createElement('div', { className: 'filter-inputs' }, React.createElement('div', { className: 'input-group' }, React.createElement('label', null, 'From'), React.createElement('input', {
        type: 'date',
        value: dateFrom,
        onChange: (e) => setDateFrom(e.target.value),
        className: 'date-input'
    })), React.createElement('div', { className: 'input-group' }, React.createElement('label', null, 'To'), React.createElement('input', {
        type: 'date',
        value: dateTo,
        onChange: (e) => setDateTo(e.target.value),
        className: 'date-input'
    }))))))), React.createElement('div', { className: 'staff-grid' }, filteredStaff.map(s => React.createElement(Link, { key: s.id, to: '/staff-performance/' + s.id, className: 'staff-card' }, React.createElement('div', { className: 'staff-card-avatar' }, s.name.charAt(0)), React.createElement('div', { className: 'staff-card-info' }, React.createElement('div', { className: 'staff-card-name' }, s.name), React.createElement('div', { className: 'staff-card-role' }, s.role)), React.createElement('div', { className: 'staff-card-stats' }, React.createElement('div', { className: 'staff-stat' }, React.createElement('span', null, s.totalLeads), React.createElement('label', null, 'Leads')), React.createElement('div', { className: 'staff-stat' }, React.createElement('span', null, s.converted), React.createElement('label', null, 'Converted')), React.createElement('div', { className: 'staff-stat' }, React.createElement('span', null, s.rating), React.createElement('label', null, 'Rating')))))));
}
//# sourceMappingURL=StaffPerformance.js.map