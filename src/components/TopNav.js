import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Grid, Plus, ChevronDown, X, User, DollarSign, ListChecks, Megaphone, FileText, Phone, UserCircle, Settings, Users, CreditCard, Shield, HelpCircle, LogOut, Building, Check, PhoneCall, Calendar, AlertCircle, Info, Layout } from 'lucide-react';
import './TopNav.css';
const addOptions = [
    { id: 'lead', name: 'Lead', icon: User },
    { id: 'deal', name: 'Deal', icon: DollarSign },
    { id: 'task', name: 'Task', icon: ListChecks },
    { id: 'campaign', name: 'Campaign', icon: Megaphone },
];
const initialNotifications = [
    { id: 1, type: 'lead', title: 'New lead assigned', message: 'Rahul Sharma has been assigned to you', time: '2 mins ago', isRead: false, link: '/leads' },
    { id: 2, type: 'reminder', title: 'Follow-up reminder', message: 'Call Priya Patel today at 4:30 PM', time: '10 mins ago', isRead: false, link: '/user/tasks' },
    { id: 3, type: 'task', title: 'Task completed', message: 'John Doe completed Sales Report task', time: 'Today, 11:20 AM', isRead: false, link: '/user/tasks' },
    { id: 4, type: 'payment', title: 'Payment received', message: 'Subscription payment of ₹5,000 successful', time: 'Yesterday', isRead: true, link: '/user/payment-plans' },
    { id: 5, type: 'call', title: 'Missed call', message: 'You missed a call from +91 98765 43210', time: 'Yesterday, 3:45 PM', isRead: true, link: '/leads' },
    { id: 6, type: 'system', title: 'System update', message: 'CRM dashboard will be under maintenance tonight', time: '2 days ago', isRead: true, link: '/settings' },
    { id: 7, type: 'deal', title: 'Deal won', message: 'Website Development deal has been marked as won', time: '3 days ago', isRead: true, link: '/user/deals' },
];
const getNotificationIcon = (type) => {
    const icons = {
        lead: { icon: User, color: '#3b82f6' },
        task: { icon: ListChecks, color: '#f59e0b' },
        reminder: { icon: Calendar, color: '#8b5cf6' },
        payment: { icon: CreditCard, color: '#10b981' },
        call: { icon: PhoneCall, color: '#14b8a6' },
        system: { icon: Info, color: '#64748b' },
        deal: { icon: DollarSign, color: '#10b981' },
    };
    return icons[type] || { icon: Bell, color: '#64748b' };
};
const searchCategories = [
    { id: 'lead', name: 'Leads', icon: User, color: '#3b82f6' },
    { id: 'deal', name: 'Deals', icon: DollarSign, color: '#10b981' },
    { id: 'task', name: 'Tasks', icon: ListChecks, color: '#f59e0b' },
    { id: 'campaign', name: 'Campaigns', icon: Megaphone, color: '#8b5cf6' },
    { id: 'enquiry', name: 'Enquiries', icon: FileText, color: '#ec4899' },
    { id: 'call', name: 'Calls', icon: Phone, color: '#14b8a6' },
];
const searchResults = [
    { id: 1, category: 'lead', name: 'Rahul Sharma', phone: '9876543210', description: 'New Lead - Hotel' },
    { id: 2, category: 'lead', name: 'Priya Patel', phone: '9876543211', description: 'Hot Lead - Real Estate' },
    { id: 3, category: 'deal', name: 'Website Development', phone: 'DL001', description: 'Deal - ₹1,50,000' },
    { id: 4, category: 'deal', name: 'CRM Implementation', phone: 'DL002', description: 'Deal - ₹2,00,000' },
    { id: 5, category: 'task', name: 'Follow up with Rahul', phone: 'Task-001', description: 'Call Task' },
    { id: 6, category: 'campaign', name: 'Summer Sale 2026', phone: 'Campaign-001', description: 'Active Campaign' },
    { id: 7, category: 'enquiry', name: 'John Doe', phone: '9876543212', description: 'Enquiry - Demo' },
    { id: 8, category: 'call', name: 'Call Log - Priya', phone: 'Call-001', description: 'Incoming Call' },
];
const TopNav = ({ onOpenDrawer }) => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(initialNotifications);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
    const [showAddDropdown, setShowAddDropdown] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
    const profileRef = useRef(null);
    const notificationsRef = useRef(null);
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const currentUser = {
        name: 'Sharun das',
        email: 'sharun@company.com',
        role: 'Admin',
        avatar: null
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setShowNotificationsDrawer(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };
    const handleNotificationClick = (notification) => {
        setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n));
        if (notification.link) {
            navigate(notification.link);
            setShowNotificationsDrawer(false);
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentOptionIndex((prev) => (prev + 1) % addOptions.length);
                setIsAnimating(false);
            }, 300);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    const filteredResults = useMemo(() => {
        if (!searchQuery || searchQuery.length < 2)
            return [];
        const query = searchQuery.toLowerCase();
        return searchResults.filter(item => item.name.toLowerCase().includes(query) ||
            item.phone.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)).slice(0, 8);
    }, [searchQuery]);
    const currentOption = addOptions[currentOptionIndex];
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1));
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        }
        else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            handleResultClick(filteredResults[selectedIndex]);
        }
        else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };
    const handleResultClick = (result) => {
        console.log('Navigate to:', result.category, result);
        setSearchQuery('');
        setShowSuggestions(false);
    };
    const handleAddClick = (option) => {
        if (onOpenDrawer) {
            onOpenDrawer(option.id);
        }
        setShowAddDropdown(false);
    };
    const getCategoryIcon = (categoryId) => {
        const cat = searchCategories.find(c => c.id === categoryId);
        if (cat) {
            const Icon = cat.icon;
            return _jsx(Icon, { size: 14, style: { color: cat.color } });
        }
        return null;
    };
    return (_jsxs("div", { className: "topnav", children: [_jsxs("div", { className: "search-container", children: [_jsxs("div", { className: "search-bar", children: [_jsx(Search, { size: 18, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search leads, deals, tasks...", className: "search-input dashboard-search-input", value: searchQuery, onChange: (e) => { setSearchQuery(e.target.value); setShowSuggestions(true); setSelectedIndex(-1); }, onFocus: () => setShowSuggestions(true), onKeyDown: handleKeyDown })] }), showSuggestions && searchQuery.length >= 2 && (_jsx("div", { className: "search-suggestions", children: filteredResults.length > 0 ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "suggestion-category", children: ["Search Results (", filteredResults.length, ")"] }), filteredResults.map((result, index) => (_jsxs("div", { className: `suggestion-item ${index === selectedIndex ? 'selected' : ''}`, onClick: () => handleResultClick(result), children: [_jsx("div", { className: "suggestion-icon", children: getCategoryIcon(result.category) }), _jsxs("div", { className: "suggestion-content", children: [_jsx("div", { className: "suggestion-name", children: result.name }), _jsx("div", { className: "suggestion-desc", children: result.description })] }), _jsx("div", { className: "suggestion-category-label", children: searchCategories.find(c => c.id === result.category)?.name })] }, result.id)))] })) : (_jsx("div", { className: "no-results", children: "No results found" })) }))] }), _jsxs("div", { className: "topnav-actions", children: [_jsxs("div", { className: "add-button-group", children: [_jsx("button", { className: "btn-add", onClick: () => setShowAddDropdown(!showAddDropdown), children: _jsxs("span", { className: `add-text-container ${isAnimating ? 'animating' : ''}`, children: [_jsx(Plus, { size: 16 }), _jsxs("span", { className: "add-text", children: ["Add ", currentOption.name] })] }) }), _jsx("button", { className: "btn-add-dropdown", onClick: () => setShowAddDropdown(!showAddDropdown), children: _jsx(ChevronDown, { size: 14 }) }), showAddDropdown && (_jsx("div", { className: "add-dropdown", children: addOptions.map(option => {
                                    const Icon = option.icon;
                                    return (_jsxs("div", { className: "add-dropdown-item", onClick: () => handleAddClick(option), children: [_jsx(Icon, { size: 14 }), _jsxs("span", { children: ["Add ", option.name] })] }, option.id));
                                }) }))] }), _jsx("div", { className: "icon-btn-container", children: _jsxs("button", { className: "icon-btn notification-btn", ref: notificationsRef, onClick: () => setShowNotificationsDrawer(!showNotificationsDrawer), children: [_jsx(Bell, { size: 18, className: "bell-icon" }), unreadCount > 0 && (_jsx("span", { className: "notification-badge", children: unreadCount > 99 ? '99+' : unreadCount }))] }) }), showNotificationsDrawer && (_jsxs("div", { className: "notifications-drawer", children: [_jsx("div", { className: "notifications-backdrop", onClick: () => setShowNotificationsDrawer(false) }), _jsxs("div", { className: "notifications-panel", children: [_jsxs("div", { className: "notifications-header", children: [_jsx("h3", { children: "Notifications" }), _jsxs("div", { className: "notifications-header-actions", children: [unreadCount > 0 && (_jsxs("button", { className: "mark-all-read", onClick: handleMarkAllRead, children: [_jsx(Check, { size: 14 }), _jsx("span", { children: "Mark all read" })] })), _jsx("button", { className: "notifications-close", onClick: () => setShowNotificationsDrawer(false), children: _jsx(X, { size: 18 }) })] })] }), _jsx("div", { className: "notifications-list", children: notifications.map(notification => {
                                            const { icon: Icon, color } = getNotificationIcon(notification.type);
                                            return (_jsxs("div", { className: `notification-item ${!notification.isRead ? 'unread' : ''}`, onClick: () => handleNotificationClick(notification), children: [_jsx("div", { className: "notification-indicator", style: { backgroundColor: color } }), _jsx("div", { className: "notification-icon", style: { backgroundColor: `${color}15`, color }, children: _jsx(Icon, { size: 16 }) }), _jsxs("div", { className: "notification-content", children: [_jsx("div", { className: "notification-title", children: notification.title }), _jsx("div", { className: "notification-message", children: notification.message }), _jsx("div", { className: "notification-time", children: notification.time })] }), !notification.isRead && _jsx("div", { className: "notification-dot" })] }, notification.id));
                                        }) }), _jsx("div", { className: "notifications-footer", children: _jsx("button", { className: "view-all-btn", onClick: () => navigate('/notifications'), children: "View All Notifications" }) })] })] })), _jsxs("div", { className: "user-profile", ref: profileRef, children: [_jsxs("div", { className: "user-profile-trigger", onClick: () => setShowProfileDropdown(!showProfileDropdown), children: [_jsx("div", { className: "avatar", children: currentUser.avatar ? (_jsx("img", { src: currentUser.avatar, alt: currentUser.name })) : (_jsx(UserIcon, {})) }), _jsx("span", { className: "user-name", children: currentUser.name }), _jsx(ChevronDown, { size: 14, className: "dropdown-icon" })] }), showProfileDropdown && (_jsxs("div", { className: "profile-dropdown", children: [_jsxs("div", { className: "profile-dropdown-header", children: [_jsx("div", { className: "profile-avatar-large", children: _jsx(UserIcon, {}) }), _jsxs("div", { className: "profile-info", children: [_jsx("div", { className: "profile-name", children: currentUser.name }), _jsx("div", { className: "profile-email", children: currentUser.email }), _jsx("div", { className: "profile-role", children: currentUser.role })] })] }), _jsx("div", { className: "profile-dropdown-divider" }), _jsxs("div", { className: "profile-dropdown-links", children: [_jsxs("div", { className: "profile-dropdown-item", onClick: () => navigate('/account/profile'), children: [_jsx(UserCircle, { size: 16 }), _jsx("span", { children: "My Profile" })] }), _jsxs("div", { className: "profile-dropdown-item", onClick: () => navigate('/account'), children: [_jsx(Settings, { size: 16 }), _jsx("span", { children: "Account Settings" })] }), _jsxs("div", { className: "profile-dropdown-item", onClick: () => navigate('/setup'), children: [_jsx(Layout, { size: 16 }), _jsx("span", { children: "Setup" })] }), _jsxs("div", { className: "profile-dropdown-item", onClick: () => navigate('/settings/staff'), children: [_jsx(Users, { size: 16 }), _jsx("span", { children: "Team Management" })] }), _jsxs("div", { className: "profile-dropdown-item", onClick: () => navigate('/settings/notifications'), children: [_jsx(Bell, { size: 16 }), _jsx("span", { children: "Notifications" })] }), _jsxs("div", { className: "profile-dropdown-item", onClick: () => navigate('/settings/billing'), children: [_jsx(CreditCard, { size: 16 }), _jsx("span", { children: "Billing" })] }), _jsxs("div", { className: "profile-dropdown-item", onClick: () => navigate('/settings/security'), children: [_jsx(Shield, { size: 16 }), _jsx("span", { children: "Security" })] }), _jsxs("div", { className: "profile-dropdown-item", onClick: () => navigate('/settings/help'), children: [_jsx(HelpCircle, { size: 16 }), _jsx("span", { children: "Help Center" })] })] }), _jsx("div", { className: "profile-dropdown-divider" }), _jsxs("div", { className: "profile-dropdown-footer", children: [_jsxs("div", { className: "profile-dropdown-item logout-item", onClick: () => console.log('Logout'), children: [_jsx(LogOut, { size: 16 }), _jsx("span", { children: "Logout" })] }), _jsxs("div", { className: "profile-dropdown-item", onClick: () => console.log('Switch Workspace'), children: [_jsx(Building, { size: 16 }), _jsx("span", { children: "Switch Workspace" })] })] })] }))] })] })] }));
};
const UserIcon = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "12", cy: "7", r: "4" })] }));
export default TopNav;
//# sourceMappingURL=TopNav.js.map