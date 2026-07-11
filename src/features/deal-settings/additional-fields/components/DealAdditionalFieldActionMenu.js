import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
const DROPDOWN_HEIGHT = 100;
const DealAdditionalFieldActionMenu = ({ item, dropdownOpen, onToggle, dropdownDirection, onDirectionChange, onEdit, onDelete, }) => {
    const key = `add_${item.id}`;
    const isOpen = dropdownOpen === key;
    return (_jsxs("div", { className: "dropdown-container", children: [_jsx("button", { className: "dropdown-toggle", onClick: (e) => {
                    if (isOpen) {
                        onToggle(null);
                    }
                    else {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const spaceBelow = window.innerHeight - rect.bottom;
                        onDirectionChange(spaceBelow < DROPDOWN_HEIGHT ? 'up' : 'down');
                        onToggle(key);
                    }
                }, children: _jsx(MoreHorizontal, { size: 16 }) }), isOpen && (_jsxs("div", { className: `dropdown-menu ${dropdownDirection === 'up' ? 'dropup' : ''}`, children: [_jsxs("a", { className: "dropdown-item", onClick: () => { onEdit(item); onToggle(null); }, children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("a", { className: "dropdown-item", onClick: () => { onDelete(item); onToggle(null); }, children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }));
};
export default DealAdditionalFieldActionMenu;
//# sourceMappingURL=DealAdditionalFieldActionMenu.js.map