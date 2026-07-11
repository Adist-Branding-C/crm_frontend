import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './ReportsSubPages.css';
import { DEAL_DATE_FILTER_OPTIONS } from '../../../shared/constants/dateFilterOptions';
import { REPT_DEAL_STAGE_OPTIONS, REPT_DEAL_TYPE_OPTIONS, REPT_SORT_OPTIONS } from '../constants';
import { MOCK_STAFF_SHORT } from '../../../shared/constants/mockStaff';
const DealExportReport = () => {
    const [filters, setFilters] = useState({
        dateRange: { start: '', end: '' }, dateBy: '', filterByDate: '', dealStatus: [],
        dealStage: '', dealType: '', agent: '', createdBy: '', completedBy: '', enquirySource: '',
        sortBy: 'createdDate', fileName: ''
    });
    const [selectedFields, setSelectedFields] = useState(['dealCode', 'dealName', 'dealAmount', 'dealStatus']);
    const dealStatusOptions = ['New', 'Create Papers', 'Invoice', 'In Progress', 'Final Stage', 'Deal Win', 'Deal Lost'];
    const fieldOptions = [
        { key: 'dateTime', label: 'Date & Time' }, { key: 'updatedDateTime', label: 'Updated Date & Time' },
        { key: 'dealCode', label: 'Deal Code' }, { key: 'dealName', label: 'Deal Name' },
        { key: 'dealAmount', label: 'Deal Amount' }, { key: 'dealType', label: 'Deal Type' },
        { key: 'dealStatus', label: 'Deal Status' }, { key: 'dealStage', label: 'Deal Stage' },
        { key: 'leadName', label: 'Lead Name' }, { key: 'companyName', label: 'Company Name' },
        { key: 'mobileNo', label: 'Mobile No' }, { key: 'staffName', label: 'Staff Name' },
        { key: 'startDate', label: 'Start Date' }, { key: 'endDate', label: 'End Date' },
        { key: 'createdBy', label: 'Created By' },
    ];
    const handleStatusToggle = (status) => {
        setFilters(prev => ({
            ...prev,
            dealStatus: prev.dealStatus.includes(status)
                ? prev.dealStatus.filter(s => s !== status)
                : [...prev.dealStatus, status]
        }));
    };
    const handleFieldToggle = (fieldKey) => {
        setSelectedFields(prev => prev.includes(fieldKey) ? prev.filter(f => f !== fieldKey) : [...prev, fieldKey]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Deal Export request submitted successfully");
    };
    return (_jsx("div", { className: "enquiries-page", children: _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: "export-form-card", children: [_jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "Date Filter" }), _jsx("div", { className: "filter-row", children: _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Choose Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }) }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }) })] })] }) }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date By" }), _jsxs("select", { value: filters.dateBy, onChange: (e) => setFilters({ ...filters, dateBy: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), DEAL_DATE_FILTER_OPTIONS.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Filter By Date" }), _jsxs("select", { value: filters.filterByDate, onChange: (e) => setFilters({ ...filters, filterByDate: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), DEAL_DATE_FILTER_OPTIONS.slice(0, 2).map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] })] })] }), _jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "Deal Filters" }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Deal Status" }), _jsx("div", { className: "multi-select-dropdown", style: { position: 'relative' }, children: _jsx("div", { className: "multi-select-trigger", style: { display: 'flex', flexWrap: 'wrap', gap: '0.25rem', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', minHeight: '42px', cursor: 'pointer' }, children: filters.dealStatus.length === 0 ? _jsx("span", { style: { color: 'var(--text-muted)' }, children: "Select" }) : filters.dealStatus.map(s => _jsx("span", { className: "multi-select-tag", children: s }, s)) }) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Deal Stage" }), _jsxs("select", { value: filters.dealStage, onChange: (e) => setFilters({ ...filters, dealStage: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), REPT_DEAL_STAGE_OPTIONS.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Deal Type" }), _jsxs("select", { value: filters.dealType, onChange: (e) => setFilters({ ...filters, dealType: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), REPT_DEAL_TYPE_OPTIONS.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] })] })] }), _jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "User Filters" }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Agent" }), _jsxs("select", { value: filters.agent, onChange: (e) => setFilters({ ...filters, agent: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), MOCK_STAFF_SHORT.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Created By" }), _jsxs("select", { value: filters.createdBy, onChange: (e) => setFilters({ ...filters, createdBy: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), MOCK_STAFF_SHORT.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Completed By" }), _jsxs("select", { value: filters.completedBy, onChange: (e) => setFilters({ ...filters, completedBy: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), MOCK_STAFF_SHORT.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] })] })] }), _jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "Sorting" }), _jsx("div", { className: "filter-row", children: _jsx("div", { className: "filter-group", children: _jsx("select", { value: filters.sortBy, onChange: (e) => setFilters({ ...filters, sortBy: e.target.value }), children: REPT_SORT_OPTIONS.map(o => _jsx("option", { value: o.value, children: o.label }, o.value)) }) }) })] }), _jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "Export File Name" }), _jsx("div", { className: "filter-row", children: _jsx("div", { className: "filter-group", children: _jsx("input", { type: "text", placeholder: "Enter file name", value: filters.fileName, onChange: (e) => setFilters({ ...filters, fileName: e.target.value }), className: "file-name-input" }) }) })] }), _jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "Fields Selection" }), _jsxs("div", { className: "fields-selection", children: [_jsx("div", { className: "field-checkbox", children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: selectedFields.length === fieldOptions.length, onChange: (e) => { if (e.target.checked)
                                                        setSelectedFields(fieldOptions.map(f => f.key));
                                                    else
                                                        setSelectedFields([]); } }), " Select All"] }) }), _jsx("div", { className: "fields-grid", children: fieldOptions.map(field => (_jsx("div", { className: "field-checkbox", children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: selectedFields.includes(field.key), onChange: () => handleFieldToggle(field.key) }), " ", field.label] }) }, field.key))) })] })] }), _jsx("div", { className: "form-actions", children: _jsx("button", { type: "submit", className: "btn btn-primary submit-btn", children: "Submit" }) })] }) }) }));
};
export default DealExportReport;
//# sourceMappingURL=DealExportReport.js.map