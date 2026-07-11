import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TRow, TCell, RowActionsMenu } from '../../../../shared/components/table';
const LeadSourceRow = ({ item, index, isMenuOpen, onToggleMenu, onEdit, onDelete }) => (_jsxs(TRow, { children: [_jsx(TCell, { children: index + 1 }), _jsx(TCell, { children: item.addedBy }), _jsx(TCell, { className: "truncate-cell", children: _jsx("span", { title: item.source, children: item.source }) }), _jsx(TCell, { children: _jsx(RowActionsMenu, { isOpen: isMenuOpen, onToggle: onToggleMenu, onEdit: () => onEdit(item), onDelete: () => onDelete(item) }) })] }));
export default LeadSourceRow;
//# sourceMappingURL=LeadSourceRow.js.map