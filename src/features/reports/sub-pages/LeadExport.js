import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportsSubPages.css';
import { sourceOptions, purposeOptions, statusOptions, createdByOptions, assignedToOptions, leadTypeOptions, campaignOptions, sortOptions, fieldOptions } from '../constants/leadExport.data';
const LeadExport = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        createdAt: { from: '', to: '' },
        updatedAt: { from: '', to: '' },
        assignedAt: { from: '', to: '' },
        enquirySource: '',
        enquiryPurpose: '',
        enquiryStatus: '',
        createdBy: '',
        assignedTo: '',
        leadType: '',
        campaign: '',
        did: '',
        location: '',
        remarks: '',
        dateRange: '',
        sortBy: 'createdDate',
        fileName: ''
    });
    const [selectedFields, setSelectedFields] = useState(['name', 'mobileNo', 'purpose', 'status', 'date']);
    const handleFieldToggle = (fieldKey) => {
        setSelectedFields(prev => prev.includes(fieldKey)
            ? prev.filter(f => f !== fieldKey)
            : [...prev, fieldKey]);
    };
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedFields(fieldOptions.map(f => f.key));
        }
        else {
            setSelectedFields([]);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Export request submitted successfully");
    };
    return (_jsx("div", { className: "enquiries-page", children: _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: "export-form-card", children: [_jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "Date Filters" }), _jsx("div", { className: "filter-row", children: _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Created At" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.createdAt.from, onChange: (e) => setFilters({ ...filters, createdAt: { ...filters.createdAt, from: e.target.value } }) }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.createdAt.to, onChange: (e) => setFilters({ ...filters, createdAt: { ...filters.createdAt, to: e.target.value } }) })] })] }) }), _jsx("div", { className: "filter-row", children: _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Updated At" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.updatedAt.from, onChange: (e) => setFilters({ ...filters, updatedAt: { ...filters.updatedAt, from: e.target.value } }) }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.updatedAt.to, onChange: (e) => setFilters({ ...filters, updatedAt: { ...filters.updatedAt, to: e.target.value } }) })] })] }) }), _jsx("div", { className: "filter-row", children: _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Assigned At" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.assignedAt.from, onChange: (e) => setFilters({ ...filters, assignedAt: { ...filters.assignedAt, from: e.target.value } }) }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.assignedAt.to, onChange: (e) => setFilters({ ...filters, assignedAt: { ...filters.assignedAt, to: e.target.value } }) })] })] }) })] }), _jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "Lead Filters" }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Enquiry Source" }), _jsx("select", { value: filters.enquirySource, onChange: (e) => setFilters({ ...filters, enquirySource: e.target.value }), children: sourceOptions.map(opt => _jsx("option", { value: opt.value, children: opt.label }, opt.value)) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Enquiry Purpose" }), _jsx("select", { value: filters.enquiryPurpose, onChange: (e) => setFilters({ ...filters, enquiryPurpose: e.target.value }), children: purposeOptions.map(opt => _jsx("option", { value: opt.value, children: opt.label }, opt.value)) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Enquiry Status" }), _jsx("select", { value: filters.enquiryStatus, onChange: (e) => setFilters({ ...filters, enquiryStatus: e.target.value }), children: statusOptions.map(opt => _jsx("option", { value: opt.value, children: opt.label }, opt.value)) })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Created By" }), _jsx("select", { value: filters.createdBy, onChange: (e) => setFilters({ ...filters, createdBy: e.target.value }), children: createdByOptions.map(opt => _jsx("option", { value: opt.value, children: opt.label }, opt.value)) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Assigned To" }), _jsx("select", { value: filters.assignedTo, onChange: (e) => setFilters({ ...filters, assignedTo: e.target.value }), children: assignedToOptions.map(opt => _jsx("option", { value: opt.value, children: opt.label }, opt.value)) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Lead Type" }), _jsx("select", { value: filters.leadType, onChange: (e) => setFilters({ ...filters, leadType: e.target.value }), children: leadTypeOptions.map(opt => _jsx("option", { value: opt.value, children: opt.label }, opt.value)) })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Campaign" }), _jsx("select", { value: filters.campaign, onChange: (e) => setFilters({ ...filters, campaign: e.target.value }), children: campaignOptions.map(opt => _jsx("option", { value: opt.value, children: opt.label }, opt.value)) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "DID" }), _jsx("input", { type: "text", placeholder: "Enter DID", value: filters.did, onChange: (e) => setFilters({ ...filters, did: e.target.value }) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Location" }), _jsx("input", { type: "text", placeholder: "Enter location", value: filters.location, onChange: (e) => setFilters({ ...filters, location: e.target.value }) })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Remarks" }), _jsx("input", { type: "text", placeholder: "Enter remarks", value: filters.remarks, onChange: (e) => setFilters({ ...filters, remarks: e.target.value }) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsx("input", { type: "date", value: filters.dateRange, onChange: (e) => setFilters({ ...filters, dateRange: e.target.value }) })] })] })] }), _jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "Sort By" }), _jsx("div", { className: "filter-row", children: _jsx("div", { className: "filter-group", children: _jsx("select", { value: filters.sortBy, onChange: (e) => setFilters({ ...filters, sortBy: e.target.value }), children: sortOptions.map(opt => _jsx("option", { value: opt.value, children: opt.label }, opt.value)) }) }) })] }), _jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "Export File Name" }), _jsx("div", { className: "filter-row", children: _jsx("div", { className: "filter-group", children: _jsx("input", { type: "text", placeholder: "Enter file name", value: filters.fileName, onChange: (e) => setFilters({ ...filters, fileName: e.target.value }), className: "file-name-input" }) }) })] }), _jsxs("div", { className: "form-section", children: [_jsx("h3", { className: "section-title", children: "Fields" }), _jsxs("div", { className: "fields-selection", children: [_jsx("div", { className: "field-checkbox", children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: selectedFields.length === fieldOptions.length, onChange: handleSelectAll }), "Select All"] }) }), _jsx("div", { className: "fields-grid", children: fieldOptions.map(field => (_jsx("div", { className: "field-checkbox", children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: selectedFields.includes(field.key), onChange: () => handleFieldToggle(field.key) }), field.label] }) }, field.key))) })] })] }), _jsx("div", { className: "form-actions", children: _jsx("button", { type: "submit", className: "btn btn-primary submit-btn", children: "Submit" }) })] }) }) }));
};
export default LeadExport;
//# sourceMappingURL=LeadExport.js.map