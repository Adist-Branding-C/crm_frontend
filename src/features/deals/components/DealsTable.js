import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronUp, ChevronDown, MoreHorizontal, Eye, Edit2, Trash2, Phone, MessageSquare } from 'lucide-react';
import { DEAL_STATUS_LABEL_MAP, DEAL_TYPE_LABEL_MAP } from '../../../shared/constants/dealOptions';
const getStatusBadge = (status) => {
    const colorMap = { won: '#10b981', lost: '#ef4444', pending: '#f59e0b', 'in-progress': '#3b82f6' };
    const color = colorMap[status.toLowerCase()] || '#6b7280';
    const label = DEAL_STATUS_LABEL_MAP[status] || status;
    return _jsx("span", { className: "status-badge", style: { background: `${color}20`, color }, children: label });
};
const getTypeBadge = (type) => {
    const colorMap = { 'new': '#8b5cf6', 'renewal': '#3b82f6', 'upgrade': '#10b981' };
    const color = colorMap[type.toLowerCase()] || '#6b7280';
    const label = DEAL_TYPE_LABEL_MAP[type] || type;
    return _jsx("span", { className: "type-badge", style: { background: `${color}20`, color }, children: label });
};
const DealsTable = ({ data, columns, sortConfig, onSort, paginatedIds, selectedIds, onSelectAll, onSelectRow, actionMenuOpen, onSetActionMenuOpen, onEdit, onDelete, }) => {
    return (_jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => onSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: data.length > 0 && selectedIds.length === data.length, onChange: (e) => onSelectAll(paginatedIds, e.target.checked) })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronUp, { size: 14 }) : _jsx(ChevronDown, { size: 14 }))] })) }, col.key))) }) }), _jsx("tbody", { children: data.map(row => (_jsxs("tr", { className: selectedIds.includes(row.id) ? 'selected' : '', children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedIds.includes(row.id), onChange: () => onSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", onClick: () => onSetActionMenuOpen(actionMenuOpen === row.id ? null : row.id), children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsxs("div", { className: "action-dropdown", children: [_jsxs("button", { children: [_jsx(Eye, { size: 14 }), " View Deal"] }), _jsxs("button", { onClick: () => onEdit(row), children: [_jsx(Edit2, { size: 14 }), " Edit Deal"] }), _jsxs("button", { children: [_jsx(Phone, { size: 14 }), " WhatsApp"] }), _jsxs("button", { children: [_jsx(MessageSquare, { size: 14 }), " Message"] }), _jsxs("button", { onClick: () => onDelete(row.id), className: "delete", children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) }), _jsx("td", { children: row.dealId }), _jsx("td", { className: "lead-name-cell", children: row.dealName }), _jsx("td", { children: row.lead }), _jsx("td", { children: row.mobile }), _jsxs("td", { children: ["\u20B9", Number(row.amount).toLocaleString()] }), _jsx("td", { children: getStatusBadge(row.status) }), _jsx("td", { children: getTypeBadge(row.type) }), _jsx("td", { children: row.startDate }), _jsx("td", { children: row.endDate }), _jsx("td", { children: row.agent }), _jsx("td", { children: row.createdBy }), _jsx("td", { children: row.createdAt })] }, row.id))) })] }) }));
};
export default DealsTable;
//# sourceMappingURL=DealsTable.js.map