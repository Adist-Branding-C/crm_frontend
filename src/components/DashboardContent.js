import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './DashboardContent.css';
import PageContainer from './PageContainer';
import { StatCard } from './widgets/Cards';
import LeadStatusWidget from './widgets/LeadStatusWidget';
import LeadSourceWidget from './widgets/LeadSourceWidget';
import LeadPurposeWidget from './widgets/LeadPurposeWidget';
import DealPipelineWidget from './widgets/DealPipelineWidget';
import DealByStageWidget from './widgets/DealByStageWidget';
import TasksWidget from './widgets/TasksWidget';
import CampaignsWidget from './widgets/CampaignsWidget';
import ActivitiesWidget from './widgets/ActivitiesWidget';
import { KpiCard } from './widgets/Cards';
const DashboardContent = () => {
    const [branch, setBranch] = useState('calicut');
    const [period, setPeriod] = useState('today');
    const [customFrom, setCustomFrom] = useState('');
    const [customTo, setCustomTo] = useState('');
    const [showCustom, setShowCustom] = useState(false);
    return (_jsxs(PageContainer, { children: [_jsxs("div", { className: "dashboard-header", children: [_jsx("h1", { className: "dashboard-title", children: "Dashboard" }), _jsxs("div", { className: "dashboard-filters", children: [_jsxs("div", { className: "date-buttons", children: [_jsx("button", { className: `date-btn ${period === 'today' ? 'active' : ''}`, onClick: () => { setPeriod('today'); setShowCustom(false); }, children: "Today" }), _jsx("button", { className: `date-btn ${period === 'week' ? 'active' : ''}`, onClick: () => { setPeriod('week'); setShowCustom(false); }, children: "This Week" }), _jsx("button", { className: `date-btn ${period === 'month' ? 'active' : ''}`, onClick: () => { setPeriod('month'); setShowCustom(false); }, children: "This Month" }), _jsx("button", { className: `date-btn ${showCustom || period === 'custom' ? 'active' : ''}`, onClick: () => { setPeriod('custom'); setShowCustom(true); }, children: "Custom" })] }), showCustom && (_jsxs("div", { className: "custom-date-range", children: [_jsx("input", { type: "date", value: customFrom, onChange: (e) => setCustomFrom(e.target.value), className: "date-input" }), _jsx("span", { className: "date-separator", children: "to" }), _jsx("input", { type: "date", value: customTo, onChange: (e) => setCustomTo(e.target.value), className: "date-input" })] }))] })] }), _jsxs("div", { className: "widgets-grid middle-cards-grid", children: [_jsx(KpiCard, { title: "Today's Leads", value: "20", isPrimary: true }), _jsx(KpiCard, { title: "Hot Leads", value: "15", isPrimary: true }), _jsx(KpiCard, { title: "Qualified Leads", value: "8", isPrimary: true }), _jsx(KpiCard, { title: "Conversion Rate", value: "69%", isPrimary: true, isHighlight: true })] }), _jsxs("div", { className: "widgets-grid middle-cards-grid", children: [_jsx(KpiCard, { title: "Leads This Month", value: "526", isPrimary: true }), _jsx(KpiCard, { title: "Pipeline Leads", value: "45", isPrimary: true }), _jsx(KpiCard, { title: "Total Leads", value: "1048", isPrimary: true }), _jsx(KpiCard, { title: "Today's Followups", value: "12", isPrimary: true })] }), _jsxs("div", { className: "widgets-grid middle-cards-grid", children: [_jsx(KpiCard, { title: "My Leads", value: "28" }), _jsx(KpiCard, { title: "Pipeline amount", value: "\u20B970,205", isPrimary: true }), _jsx(KpiCard, { title: "Calls Today", value: "35" }), _jsx(KpiCard, { title: "Outbound Calls Today", value: "18" })] }), _jsxs("div", { className: "widgets-grid middle-cards-grid", children: [_jsx(KpiCard, { title: "Won Deals", value: "12" }), _jsx(KpiCard, { title: "Lost Deals", value: "3" })] }), _jsxs("div", { className: "widgets-grid middle-cards-grid", children: [_jsx(LeadStatusWidget, {}), _jsx(LeadSourceWidget, {}), _jsx(LeadPurposeWidget, {}), _jsx(DealPipelineWidget, {})] }), _jsxs("div", { className: "widgets-grid bottom-cards-grid", children: [_jsx(DealByStageWidget, {}), _jsx(TasksWidget, {}), _jsx(CampaignsWidget, {}), _jsx(ActivitiesWidget, {})] })] }));
};
export default DashboardContent;
//# sourceMappingURL=DashboardContent.js.map