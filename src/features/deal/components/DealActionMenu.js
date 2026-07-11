import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal, Eye, Edit2, Phone, MessageSquare, Trash2 } from 'lucide-react';
const MENU_WIDTH = 200;
const MENU_HEIGHT = 260;
const GAP = 6;
const DealActionMenu = ({ isOpen, onToggle, onClose, row, onEdit, onDelete }) => {
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const [pos, setPos] = useState(null);
    const measure = useCallback(() => {
        const btn = buttonRef.current;
        if (!btn)
            return;
        const r = btn.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const spaceBelow = vh - r.bottom;
        const openUpward = spaceBelow < MENU_HEIGHT;
        let top;
        if (openUpward) {
            top = Math.max(GAP, r.top - MENU_HEIGHT - GAP);
        }
        else {
            top = r.bottom + GAP;
        }
        let left = r.right - MENU_WIDTH;
        if (left < GAP)
            left = GAP;
        if (left + MENU_WIDTH > vw - GAP)
            left = vw - MENU_WIDTH - GAP;
        setPos({ top, left, openUpward });
    }, []);
    useLayoutEffect(() => {
        if (isOpen) {
            measure();
        }
        else {
            setPos(null);
        }
    }, [isOpen, measure]);
    useEffect(() => {
        if (!isOpen)
            return;
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) &&
                buttonRef.current && !buttonRef.current.contains(e.target)) {
                onClose();
            }
        };
        const close = () => onClose();
        document.addEventListener('mousedown', handleClick);
        window.addEventListener('scroll', close, true);
        window.addEventListener('resize', close);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            window.removeEventListener('scroll', close, true);
            window.removeEventListener('resize', close);
        };
    }, [isOpen, onClose]);
    return (_jsxs(_Fragment, { children: [_jsx("button", { ref: buttonRef, className: "action-btn", type: "button", onClick: onToggle, children: _jsx(MoreHorizontal, { size: 16 }) }), isOpen && pos && createPortal(_jsxs("div", { ref: menuRef, className: `deal-action-dropdown${pos.openUpward ? ' upward' : ''}`, style: {
                    position: 'fixed',
                    top: pos.top,
                    left: pos.left,
                    width: MENU_WIDTH,
                    zIndex: 9999,
                }, children: [_jsxs("button", { type: "button", children: [_jsx(Eye, { size: 14 }), " View Deal"] }), _jsxs("button", { type: "button", onClick: () => { onEdit(row); onClose(); }, children: [_jsx(Edit2, { size: 14 }), " Edit Deal"] }), _jsxs("button", { type: "button", children: [_jsx(Phone, { size: 14 }), " WhatsApp"] }), _jsxs("button", { type: "button", children: [_jsx(MessageSquare, { size: 14 }), " Message"] }), _jsxs("button", { type: "button", className: "delete", onClick: () => { onDelete(row.id); onClose(); }, children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }), document.body)] }));
};
export default DealActionMenu;
//# sourceMappingURL=DealActionMenu.js.map