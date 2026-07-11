import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowUp, ArrowDown } from 'lucide-react';
const SortToggleButton = ({ sortOrder, onToggle }) => (_jsxs("button", { type: "button", className: "btn btn-secondary", onClick: onToggle, children: [sortOrder === 'DESC' ? _jsx(ArrowDown, { size: 16 }) : _jsx(ArrowUp, { size: 16 }), sortOrder === 'DESC' ? 'Newest First' : 'Oldest First'] }));
export default SortToggleButton;
//# sourceMappingURL=SortToggleButton.js.map