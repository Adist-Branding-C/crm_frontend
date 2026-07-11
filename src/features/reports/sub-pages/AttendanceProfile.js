import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Home, Timer, Activity } from 'lucide-react';
const AttendanceProfile = () => {
    const { staffId } = useParams();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const dateParam = searchParams.get('date') || '2026-04-24';
    const staffData = {
        '917025769000': { name: 'John Doe', phone: '917025769000', officeTime: '8h 30m', wfhTime: '1h 00m', totalTime: '9h 30m', activity: 92 },
        '917025769001': { name: 'Jane Smith', phone: '917025769001', officeTime: '7h 45m', wfhTime: '2h 00m', totalTime: '9h 45m', activity: 88 },
        '917025769002': { name: 'Mike Johnson', phone: '917025769002', officeTime: '9h 00m', wfhTime: '0h 30m', totalTime: '9h 30m', activity: 95 },
        '917025769003': { name: 'Sarah Williams', phone: '917025769003', officeTime: '8h 00m', wfhTime: '1h 30m', totalTime: '9h 30m', activity: 90 },
        '917025769004': { name: 'David Brown', phone: '917025769004', officeTime: '7h 30m', wfhTime: '1h 00m', totalTime: '8h 30m', activity: 85 },
    };
    const staffIdStr = staffId ?? '917025769000';
    const staff = staffData[staffIdStr] ?? staffData['917025769000'];
    const logsData = [
        { id: 1, time: '09:30 AM', type: 'Check In', location: 'Sector 18, Delhi', duration: '-' },
        { id: 2, time: '10:15 AM', type: 'Break Start', location: 'Cafeteria', duration: '15m' },
        { id: 3, time: '10:30 AM', type: 'Break End', location: 'Cafeteria', duration: '-' },
        { id: 4, time: '01:00 PM', type: 'Lunch Start', location: 'Cafeteria', duration: '1h' },
        { id: 5, time: '02:00 PM', type: 'Lunch End', location: 'Cafeteria', duration: '-' },
        { id: 6, time: '05:30 PM', type: 'Check Out', location: 'Sector 18, Delhi', duration: '-' },
    ];
    return (_jsxs("div", { className: "report-content-wrapper with-sidebar", children: [_jsx("div", { className: "profile-header", children: _jsxs("button", { className: "btn btn-secondary", onClick: () => navigate('/reports/attendance'), children: [_jsx(ArrowLeft, { size: 16 }), " Back"] }) }), _jsx("div", { className: "profile-staff-info", children: _jsxs("div", { className: "profile-staff-details", children: [_jsx("h2", { children: staff.name }), _jsx("p", { className: "profile-staff-phone", children: staff.phone }), _jsx("p", { className: "profile-staff-date", children: dateParam })] }) }), _jsxs("div", { className: "profile-stats-grid", children: [_jsxs("div", { className: "profile-stat-card", children: [_jsx(Clock, { size: 24, className: "profile-stat-icon" }), _jsxs("div", { className: "profile-stat-info", children: [_jsx("span", { className: "profile-stat-value", children: staff.officeTime }), _jsx("span", { className: "profile-stat-label", children: "Office Time" })] })] }), _jsxs("div", { className: "profile-stat-card", children: [_jsx(Home, { size: 24, className: "profile-stat-icon" }), _jsxs("div", { className: "profile-stat-info", children: [_jsx("span", { className: "profile-stat-value", children: staff.wfhTime }), _jsx("span", { className: "profile-stat-label", children: "Work From Home" })] })] }), _jsxs("div", { className: "profile-stat-card", children: [_jsx(Timer, { size: 24, className: "profile-stat-icon" }), _jsxs("div", { className: "profile-stat-info", children: [_jsx("span", { className: "profile-stat-value", children: staff.totalTime }), _jsx("span", { className: "profile-stat-label", children: "Total Duration" })] })] }), _jsxs("div", { className: "profile-stat-card", children: [_jsx(Activity, { size: 24, className: "profile-stat-icon" }), _jsxs("div", { className: "profile-stat-info", children: [_jsxs("span", { className: "profile-stat-value", children: [staff.activity, "%"] }), _jsx("span", { className: "profile-stat-label", children: "Activity" })] })] })] }), _jsxs("div", { className: "profile-section", children: [_jsx("h3", { className: "profile-section-title", children: "Activity Logs" }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Time" }), _jsx("th", { children: "Activity" }), _jsx("th", { children: "Location" }), _jsx("th", { children: "Duration" })] }) }), _jsx("tbody", { children: logsData.map(log => (_jsxs("tr", { children: [_jsx("td", { children: log.time }), _jsx("td", { children: _jsx("span", { className: `badge badge-${log.type.toLowerCase().replace(' ', '-')}`, children: log.type }) }), _jsx("td", { children: log.location }), _jsx("td", { children: log.duration })] }, log.id))) })] }) })] })] }));
};
export default AttendanceProfile;
//# sourceMappingURL=AttendanceProfile.js.map