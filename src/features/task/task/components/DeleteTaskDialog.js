import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
const DeleteTaskDialog = ({ isOpen, itemName, onConfirm, onClose }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), style: { maxWidth: '450px' }, children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: "Confirm Delete" }), _jsx("button", { className: "modal-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "modal-body", children: _jsxs("p", { className: "delete-warning", children: ["Are you sure you want to delete ", _jsx("strong", { children: itemName }), "? This action cannot be undone."] }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-danger", onClick: onConfirm, children: "Delete" }), _jsx("button", { className: "btn btn-secondary", onClick: onClose, children: "Cancel" })] })] }) }));
};
export default DeleteTaskDialog;
//# sourceMappingURL=DeleteTaskDialog.js.map