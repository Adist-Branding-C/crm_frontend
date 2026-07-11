import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../task-settings/utils/scrollToFirstError';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import { CAMPAIGN_TYPES, CAMPAIGN_TYPE_OPTIONS } from '../constants';
import AgentMultiSelect from './AgentMultiSelect';
import { useStaffOptions } from '../hooks/useStaffOptions';
const CampaignForm = ({ editingItem, validationSchema, initialValues, onSubmit, isLoading, error, onCancel, scrollContainerRef }) => {
    const prevSubmitCountRef = useRef(0);
    const staff = useStaffOptions();
    const isEditing = !!editingItem;
    useEffect(() => {
        if (editingItem) {
            staff.setSelectedType(editingItem.type || '');
        }
        else {
            staff.clearCache();
            staff.setSelectedType('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingItem]);
    useEffect(() => {
        if (error) {
            scrollContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [error, scrollContainerRef]);
    return (_jsx(_Fragment, { children: _jsx(Formik, { enableReinitialize: true, initialValues: initialValues, validationSchema: validationSchema, onSubmit: onSubmit, children: ({ errors, touched, dirty, submitCount, isSubmitting, values, setFieldValue }) => {
                if (submitCount > prevSubmitCountRef.current) {
                    prevSubmitCountRef.current = submitCount;
                    if (Object.keys(errors).length > 0) {
                        requestAnimationFrame(() => scrollToFirstError(scrollContainerRef?.current ?? null));
                    }
                }
                const handleTypeChange = (type) => {
                    setFieldValue('type', type);
                    staff.setSelectedType(type);
                };
                const fieldClass = (name) => `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;
                return (_jsxs(Form, { children: [error && _jsx(ErrorMessage, { message: error }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Type ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs(Field, { as: "select", name: "type", className: fieldClass('type'), onChange: (e) => handleTypeChange(e.target.value), children: [_jsx("option", { value: "", children: "Select" }), CAMPAIGN_TYPE_OPTIONS.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value)))] }), _jsx(FormikError, { name: "type", component: "small", className: "field-error-text" })] }), values.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Name ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "text", name: "name", className: fieldClass('name'), placeholder: "Enter campaign name" }), _jsx(FormikError, { name: "name", component: "small", className: "field-error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Start Date" }), _jsx(Field, { type: "date", name: "startDate", className: fieldClass('startDate') }), _jsx(FormikError, { name: "startDate", component: "small", className: "field-error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "End Date" }), _jsx(Field, { type: "date", name: "endDate", className: fieldClass('endDate') }), _jsx(FormikError, { name: "endDate", component: "small", className: "field-error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Description" }), _jsx(Field, { as: "textarea", name: "description", className: fieldClass('description'), placeholder: "Enter description", rows: 3 }), _jsx(FormikError, { name: "description", component: "small", className: "field-error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Agents ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(AgentMultiSelect, { agents: staff.agents, selected: values.agents, onChange: (selected) => setFieldValue('agents', selected), isLoading: staff.isLoading, error: !!(touched.agents && errors.agents) }), _jsx(FormikError, { name: "agents", component: "small", className: "field-error-text" })] })] })), values.type === CAMPAIGN_TYPES.DATA_POOL && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Pool Name ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "text", name: "poolName", className: fieldClass('poolName'), placeholder: "Enter pool name" }), _jsx(FormikError, { name: "poolName", component: "small", className: "field-error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Agents ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(AgentMultiSelect, { agents: staff.agents, selected: values.poolAgents, onChange: (selected) => setFieldValue('poolAgents', selected), isLoading: staff.isLoading, error: !!(touched.poolAgents && errors.poolAgents) }), _jsx(FormikError, { name: "poolAgents", component: "small", className: "field-error-text" })] })] })), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", disabled: isLoading || isSubmitting || (isEditing && !dirty), children: isLoading || isSubmitting ? _jsx(Loader2, { size: 16, className: "spin" }) : (isEditing ? ACTION_UPDATE : ACTION_SAVE) }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: onCancel, children: ACTION_CANCEL })] })] }));
            } }) }));
};
export default CampaignForm;
//# sourceMappingURL=CampaignForm.js.map