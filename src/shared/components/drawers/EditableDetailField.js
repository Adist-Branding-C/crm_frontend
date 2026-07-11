import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Edit2, Check, X, Loader2 } from 'lucide-react';
const valuesEqual = (a, b) => {
    if (Array.isArray(a) || Array.isArray(b)) {
        const arrA = Array.isArray(a) ? a : [a];
        const arrB = Array.isArray(b) ? b : [b];
        return arrA.length === arrB.length && arrA.every((v) => arrB.includes(v));
    }
    return a === b;
};
const EditableDetailField = ({ label, displayValue, editValue, type, options = [], fullWidth, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(editValue);
    const [isSaving, setIsSaving] = useState(false);
    const startEdit = () => {
        setDraft(editValue);
        setIsEditing(true);
    };
    const cancelEdit = () => {
        setIsEditing(false);
        setDraft(editValue);
    };
    const handleSave = async () => {
        if (valuesEqual(draft, editValue)) {
            setIsEditing(false);
            return;
        }
        setIsSaving(true);
        const success = await onSave(draft);
        setIsSaving(false);
        if (success)
            setIsEditing(false);
    };
    const toggleCheckboxOption = (opt) => {
        const current = Array.isArray(draft) ? draft : [];
        setDraft(current.includes(opt) ? current.filter((v) => v !== opt) : [...current, opt]);
    };
    return (_jsxs("div", { className: `leaddrawer-detail-card${fullWidth ? ' leaddrawer-detail-full' : ''}`, children: [_jsx("div", { className: "leaddrawer-detail-label", children: label }), !isEditing ? (_jsxs("div", { className: "leaddrawer-detail-value", onClick: startEdit, children: [_jsx("span", { children: displayValue || '-' }), _jsx(Edit2, { size: 12 })] })) : (_jsxs("div", { className: "leaddrawer-edit-field", children: [type === 'text' && (_jsx("input", { type: "text", className: "leaddrawer-edit-input", value: draft, autoFocus: true, onChange: (e) => setDraft(e.target.value), disabled: isSaving })), type === 'date' && (_jsx("input", { type: "date", className: "leaddrawer-edit-input", value: draft, autoFocus: true, onChange: (e) => setDraft(e.target.value), disabled: isSaving })), type === 'select' && (_jsxs("select", { className: "leaddrawer-edit-select", value: draft, autoFocus: true, onChange: (e) => setDraft(e.target.value), disabled: isSaving, children: [_jsx("option", { value: "", children: "Select" }), options.map((o) => (_jsx("option", { value: o.value, children: o.label }, o.value)))] })), type === 'checkbox' && (_jsx("div", { className: "checkbox-group", children: options.map((o) => (_jsxs("label", { className: "checkbox-label", children: [_jsx("input", { type: "checkbox", checked: Array.isArray(draft) && draft.includes(o.value), onChange: () => toggleCheckboxOption(o.value), disabled: isSaving }), o.label] }, o.value))) })), _jsxs("div", { className: "leaddrawer-note-edit-actions", children: [_jsx("button", { className: "leaddrawer-note-action", onClick: handleSave, disabled: isSaving, title: "Save", children: isSaving ? _jsx(Loader2, { size: 14, className: "spin" }) : _jsx(Check, { size: 14 }) }), _jsx("button", { className: "leaddrawer-note-action", onClick: cancelEdit, disabled: isSaving, title: "Cancel", children: _jsx(X, { size: 14 }) })] })] }))] }));
};
export default EditableDetailField;
//# sourceMappingURL=EditableDetailField.js.map