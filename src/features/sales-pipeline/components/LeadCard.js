import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Phone, Calendar } from 'lucide-react';
const LeadCard = ({ lead, getAvatarColor }) => {
    return (_jsxs("div", { className: "deal-card", children: [_jsx("div", { className: "deal-title", children: lead.name }), _jsxs("div", { className: "deal-value", children: [_jsx(Phone, { size: 14 }), lead.phone] }), _jsxs("div", { className: "deal-footer", children: [_jsxs("div", { className: "deal-contact", children: [_jsx("div", { className: "contact-avatar", style: { background: getAvatarColor(lead.name) }, children: lead.name.charAt(0) }), _jsx("span", { children: lead.email })] }), _jsx("div", { className: "deal-probability", style: { color: '#6b7280' }, children: lead.source })] }), _jsxs("div", { className: "deal-due", children: [_jsx(Calendar, { size: 12 }), _jsx("span", { children: lead.createdAt })] })] }));
};
export default LeadCard;
//# sourceMappingURL=LeadCard.js.map