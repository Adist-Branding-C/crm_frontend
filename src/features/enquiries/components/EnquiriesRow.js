import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { TRow, TCell } from '../../../shared/components/table';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import { formatRelativeDate, formatFollowUpDate } from '../../../shared/utils/dateUtils';
import { badgeClass } from '../../../shared/utils/badgeUtils';
import { LABEL_NOT_ASSIGNED } from '../../../shared/constants/labels';
const LEAD_PROPERTY_KEYS = new Set([
    'name', 'phone', 'email', 'location', 'assignedTo', 'purpose', 'type',
    'status', 'source',
]);
const getCellContent = (row, colKey, onViewLead) => {
    if (colKey === 'name') {
        return { className: 'lead-name-cell', onClick: () => onViewLead(row), children: row.name };
    }
    if (colKey === 'type') {
        return { children: _jsx("span", { className: `badge badge-${badgeClass(row.type)}`, children: row.type }) };
    }
    if (colKey === 'status') {
        return { children: _jsx("span", { className: `badge badge-${badgeClass(row.status)}`, children: row.status }) };
    }
    if (colKey === 'createdAt' || colKey === 'updatedAt') {
        return { children: formatRelativeDate(row[colKey]) };
    }
    if (colKey === 'nextFollowUp') {
        return { children: formatFollowUpDate(row[colKey]) };
    }
    if (colKey === 'assignedTo') {
        return { children: row.assignedTo || LABEL_NOT_ASSIGNED };
    }
    if (LEAD_PROPERTY_KEYS.has(colKey)) {
        return { children: row[colKey] || '-' };
    }
    const af = row.additionalFields.find(f => f.name === colKey);
    return { children: af ? af.value : '-' };
};
const EnquiriesRow = ({ lead, columns, isSelected, onSelectRow, actionMenu, onViewLead, onDeleteLead }) => (_jsx(TRow, { className: isSelected ? 'selected' : '', children: columns.map(col => {
        if (col.key === 'checkbox') {
            return (_jsx(TCell, { children: _jsx("input", { type: "checkbox", checked: isSelected, onChange: () => onSelectRow(lead.leadId) }) }, col.key));
        }
        if (col.key === 'action') {
            return (_jsx(TCell, { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", onClick: (e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                if (actionMenu.isOpen) {
                                    actionMenu.onClose();
                                }
                                else {
                                    actionMenu.onOpen(lead.leadId, rect);
                                }
                            }, children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenu.isOpen && actionMenu.buttonRect && (_jsxs(ActionDropdownPortal, { isOpen: actionMenu.isOpen, buttonRect: actionMenu.buttonRect, onClose: actionMenu.onClose, children: [_jsxs("button", { onClick: () => { onDeleteLead(lead); actionMenu.onClose(); }, className: "delete", children: [_jsx(Trash2, { size: 14 }), " Delete"] }), _jsxs("button", { onClick: () => { onViewLead(lead); actionMenu.onClose(); }, className: "whatsapp", children: [_jsx(Eye, { size: 14 }), " View Details"] })] }))] }) }, col.key));
        }
        const cell = getCellContent(lead, col.key, onViewLead);
        return (_jsx(TCell, { className: cell.className, onClick: cell.onClick, style: cell.onClick ? { cursor: 'pointer' } : undefined, children: cell.children }, col.key));
    }) }));
export default React.memo(EnquiriesRow);
//# sourceMappingURL=EnquiriesRow.js.map