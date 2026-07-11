import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
const scrollToFirstError = (container) => {
    if (!container)
        return;
    const errorEl = container.querySelector('.input-error');
    if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorEl.focus();
    }
};
const AddCheckoutNoteDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }) => {
    const drawerBodyRef = useRef(null);
    const prevSubmitCountRef = useRef(0);
    useEffect(() => {
        if (error) {
            drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [error]);
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: isEditing ? 'Edit Checkout Note' : 'Add Checkout Note' }), _jsx("button", { className: "drawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", ref: drawerBodyRef, children: _jsx(Formik, { enableReinitialize: true, initialValues: initialValues, validationSchema: validationSchema, onSubmit: onSubmit, children: ({ errors, touched, dirty, submitCount, isSubmitting }) => {
                            if (submitCount > prevSubmitCountRef.current) {
                                prevSubmitCountRef.current = submitCount;
                                if (Object.keys(errors).length > 0) {
                                    requestAnimationFrame(() => scrollToFirstError(drawerBodyRef.current));
                                }
                            }
                            const formError = error;
                            const showError = (field) => touched[field] || submitCount > 0;
                            const fieldClass = (name) => `form-control${showError(name) && errors[name] ? ' input-error' : ''}`;
                            return (_jsxs(Form, { children: [formError && _jsx(ErrorMessage, { message: formError }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Title ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "text", name: "title", className: fieldClass('title'), placeholder: "Enter title" }), showError('title') && errors.title && _jsx("small", { className: "field-error-text", children: errors.title })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Note ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { as: "textarea", name: "note", className: fieldClass('note'), placeholder: "Enter checkout note", rows: 4 }), showError('note') && errors.note && _jsx("small", { className: "field-error-text", children: errors.note })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Status ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs(Field, { as: "select", name: "status", className: fieldClass('status'), children: [_jsx("option", { value: "", children: "Select status" }), _jsx("option", { value: "Active", children: "Active" }), _jsx("option", { value: "Inactive", children: "Inactive" })] }), showError('status') && errors.status && _jsx("small", { className: "field-error-text", children: errors.status })] }), _jsxs("div", { className: "form-actions flex flex-col sm:flex-row gap-3", children: [_jsx("button", { type: "submit", className: "btn btn-primary", disabled: isLoading || isSubmitting || (isEditing && !dirty), children: isLoading || isSubmitting ? _jsx(Loader2, { size: 16, className: "spin" }) : (isEditing ? 'Update' : 'Save') }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: onClose, children: "Cancel" })] })] }));
                        } }) })] }) }));
};
export default AddCheckoutNoteDrawer;
//# sourceMappingURL=AddCheckoutNoteDrawer.js.map