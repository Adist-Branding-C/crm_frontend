import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
const TRow = forwardRef(({ children, ...props }, ref) => (_jsx("tr", { ref: ref, ...props, children: children })));
TRow.displayName = 'TRow';
export default TRow;
//# sourceMappingURL=TRow.js.map