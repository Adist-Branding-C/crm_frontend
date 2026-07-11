import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import { staffService } from '../../deal/services/staff.service';
import { leadPurposeService } from '../../lead-settings/lead-purpose/services';
import { leadTypeService } from '../../lead-settings/lead-types/services';
import { leadStatusService } from '../../lead-settings/lead-status/services';
import { leadSourceService } from '../../lead-settings/lead-source/services';
import { leadDataService } from '../services/leadDataService';
import { leadAdditionalService } from '../../lead-settings/lead-additional/services/leadAdditionalService';
import { getErrorMessage } from '../../../shared/utils/error';
import { getFieldKey, getInitialValues, buildAdditionalFieldsPayload } from '../utils/additionalFields';
import { getAddLeadValidationSchema } from '../validations/addLead.validation';
import { BASE_INITIAL_VALUES } from '../constants/addLead.constants';
import { ERROR_MESSAGES } from '../constants/messages';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '../../../shared/constants/countryCodes';
import DynamicAdditionalFields from '../../../shared/components/drawers/DynamicAdditionalFields';
/**
 * All lead create/edit form content: field layout, dropdown-option loading,
 * validation, and submit. Knows nothing about being inside a drawer - mounts
 * fresh each time its parent renders it (the drawer shell controls that), so
 * "on mount" here is equivalent to "the form just opened."
 *
 * Used by:
 * - AddLeadDrawer (composed inside the shared Drawer shell)
 */
const LeadForm = ({ lead, onSaved, onClose }) => {
    const [staffOptions, setStaffOptions] = useState([]);
    const [purposeOptions, setPurposeOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [sourceOptions, setSourceOptions] = useState([]);
    const [additionalFieldDefs, setAdditionalFieldDefs] = useState([]);
    const [loadError, setLoadError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [activePurposeId, setActivePurposeId] = useState('');
    const isEditing = !!lead;
    const originalValuesRef = useRef(null);
    const hasLoadedRef = useRef(false);
    useEffect(() => {
        const loadDropdowns = async () => {
            try {
                const [staffRes, purposeRes, typeRes, statusRes, sourceRes, additionalFieldsRes] = await Promise.all([
                    staffService.getStaff(),
                    leadPurposeService.getLeadPurposes(1, 100),
                    leadTypeService.getLeadTypes(1, 100),
                    leadStatusService.getLeadStatuses(1, 100),
                    leadSourceService.getLeadSources(1, 100),
                    leadAdditionalService.getAll(1, 200),
                ]);
                const staffRaw = staffRes?.data;
                const staffData = Array.isArray(staffRaw) ? staffRaw : staffRaw?.items ?? [];
                setStaffOptions(staffData.map((s) => ({
                    value: s.staff_id ?? s.id ?? '',
                    label: s.name,
                })));
                const purposeRaw = purposeRes?.data;
                const purposeData = Array.isArray(purposeRaw) ? purposeRaw : purposeRaw?.items ?? [];
                setPurposeOptions(purposeData.map((p) => ({
                    value: p.purposeId ?? '',
                    label: p.purpose,
                })));
                const typeData = typeRes?.data?.items ?? [];
                setTypeOptions(typeData.map((t) => ({
                    value: t.typeId,
                    label: t.type,
                })));
                const statusData = statusRes?.data?.items ?? [];
                setStatusOptions(statusData.map((s) => ({
                    value: s.statusId,
                    label: s.status,
                })));
                const sourceData = sourceRes?.data?.items ?? [];
                setSourceOptions(sourceData.map((s) => ({
                    value: s.sourceId,
                    label: s.source,
                })));
                const addFieldsData = additionalFieldsRes?.data?.items ?? [];
                setAdditionalFieldDefs(addFieldsData);
                hasLoadedRef.current = true;
            }
            catch {
                setLoadError(ERROR_MESSAGES.LOAD_FORM_OPTIONS);
            }
        };
        loadDropdowns();
    }, []);
    // Guards against a background lead-list refresh swapping in a new `lead`
    // object reference while this form is still open and mid-edit - without
    // this, hasChanges would keep comparing against a now-stale baseline.
    useEffect(() => {
        originalValuesRef.current = null;
        hasLoadedRef.current = false;
    }, [lead]);
    const handleSubmit = async (values) => {
        setSubmitError('');
        const trimmed = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));
        const visibleFieldDefs = additionalFieldDefs.filter((f) => {
            if (!f.connectWithLeadPurpose || !f.purposeId)
                return true;
            return f.purposeId === trimmed.purposeId;
        });
        const additionalFields = buildAdditionalFieldsPayload(trimmed, visibleFieldDefs);
        const payload = {
            name: trimmed.name,
            phone: trimmed.phone,
            countryCode: trimmed.countryCode,
            sourceId: trimmed.sourceId,
        };
        if (trimmed.email)
            payload.email = trimmed.email;
        if (trimmed.agentId)
            payload.agentId = trimmed.agentId;
        if (trimmed.purposeId)
            payload.purposeId = trimmed.purposeId;
        if (trimmed.typeId)
            payload.typeId = trimmed.typeId;
        if (trimmed.statusId)
            payload.statusId = trimmed.statusId;
        if (trimmed.nextFollowUp) {
            payload.nextFollowUp = trimmed.nextFollowUp;
        }
        else if (isEditing) {
            payload.nextFollowUp = null;
        }
        if (trimmed.notes)
            payload.notes = trimmed.notes;
        if (trimmed.location)
            payload.location = trimmed.location;
        if (trimmed.address)
            payload.address = trimmed.address;
        if (additionalFields.length > 0) {
            payload.additionalFields = additionalFields;
        }
        try {
            if (isEditing && lead) {
                await leadDataService.updateLead(lead.leadId, payload);
            }
            else {
                await leadDataService.createLead(payload);
            }
            onSaved?.(isEditing ? 'updated' : 'created');
            onClose();
        }
        catch (err) {
            setSubmitError(getErrorMessage(err, 'An unexpected error occurred'));
        }
    };
    const mergedInitialValues = useMemo(() => {
        const base = { ...BASE_INITIAL_VALUES, ...getInitialValues(additionalFieldDefs) };
        if (!lead)
            return base;
        const findId = (options, label) => {
            if (!label)
                return '';
            const match = options.find(o => o.label === label);
            return match ? match.value : '';
        };
        // <input type="date"> only accepts YYYY-MM-DD; the API returns a full ISO
        // datetime string, which the input silently rejects (renders blank).
        const toDateInputValue = (value) => value ? value.slice(0, 10) : '';
        const leadAddFields = {};
        for (const af of lead.additionalFields || []) {
            const def = additionalFieldDefs.find(d => d.name === af.name);
            if (def) {
                const key = getFieldKey(def.fieldKey);
                if (def.fieldType?.toLowerCase() === 'checkbox') {
                    leadAddFields[key] = af.value ? af.value.split(',').map(v => v.trim()) : [];
                }
                else {
                    leadAddFields[key] = af.value || '';
                }
            }
        }
        return {
            ...base,
            name: lead.name || '',
            phone: lead.phone || '',
            countryCode: lead.countryCode || DEFAULT_COUNTRY_CODE,
            email: lead.email || '',
            agentId: findId(staffOptions, lead.assignedTo),
            purposeId: findId(purposeOptions, lead.purpose),
            typeId: findId(typeOptions, lead.type),
            statusId: findId(statusOptions, lead.status),
            sourceId: findId(sourceOptions, lead.source),
            nextFollowUp: toDateInputValue(lead.nextFollowUp),
            location: lead.location || '',
            address: lead.address || '',
            ...leadAddFields,
        };
    }, [lead, staffOptions, purposeOptions, typeOptions, statusOptions, sourceOptions, additionalFieldDefs]);
    useEffect(() => {
        setActivePurposeId(mergedInitialValues.purposeId || '');
    }, [mergedInitialValues.purposeId]);
    useEffect(() => {
        if (!isEditing || !lead || originalValuesRef.current)
            return;
        if (hasLoadedRef.current) {
            originalValuesRef.current = { ...mergedInitialValues };
        }
    }, [mergedInitialValues, isEditing, lead]);
    const validationSchema = useMemo(() => {
        const filtered = additionalFieldDefs.filter((f) => {
            if (!f.connectWithLeadPurpose || !f.purposeId)
                return true;
            return f.purposeId === activePurposeId;
        });
        return getAddLeadValidationSchema(filtered);
    }, [additionalFieldDefs, activePurposeId]);
    return (_jsx(Formik, { initialValues: mergedInitialValues, validationSchema: validationSchema, onSubmit: handleSubmit, enableReinitialize: true, children: ({ errors, touched, isSubmitting, values, handleChange, handleBlur, submitForm, setFieldValue }) => {
            const filteredFieldDefs = additionalFieldDefs.filter((f) => {
                if (!f.connectWithLeadPurpose || !f.purposeId)
                    return true;
                return f.purposeId === activePurposeId;
            });
            const hasChanges = (() => {
                if (!isEditing)
                    return true;
                const orig = originalValuesRef.current;
                if (!orig)
                    return true;
                if (values.name !== orig.name)
                    return true;
                if (values.phone !== orig.phone)
                    return true;
                if (values.countryCode !== orig.countryCode)
                    return true;
                if (values.email !== orig.email)
                    return true;
                if (values.agentId !== orig.agentId)
                    return true;
                if (values.purposeId !== orig.purposeId)
                    return true;
                if (values.typeId !== orig.typeId)
                    return true;
                if (values.statusId !== orig.statusId)
                    return true;
                if (values.sourceId !== orig.sourceId)
                    return true;
                if (values.nextFollowUp !== orig.nextFollowUp)
                    return true;
                if (values.notes !== orig.notes)
                    return true;
                if (values.location !== orig.location)
                    return true;
                if (values.address !== orig.address)
                    return true;
                const formValues = values;
                for (const def of additionalFieldDefs) {
                    const key = getFieldKey(def.fieldKey);
                    if (JSON.stringify(formValues[key]) !== JSON.stringify(orig[key]))
                        return true;
                }
                return false;
            })();
            return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "drawer-body", children: [loadError && _jsx("div", { className: "alert alert-danger", children: loadError }), submitError && _jsx("div", { className: "alert alert-danger", children: submitError }), _jsxs(Form, { className: "lead-form", children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Name ", _jsx("span", { className: "required", children: "*" })] }), _jsx("input", { type: "text", name: "name", placeholder: "Enter name", value: values.name, onChange: handleChange, onBlur: handleBlur, className: errors.name && touched.name ? 'error' : '' }), errors.name && touched.name && _jsx("div", { className: "error-text", children: errors.name })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Phone ", _jsx("span", { className: "required", children: "*" })] }), _jsxs("div", { className: "phone-field-group", children: [_jsx("select", { name: "countryCode", value: values.countryCode, onChange: handleChange, onBlur: handleBlur, className: `phone-country-code${errors.countryCode && touched.countryCode ? ' error' : ''}`, children: COUNTRY_CODES.map(c => (_jsxs("option", { value: c.code, children: [c.code, " ", c.country] }, `${c.country}-${c.code}`))) }), _jsx("input", { type: "tel", name: "phone", placeholder: "Enter phone number", value: values.phone, onChange: handleChange, onBlur: handleBlur, className: errors.phone && touched.phone ? 'error' : '' })] }), errors.countryCode && touched.countryCode && _jsx("div", { className: "error-text", children: errors.countryCode }), errors.phone && touched.phone && _jsx("div", { className: "error-text", children: errors.phone })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Email" }), _jsx("input", { type: "email", name: "email", placeholder: "Enter email", value: values.email, onChange: handleChange, onBlur: handleBlur, className: errors.email && touched.email ? 'error' : '' }), errors.email && touched.email && _jsx("div", { className: "error-text", children: errors.email })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Assigned To" }), _jsxs(Field, { as: "select", name: "agentId", className: errors.agentId && touched.agentId ? 'error' : '', children: [_jsx("option", { value: "", children: "Select" }), staffOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] }), _jsx(FormikError, { name: "agentId", component: "div", className: "error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Purpose" }), _jsxs("select", { name: "purposeId", value: values.purposeId, onChange: (e) => {
                                                    handleChange(e);
                                                    setActivePurposeId(e.target.value);
                                                }, onBlur: handleBlur, className: errors.purposeId && touched.purposeId ? 'error' : '', children: [_jsx("option", { value: "", children: "Select" }), purposeOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] }), _jsx(FormikError, { name: "purposeId", component: "div", className: "error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Type" }), _jsxs(Field, { as: "select", name: "typeId", className: errors.typeId && touched.typeId ? 'error' : '', children: [_jsx("option", { value: "", children: "Select" }), typeOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] }), _jsx(FormikError, { name: "typeId", component: "div", className: "error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Status" }), _jsxs(Field, { as: "select", name: "statusId", className: errors.statusId && touched.statusId ? 'error' : '', children: [_jsx("option", { value: "", children: "Select" }), statusOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] }), _jsx(FormikError, { name: "statusId", component: "div", className: "error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Source ", _jsx("span", { className: "required", children: "*" })] }), _jsxs(Field, { as: "select", name: "sourceId", className: errors.sourceId && touched.sourceId ? 'error' : '', children: [_jsx("option", { value: "", children: "Select" }), sourceOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] }), _jsx(FormikError, { name: "sourceId", component: "div", className: "error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Location" }), _jsx("input", { type: "text", name: "location", placeholder: "Enter location", value: values.location, onChange: handleChange, onBlur: handleBlur, className: errors.location && touched.location ? 'error' : '' }), errors.location && touched.location && _jsx("div", { className: "error-text", children: errors.location })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Address" }), _jsx("input", { type: "text", name: "address", placeholder: "Enter address", value: values.address, onChange: handleChange, onBlur: handleBlur, className: errors.address && touched.address ? 'error' : '' }), errors.address && touched.address && _jsx("div", { className: "error-text", children: errors.address })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Next Follow Up" }), _jsx("input", { type: "date", name: "nextFollowUp", value: values.nextFollowUp, onChange: handleChange, onBlur: handleBlur, className: errors.nextFollowUp && touched.nextFollowUp ? 'error' : '' }), errors.nextFollowUp && touched.nextFollowUp && _jsx("div", { className: "error-text", children: errors.nextFollowUp })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Notes" }), _jsx("textarea", { name: "notes", placeholder: "Enter notes", rows: 4, value: values.notes, onChange: handleChange, onBlur: handleBlur, className: errors.notes && touched.notes ? 'error' : '' }), errors.notes && touched.notes && _jsx("div", { className: "error-text", children: errors.notes })] }), _jsx(DynamicAdditionalFields, { fields: filteredFieldDefs, values: values, errors: errors, touched: touched, handleChange: handleChange, handleBlur: handleBlur, setFieldValue: setFieldValue })] })] }), _jsxs("div", { className: "drawer-footer", children: [_jsx("button", { className: "btn btn-secondary", type: "button", onClick: onClose, children: "Cancel" }), _jsx("button", { className: "btn btn-primary", type: "button", onClick: submitForm, disabled: isSubmitting || (isEditing && !hasChanges), children: isSubmitting ? _jsxs(_Fragment, { children: [_jsx(Loader2, { size: 16, className: "spin" }), " ", isEditing ? 'Updating...' : 'Saving...'] }) : isEditing ? 'Update Lead' : 'Save Lead' })] })] }));
        } }));
};
export default LeadForm;
//# sourceMappingURL=LeadForm.js.map