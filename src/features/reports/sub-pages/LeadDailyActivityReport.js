import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { dailyActivitySampleData } from '../constants';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
const logTypes = [
    { id: '', name: 'All' },
    { id: 'attendance', name: 'Attendance' },
    { id: 'visitor', name: 'Visitor' },
    { id: 'lead_add', name: 'Lead Add' },
    { id: 'task_add', name: 'Task Add' },
    { id: 'call_task_feedback', name: 'Call Task Feedback' },
    { id: 'deal_add', name: 'Deal Add' },
    { id: 'task_edit', name: 'Task Edit' },
    { id: 'lead_update', name: 'Lead Update' },
    { id: 'note_add', name: 'Note Added' },
    { id: 'call_log_add', name: 'Call Log Added' },
    { id: 'status_updated', name: 'Status Updated' },
    { id: 'purpose_updated', name: 'Purpose Updated' },
    { id: 'voice_note_add', name: 'Voice Note Added' },
    { id: 'file_note_add', name: 'File Note Added' },
];
const agents = [
    { id: 1, name: 'All Agents' },
    { id: 2, name: 'Rameesa' },
    { id: 3, name: 'Fida Fathima' },
    { id: 4, name: 'Nandana K' },
    { id: 5, name: 'Aysha' },
    { id: 6, name: 'Nesri' },
];
const LeadDailyActivityReport = () => {
    const [filters, setFilters] = useState({ dateFrom: '2026-04-01', dateTo: '2026-04-25', agent: 1, logType: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const handleExport = () => {
        const csvContent = "Agent Name,Total,Attendance,Visitor,Lead Add,Task Add,Call Task Feedback,Deals Add,Task Edit,Lead Update,Note Added,Call Log Added,Status Updated,Purpose Updated,Voice Note Added,File Note Added\n" +
            dailyActivitySampleData.map(row => `${row.agentName},${row.total},${row.attendance},${row.visitor},${row.leadAdd},${row.taskAdd},${row.callTaskFeedback},${row.dealsAdd},${row.taskEdit},${row.leadUpdate},${row.noteAdd},${row.callLogAdd},${row.statusUpdated},${row.purposeUpdated},${row.voiceNoteAdd},${row.fileNoteAdd}`).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'daily_activity_report.csv';
        link.click();
    };
    return (_jsx("div", { className: "report-content-wrapper with-sidebar", children: _jsxs("div", { className: "daily-report-content", style: { display: 'flex', flexDirection: 'column', gap: '1rem' }, children: [_jsx("div", { className: "toolbar-left", children: _jsxs("button", { className: `btn btn-secondary ${showFilters ? 'active' : ''}`, onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] }) }), showFilters && (_jsx("div", { className: "filters-panel", children: _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date From" }), _jsx("input", { type: "date", value: filters.dateFrom, onChange: (e) => setFilters({ ...filters, dateFrom: e.target.value }) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date To" }), _jsx("input", { type: "date", value: filters.dateTo, onChange: (e) => setFilters({ ...filters, dateTo: e.target.value }) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Agent" }), _jsx("select", { value: filters.agent, onChange: (e) => setFilters({ ...filters, agent: Number(e.target.value) }), children: agents.map(a => _jsx("option", { value: a.id, children: a.name }, a.id)) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Log Type" }), _jsx("select", { value: filters.logType, onChange: (e) => setFilters({ ...filters, logType: e.target.value }), children: logTypes.map(l => _jsx("option", { value: l.id, children: l.name }, l.id)) })] }), _jsxs("div", { className: "filter-actions", children: [_jsx("button", { className: "btn btn-primary", onClick: () => { setSubmitted(true); setShowFilters(false); }, children: ACTION_FILTER }), _jsx("button", { className: "btn btn-secondary", onClick: () => { setFilters({ dateFrom: '', dateTo: '', agent: 1, logType: '' }); setSubmitted(false); }, children: ACTION_CLEAR })] })] }) })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Agent Name" }), _jsx("th", { children: "Total" }), _jsx("th", { children: "Attendance" }), _jsx("th", { children: "Visitor" }), _jsx("th", { children: "Lead Add" }), _jsx("th", { children: "Task Add" }), _jsx("th", { children: "Call Task Feedback" }), _jsx("th", { children: "Deals Add" }), _jsx("th", { children: "Task Edit" }), _jsx("th", { children: "Lead Update" }), _jsx("th", { children: "Note Added" }), _jsx("th", { children: "Call log Added" }), _jsx("th", { children: "Status Updated" }), _jsx("th", { children: "Purpose Updated" }), _jsx("th", { children: "Voice Note Added" }), _jsx("th", { children: "File note Added" })] }) }), _jsx("tbody", { children: dailyActivitySampleData.map(row => (_jsxs("tr", { children: [_jsx("td", { children: row.agentName }), _jsx("td", { className: "total-cell", children: row.total }), _jsx("td", { children: row.attendance }), _jsx("td", { children: row.visitor }), _jsx("td", { children: row.leadAdd }), _jsx("td", { children: row.taskAdd }), _jsx("td", { children: row.callTaskFeedback }), _jsx("td", { children: row.dealsAdd }), _jsx("td", { children: row.taskEdit }), _jsx("td", { children: row.leadUpdate }), _jsx("td", { children: row.noteAdd }), _jsx("td", { children: row.callLogAdd }), _jsx("td", { children: row.statusUpdated }), _jsx("td", { children: row.purposeUpdated }), _jsx("td", { children: row.voiceNoteAdd }), _jsx("td", { children: row.fileNoteAdd })] }, row.id))) })] }) })] }) }));
};
export default LeadDailyActivityReport;
//# sourceMappingURL=LeadDailyActivityReport.js.map