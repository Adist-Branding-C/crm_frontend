import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from 'react-router-dom';
import TaskPage from '../features/task/task/page/TaskPage';
import CallTaskPage from '../features/task/call-task/page/CallTaskPage';
import CampaignTaskPage from '../features/task/campaign-task/page/CampaignTaskPage';
import DealTaskPage from '../features/task/deal-task/page/DealTaskPage';
export default (_jsxs(_Fragment, { children: [_jsx(Route, { path: "user/tasks", element: _jsx(TaskPage, {}) }), _jsx(Route, { path: "user/tasks/call-tasks", element: _jsx(CallTaskPage, {}) }), _jsx(Route, { path: "user/tasks/campaign-tasks", element: _jsx(CampaignTaskPage, {}) }), _jsx(Route, { path: "user/tasks/deal-tasks", element: _jsx(DealTaskPage, {}) })] }));
//# sourceMappingURL=taskRoutes.js.map