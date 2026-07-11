import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Phone, ArrowLeft, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useForgotPasswordData } from '../hooks/useForgotPasswordData';
import { useAuth } from '../hooks/useAuth';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import './ForgotPassword.css';
const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const forgotPasswordData = useForgotPasswordData();
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    if (forgotPasswordData.isSent) {
        return (_jsxs("div", { className: "auth-page", children: [_jsxs("div", { className: "auth-visual-panel", children: [_jsx("div", { className: "visual-content", children: _jsxs("div", { className: "visual-logo", children: [_jsx("div", { className: "logo-mark", children: "CRM" }), _jsx("span", { className: "logo-text", children: "Dashboard" })] }) }), _jsx("div", { className: "visual-pattern" })] }), _jsx("div", { className: "auth-form-panel", children: _jsxs("div", { className: "auth-card", children: [_jsx("div", { className: "success-animation", children: _jsx(CheckCircle, { size: 48 }) }), _jsx("h1", { children: "Check Your Email" }), _jsx("p", { children: "If an account exists for phone number" }), _jsx("p", { className: "phone-highlight", children: forgotPasswordData.submittedPhone }), _jsx("p", { children: "a password reset link has been sent to the registered email address." }), _jsxs("p", { className: "resend-text", children: ["Didn't receive?", ' ', _jsx("button", { type: "button", className: "resend-link", onClick: () => forgotPasswordData.setIsSent(false), children: "Resend" })] }), _jsxs("button", { className: "auth-back-btn", onClick: () => navigate('/login'), children: [_jsx(ArrowLeft, { size: 18 }), _jsx("span", { children: "Back to Sign In" })] })] }) })] }));
    }
    return (_jsxs("div", { className: "auth-page", children: [_jsxs("div", { className: "auth-visual-panel", children: [_jsxs("div", { className: "visual-content", children: [_jsxs("div", { className: "visual-logo", children: [_jsx("div", { className: "logo-mark", children: "CRM" }), _jsx("span", { className: "logo-text", children: "Dashboard" })] }), _jsxs("div", { className: "visual-message", children: [_jsx("h2", { children: "Reset Your Password" }), _jsx("p", { children: "No worries, we'll send you a link to reset your password." })] })] }), _jsx("div", { className: "visual-pattern" })] }), _jsx("div", { className: "auth-form-panel", children: _jsxs("div", { className: "auth-card", children: [_jsxs("button", { className: "auth-back-link", onClick: () => navigate('/login'), children: [_jsx(ArrowLeft, { size: 18 }), _jsx("span", { children: "Back" })] }), _jsxs("div", { className: "auth-header", children: [_jsx("h1", { children: "Forgot Password?" }), _jsx("p", { children: "Enter your phone number to receive a reset link" })] }), _jsx(Formik, { initialValues: forgotPasswordData.initialValues, validationSchema: forgotPasswordData.validationSchema, onSubmit: forgotPasswordData.handleSubmit, children: ({ errors, touched, submitCount }) => {
                                const formError = forgotPasswordData.error || (submitCount > 0 ? Object.values(errors)[0] : '');
                                return (_jsxs(Form, { className: "auth-form", children: [formError && _jsx(ErrorMessage, { message: formError }), _jsxs("div", { className: "auth-form-group", children: [_jsx("label", { htmlFor: "phone", children: "Phone Number" }), _jsxs("div", { className: "input-wrapper-with-icon", children: [_jsx("span", { className: "input-icon-left", children: _jsx(Phone, { size: 18 }) }), _jsx(Field, { id: "phone", name: "phone", type: "tel", placeholder: "Enter your phone number", className: "form-input" })] })] }), _jsx("button", { type: "submit", className: "auth-btn", disabled: forgotPasswordData.isLoading, children: forgotPasswordData.isLoading ? (_jsx(Loader2, { size: 18, className: "spin" })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: "Send Reset Link" }), _jsx(ArrowRight, { size: 18 })] })) })] }));
                            } })] }) })] }));
};
export default ForgotPasswordPage;
//# sourceMappingURL=ForgotPasswordPage.js.map