import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import ActionMenuPortal from '../../components/ActionMenuPortal';
const CallStatusActions = ({ item, dropdownOpen, onToggleDropdown, onEdit, onDelete }) => {
    const buttonRef = useRef(null);
    return (_jsxs("div", { className: "dropdown-container", children: [_jsx("button", { ref: buttonRef, className: "dropdown-toggle", onClick: () => onToggleDropdown(dropdownOpen === item.id ? null : item.id), children: _jsx(MoreHorizontal, { size: 16 }) }), _jsxs(ActionMenuPortal, { isOpen: dropdownOpen === item.id, triggerRef: buttonRef, onClose: () => onToggleDropdown(null), children: [_jsxs("button", { onClick: () => onEdit(item), children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("button", { className: "delete", onClick: () => onDelete(item), children: [_jsx(Trash2, { size: 14 }), " Delete"] })] })] }));
};
export default CallStatusActions;
//# sourceMappingURL=CallStatusActions.js.map