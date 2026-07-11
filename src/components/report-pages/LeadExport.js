import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Download, Filter, Search, ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../pages/Enquiries.css';
const sourceOptions = [
    { value: '', label: 'Select' },
    { value: 'website', label: 'Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'social', label: 'Social Media' },
    { value: 'email', label: 'Email Campaign' },
    { value: 'call', label: 'Incoming Call' },
];
const purposeOptions = [
    { value: '', label: 'Select' },
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Support' },
    { value: 'demo', label: 'Demo' },
    { value: 'enquiry', label: 'Enquiry' },
];
const statusOptions = [
    { value: '', label: 'Select' },
    { value: 'new', label: 'New' },
    { value: 'connected', label: 'Connected' },
    { value: 'interested', label: 'Interested' },
    { value: 'registered', label: 'Registered' },
    { value: 'notInterested', label: 'Not Interested' },
];
const createdByOptions = [
    { value: '', label: 'Select' },
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Smith' },
    { value: 'mike', label: 'Mike Johnson' },
];
const assignedToOptions = [
    { value: '', label: 'Select' },
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Smith' },
    { value: 'mike', label: 'Mike Johnson' },
];
const leadTypeOptions = [
    { value: '', label: 'Select' },
    { value: 'hot', label: 'Hot Lead' },
    { value: 'warm', label: 'Warm Lead' },
    { value: 'cold', label: 'Cold Lead' },
];
const campaignOptions = [
    { value: '', label: 'Select' },
    { value: 'campaign1', label: 'Campaign 1' },
    { value: 'campaign2', label: 'Campaign 2' },
];
const sortOptions = [
    { value: 'createdDate', label: 'Created Date' },
    { value: 'updatedDate', label: 'Updated Date' },
    { value: 'nameAZ', label: 'Name A-Z' },
    { value: 'nameZA', label: 'Name Z-A' },
];
const fieldOptions = [
    { key: 'name', label: 'Name' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'type', label: 'Type' },
    { key: 'createdBy', label: 'Created By' },
    { key: 'assignedDate', label: 'Assigned Date' },
    { key: 'mobileNo', label: 'Mobile No' },
    { key: 'countryCode', label: 'Country Code' },
    { key: 'purpose', label: 'Purpose' },
    { key: 'status', label: 'Status' },
    { key: 'dateTime', label: 'Date & Time' },
    { key: 'mobileWithCountry', label: 'Mobile No with Country Code' },
    { key: 'address', label: 'Address' },
    { key: 'location', label: 'Location' },
    { key: 'updatedDateTime', label: 'Updated Date & Time' },
    { key: 'emailId', label: 'Email Id' },
    { key: 'campaign', label: 'Campaign' },
    { key: 'remarks', label: 'Remarks' },
    { key: 'source', label: 'Source' },
    { key: 'staffName', label: 'Staff Name' },
    { key: 'date', label: 'Date' },
];
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