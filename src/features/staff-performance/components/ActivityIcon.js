import { jsx as _jsx } from "react/jsx-runtime";
import { PhoneCall, MessageSquare, Users, CheckCircle2 } from 'lucide-react';
const ActivityIcon = ({ type }) => {
    switch (type) {
        case 'call': return _jsx(PhoneCall, { size: 16 });
        case 'email': return _jsx(MessageSquare, { size: 16 });
        case 'meeting': return _jsx(Users, { size: 16 });
        default: return _jsx(CheckCircle2, { size: 16 });
    }
};
export default ActivityIcon;
//# sourceMappingURL=ActivityIcon.js.map