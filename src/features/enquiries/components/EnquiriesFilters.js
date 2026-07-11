import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { DATE_FILTER_OPTIONS } from '../../../shared/constants/dateFilterOptions';
import { useLeadFilterOptions } from '../hooks/useLeadFilterOptions';
import { getVisibleAdditionalFields } from '../utils/leadFilterFields';
import AdditionalFieldControl from './AdditionalFieldControl';
const EnquiriesFilters = ({ filters, onFilterChange, onApplyFilters, onClearFilters }) => {
    const { typeOptions, sourceOptions, purposeOptions, staffOptions, statusOptions, additionalFields, isLoading } = useLeadFilterOptions();
    const visibleAdditionalFields = useMemo(() => getVisibleAdditionalFields(additionalFields, filters.enquiryPurpose), [additionalFields, filters.enquiryPurpose]);
    const handleAdditionalFieldChange = (fieldId, value) => {
        onFilterChange({
            ...filters,
            additionalFields: {
                ...filters.additionalFields,
                [fieldId]: value,
            },
        });
    };
    const additionalFieldRows = useMemo(() => {
        if (visibleAdditionalFields.length === 0)
            return null;
        const rows = [];
        for (let i = 0; i < visibleAdditionalFields.length; i += 3) {
            const chunk = visibleAdditionalFields.slice(i, i + 3);
            rows.push(_jsx("div", { className: "filter-row", children: chunk.map((field) => (_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: field.name }), _jsx(AdditionalFieldControl, { field: field, value: filters.additionalFields[field.fieldId] ?? '', onChange: (value) => handleAdditionalFieldChange(field.fieldId, value) })] }, field.fieldId))) }, `af-row-${i}`));
        }
        return rows;
    }, [visibleAdditionalFields, filters.additionalFields]);
    return (_jsxs("div", { className: "filters-panel", children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }), placeholder: "Start" }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }), placeholder: "End" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Filter by Date" }), _jsxs("select", { value: filters.filterByDate, onChange: (e) => onFilterChange({ ...filters, filterByDate: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), DATE_FILTER_OPTIONS.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Enquiry Source" }), _jsxs("select", { value: filters.enquirySource, onChange: (e) => onFilterChange({ ...filters, enquirySource: e.target.value }), disabled: isLoading, children: [_jsx("option", { value: "", children: "Select" }), sourceOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Enquiry Purpose" }), _jsxs("select", { value: filters.enquiryPurpose, onChange: (e) => onFilterChange({ ...filters, enquiryPurpose: e.target.value }), disabled: isLoading, children: [_jsx("option", { value: "", children: "Select" }), purposeOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Lead Status" }), _jsxs("select", { value: filters.leadStatus, onChange: (e) => onFilterChange({ ...filters, leadStatus: e.target.value }), disabled: isLoading, children: [_jsx("option", { value: "", children: "Select" }), statusOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Followup Added" }), _jsxs("select", { value: filters.followupAdded, onChange: (e) => onFilterChange({ ...filters, followupAdded: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "yes", children: "Yes" }), _jsx("option", { value: "no", children: "No" })] })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Assigned To" }), _jsxs("select", { value: filters.assignedTo, onChange: (e) => onFilterChange({ ...filters, assignedTo: e.target.value }), disabled: isLoading, children: [_jsx("option", { value: "", children: "Select" }), staffOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Lead Type" }), _jsxs("select", { value: filters.leadType, onChange: (e) => onFilterChange({ ...filters, leadType: e.target.value }), disabled: isLoading, children: [_jsx("option", { value: "", children: "Select" }), typeOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Location" }), _jsx("input", { type: "text", placeholder: "Enter location", value: filters.location, onChange: (e) => onFilterChange({ ...filters, location: e.target.value }) })] })] }), additionalFieldRows, _jsx("div", { className: "filter-row", children: _jsxs("div", { className: "filter-actions", children: [_jsx("button", { className: "btn btn-primary", onClick: onApplyFilters, children: ACTION_FILTER }), _jsx("button", { className: "btn btn-secondary", onClick: onClearFilters, children: ACTION_CLEAR })] }) })] }));
};
export default EnquiriesFilters;
//# sourceMappingURL=EnquiriesFilters.js.map