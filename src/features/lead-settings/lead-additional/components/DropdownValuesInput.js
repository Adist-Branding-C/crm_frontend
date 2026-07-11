import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, X } from 'lucide-react';
import './DropdownValuesInput.css';
const DropdownValuesInput = ({ currentValue, values, onChange, onAdd, onRemove }) => (_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Dropdown Values" }), _jsxs("div", { className: "dropdown-value-row", children: [_jsx("input", { type: "text", className: "form-control", placeholder: "Enter option value", value: currentValue, onChange: onChange, onKeyDown: (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            onAdd();
                        }
                    } }), _jsx("button", { type: "button", className: "btn btn-primary", onClick: onAdd, "aria-label": "Add dropdown value", children: _jsx(Plus, { size: 16 }) })] }), values.length > 0 && (_jsx("div", { className: "dropdown-values-list", children: values.map((val, idx) => (_jsxs("div", { className: "dropdown-value-item", children: [_jsx("span", { children: val }), _jsx("button", { type: "button", className: "remove-dropdown-value", onClick: () => onRemove(idx), "aria-label": `Remove dropdown value ${val}`, children: _jsx(X, { size: 14 }) })] }, idx))) }))] }));
export default DropdownValuesInput;
//# sourceMappingURL=DropdownValuesInput.js.map