import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import AddLeadDrawer from '../components/AddLeadDrawer';
import AddDealDrawer from '../components/AddDealDrawer';
import AddDealTaskDrawer from '../components/AddDealTaskDrawer';
import AddCampaignDrawer from '../components/AddCampaignDrawer';
import './DashboardLayout.css';
const LoadingContext = createContext({
    isLoading: false,
    setLoading: () => { }
});
export const useLoading = () => useContext(LoadingContext);
const DashboardLayout = () => {
    const [drawerState, setDrawerState] = useState({ type: null, isOpen: false });
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, [location.pathname]);
    const handleOpenDrawer = (type) => {
        setDrawerState({ type, isOpen: true });
    };
    const handleCloseDrawer = () => {
        setDrawerState({ type: null, isOpen: false });
    };
    return (_jsx(LoadingContext.Provider, { value: { isLoading, setLoading: setIsLoading }, children: _jsxs("div", { className: "layout-container", children: [_jsx(Sidebar, {}), _jsx("div", { className: "main-content", children: _jsxs("div", { className: "page-content", children: [_jsx(TopNav, { onOpenDrawer: handleOpenDrawer }), isLoading && (_jsx("div", { className: "page-loader", children: _jsx("div", { className: "loader-spinner" }) })), _jsx("div", { className: "page-body", style: { opacity: isLoading ? 0.3 : 1 }, children: _jsx(Outlet, {}) })] }) }), drawerState.isOpen && drawerState.type === 'lead' && (_jsx(AddLeadDrawer, { isOpen: drawerState.isOpen, onClose: handleCloseDrawer })), drawerState.isOpen && drawerState.type === 'deal' && (_jsx(AddDealDrawer, { isOpen: drawerState.isOpen, onClose: handleCloseDrawer })), drawerState.isOpen && drawerState.type === 'task' && (_jsx(AddDealTaskDrawer, { isOpen: drawerState.isOpen, onClose: handleCloseDrawer })), drawerState.isOpen && drawerState.type === 'campaign' && (_jsx(AddCampaignDrawer, { isOpen: drawerState.isOpen, onClose: handleCloseDrawer }))] }) }));
};
export default DashboardLayout;
//# sourceMappingURL=DashboardLayout.js.map