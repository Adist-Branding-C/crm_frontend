import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { sanitizePhoneDigits } from '../../../../shared/utils/phone.util';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
const AddAgentDrawer = ({ visibility, form, status, designation }) => {
    const { isOpen, onClose } = visibility;
    const { validationSchema, initialValues, onSubmit, isEditing } = form;
    const { isLoading, error } = status;
    const { options: designationOptions, onFetch: onFetchDesignations } = designation;
    const drawerBodyRef = useRef(null);
    const prevSubmitCountRef = useRef(0);
    useEffect(() => {
        if (isOpen) {
            onFetchDesignations();
        }
    }, [isOpen, onFetchDesignations]);
    useEffect(() => {
        if (error) {
            drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [error]);
    return (_jsx(DrawerShell, { isOpen: isOpen, title: isEditing ? 'Edit Staff' : 'Add Staff', onClose: onClose, bodyRef: drawerBodyRef, children: _jsx(Formik, { enableReinitialize: true, initialValues: initialValues, validationSchema: validationSchema, onSubmit: onSubmit, children: ({ errors, touched, dirty, submitCount, isSubmitting, setFieldValue, setFieldTouched }) => {
                if (submitCount > prevSubmitCountRef.current) {
                    prevSubmitCountRef.current = submitCount;
                    if (Object.keys(errors).length > 0) {
                        requestAnimationFrame(() => scrollToFirstError(drawerBodyRef.current));
                    }
                }
                const formError = error;
                const showError = (field) => touched[field] || submitCount > 0;
                const fieldClass = (name) => `form-control${showError(name) && errors[name] ? ' input-error' : ''}`;
                return (_jsxs(Form, { noValidate: true, children: [formError && _jsx(ErrorMessage, { message: formError }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Name ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "text", name: "fullName", className: fieldClass('fullName'), placeholder: "Enter name" }), showError('fullName') && errors.fullName && _jsx("small", { className: "field-error-text", children: errors.fullName })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Phone Number ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { name: "phone", children: ({ field }) => (_jsx("input", { ...field, type: "text", maxLength: 10, className: fieldClass('phone'), placeholder: "Enter phone number", onChange: (e) => {
                                            const sanitized = sanitizePhoneDigits(e.target.value);
                                            setFieldValue('phone', sanitized);
                                        }, onBlur: (e) => {
                                            const sanitized = sanitizePhoneDigits(e.target.value);
                                            setFieldValue('phone', sanitized);
                                            setFieldTouched('phone', true);
                                        } })) }), showError('phone') && errors.phone && _jsx("small", { className: "field-error-text", children: errors.phone })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Email ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { name: "email", children: ({ field }) => (_jsx("input", { ...field, type: "email", className: fieldClass('email'), placeholder: "Enter email", onChange: (e) => {
                                            setFieldValue('email', e.target.value.trimStart());
                                        }, onBlur: (e) => {
                                            setFieldValue('email', e.target.value.trim());
                                            setFieldTouched('email', true);
                                        } })) }), showError('email') && errors.email && _jsx("small", { className: "field-error-text", children: errors.email })] }), !isEditing && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Password ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "password", name: "password", className: fieldClass('password'), placeholder: "Enter password" }), showError('password') && errors.password && _jsx("small", { className: "field-error-text", children: errors.password })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Confirm Password ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx(Field, { type: "password", name: "confirmPassword", className: fieldClass('confirmPassword'), placeholder: "Enter confirm password" }), showError('confirmPassword') && errors.confirmPassword && _jsx("small", { className: "field-error-text", children: errors.confirmPassword })] })] })), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Designation ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs(Field, { as: "select", name: "designationId", className: fieldClass('designationId'), children: [_jsx("option", { value: "", children: "Select designation" }), designationOptions.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value)))] }), showError('designationId') && errors.designationId && _jsx("small", { className: "field-error-text", children: errors.designationId })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Status ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs(Field, { as: "select", name: "status", className: fieldClass('status'), children: [_jsx("option", { value: "", children: "Select status" }), _jsx("option", { value: "Active", children: "Active" }), _jsx("option", { value: "Inactive", children: "Inactive" })] }), showError('status') && errors.status && _jsx("small", { className: "field-error-text", children: errors.status })] }), _jsxs("div", { className: "form-actions flex flex-col sm:flex-row gap-3", children: [_jsx("button", { type: "submit", className: "btn btn-primary", disabled: isLoading || isSubmitting || (isEditing && !dirty), children: isLoading || isSubmitting ? _jsx(Loader2, { size: 16, className: "spin" }) : 'Save' }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: onClose, children: "Cancel" })] })] }));
            } }) }));
};
export default AddAgentDrawer;
//# sourceMappingURL=AddAgentDrawer.js.map