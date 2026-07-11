import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { staffService } from '../../deal/services/staff.service';
import Modal from '../../../shared/components/Modal';
const AssignStaffModal = ({ isOpen, selectedCount, isProcessing, onConfirm, onClose }) => {
    const [staffOptions, setStaffOptions] = useState([]);
    const [staffLoading, setStaffLoading] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState('');
    useEffect(() => {
        if (!isOpen) {
            setSelectedStaffId('');
            return;
        }
        setStaffLoading(true);
        staffService.getStaff()
            .then((res) => {
            const raw = res?.data;
            const items = Array.isArray(raw) ? raw : raw?.items ?? [];
            setStaffOptions(items.map((s) => ({
                value: s.staff_id ?? s.id ?? '',
                label: s.name,
            })));
        })
            .catch(() => setStaffOptions([]))
            .finally(() => setStaffLoading(false));
    }, [isOpen]);
    return (_jsxs(Modal, { isOpen: isOpen, onClose: () => { if (!isProcessing)
            onClose(); }, title: "Assign Staff", children: [_jsxs("div", { className: "modal-body", children: [_jsxs("p", { style: { marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }, children: ["Assign staff to ", _jsx("strong", { children: selectedCount }), " selected lead(s)"] }), _jsxs("div", { className: "form-group", style: { marginBottom: 0 }, children: [_jsx("label", { children: "Staff Member" }), _jsxs("select", { value: selectedStaffId, onChange: (e) => setSelectedStaffId(e.target.value), disabled: staffLoading || isProcessing, children: [_jsx("option", { value: "", children: "Select staff" }), staffLoading ? (_jsx("option", { value: "", disabled: true, children: "Loading..." })) : (staffOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value)))] })] })] }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-primary", onClick: () => onConfirm(selectedStaffId), disabled: !selectedStaffId || isProcessing, children: isProcessing ? _jsxs(_Fragment, { children: [_jsx(Loader2, { size: 16, className: "spin" }), " Assigning..."] }) : 'Assign Staff' }), _jsx("button", { className: "btn btn-secondary", onClick: onClose, disabled: isProcessing, children: "Cancel" })] })] }));
};
export default AssignStaffModal;
//# sourceMappingURL=AssignStaffModal.js.map