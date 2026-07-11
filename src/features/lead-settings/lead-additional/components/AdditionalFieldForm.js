import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { Plus, Loader2, Pencil, X } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import { FIELD_TYPE_OPTIONS } from '../../../../shared/constants/fieldTypes';
import DropdownValuesInput from './DropdownValuesInput';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
import { FIELD_TYPES } from '../constants/fieldTypes';
import './AdditionalFieldForm.css';
const AdditionalFieldForm = ({ form, status, purposes }) => {
    const { validationSchema, initialValues, onSubmit, isEditing, editingFieldName, onCancelEdit } = form;
    const { isSaving, error, onClearError } = status;
    const formBodyRef = useRef(null);
    const prevSubmitCountRef = useRef(0);
    const [currentDropdownValue, setCurrentDropdownValue] = useState('');
    return (_jsx("div", { className: "additional-form-panel", children: _jsxs("div", { className: `card${isEditing ? ' card--editing' : ''}`, children: [_jsxs("div", { className: "card-header", children: [_jsxs("div", { className: "card-header-title", children: [isEditing && _jsx(Pencil, { size: 16, className: "card-header-icon" }), _jsx("h5", { children: isEditing ? 'Edit Field' : 'Add Field' })] }), isEditing && onCancelEdit && (_jsxs("button", { type: "button", className: "cancel-edit-btn", onClick: onCancelEdit, children: [_jsx(X, { size: 14 }), " Cancel"] }))] }), isEditing && editingFieldName && (_jsxs("p", { className: "editing-subtitle", children: ["Editing: \"", editingFieldName, "\""] })), _jsx("div", { className: "card-body", children: _jsx(Formik, { enableReinitialize: true, initialValues: initialValues, validationSchema: validationSchema, onSubmit: onSubmit, children: ({ values, errors, touched, submitCount, isSubmitting, setFieldValue }) => {
                            if (submitCount > prevSubmitCountRef.current) {
                                prevSubmitCountRef.current = submitCount;
                                if (Object.keys(errors).length > 0) {
                                    requestAnimationFrame(() => scrollToFirstError(formBodyRef.current));
                                }
                            }
                            const showError = (field) => touched[field] || submitCount > 0;
                            const fieldClass = (name) => `form-control${showError(name) && errors[name] ? ' input-error' : ''}`;
                            const handleAddDropdownValue = () => {
                                const trimmed = currentDropdownValue.trim();
                                if (!trimmed)
                                    return;
                                if (values.dropdownValues.some((v) => v.toLowerCase() === trimmed.toLowerCase()))
                                    return;
                                setFieldValue('dropdownValues', [...values.dropdownValues, trimmed]);
                                setCurrentDropdownValue('');
                            };
                            const handleRemoveDropdownValue = (index) => {
                                setFieldValue('dropdownValues', values.dropdownValues.filter((_, i) => i !== index));
                            };
                            return (_jsxs("div", { ref: formBodyRef, children: [_jsx(ValidationAlert, { message: error, onClose: onClearError }), _jsxs(Form, { children: [_jsxs("div", { className: "checkbox-group", children: [_jsxs("label", { className: "checkbox-item", children: [_jsx(Field, { type: "checkbox", name: "showInFilter" }), "Is Shown in filter"] }), _jsxs("label", { className: "checkbox-item", children: [_jsx(Field, { type: "checkbox", name: "showInList" }), "Show in list"] }), _jsxs("label", { className: "checkbox-item", children: [_jsx(Field, { type: "checkbox", name: "isRequired" }), "Is Required?"] }), _jsxs("label", { className: "checkbox-item", children: [_jsx(Field, { type: "checkbox", name: "connectWithLeadPurpose" }), "Connect with lead purpose?"] })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Field Name ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "text", name: "name", className: fieldClass('name'), placeholder: "Enter field name" }), showError('name') && errors.name && _jsx("small", { className: "field-error-text", children: errors.name })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Select Type ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs(Field, { as: "select", name: "fieldType", className: fieldClass('fieldType'), children: [_jsx("option", { value: "", children: "Select Type" }), FIELD_TYPE_OPTIONS.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] }), showError('fieldType') && errors.fieldType && _jsx("small", { className: "field-error-text", children: errors.fieldType })] }), values.connectWithLeadPurpose && (_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Select Purpose ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs(Field, { as: "select", name: "purposeId", className: fieldClass('purposeId'), children: [_jsx("option", { value: "", children: "Select Purpose" }), purposes.map(p => _jsx("option", { value: p.id, children: p.title }, p.id))] }), showError('purposeId') && errors.purposeId && _jsx("small", { className: "field-error-text", children: errors.purposeId })] })), (values.fieldType === FIELD_TYPES.DROPDOWN || values.fieldType === FIELD_TYPES.CHECKBOX) && (_jsxs(_Fragment, { children: [_jsx(DropdownValuesInput, { currentValue: currentDropdownValue, values: values.dropdownValues, onChange: (e) => setCurrentDropdownValue(e.target.value), onAdd: handleAddDropdownValue, onRemove: handleRemoveDropdownValue }), showError('dropdownValues') && errors.dropdownValues && (_jsx("small", { className: "field-error-text", children: String(errors.dropdownValues) }))] })), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: isSaving || isSubmitting, children: isSaving || isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { size: 16, className: "spin" }), " Saving..."] })) : (_jsxs(_Fragment, { children: [_jsx(Plus, { size: 16 }), " ", isEditing ? 'Update' : 'Add Field'] })) })] })] }));
                        } }) })] }) }));
};
export default AdditionalFieldForm;
//# sourceMappingURL=AdditionalFieldForm.js.map