import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ACTION_EDIT, ACTION_ADD, ACTION_UPDATE, ACTION_SAVE, ACTION_CANCEL } from '../../constants/actionLabels';
import ValidationAlert from '../ValidationAlert';
function buildValidationSchema(fields) {
    const shape = {};
    for (const field of fields) {
        if (field.required) {
            let validator = Yup.string().trim().required(`${field.label} is required`);
            if (field.type === 'email') {
                validator = validator.email('Invalid email address');
            }
            shape[field.name] = validator;
        }
    }
    return Object.keys(shape).length > 0 ? Yup.object().shape(shape) : undefined;
}
const AdminFormDrawer = ({ isOpen, title, fields, formData, onChange, onSave, onClose, isEditing, error, onClearError, isSaving, saveDisabled }) => {
    if (!isOpen)
        return null;
    const validationSchema = React.useMemo(() => buildValidationSchema(fields), [fields]);
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: isEditing ? `${ACTION_EDIT} ${title}` : `${ACTION_ADD} ${title}` }), _jsx("button", { className: "drawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "drawer-body", children: [_jsx(ValidationAlert, { message: error ?? null, onClose: onClearError }), _jsx(Formik, { enableReinitialize: true, initialValues: formData, validationSchema: validationSchema, onSubmit: (values) => {
                                onChange(values);
                                onSave();
                            }, children: ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
                                const syncOnChange = (e) => {
                                    handleChange(e);
                                    const target = e.target;
                                    const name = target.name;
                                    const value = target.type === 'checkbox' ? target.checked : target.value;
                                    onChange({ ...values, [name]: value });
                                };
                                return (_jsxs(Form, { children: [fields.map(field => (_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: [field.label, " ", field.required && _jsx("span", { className: "text-danger", children: "*" })] }), field.type === 'text' && (_jsx("input", { type: "text", name: field.name, className: "form-control", placeholder: field.placeholder ?? `Enter ${field.label.toLowerCase()}`, value: String(values[field.name] ?? ''), onChange: syncOnChange, onBlur: handleBlur })), field.type === 'email' && (_jsx("input", { type: "email", name: field.name, className: "form-control", placeholder: field.placeholder ?? `Enter ${field.label.toLowerCase()}`, value: String(values[field.name] ?? ''), onChange: syncOnChange, onBlur: handleBlur })), field.type === 'password' && (_jsx("input", { type: "password", name: field.name, className: "form-control", placeholder: field.placeholder ?? `Enter ${field.label.toLowerCase()}`, value: String(values[field.name] ?? ''), onChange: syncOnChange, onBlur: handleBlur })), field.type === 'number' && (_jsx("input", { type: "number", name: field.name, className: "form-control", placeholder: field.placeholder ?? `Enter ${field.label.toLowerCase()}`, value: String(values[field.name] ?? ''), onChange: syncOnChange, onBlur: handleBlur })), field.type === 'color' && (_jsx("input", { type: "color", name: field.name, className: "form-control form-control-color", value: String(values[field.name] ?? '#3b82f6'), onChange: syncOnChange })), field.type === 'checkbox' && (_jsx("input", { type: "checkbox", name: field.name, className: "form-check-input", checked: Boolean(values[field.name]), onChange: syncOnChange })), field.type === 'switch' && (_jsxs("label", { className: "toggle-switch", children: [_jsx("input", { type: "checkbox", name: field.name, checked: Boolean(values[field.name]), onChange: syncOnChange }), _jsx("span", { className: "toggle-slider" })] })), field.type === 'select' && (_jsxs("select", { name: field.name, className: "form-control", value: String(values[field.name] ?? ''), onChange: syncOnChange, onBlur: handleBlur, children: [_jsxs("option", { value: "", children: ["Select ", field.label.toLowerCase()] }), field.options?.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value)))] })), field.type === 'textarea' && (_jsx("textarea", { name: field.name, className: "form-control", placeholder: field.placeholder ?? `Enter ${field.label.toLowerCase()}`, value: String(values[field.name] ?? ''), onChange: syncOnChange, onBlur: handleBlur })), errors[field.name] && touched[field.name] && (_jsx("div", { className: "text-danger", style: { fontSize: '0.8rem', marginTop: '0.25rem' }, children: String(errors[field.name]) }))] }, field.name))), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", disabled: isSaving || saveDisabled, children: isSaving ? _jsxs(_Fragment, { children: [_jsx(Loader2, { size: 16, className: "spin" }), " Saving..."] }) : (isEditing ? ACTION_UPDATE : ACTION_SAVE) }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: onClose, children: ACTION_CANCEL })] })] }));
                            } })] })] }) }));
};
export default AdminFormDrawer;
//# sourceMappingURL=AdminFormDrawer.js.map