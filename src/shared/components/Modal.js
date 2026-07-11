import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
const Modal = ({ isOpen, onClose, title, children, maxWidth }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), style: maxWidth ? { maxWidth } : undefined, children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: title }), _jsx("button", { className: "modal-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), children] }) }));
};
export default Modal;
//# sourceMappingURL=Modal.js.map