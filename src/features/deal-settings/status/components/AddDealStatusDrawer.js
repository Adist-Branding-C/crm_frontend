import { jsx as _jsx } from "react/jsx-runtime";
import AdminFormDrawer from '../../../../shared/components/crud/AdminFormDrawer';
import { DEAL_STATUS_FORM_FIELDS } from '../constants/deal-status.constants';
const AddDealStatusDrawer = ({ isOpen, formData, onChange, onSave, onClose, isEditing, }) => (_jsx(AdminFormDrawer, { isOpen: isOpen, title: "Deal Status", fields: DEAL_STATUS_FORM_FIELDS, formData: formData, onChange: onChange, onSave: onSave, onClose: onClose, isEditing: isEditing }));
export default AddDealStatusDrawer;
//# sourceMappingURL=AddDealStatusDrawer.js.map