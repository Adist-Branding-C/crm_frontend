import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown, SortDesc, SortAsc, Check, RefreshCw, ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';
import Dropdown from '../../../shared/components/Dropdown';
import { useDropdownState } from '../../../shared/hooks/useDropdownState';
/**
 * Self-contained "Sort By" toolbar dropdown - owns its own open/close state,
 * only takes the current sort + the two sort-callbacks as props.
 *
 * Used by:
 * - EnquiriesPage (composed directly as a TableNav child)
 */
const LeadSortDropdown = ({ sortConfig, onSortDesc, onSortAsc }) => {
    const dropdown = useDropdownState();
    const item = (key, direction, label, icon, action) => (_jsxs("button", { className: `dropdown-item ${sortConfig.key === key && sortConfig.direction === direction ? 'selected' : ''}`, onClick: () => { action(key); dropdown.close(); }, children: [icon, " ", _jsx("span", { children: label }), sortConfig.key === key && sortConfig.direction === direction && _jsx(Check, { size: 14, className: "check-icon" })] }));
    return (_jsxs(Dropdown, { isOpen: dropdown.isOpen, isClosing: dropdown.isClosing, dropdownRef: dropdown.ref, panelClassName: "sort-dropdown", trigger: _jsxs("button", { className: `btn btn-secondary ${dropdown.isOpen ? 'active' : ''}`, onClick: (e) => { e.stopPropagation(); dropdown.toggle(); }, children: [_jsx(SortAsc, { size: 16 }), " Sort By ", _jsx(ChevronDown, { size: 14, className: dropdown.isOpen ? 'rotate' : '' })] }), children: [_jsx("div", { className: "dropdown-header", children: "Sort By" }), item('createdAt', 'desc', 'Newest First', _jsx(SortDesc, { size: 16 }), onSortDesc), item('createdAt', 'asc', 'Oldest First', _jsx(SortAsc, { size: 16 }), onSortAsc), item('updatedAt', 'desc', 'Updated Date', _jsx(RefreshCw, { size: 16 }), onSortDesc), item('updatedAt', 'asc', 'Updated (Oldest)', _jsx(SortAsc, { size: 16 }), onSortAsc), item('name', 'asc', 'Name (A-Z)', _jsx(ArrowDownNarrowWide, { size: 16 }), onSortAsc), item('name', 'desc', 'Name (Z-A)', _jsx(ArrowUpNarrowWide, { size: 16 }), onSortDesc)] }));
};
export default LeadSortDropdown;
//# sourceMappingURL=LeadSortDropdown.js.map