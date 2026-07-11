import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { ChevronDown, MoreHorizontal, Download, RotateCcw, Users, Copy, Trash2 } from 'lucide-react';
import Dropdown from '../../../shared/components/Dropdown';
import { useDropdownState } from '../../../shared/hooks/useDropdownState';
/**
 * Self-contained "Actions" (bulk-selection) toolbar dropdown - owns its own
 * open/close state, only takes the selection count + bulk-action callbacks.
 *
 * Used by:
 * - EnquiriesPage (composed directly as a TableNav child)
 */
const LeadActionsDropdown = ({ selectedCount, bulkActions }) => {
    const dropdown = useDropdownState();
    return (_jsxs(Dropdown, { isOpen: dropdown.isOpen, isClosing: dropdown.isClosing, dropdownRef: dropdown.ref, panelClassName: "actions-dropdown", trigger: _jsxs("button", { className: `btn btn-secondary ${dropdown.isOpen ? 'active' : ''}`, onClick: (e) => { e.stopPropagation(); dropdown.toggle(); }, children: [_jsx(MoreHorizontal, { size: 16 }), " Actions ", selectedCount > 0 && _jsx("span", { className: "selected-count-badge", children: selectedCount }), " ", _jsx(ChevronDown, { size: 14, className: dropdown.isOpen ? 'rotate' : '' })] }), children: [_jsxs("div", { className: "dropdown-header", children: ["Actions ", selectedCount > 0 && `(${selectedCount} selected)`] }), _jsxs("button", { className: "dropdown-item", onClick: () => { bulkActions.onExportSelected(); dropdown.close(); }, children: [_jsx(Download, { size: 16 }), " ", _jsx("span", { children: "Export Selected" })] }), _jsxs("button", { className: "dropdown-item", onClick: () => { bulkActions.onChangeStatus(); dropdown.close(); }, children: [_jsx(RotateCcw, { size: 16 }), " ", _jsx("span", { children: "Change Status" })] }), _jsxs("button", { className: "dropdown-item", onClick: () => { bulkActions.onAssignStaff(); dropdown.close(); }, children: [_jsx(Users, { size: 16 }), " ", _jsx("span", { children: "Assign Staff" })] }), _jsxs("button", { className: "dropdown-item", onClick: () => { bulkActions.onDuplicateLead(); dropdown.close(); }, children: [_jsx(Copy, { size: 16 }), " ", _jsx("span", { children: "Duplicate Lead" })] }), _jsx("div", { className: "dropdown-divider" }), _jsxs("button", { className: "dropdown-item danger", onClick: () => { bulkActions.onDeleteSelected(); dropdown.close(); }, children: [_jsx(Trash2, { size: 16 }), " ", _jsx("span", { children: "Delete Selected" })] })] }));
};
export default LeadActionsDropdown;
//# sourceMappingURL=LeadActionsDropdown.js.map