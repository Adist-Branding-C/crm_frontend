import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { ACTION_EDIT, ACTION_DELETE } from '../../constants/actionLabels';
const DROPDOWN_HEIGHT = 200;
const RowActionsMenu = ({ isOpen, onToggle, onEdit, onDelete }) => {
    const buttonRef = useRef(null);
    const portalRef = useRef(null);
    const [style, setStyle] = useState(null);
    useEffect(() => {
        if (!isOpen || !buttonRef.current) {
            setStyle(null);
            return;
        }
        const rect = buttonRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const openUp = spaceBelow < DROPDOWN_HEIGHT && spaceAbove > spaceBelow;
        setStyle({
            top: openUp ? undefined : rect.bottom + 8,
            bottom: openUp ? window.innerHeight - rect.top + 8 : undefined,
            right: window.innerWidth - rect.right,
            openUp,
        });
    }, [isOpen]);
    useEffect(() => {
        if (!isOpen)
            return;
        const handleClickOutside = (e) => {
            const target = e.target;
            if (portalRef.current?.contains(target) || buttonRef.current?.contains(target))
                return;
            onToggle(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onToggle]);
    return (_jsxs("div", { className: "action-menu-container", children: [_jsx("button", { ref: buttonRef, className: `action-btn ${isOpen ? 'active' : ''}`, onClick: () => onToggle(!isOpen), children: _jsx(MoreHorizontal, { size: 16 }) }), isOpen && style && createPortal(_jsxs("div", { ref: portalRef, className: `premium-dropdown action-dropdown-portal ${style.openUp ? 'dropup' : ''}`, style: { position: 'fixed', top: style.top, bottom: style.bottom, right: style.right }, children: [_jsxs("button", { className: "dropdown-item", onClick: () => { onEdit(); onToggle(false); }, children: [_jsx(Edit2, { size: 14 }), " ", ACTION_EDIT] }), _jsxs("button", { className: "dropdown-item danger", onClick: () => { onDelete(); onToggle(false); }, children: [_jsx(Trash2, { size: 14 }), " ", ACTION_DELETE] })] }), document.body)] }));
};
export default RowActionsMenu;
//# sourceMappingURL=RowActionsMenu.js.map