import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
import GenericTaskForm from '../../shared/components/GenericTaskForm';
const AddTaskDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing = false, categoryOptions, staffOptions, leadOptions, leadLoading }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: isEditing ? 'Edit Task' : 'Add Task' }), _jsx("button", { className: "drawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", children: _jsx(GenericTaskForm, { validationSchema: validationSchema, initialValues: initialValues, onSubmit: onSubmit, isLoading: isLoading, error: error, isEditing: isEditing, categoryOptions: categoryOptions, staffOptions: staffOptions, leadOptions: leadOptions, leadLoading: leadLoading ?? false }) })] }) }));
};
export default AddTaskDrawer;
//# sourceMappingURL=AddTaskDrawer.js.map