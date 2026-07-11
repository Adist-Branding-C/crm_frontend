import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { taskReportOptions } from '../constants';
const TaskReportsLanding = () => (_jsx("div", { className: "report-content-wrapper with-sidebar", children: _jsx("div", { className: "lead-reports-list", children: taskReportOptions.map((report) => (_jsxs(Link, { to: report.path, className: "lead-report-card", children: [_jsxs("div", { className: "lead-report-card-content", children: [_jsx("span", { className: "lead-report-title", children: report.title }), report.description && _jsx("span", { className: "lead-report-desc", children: report.description })] }), _jsx(ChevronRight, { size: 18, className: "report-card-arrow" })] }, report.id))) }) }));
export default TaskReportsLanding;
//# sourceMappingURL=TaskReportsLanding.js.map