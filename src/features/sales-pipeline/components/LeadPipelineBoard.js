import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { stageColor } from '../constants';
import LeadCard from './LeadCard';
const LeadPipelineBoard = ({ filteredLeadGroups, loadingLeadStatusId, loadMoreLeads, getAvatarColor, }) => {
    return (_jsx("div", { className: "pipeline-board", children: filteredLeadGroups.map(group => _jsxs("div", { className: "pipeline-column", children: [_jsx("div", { className: "column-header", style: { borderTopColor: stageColor(group.statusId) }, children: _jsxs("div", { className: "column-title", children: [_jsx("span", { className: "column-name", children: group.status }), _jsx("span", { className: "column-count", children: group.count })] }) }), _jsx("div", { className: "column-cards", children: group.leads.map(lead => _jsx(LeadCard, { lead: lead, getAvatarColor: getAvatarColor }, lead.id)) }), _jsx("button", { className: "see-more-btn", onClick: () => loadMoreLeads(group.statusId), disabled: loadingLeadStatusId === group.statusId, children: loadingLeadStatusId === group.statusId ? 'Loading...' : 'See More' })] }, group.statusId)) }));
};
export default LeadPipelineBoard;
//# sourceMappingURL=LeadPipelineBoard.js.map