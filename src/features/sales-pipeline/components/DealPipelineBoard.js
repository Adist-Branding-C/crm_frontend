import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { stageColor } from '../constants';
import DealCard from './DealCard';
const DealPipelineBoard = ({ filteredStatusGroups, loadingStatusId, loadMoreDeals, handleDragStart, handleDragOver, handleDrop, getAvatarColor, }) => {
    return (_jsx("div", { className: "pipeline-board", children: filteredStatusGroups.map(group => _jsxs("div", { className: "pipeline-column", onDragOver: handleDragOver, onDrop: (e) => handleDrop(e, group.statusId), children: [_jsx("div", { className: "column-header", style: { borderTopColor: stageColor(group.statusId) }, children: _jsxs("div", { className: "column-title", children: [_jsx("span", { className: "column-name", children: group.status }), _jsx("span", { className: "column-count", children: group.count })] }) }), _jsx("div", { className: "column-cards", children: group.deals.map(deal => _jsx(DealCard, { deal: deal, onDragStart: handleDragStart, getAvatarColor: getAvatarColor }, deal.id)) }), _jsx("button", { className: "see-more-btn", onClick: () => loadMoreDeals(group.statusId), disabled: loadingStatusId === group.statusId, children: loadingStatusId === group.statusId ? 'Loading...' : 'See More' })] }, group.statusId)) }));
};
export default DealPipelineBoard;
//# sourceMappingURL=DealPipelineBoard.js.map