import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import './TableScroll.css';
const TableScroll = ({ children, className = '' }) => {
    return (_jsx("div", { className: `table-scroll-wrapper ${className}`, children: children }));
};
export default TableScroll;
//# sourceMappingURL=TableScroll.js.map