import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ACTION_CANCEL, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
const ClearConfirmModal = ({ isOpen, onConfirm, onClose }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsx("div", { className: "modal-content confirm-modal", onClick: e => e.stopPropagation(), children: _jsxs("div", { className: "modal-body", children: [_jsx("p", { children: "Are you sure you want to clear all filters?" }), _jsxs("div", { className: "modal-actions", children: [_jsx("button", { className: "btn btn-secondary", onClick: onClose, children: ACTION_CANCEL }), _jsx("button", { className: "btn btn-primary", onClick: onConfirm, children: ACTION_CLEAR })] })] }) }) }));
};
export default ClearConfirmModal;
//# sourceMappingURL=ClearConfirmModal.js.map