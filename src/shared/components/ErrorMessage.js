import { jsx as _jsx } from "react/jsx-runtime";
const ErrorMessage = ({ message }) => {
    if (!message)
        return null;
    return _jsx("div", { className: "auth-error", role: "alert", children: message });
};
export default ErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map