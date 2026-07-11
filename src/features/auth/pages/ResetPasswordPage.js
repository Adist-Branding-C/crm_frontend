import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useResetPasswordData } from '../hooks/useResetPasswordData';
import { useAuth } from '../hooks/useAuth';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import './ResetPassword.css';
const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const resetPasswordData = useResetPasswordData();
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    if (!resetPasswordData.token) {
        return _jsx(Navigate, { to: "/forgot-password", replace: true });
    }
    if (resetPasswordData.isSuccess) {
        return (_jsxs("div", { className: "auth-page", children: [_jsxs("div", { className: "auth-visual-panel", children: [_jsx("div", { className: "visual-content", children: _jsxs("div", { className: "visual-logo", children: [_jsx("div", { className: "logo-mark", children: "CRM" }), _jsx("span", { className: "logo-text", children: "Dashboard" })] }) }), _jsx("div", { className: "visual-pattern" })] }), _jsx("div", { className: "auth-form-panel", children: _jsxs("div", { className: "auth-card", children: [_jsx("div", { className: "success-animation", children: _jsx(CheckCircle, { size: 48 }) }), _jsx("h1", { children: "Password Reset" }), _jsx("p", { children: "Your password has been reset successfully." }), _jsxs("button", { className: "login-link-btn", onClick: () => navigate('/login'), children: [_jsx("span", { children: "Go to Sign In" }), _jsx(ArrowRight, { size: 18 })] })] }) })] }));
    }
    return (_jsxs("div", { className: "auth-page", children: [_jsxs("div", { className: "auth-visual-panel", children: [_jsxs("div", { className: "visual-content", children: [_jsxs("div", { className: "visual-logo", children: [_jsx("div", { className: "logo-mark", children: "CRM" }), _jsx("span", { className: "logo-text", children: "Dashboard" })] }), _jsxs("div", { className: "visual-message", children: [_jsx("h2", { children: "Create New Password" }), _jsx("p", { children: "Enter a strong password to secure your account." })] })] }), _jsx("div", { className: "visual-pattern" })] }), _jsx("div", { className: "auth-form-panel", children: _jsxs("div", { className: "auth-card", children: [_jsxs("div", { className: "auth-header", children: [_jsx("h1", { children: "Create New Password" }), _jsx("p", { children: "Your new password must be different from previous passwords" })] }), _jsx(Formik, { initialValues: resetPasswordData.initialValues, validationSchema: resetPasswordData.validationSchema, onSubmit: resetPasswordData.handleSubmit, children: ({ errors, touched, submitCount }) => {
                                const formError = resetPasswordData.error || (submitCount > 0 ? Object.values(errors)[0] : '');
                                return (_jsxs(Form, { className: "auth-form", children: [formError && _jsx(ErrorMessage, { message: formError }), _jsxs("div", { className: "auth-form-group", children: [_jsx("label", { htmlFor: "password", children: "New Password" }), _jsxs("div", { className: "input-wrapper", children: [_jsx(Lock, { size: 18, className: "input-icon" }), _jsx(Field, { id: "password", name: "password", type: resetPasswordData.showPassword ? 'text' : 'password', placeholder: "Enter new password", className: "form-input" }), _jsx("button", { type: "button", className: "password-toggle", onClick: () => resetPasswordData.setShowPassword(!resetPasswordData.showPassword), "aria-label": resetPasswordData.showPassword ? 'Hide password' : 'Show password', children: resetPasswordData.showPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] })] }), _jsxs("div", { className: "auth-form-group", children: [_jsx("label", { htmlFor: "confirmPassword", children: "Confirm Password" }), _jsxs("div", { className: "input-wrapper", children: [_jsx(Lock, { size: 18, className: "input-icon" }), _jsx(Field, { id: "confirmPassword", name: "confirmPassword", type: resetPasswordData.showConfirmPassword ? 'text' : 'password', placeholder: "Confirm new password", className: "form-input" }), _jsx("button", { type: "button", className: "password-toggle", onClick: () => resetPasswordData.setShowConfirmPassword(!resetPasswordData.showConfirmPassword), "aria-label": resetPasswordData.showConfirmPassword ? 'Hide password' : 'Show password', children: resetPasswordData.showConfirmPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] })] }), _jsx("button", { type: "submit", className: "auth-btn", disabled: resetPasswordData.isLoading, children: resetPasswordData.isLoading ? (_jsx(Loader2, { size: 18, className: "spin" })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: "Reset Password" }), _jsx(ArrowRight, { size: 18 })] })) })] }));
                            } })] }) })] }));
};
export default ResetPasswordPage;
//# sourceMappingURL=ResetPasswordPage.js.map