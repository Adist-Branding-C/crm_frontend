import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { TRow, TCell } from '../../../shared/components/table';
import CampaignActions from './CampaignActions';
import { formatDisplayDate } from '../utils/date.utils';
import { getCreatedByLabel, getCampaignTypeBadgeClass } from '../utils/campaign.utils';
const CampaignRow = ({ campaign, dropdownOpen, onToggleDropdown, onView, onEdit, onAssign, onDelete }) => (_jsxs(TRow, { children: [_jsx(TCell, { children: campaign.slNo }), _jsx(TCell, { children: campaign.name }), _jsx(TCell, { children: _jsx("span", { className: getCampaignTypeBadgeClass(campaign.type), children: campaign.type }) }), _jsx(TCell, { children: campaign.totalTasks }), _jsx(TCell, { children: campaign.completedTasks }), _jsx(TCell, { children: _jsxs("div", { className: "progress-cell", children: [_jsxs("span", { children: [campaign.completedPercent, "%"] }), _jsx("div", { className: "progress-bar", children: _jsx("div", { className: "progress-fill", style: { width: `${campaign.completedPercent}%` } }) })] }) }), _jsx(TCell, { children: getCreatedByLabel(campaign.createdBy) }), _jsx(TCell, { children: formatDisplayDate(campaign.createdAt) }), _jsx(TCell, { children: _jsx(CampaignActions, { campaign: campaign, dropdownOpen: dropdownOpen, onToggleDropdown: onToggleDropdown, onView: onView, onEdit: onEdit, onAssign: onAssign, onDelete: onDelete }) })] }));
export default memo(CampaignRow);
//# sourceMappingURL=CampaignRow.js.map