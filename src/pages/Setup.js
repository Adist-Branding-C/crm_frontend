import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Plus, X, GripVertical, ArrowRight, Check, Trash2, Save } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import './Setup.css';
const defaultStages = [
    { id: 1, name: 'New Lead', color: '#6366f1' },
    { id: 2, name: 'Initial Contact', color: '#8b5cf6' },
    { id: 3, name: 'Needs Identified', color: '#a855f7' },
    { id: 4, name: 'Proposal Sent', color: '#d946ef' },
    { id: 5, name: 'Follow Up 1', color: '#ec4899' },
    { id: 6, name: 'Follow Up 2', color: '#f43f5e' },
    { id: 7, name: 'Demo Scheduled', color: '#f97316' },
    { id: 8, name: 'Demo Completed', color: '#f59e0b' },
    { id: 9, name: 'Quote Sent', color: '#eab308' },
    { id: 10, name: 'Negotiation', color: '#84cc16' },
    { id: 11, name: 'Meeting Booked', color: '#22c55e' },
    { id: 12, name: 'Contract Sent', color: '#10b981' },
    { id: 13, name: 'Payment Pending', color: '#14b8a6' },
    { id: 14, name: 'Payment Received', color: '#06b6d4' },
    { id: 15, name: 'Converted', color: '#22c55e' },
];
const SetupPage = () => {
    const [stages, setStages] = useState(defaultStages);
    const [savedStages, setSavedStages] = useState(defaultStages);
    const [newStageName, setNewStageName] = useState('');
    const [editingStage, setEditingStage] = useState(null);
    const [saved, setSaved] = useState(false);
    const handleAddStage = () => {
        if (!newStageName.trim())
            return;
        const newStage = {
            id: Date.now(),
            name: newStageName.trim(),
            color: '#6366f1'
        };
        setStages([...stages, newStage]);
        setNewStageName('');
    };
    const handleDeleteStage = (id) => {
        setStages(stages.filter(s => s.id !== id));
    };
    const handleUpdateStage = (id, name, color) => {
        setStages(stages.map(s => s.id === id ? { ...s, name, color } : s));
        setEditingStage(null);
    };
    const handleSave = () => {
        setSavedStages(stages);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };
    const handleReset = () => {
        setStages(savedStages);
    };
    const moveStage = (index, direction) => {
        const newStages = [...stages];
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= newStages.length)
            return;
        [newStages[index], newStages[targetIndex]] = [newStages[targetIndex], newStages[index]];
        setStages(newStages);
    };
    return (_jsxs(PageContainer, { children: [_jsx(PageHeader, { title: "Setup", description: "Configure your CRM pipeline and tracking stages" }), _jsx("div", { className: "pipeline-visual", children: savedStages.map((stage, index) => (_jsxs(React.Fragment, { children: [_jsxs("div", { className: "pipeline-stage-box", children: [_jsx("div", { className: "stage-box-color", style: { background: stage.color } }), _jsx("span", { children: stage.name })] }), index < savedStages.length - 1 && (_jsx("div", { className: "pipeline-arrow", children: _jsx(ArrowRight, { size: 16 }) }))] }, stage.id))) }), _jsx("div", { className: "setup-content", children: _jsxs("div", { className: "setup-card", children: [_jsxs("div", { className: "card-header", children: [_jsx("h3", { children: "Sales Pipeline Stages" }), _jsx("p", { children: "Define the stages your leads go through from creation to conversion" })] }), _jsx("div", { className: "stages-flow", children: stages.map((stage, index) => (_jsxs(React.Fragment, { children: [_jsxs("div", { className: "stage-item", children: [_jsx("div", { className: "stage-drag", children: _jsx(GripVertical, { size: 16 }) }), _jsx("div", { className: "stage-color", style: { background: stage.color } }), editingStage === stage.id ? (_jsxs("div", { className: "stage-edit-form", children: [_jsx("input", { type: "text", value: stage.name, onChange: (e) => handleUpdateStage(stage.id, e.target.value, stage.color), autoFocus: true }), _jsx("input", { type: "color", value: stage.color, onChange: (e) => handleUpdateStage(stage.id, stage.name, e.target.value) }), _jsx("button", { onClick: () => setEditingStage(null), children: _jsx(Check, { size: 16 }) })] })) : (_jsx("span", { className: "stage-name", onClick: () => setEditingStage(stage.id), children: stage.name })), _jsxs("div", { className: "stage-actions", children: [_jsx("button", { onClick: () => moveStage(index, -1), disabled: index === 0, children: "\u2191" }), _jsx("button", { onClick: () => moveStage(index, 1), disabled: index === stages.length - 1, children: "\u2193" }), _jsx("button", { onClick: () => handleDeleteStage(stage.id), className: "delete-btn", children: _jsx(Trash2, { size: 14 }) })] })] }), index < stages.length - 1 && (_jsx("div", { className: "stage-connector", children: _jsx(ArrowRight, { size: 16 }) }))] }, stage.id))) }), _jsxs("div", { className: "add-stage-form", children: [_jsx("input", { type: "text", placeholder: "New stage name", value: newStageName, onChange: (e) => setNewStageName(e.target.value) }), _jsxs("button", { onClick: handleAddStage, children: [_jsx(Plus, { size: 16 }), " Add Stage"] })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { className: "btn btn-secondary", onClick: handleReset, children: "Reset Changes" }), _jsxs("button", { className: "btn btn-primary", onClick: handleSave, children: [_jsx(Save, { size: 16 }), " Save Changes"] })] })] }) })] }));
};
export default SetupPage;
//# sourceMappingURL=Setup.js.map