import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
const AddWorkModeDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }) => {
    const drawerBodyRef = useRef(null);
    const prevSubmitCountRef = useRef(0);
    return (_jsx(DrawerShell, { isOpen: isOpen, title: isEditing ? 'Edit Work Mode' : 'Add Work Mode', onClose: onClose, bodyRef: drawerBodyRef, children: _jsx(Formik, { enableReinitialize: true, initialValues: initialValues, validationSchema: validationSchema, onSubmit: onSubmit, children: ({ errors, touched, dirty, submitCount, isSubmitting }) => {
                if (submitCount > prevSubmitCountRef.current) {
                    prevSubmitCountRef.current = submitCount;
                    if (Object.keys(errors).length > 0) {
                        requestAnimationFrame(() => scrollToFirstError(drawerBodyRef.current));
                    }
                }
                const formError = error;
                const showError = (field) => touched[field] || submitCount > 0;
                const fieldClass = (name) => `form-control${showError(name) && errors[name] ? ' input-error' : ''}`;
                return (_jsxs(Form, { noValidate: true, children: [formError && _jsx(ErrorMessage, { message: formError }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Work Mode Name ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "text", name: "workModeName", className: fieldClass('workModeName'), placeholder: "Enter work mode name" }), showError('workModeName') && errors.workModeName && _jsx("small", { className: "field-error-text", children: errors.workModeName })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Description" }), _jsx(Field, { as: "textarea", name: "description", className: fieldClass('description'), placeholder: "Enter description", rows: 4 }), showError('description') && errors.description && _jsx("small", { className: "field-error-text", children: errors.description })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Status ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs(Field, { as: "select", name: "status", className: fieldClass('status'), children: [_jsx("option", { value: "", children: "Select status" }), _jsx("option", { value: "Active", children: "Active" }), _jsx("option", { value: "Inactive", children: "Inactive" })] }), showError('status') && errors.status && _jsx("small", { className: "field-error-text", children: errors.status })] }), _jsxs("div", { className: "form-actions flex flex-col sm:flex-row gap-3", children: [_jsx("button", { type: "submit", className: "btn btn-primary", disabled: isLoading || isSubmitting || (isEditing && !dirty), children: isLoading || isSubmitting ? _jsx(Loader2, { size: 16, className: "spin" }) : (isEditing ? 'Update' : 'Save') }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: onClose, children: "Cancel" })] })] }));
            } }) }));
};
export default AddWorkModeDrawer;
//# sourceMappingURL=AddWorkModeDrawer.js.map