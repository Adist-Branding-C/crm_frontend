import { jsx as _jsx } from "react/jsx-runtime";
const TableHeader = ({ columns }) => (_jsx("thead", { children: _jsx("tr", { children: columns.map((col, i) => (_jsx("th", { className: col.className, style: col.width ? { width: col.width } : undefined, children: col.header }, i))) }) }));
export default TableHeader;
//# sourceMappingURL=TableHeader.js.map