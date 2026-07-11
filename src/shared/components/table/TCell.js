import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
const TCell = forwardRef(({ variant = 'td', scope, children, ...props }, ref) => {
    if (variant === 'th') {
        return (_jsx("th", { ref: ref, scope: scope, ...props, children: children }));
    }
    return (_jsx("td", { ref: ref, ...props, children: children }));
});
TCell.displayName = 'TCell';
export default TCell;
//# sourceMappingURL=TCell.js.map