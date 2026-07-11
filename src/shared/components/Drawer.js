import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { X } from 'lucide-react';
const Drawer = forwardRef(({ isOpen, onClose, title, children }, bodyRef) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: title }), _jsx("button", { className: "drawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", ref: bodyRef, children: children })] }) }));
});
Drawer.displayName = 'Drawer';
export default Drawer;
//# sourceMappingURL=Drawer.js.map