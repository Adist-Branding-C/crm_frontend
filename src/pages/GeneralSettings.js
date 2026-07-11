import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './GeneralSettings.css';
const GeneralSettingsPage = () => {
    const [settings, setSettings] = useState({
        globalSearch: true,
        searchNumberMasking: false,
        enableWebSound: true,
        enableAttendanceStatus: true,
        enableIvrAppNotification: false,
        staffChangeEnquirySource: false,
        timezone: 'Asia/Kolkata',
        enableBranchFilter: true,
        enableWebNotification: true,
        enableWebIvrCalling: false,
        currency: 'INR',
        enableDeletedAgentFilter: false,
    });
    const [showToast, setShowToast] = useState(false);
    const handleToggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
        showSaveToast();
    };
    const handleSelectChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        showSaveToast();
    };
    const showSaveToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };
    const timezones = [
        { value: 'Asia/Kolkata', label: 'Asia/Kolkata' },
        { value: 'UTC', label: 'UTC' },
        { value: 'America/New_York', label: 'America/New_York' },
        { value: 'Europe/London', label: 'Europe/London' },
        { value: 'Asia/Dubai', label: 'Asia/Dubai' },
    ];
    const currencies = [
        { value: 'INR', label: 'INR' },
        { value: 'USD', label: 'USD' },
        { value: 'AED', label: 'AED' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
    ];
    return (_jsxs("div", { className: "general-settings-page", children: [_jsx(PageHeader, { title: "General Settings", description: "Configure your general application settings" }), _jsxs("div", { className: "settings-card", children: [_jsx("div", { className: "card-header", children: _jsx("h3", { children: "General Settings" }) }), _jsxs("div", { className: "settings-grid", children: [_jsxs("div", { className: "settings-column", children: [_jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Global Search" }) }), _jsx("div", { className: "setting-control", children: _jsx("button", { className: `toggle-switch ${settings.globalSearch ? 'active' : ''}`, onClick: () => handleToggle('globalSearch'), children: _jsx("span", { className: "toggle-knob" }) }) })] }), _jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Search Number Masking" }) }), _jsx("div", { className: "setting-control", children: _jsx("button", { className: `toggle-switch ${settings.searchNumberMasking ? 'active' : ''}`, onClick: () => handleToggle('searchNumberMasking'), children: _jsx("span", { className: "toggle-knob" }) }) })] }), _jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Enable Web Sound" }) }), _jsx("div", { className: "setting-control", children: _jsx("button", { className: `toggle-switch ${settings.enableWebSound ? 'active' : ''}`, onClick: () => handleToggle('enableWebSound'), children: _jsx("span", { className: "toggle-knob" }) }) })] }), _jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Enable Attendance Status" }) }), _jsx("div", { className: "setting-control", children: _jsx("button", { className: `toggle-switch ${settings.enableAttendanceStatus ? 'active' : ''}`, onClick: () => handleToggle('enableAttendanceStatus'), children: _jsx("span", { className: "toggle-knob" }) }) })] }), _jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Enable IVR App Notification" }) }), _jsx("div", { className: "setting-control", children: _jsx("button", { className: `toggle-switch ${settings.enableIvrAppNotification ? 'active' : ''}`, onClick: () => handleToggle('enableIvrAppNotification'), children: _jsx("span", { className: "toggle-knob" }) }) })] }), _jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Staff can change Enquiry Source" }) }), _jsx("div", { className: "setting-control", children: _jsx("button", { className: `toggle-switch ${settings.staffChangeEnquirySource ? 'active' : ''}`, onClick: () => handleToggle('staffChangeEnquirySource'), children: _jsx("span", { className: "toggle-knob" }) }) })] }), _jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Time Zone" }) }), _jsx("div", { className: "setting-control", children: _jsxs("select", { className: "settings-select", value: settings.timezone, onChange: (e) => handleSelectChange('timezone', e.target.value), children: [_jsx("option", { value: "", children: "Select Timezone" }), timezones.map(tz => (_jsx("option", { value: tz.value, children: tz.label }, tz.value)))] }) })] })] }), _jsxs("div", { className: "settings-column", children: [_jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Enable branch vise filter" }) }), _jsx("div", { className: "setting-control", children: _jsx("button", { className: `toggle-switch ${settings.enableBranchFilter ? 'active' : ''}`, onClick: () => handleToggle('enableBranchFilter'), children: _jsx("span", { className: "toggle-knob" }) }) })] }), _jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Enable Web Notification" }) }), _jsx("div", { className: "setting-control", children: _jsx("button", { className: `toggle-switch ${settings.enableWebNotification ? 'active' : ''}`, onClick: () => handleToggle('enableWebNotification'), children: _jsx("span", { className: "toggle-knob" }) }) })] }), _jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Enable Web IVR Calling" }) }), _jsx("div", { className: "setting-control", children: _jsx("button", { className: `toggle-switch ${settings.enableWebIvrCalling ? 'active' : ''}`, onClick: () => handleToggle('enableWebIvrCalling'), children: _jsx("span", { className: "toggle-knob" }) }) })] }), _jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Currency" }) }), _jsx("div", { className: "setting-control", children: _jsxs("select", { className: "settings-select", value: settings.currency, onChange: (e) => handleSelectChange('currency', e.target.value), children: [_jsx("option", { value: "", children: "Select ..." }), currencies.map(c => (_jsx("option", { value: c.value, children: c.label }, c.value)))] }) })] }), _jsxs("div", { className: "settings-row", children: [_jsx("div", { className: "setting-label", children: _jsx("span", { className: "label-text", children: "Enable Deleted Agent in filter" }) }), _jsx("div", { className: "setting-control", children: _jsx("button", { className: `toggle-switch ${settings.enableDeletedAgentFilter ? 'active' : ''}`, onClick: () => handleToggle('enableDeletedAgentFilter'), children: _jsx("span", { className: "toggle-knob" }) }) })] })] })] })] }), showToast && (_jsxs("div", { className: "toast-notification", children: [_jsx(Check, { size: 18 }), _jsx("span", { children: "Settings updated" })] }))] }));
};
export default GeneralSettingsPage;
//# sourceMappingURL=GeneralSettings.js.map