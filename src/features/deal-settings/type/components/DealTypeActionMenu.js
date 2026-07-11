import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
const DealTypeActionMenu = ({ item, dropdownOpen, onToggle, onEdit, onDelete, }) => {
    const isOpen = dropdownOpen === item.id;
    return (_jsxs("div", { className: "dropdown-container", children: [_jsx("button", { className: "dropdown-toggle", onClick: () => onToggle(isOpen ? null : item.id), children: _jsx(MoreHorizontal, { size: 16 }) }), isOpen && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs("a", { className: "dropdown-item", onClick: () => { onEdit(item); onToggle(null); }, children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("a", { className: "dropdown-item", onClick: () => { onDelete(item); onToggle(null); }, children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }));
};
export default DealTypeActionMenu;
//# sourceMappingURL=DealTypeActionMenu.js.map