import { jsx as _jsx } from "react/jsx-runtime";
import Drawer from './Drawer';
import LeadDetailContent from '../../../features/enquiries/components/LeadDetailContent';
import './LeadDetailDrawer.css';
const LeadDetailDrawer = ({ lead, isOpen, onClose, onLeadUpdated = () => { }, onDeleteLead }) => {
    if (!lead)
        return null;
    return (_jsx(Drawer, { isOpen: isOpen, onClose: onClose, animated: true, exitDuration: 350, closeOnEsc: true, overlayClassName: "leaddrawer-overlay", panelClassName: "leaddrawer-panel", children: _jsx(LeadDetailContent, { lead: lead, onClose: onClose, onLeadUpdated: onLeadUpdated, onDeleteLead: onDeleteLead }) }));
};
export default LeadDetailDrawer;
//# sourceMappingURL=LeadDetailDrawer.js.map