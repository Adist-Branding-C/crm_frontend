import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';
import { AUTH_ROUTES } from '../features/auth/constants/auth.constants';
export default (_jsxs(_Fragment, { children: [_jsx(Route, { path: AUTH_ROUTES.LOGIN, element: _jsx(LoginPage, {}) }), _jsx(Route, { path: AUTH_ROUTES.FORGOT_PASSWORD, element: _jsx(ForgotPasswordPage, {}) }), _jsx(Route, { path: AUTH_ROUTES.RESET_PASSWORD, element: _jsx(ResetPasswordPage, {}) })] }));
//# sourceMappingURL=authRoutes.js.map