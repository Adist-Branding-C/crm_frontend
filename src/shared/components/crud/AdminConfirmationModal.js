import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { ACTION_CONFIRM, ACTION_CANCEL } from '../../constants/actionLabels';
const AdminConfirmationModal = React.memo(({ isOpen, title, message, confirmText, cancelText, confirmButtonVariant, isLoading, onConfirm, onCancel }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "modal-overlay", onClick: onCancel, children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: title }), _jsx("button", { className: "modal-close", onClick: onCancel, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "modal-body", children: _jsx("p", { children: message }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: `btn btn-${confirmButtonVariant ?? 'primary'}`, onClick: onConfirm, disabled: isLoading, children: isLoading ? _jsxs(_Fragment, { children: [_jsx(Loader2, { size: 16, className: "spin" }), " ", confirmText ?? ACTION_CONFIRM, "..."] }) : (confirmText ?? ACTION_CONFIRM) }), _jsx("button", { className: "btn btn-secondary", onClick: onCancel, children: cancelText ?? ACTION_CANCEL })] })] }) }));
});
AdminConfirmationModal.displayName = 'AdminConfirmationModal';
export default AdminConfirmationModal;
//# sourceMappingURL=AdminConfirmationModal.js.map