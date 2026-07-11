import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../../shared/constants/actionLabels';
import { LEAD_STATUS_FIELD_LABEL, LEAD_STATUS_FIELD_PLACEHOLDER, LEAD_STATUS_COLOR_FIELD_LABEL, LEAD_STATUS_CONVERSION_FIELD_LABEL, } from '../constants';
const LeadStatusForm = ({ form, status }) => {
    const { validationSchema, initialValues, onSubmit, onCancel, isEditing } = form;
    const { isLoading, error, onClearError } = status;
    const formBodyRef = useRef(null);
    const prevSubmitCountRef = useRef(0);
    return (_jsx(Formik, { enableReinitialize: true, initialValues: initialValues, validationSchema: validationSchema, onSubmit: onSubmit, children: ({ errors, touched, dirty, submitCount, isSubmitting }) => {
            if (submitCount > prevSubmitCountRef.current) {
                prevSubmitCountRef.current = submitCount;
                if (Object.keys(errors).length > 0) {
                    requestAnimationFrame(() => scrollToFirstError(formBodyRef.current));
                }
            }
            const showError = (field) => touched[field] || submitCount > 0;
            const fieldClass = (name) => `form-control${showError(name) && errors[name] ? ' input-error' : ''}`;
            return (_jsx("div", { ref: formBodyRef, children: _jsxs(Form, { children: [_jsx(ValidationAlert, { message: error || null, onClose: onClearError }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: [LEAD_STATUS_FIELD_LABEL, " ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "text", name: "status", className: fieldClass('status'), placeholder: LEAD_STATUS_FIELD_PLACEHOLDER }), showError('status') && errors.status && _jsx("small", { className: "field-error-text", children: errors.status })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: LEAD_STATUS_COLOR_FIELD_LABEL }), _jsx(Field, { type: "color", name: "color", className: "form-control form-control-color color-input" }), showError('color') && errors.color && _jsx("small", { className: "field-error-text", children: errors.color })] }), _jsxs("div", { className: "form-group switch-field", children: [_jsxs("label", { className: "toggle-switch", children: [_jsx(Field, { type: "checkbox", name: "useForConversion" }), _jsx("span", { className: "toggle-slider" })] }), _jsx("label", { children: LEAD_STATUS_CONVERSION_FIELD_LABEL })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", disabled: isLoading || isSubmitting || (isEditing && !dirty), children: isLoading || isSubmitting ? _jsx(Loader2, { size: 16, className: "spin" }) : (isEditing ? ACTION_UPDATE : ACTION_SAVE) }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: onCancel, children: ACTION_CANCEL })] })] }) }));
        } }));
};
export default LeadStatusForm;
//# sourceMappingURL=LeadStatusForm.js.map