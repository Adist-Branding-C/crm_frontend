import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const AdditionalFieldControl = ({ field, value, onChange }) => {
    switch (field.fieldType.toLowerCase()) {
        case 'dropdown':
            return (_jsxs("select", { value: value, onChange: (e) => onChange(e.target.value), children: [_jsxs("option", { value: "", children: ["Select ", field.name] }), field.values.map((v) => (_jsx("option", { value: v, children: v }, v)))] }));
        case 'number':
            return (_jsx("input", { type: "number", placeholder: `Enter ${field.name}`, value: value, onChange: (e) => onChange(e.target.value) }));
        case 'text':
            return (_jsx("input", { type: "text", placeholder: `Enter ${field.name}`, value: value, onChange: (e) => onChange(e.target.value) }));
        case 'date':
            return (_jsx("input", { type: "date", value: value, onChange: (e) => onChange(e.target.value) }));
        case 'checkbox':
            return (_jsx("div", { className: "filter-checkbox-group", children: field.values.map((v) => {
                    const checked = value.split(',').includes(v);
                    return (_jsxs("label", { className: "filter-checkbox-label", children: [_jsx("input", { type: "checkbox", checked: checked, onChange: () => {
                                    const parts = value ? value.split(',') : [];
                                    const next = checked ? parts.filter((p) => p !== v) : [...parts, v];
                                    onChange(next.join(','));
                                } }), v] }, v));
                }) }));
        case 'radio':
            return (_jsx("div", { className: "filter-radio-group", children: field.values.map((v) => (_jsxs("label", { className: "filter-radio-label", children: [_jsx("input", { type: "radio", name: `additionalField_${field.fieldId}`, value: v, checked: value === v, onChange: () => onChange(v) }), v] }, v))) }));
        case 'multi select':
            return (_jsx("select", { multiple: true, value: value ? value.split(',') : [], onChange: (e) => {
                    const selected = Array.from(e.target.selectedOptions, (o) => o.value);
                    onChange(selected.join(','));
                }, children: field.values.map((v) => (_jsx("option", { value: v, children: v }, v))) }));
        default:
            return (_jsx("input", { type: "text", placeholder: `Enter ${field.name}`, value: value, onChange: (e) => onChange(e.target.value) }));
    }
};
export default AdditionalFieldControl;
//# sourceMappingURL=AdditionalFieldControl.js.map