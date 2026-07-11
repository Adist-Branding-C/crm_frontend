import { jsx as _jsx } from "react/jsx-runtime";
const EmptyState = ({ colSpan, message }) => (_jsx("tr", { children: _jsx("td", { colSpan: colSpan, className: "dataTables_empty", children: message ?? 'No data available in table' }) }));
export default EmptyState;
//# sourceMappingURL=EmptyState.js.map