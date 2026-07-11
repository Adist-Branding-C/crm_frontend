import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from 'react-router-dom';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import SpotlightPage from '../features/spotlight/pages/SpotlightPage';
import CalendarPage from '../features/calendar/pages/CalendarPage';
import DailyActivityPage from '../features/daily-activity/pages/DailyActivityPage';
import SetupPage from '../features/setup/pages/SetupPage';
import StaffPerformancePage from '../features/staff-performance/pages/StaffPerformancePage';
export default (_jsxs(_Fragment, { children: [_jsx(Route, { path: "dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "spotlight", element: _jsx(SpotlightPage, {}) }), _jsx(Route, { path: "calendar", element: _jsx(CalendarPage, {}) }), _jsx(Route, { path: "daily-activity", element: _jsx(DailyActivityPage, {}) }), _jsx(Route, { path: "setup", element: _jsx(SetupPage, {}) }), _jsx(Route, { path: "staff-performance", element: _jsx(StaffPerformancePage, {}) }), _jsx(Route, { path: "staff-performance/:id", element: _jsx(StaffPerformancePage, {}) })] }));
//# sourceMappingURL=dashboardRoutes.js.map