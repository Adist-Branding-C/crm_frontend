import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
const Table = forwardRef(({ wrapperClassName, className, children, ...props }, ref) => (_jsx("div", { className: wrapperClassName, children: _jsx("table", { ref: ref, className: className, ...props, children: children }) })));
Table.displayName = 'Table';
export default Table;
//# sourceMappingURL=Table.js.map