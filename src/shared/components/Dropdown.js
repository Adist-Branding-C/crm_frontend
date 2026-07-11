import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Dropdown = ({ isOpen, isClosing, dropdownRef, trigger, children, panelClassName = '' }) => (_jsxs("div", { className: "dropdown-container", ref: dropdownRef, children: [trigger, isOpen && (_jsx("div", { className: `premium-dropdown ${panelClassName} ${isClosing ? 'closing' : ''}`.trim(), children: children }))] }));
export default Dropdown;
//# sourceMappingURL=Dropdown.js.map