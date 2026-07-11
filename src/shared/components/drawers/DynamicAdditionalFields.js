import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getFieldKey } from '../../../features/enquiries/utils/additionalFields';
const DynamicAdditionalFields = ({ fields, values, errors, touched, handleChange, handleBlur, setFieldValue, }) => {
    if (!fields || fields.length === 0)
        return null;
    return (_jsxs("div", { className: "additional-fields-section", children: [_jsx("h4", { className: "additional-fields-heading", children: "Additional Fields" }), fields.map((field) => {
                const key = getFieldKey(field.fieldKey);
                const value = values[key];
                const error = errors[key];
                const isTouched = touched[key];
                const fieldType = field.fieldType.toLowerCase();
                return (_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: [field.name, field.isRequired && _jsx("span", { className: "required", children: " *" })] }), (fieldType === 'text' || fieldType === 'number') && (_jsx("input", { type: fieldType === 'number' ? 'number' : 'text', name: key, placeholder: `Enter ${field.name}`, value: value ?? '', onChange: handleChange, onBlur: handleBlur, className: error && isTouched ? 'error' : '' })), fieldType === 'date' && (_jsx("input", { type: "date", name: key, value: value ?? '', onChange: handleChange, onBlur: handleBlur, className: error && isTouched ? 'error' : '' })), fieldType === 'datetime' && (_jsx("input", { type: "datetime-local", name: key, value: value ?? '', onChange: handleChange, onBlur: handleBlur, className: error && isTouched ? 'error' : '' })), fieldType === 'dropdown' && (_jsxs("select", { name: key, value: value ?? '', onChange: handleChange, onBlur: handleBlur, className: error && isTouched ? 'error' : '', children: [_jsx("option", { value: "", children: "Select" }), (field.values || []).map((opt) => (_jsx("option", { value: opt, children: opt }, opt)))] })), fieldType === 'checkbox' && (_jsx("div", { className: "checkbox-group", children: (field.values || []).map((opt) => {
                                const checked = Array.isArray(value) && value.includes(opt);
                                return (_jsxs("label", { className: "checkbox-label", children: [_jsx("input", { type: "checkbox", name: key, value: opt, checked: checked, onChange: (e) => {
                                                if (setFieldValue) {
                                                    const current = values[key] || [];
                                                    if (e.target.checked) {
                                                        setFieldValue(key, [...current, opt]);
                                                    }
                                                    else {
                                                        setFieldValue(key, current.filter((v) => v !== opt));
                                                    }
                                                }
                                            }, onBlur: handleBlur }), opt] }, opt));
                            }) })), error && isTouched && _jsx("div", { className: "error-text", children: error })] }, field.fieldId));
            })] }));
};
export default DynamicAdditionalFields;
//# sourceMappingURL=DynamicAdditionalFields.js.map