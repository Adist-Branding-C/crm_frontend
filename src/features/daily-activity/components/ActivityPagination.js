import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from 'lucide-react';
const ActivityPagination = ({ currentPage, totalPages, totalActivities, onPageChange, getPageNumbers, }) => {
    if (totalActivities <= 0)
        return null;
    return (_jsxs("div", { className: "pagination", children: [_jsxs("button", { className: "pagination-btn prev", onClick: () => onPageChange(Math.max(1, currentPage - 1)), disabled: currentPage === 1, children: [_jsx(ChevronLeft, { size: 16 }), "Prev"] }), _jsx("div", { className: "pagination-numbers", children: getPageNumbers().map(page => (_jsx("button", { className: `pagination-number ${currentPage === page ? 'active' : ''}`, onClick: () => onPageChange(page), children: page }, page))) }), _jsxs("button", { className: "pagination-btn next", onClick: () => onPageChange(Math.min(totalPages, currentPage + 1)), disabled: currentPage === totalPages, children: ["Next", _jsx(ChevronRight, { size: 16 })] })] }));
};
export default ActivityPagination;
//# sourceMappingURL=ActivityPagination.js.map