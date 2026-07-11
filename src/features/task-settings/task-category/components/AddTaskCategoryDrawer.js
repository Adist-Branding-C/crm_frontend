import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../utils/scrollToFirstError';
const AddTaskCategoryDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }) => {
    const drawerBodyRef = useRef(null);
    const prevSubmitCountRef = useRef(0);
    useEffect(() => {
        if (error) {
            drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [error]);
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: "Add Task Category" }), _jsx("button", { className: "drawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", ref: drawerBodyRef, children: _jsx(Formik, { enableReinitialize: true, initialValues: initialValues, validationSchema: validationSchema, onSubmit: onSubmit, children: ({ errors, touched, dirty, submitCount, isSubmitting }) => {
                            if (submitCount > prevSubmitCountRef.current) {
                                prevSubmitCountRef.current = submitCount;
                                if (Object.keys(errors).length > 0) {
                                    requestAnimationFrame(() => scrollToFirstError(drawerBodyRef.current));
                                }
                            }
                            const fieldClass = (name) => `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;
                            return (_jsxs(Form, { children: [error && _jsx(ErrorMessage, { message: error }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Category ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "text", name: "category", className: fieldClass('category'), placeholder: "Enter category" }), _jsx(FormikError, { name: "category", component: "small", className: "field-error-text" })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Action ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "text", name: "action", className: fieldClass('action'), placeholder: "Enter action" }), _jsx(FormikError, { name: "action", component: "small", className: "field-error-text" })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", disabled: isLoading || isSubmitting || (isEditing && !dirty), children: isLoading || isSubmitting ? _jsx(Loader2, { size: 16, className: "spin" }) : 'Save' }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: onClose, children: "Cancel" })] })] }));
                        } }) })] }) }));
};
export default AddTaskCategoryDrawer;
//# sourceMappingURL=AddTaskCategoryDrawer.js.map