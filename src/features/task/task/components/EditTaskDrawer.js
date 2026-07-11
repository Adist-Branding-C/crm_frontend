import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import GenericTaskForm from '../../shared/components/GenericTaskForm';
const EditTaskDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, editingItem, categoryOptions, staffOptions, leadOptions, leadLoading }) => {
    const drawerBodyRef = useRef(null);
    const prevSubmitCountRef = useRef(0);
    useEffect(() => {
        if (error) {
            drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [error]);
    if (!isOpen || !editingItem)
        return null;
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: "Edit Task" }), _jsx("button", { className: "drawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", ref: drawerBodyRef, children: _jsx(GenericTaskForm, { validationSchema: validationSchema, initialValues: initialValues, onSubmit: onSubmit, isLoading: isLoading, error: error, isEditing: true, staffOptions: staffOptions, categoryOptions: categoryOptions, leadOptions: leadOptions, leadLoading: leadLoading ?? false }) })] }) }));
};
export default EditTaskDrawer;
//# sourceMappingURL=EditTaskDrawer.js.map