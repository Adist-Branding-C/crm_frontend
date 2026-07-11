import { jsx as _jsx } from "react/jsx-runtime";
import Drawer from './Drawer';
import LeadForm from '../../../features/enquiries/components/LeadForm';
import './AddLeadDrawer.css';
const AddLeadDrawer = ({ isOpen, onClose, onSaved, lead }) => {
    const isEditing = !!lead;
    return (_jsx(Drawer, { isOpen: isOpen, onClose: onClose, title: isEditing ? 'Edit Lead' : 'Add New Lead', overlayClassName: "drawer-overlay", panelClassName: "drawer-panel", children: _jsx(LeadForm, { lead: lead, onSaved: onSaved, onClose: onClose }) }));
};
export default AddLeadDrawer;
//# sourceMappingURL=AddLeadDrawer.js.map