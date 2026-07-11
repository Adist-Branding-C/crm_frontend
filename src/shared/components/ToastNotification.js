import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, X } from 'lucide-react';
const ToastNotification = ({ isVisible, type, message, onDismiss }) => {
    if (!isVisible)
        return null;
    return (_jsxs("div", { className: `toast-notification toast-${type}`, onClick: onDismiss, children: [type === 'success' ? _jsx(Check, { size: 18 }) : _jsx(X, { size: 18 }), _jsx("span", { children: message })] }));
};
export default ToastNotification;
//# sourceMappingURL=ToastNotification.js.map