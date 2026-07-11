import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../shared/components/layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import leadRoutes from './leadRoutes';
import settingsRoutes from './settingsRoutes';
import adminRoutes from './adminRoutes';
import salesRoutes from './salesRoutes';
import reportsRoutes from './reportsRoutes';
import taskRoutes from './taskRoutes';
const AppRoutes = () => (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [authRoutes, _jsxs(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(DashboardLayout, {}) }), children: [dashboardRoutes, leadRoutes, settingsRoutes, adminRoutes, salesRoutes, reportsRoutes, taskRoutes] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/login", replace: true }) })] }) }));
export default AppRoutes;
//# sourceMappingURL=index.js.map