import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { leadStatusService } from '../../lead-settings/lead-status/services';
import Modal from '../../../shared/components/Modal';
const ChangeStatusModal = ({ isOpen, selectedCount, isProcessing, onConfirm, onClose }) => {
    const [statusOptions, setStatusOptions] = useState([]);
    const [statusesLoading, setStatusesLoading] = useState(false);
    const [selectedStatusId, setSelectedStatusId] = useState('');
    useEffect(() => {
        if (!isOpen) {
            setSelectedStatusId('');
            return;
        }
        setStatusesLoading(true);
        leadStatusService.getLeadStatuses(1, 100)
            .then((res) => {
            const items = res?.data?.items ?? [];
            setStatusOptions(items.map((s) => ({ value: s.statusId, label: s.status })));
        })
            .catch(() => setStatusOptions([]))
            .finally(() => setStatusesLoading(false));
    }, [isOpen]);
    return (_jsxs(Modal, { isOpen: isOpen, onClose: () => { if (!isProcessing)
            onClose(); }, title: "Change Status", children: [_jsxs("div", { className: "modal-body", children: [_jsxs("p", { style: { marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }, children: ["Update status for ", _jsx("strong", { children: selectedCount }), " selected lead(s)"] }), _jsxs("div", { className: "form-group", style: { marginBottom: 0 }, children: [_jsx("label", { children: "New Status" }), _jsxs("select", { value: selectedStatusId, onChange: (e) => setSelectedStatusId(e.target.value), disabled: statusesLoading || isProcessing, children: [_jsx("option", { value: "", children: "Select status" }), statusesLoading ? (_jsx("option", { value: "", disabled: true, children: "Loading..." })) : (statusOptions.map(o => _jsx("option", { value: o.value, children: o.label }, o.value)))] })] })] }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-primary", onClick: () => onConfirm(selectedStatusId), disabled: !selectedStatusId || isProcessing, children: isProcessing ? _jsxs(_Fragment, { children: [_jsx(Loader2, { size: 16, className: "spin" }), " Updating..."] }) : 'Update Status' }), _jsx("button", { className: "btn btn-secondary", onClick: onClose, disabled: isProcessing, children: "Cancel" })] })] }));
};
export default ChangeStatusModal;
//# sourceMappingURL=ChangeStatusModal.js.map