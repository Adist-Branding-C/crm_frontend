import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { ACTION_EDIT, ACTION_DELETE } from '../../constants/actionLabels';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../constants/labels';
function AdminTableInner(props) {
    const { data, columns, startIndex, dropdownOpen, onToggleDropdown, onEdit, onDelete, renderActions, emptyMessage } = props;
    const [dropdownStyle, setDropdownStyle] = useState(null);
    const portalRef = useRef(null);
    useEffect(() => {
        if (dropdownOpen === null) {
            setDropdownStyle(null);
            return;
        }
        const btn = document.querySelector(`[data-action-id="${dropdownOpen}"]`);
        if (!btn)
            return;
        const rect = btn.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const DROPDOWN_HEIGHT = 200;
        const openUp = spaceBelow < DROPDOWN_HEIGHT && spaceAbove > spaceBelow;
        setDropdownStyle({
            ...(openUp
                ? { bottom: window.innerHeight - rect.top + 8 }
                : { top: rect.bottom + 8 }),
            right: window.innerWidth - rect.right,
            openUp,
        });
    }, [dropdownOpen]);
    useEffect(() => {
        if (dropdownOpen === null)
            return;
        const handleClickOutside = (e) => {
            if (portalRef.current && !portalRef.current.contains(e.target)) {
                const target = e.target;
                if (!target.closest('[data-action-id]')) {
                    onToggleDropdown(null);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen, onToggleDropdown]);
    const openItem = dropdownOpen !== null ? data.find(item => item.id === dropdownOpen) ?? null : null;
    return (_jsxs("div", { className: "table-scroll", children: [_jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: LABEL_SL_NO }), columns.map(col => (_jsx("th", { children: col.label }, col.key))), _jsx("th", { children: LABEL_ACTIONS })] }) }), _jsx("tbody", { children: data.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + 2, className: "dataTables_empty", children: emptyMessage ?? LABEL_NO_DATA }) })) : (data.map((item, idx) => (_jsxs("tr", { children: [_jsx("td", { children: startIndex + idx + 1 }), columns.map(col => (_jsx("td", { className: col.className ?? '', children: col.render ? col.render(item) : String(item[col.key] ?? '') }, col.key))), _jsx("td", { children: renderActions ? (renderActions(item)) : (_jsx("div", { className: "action-menu-container", children: _jsx("button", { "data-action-id": item.id, className: `action-btn ${dropdownOpen === item.id ? 'active' : ''}`, onClick: () => onToggleDropdown(dropdownOpen === item.id ? null : item.id), children: _jsx(MoreHorizontal, { size: 16 }) }) })) })] }, item.id)))) })] }), dropdownStyle && openItem && createPortal(_jsxs("div", { ref: portalRef, className: `premium-dropdown action-dropdown-portal ${dropdownStyle.openUp ? 'dropup' : ''}`, style: { position: 'fixed', top: dropdownStyle.top, bottom: dropdownStyle.bottom, right: dropdownStyle.right }, children: [_jsxs("button", { className: "dropdown-item", onClick: () => { onEdit(openItem); onToggleDropdown(null); }, children: [_jsx(Edit2, { size: 14 }), " ", ACTION_EDIT] }), _jsxs("button", { className: "dropdown-item danger", onClick: () => { onDelete(openItem); onToggleDropdown(null); }, children: [_jsx(Trash2, { size: 14 }), " ", ACTION_DELETE] })] }), document.body)] }));
}
const AdminTable = React.memo(AdminTableInner);
export default AdminTable;
//# sourceMappingURL=AdminTable.js.map