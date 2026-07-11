import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { MoreHorizontal, Eye, Edit2, Trash2 } from 'lucide-react';
import ActionMenuPortal from '../../task-settings/components/ActionMenuPortal';
import { ACTION_VIEW, ACTION_EDIT, ACTION_DELETE } from '../../../shared/constants/actionLabels';
const CampaignActions = ({ campaign, dropdownOpen, onToggleDropdown, onView, onEdit, onAssign, onDelete }) => {
    const buttonRef = useRef(null);
    return (_jsxs("div", { className: "dropdown-container", children: [_jsx("button", { ref: buttonRef, className: "dropdown-toggle", onClick: () => onToggleDropdown(dropdownOpen === campaign.id ? null : campaign.id), children: _jsx(MoreHorizontal, { size: 16 }) }), _jsxs(ActionMenuPortal, { isOpen: dropdownOpen === campaign.id, triggerRef: buttonRef, onClose: () => onToggleDropdown(null), children: [_jsxs("button", { onClick: () => onView(campaign), children: [_jsx(Eye, { size: 14 }), ACTION_VIEW] }), _jsxs("button", { onClick: () => onEdit(campaign), children: [_jsx(Edit2, { size: 14 }), ACTION_EDIT] }), _jsxs("button", { className: "delete", onClick: () => onDelete(campaign), children: [_jsx(Trash2, { size: 14 }), ACTION_DELETE] })] })] }));
};
export default CampaignActions;
//# sourceMappingURL=CampaignActions.js.map