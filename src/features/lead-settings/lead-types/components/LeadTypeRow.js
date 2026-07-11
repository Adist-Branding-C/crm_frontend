import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TRow, TCell, RowActionsMenu } from '../../../../shared/components/table';
const LeadTypeRow = ({ item, index, isMenuOpen, onToggleMenu, onEdit, onDelete }) => (_jsxs(TRow, { children: [_jsx(TCell, { children: index + 1 }), _jsx(TCell, { children: item.addedBy }), _jsx(TCell, { children: item.type }), _jsx(TCell, { children: _jsx(RowActionsMenu, { isOpen: isMenuOpen, onToggle: onToggleMenu, onEdit: () => onEdit(item), onDelete: () => onDelete(item) }) })] }));
export default LeadTypeRow;
//# sourceMappingURL=LeadTypeRow.js.map