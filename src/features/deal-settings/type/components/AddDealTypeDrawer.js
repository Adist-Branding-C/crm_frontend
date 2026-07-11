import { jsx as _jsx } from "react/jsx-runtime";
import AdminFormDrawer from '../../../../shared/components/crud/AdminFormDrawer';
import { DEAL_TYPE_FORM_FIELDS } from '../constants/deal-type.constants';
const AddDealTypeDrawer = ({ isOpen, formData, onChange, onSave, onClose, isEditing, }) => (_jsx(AdminFormDrawer, { isOpen: isOpen, title: "Deal Type", fields: DEAL_TYPE_FORM_FIELDS, formData: formData, onChange: onChange, onSave: onSave, onClose: onClose, isEditing: isEditing }));
export default AddDealTypeDrawer;
//# sourceMappingURL=AddDealTypeDrawer.js.map