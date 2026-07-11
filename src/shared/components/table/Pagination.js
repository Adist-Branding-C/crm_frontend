import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LABEL_FIRST, LABEL_LAST, LABEL_PAGE, LABEL_OF, LABEL_SHOWING, LABEL_TO, LABEL_ENTRIES, } from '../../constants/labels';
const Pagination = ({ currentPage, totalPages, totalItems, rowsPerPage, onPageChange, prevNextOnly = false, }) => {
    const safeTotalPages = Math.max(1, Number(totalPages) || 1);
    const safeCurrentPage = Math.max(1, Number(currentPage) || 1);
    const startIndex = (safeCurrentPage - 1) * rowsPerPage;
    return (_jsxs("div", { className: "table-footer", children: [_jsxs("div", { className: "table-info", children: [LABEL_SHOWING, " ", Math.min(startIndex + 1, totalItems), " ", LABEL_TO, " ", Math.min(startIndex + rowsPerPage, totalItems), " ", LABEL_OF, " ", totalItems, " ", LABEL_ENTRIES] }), _jsx("div", { className: "table-controls", children: _jsxs("div", { className: "pagination-controls", style: { display: 'flex', gap: '4px', alignItems: 'center' }, children: [!prevNextOnly && (_jsx("button", { className: "pagination-btn", disabled: safeCurrentPage === 1, onClick: () => onPageChange(1), children: LABEL_FIRST })), _jsx("button", { className: "pagination-btn", disabled: safeCurrentPage === 1, onClick: () => onPageChange(safeCurrentPage - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: [LABEL_PAGE, " ", safeCurrentPage, " ", LABEL_OF, " ", safeTotalPages] }), _jsx("button", { className: "pagination-btn", disabled: safeCurrentPage === safeTotalPages, onClick: () => onPageChange(safeCurrentPage + 1), children: _jsx(ChevronRight, { size: 16 }) }), !prevNextOnly && (_jsx("button", { className: "pagination-btn", disabled: safeCurrentPage === safeTotalPages, onClick: () => onPageChange(safeTotalPages), children: LABEL_LAST }))] }) })] }));
};
export default Pagination;
//# sourceMappingURL=Pagination.js.map