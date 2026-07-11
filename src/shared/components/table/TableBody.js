import { jsx as _jsx } from "react/jsx-runtime";
import EmptyState from './EmptyState';
const TableBody = ({ columns, data, startIndex, keyExtractor, emptyMessage }) => (_jsx("tbody", { children: data.length === 0 ? (_jsx(EmptyState, { colSpan: columns.length, ...(emptyMessage ? { message: emptyMessage } : {}) })) : (data.map((row, index) => (_jsx("tr", { children: columns.map((col, i) => (_jsx("td", { className: col.className, children: col.render
                ? col.render(row)
                : col.accessor
                    ? String(row[col.accessor] ?? '-')
                    : i === 0
                        ? startIndex + index + 1
                        : '-' }, i))) }, keyExtractor(row))))) }));
export default TableBody;
//# sourceMappingURL=TableBody.js.map