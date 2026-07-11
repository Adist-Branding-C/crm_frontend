import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, X, Plus, Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Account.css';
import SettingsTabs from '../components/SettingsTabs';
const subMenuItems = [
    { id: 'agent', title: 'Agent', link: '/account' },
    { id: 'roles', title: 'Roles', link: '/account/roles' },
    { id: 'department', title: 'Departments', link: '/account/department' },
    { id: 'workmode', title: 'Staff Work Modes', link: '/account/workmode' },
    { id: 'checkout', title: 'Checkout Note', link: '/account/checkout' },
    { id: 'designation', title: 'Designations', link: '/account/designation' },
    { id: 'branch', title: 'Branch', link: '/account/branch' },
    { id: 'mailconfig', title: 'Mail Configuration', link: '/account/mailconfig' },
    { id: 'emailtemplate', title: 'Email Template', link: '/account/emailtemplate' },
    { id: 'whatsapptemplate', title: 'Whatsapp Template', link: '/account/whatsapptemplate' },
    { id: 'profile', title: 'Profile', link: '/account/profile' },
    { id: 'password', title: 'Change Password', link: '/account/password' },
];
const departmentData = [
    { id: 1, name: 'core', description: '', agents: ['Fida Fathima', 'Nandana K', 'Rameesa', 'Aysha', 'Nesri', 'Rahmath', 'Lana'] },
    { id: 2, name: 'Tamil', description: '', agents: ['Dilshana'] },
];
const agentsList = [
    { id: 7774, name: 'Dr Expert Edulinks' },
    { id: 7775, name: 'Fida Fathima' },
    { id: 7776, name: 'Nandana K' },
    { id: 7777, name: 'Rameesa' },
    { id: 7778, name: 'Aysha' },
    { id: 7779, name: 'Nesri' },
    { id: 7789, name: 'Dilshana' },
    { id: 8473, name: 'Rahmath' },
    { id: 8640, name: 'Lana' },
];
const DepartmentPage = () => {
    const location = useLocation();
    const [showForm, setShowForm] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [deletingDepartment, setDeletingDepartment] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [selectedAgents, setSelectedAgents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
    const [showAgentDropdown, setShowAgentDropdown] = useState(false);
    const actionMenuRefs = useRef({});
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInside = Object.values(actionMenuRefs.current).some(ref => ref && ref.contains(event.target));
            if (!isClickInside) {
                setDropdownOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const calculateDropdownPosition = (buttonRef) => {
        if (!buttonRef)
            return { vertical: 'bottom', horizontal: 'right' };
        const rect = buttonRef.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const dropdownHeight = 150;
        const dropdownWidth = 140;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const spaceRight = viewportWidth - rect.right;
        let vertical = 'bottom';
        let horizontal = 'right';
        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
            vertical = 'top';
        }
        if (spaceRight < dropdownWidth && spaceRight < 100) {
            horizontal = 'left';
        }
        return { vertical, horizontal };
    };
    const filteredDepartments = departmentData.filter(dept => dept.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const toggleAgent = (agent) => {
        setSelectedAgents(prev => {
            if (prev.includes(agent.id)) {
                return prev.filter(id => id !== agent.id);
            }
            return [...prev, agent.id];
        });
    };
    const handleAddClick = () => {
        setShowForm(true);
        setEditingDepartment(null);
        setFormData({ name: '', description: '' });
        setSelectedAgents([]);
    };
    const handleEditClick = (dept) => {
        setShowForm(true);
        setEditingDepartment(dept);
        setFormData({ name: dept.name, description: dept.description || '' });
        const agentIds = dept.agents.map(name => {
            const agent = agentsList.find(a => a.name === name);
            return agent ? agent.id : null;
        }).filter(id => id !== null);
        setSelectedAgents(agentIds);
        setDropdownOpen(null);
    };
    const handleDeleteClick = (dept) => {
        setDeletingDepartment(dept);
        setDropdownOpen(null);
    };
    const handleConfirmDelete = () => {
        console.log('Deleting department:', deletingDepartment);
        setDeletingDepartment(null);
    };
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingDepartment(null);
        setFormData({ name: '', description: '' });
        setSelectedAgents([]);
    };
    return (_jsxs("div", { className: "account-page", children: [_jsx("div", { className: "account-layout", children: _jsxs("div", { className: "account-content", style: { width: '100%', maxWidth: '100%' }, children: [_jsx(PageHeader, { title: "Departments", description: "Create and manage departments for your organization", action: _jsxs("button", { className: "btn btn-primary", onClick: handleAddClick, children: [_jsx(Plus, { size: 16 }), " Add Department"] }) }), _jsx(SettingsTabs, {}), _jsxs("div", { className: "table-container", children: [_jsxs("div", { className: "table-header-controls", children: [_jsx("div", { className: "entries-select", children: _jsxs("label", { children: ["Show", _jsxs("select", { value: rowsPerPage, onChange: (e) => setRowsPerPage(Number(e.target.value)), children: [_jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "25", children: "25" }), _jsx("option", { value: "50", children: "50" }), _jsx("option", { value: "100", children: "100" })] }), "entries"] }) }), _jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: "Search", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] })] }), _jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Sl No" }), _jsx("th", { children: "Department" }), _jsx("th", { children: "Description" }), _jsx("th", { children: "Agents" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: filteredDepartments.slice(0, rowsPerPage).map((dept, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: dept.name }), _jsx("td", { children: dept.description || '-' }), _jsx("td", { children: dept.agents.join(', ') }), _jsx("td", { children: _jsxs("div", { className: "action-menu-container", style: { position: 'relative' }, children: [_jsx("button", { className: `action-btn ${dropdownOpen === dept.id ? 'active' : ''}`, ref: (el) => (actionMenuRefs.current[dept.id] = el), onClick: () => {
                                                                            if (dropdownOpen === dept.id) {
                                                                                setDropdownOpen(null);
                                                                            }
                                                                            else {
                                                                                const pos = calculateDropdownPosition(actionMenuRefs.current[dept.id]);
                                                                                setDropdownPosition(pos);
                                                                                setDropdownOpen(dept.id);
                                                                            }
                                                                        }, children: _jsx(MoreHorizontal, { size: 16 }) }), dropdownOpen === dept.id && (_jsxs("div", { className: `premium-dropdown action-dropdown ${dropdownPosition.vertical === 'top' ? 'dropup' : ''} ${dropdownPosition.horizontal === 'left' ? 'dropleft' : ''}`, children: [_jsxs("button", { className: "dropdown-item", onClick: () => handleEditClick(dept), children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("button", { className: "dropdown-item danger", onClick: () => handleDeleteClick(dept), children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) })] }, dept.id))) })] }) }), _jsx("div", { className: "table-footer", children: _jsxs("div", { className: "table-info", children: ["Showing 1 to ", Math.min(rowsPerPage, filteredDepartments.length), " of ", filteredDepartments.length, " entries"] }) })] })] }) }), showForm && (_jsx("div", { className: "drawer-overlay", onClick: handleCloseForm, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: editingDepartment ? 'Edit Department' : 'Add Department' }), _jsx("button", { className: "drawer-close", onClick: handleCloseForm, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", children: _jsxs("form", { children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Name ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "name", className: "form-control", placeholder: "Enter department name", value: formData.name, onChange: handleInputChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Description" }), _jsx("textarea", { className: "form-control", name: "description", placeholder: "Enter description", value: formData.description, onChange: handleInputChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Agents" }), _jsxs("div", { className: "multi-select-wrapper", children: [_jsx("div", { className: "multi-select-trigger", onClick: () => setShowAgentDropdown(!showAgentDropdown), children: _jsx("span", { children: selectedAgents.length > 0
                                                                ? `${selectedAgents.length} agents selected`
                                                                : 'Select Agents' }) }), showAgentDropdown && (_jsx("div", { className: "multi-select-dropdown", children: agentsList.map(agent => (_jsxs("label", { className: "multi-select-option", children: [_jsx("input", { type: "checkbox", checked: selectedAgents.includes(agent.id), onChange: () => toggleAgent(agent) }), _jsx("span", { children: agent.name })] }, agent.id))) }))] }), selectedAgents.length > 0 && (_jsx("div", { className: "selected-agents-tags", children: selectedAgents.map(id => {
                                                    const agent = agentsList.find(a => a.id === id);
                                                    return (_jsxs("span", { className: "agent-tag", children: [agent?.name, _jsx(X, { size: 12, onClick: () => toggleAgent(agent) })] }, id));
                                                }) }))] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: editingDepartment ? 'Update' : 'Save' }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: handleCloseForm, children: "Cancel" })] })] }) })] }) })), deletingDepartment && (_jsx("div", { className: "modal-overlay", onClick: () => setDeletingDepartment(null), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: "Confirm Delete" }), _jsx("button", { className: "modal-close", onClick: () => setDeletingDepartment(null), children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "modal-body", children: _jsxs("p", { className: "delete-warning", children: ["Are you sure you want to delete ", _jsx("strong", { children: deletingDepartment.name }), " department?"] }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-danger", onClick: handleConfirmDelete, children: "Confirm" }), _jsx("button", { className: "btn btn-secondary", onClick: () => setDeletingDepartment(null), children: "Cancel" })] })] }) }))] }));
};
export default DepartmentPage;
//# sourceMappingURL=Department.js.map