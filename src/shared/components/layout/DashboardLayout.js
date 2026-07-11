import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, createContext, useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import AddLeadDrawer from '../drawers/AddLeadDrawer';
import AddDealDrawer from '../drawers/AddDealDrawer';
import AddDealTaskDrawer from '../drawers/AddDealTaskDrawer';
import AddCampaignDrawer from '../drawers/AddCampaignDrawer';
import { DrawerType } from '../../constants/enums';
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
        setDrawerState({ type: type, isOpen: true });
    };
    const handleCloseDrawer = () => {
        setDrawerState({ type: null, isOpen: false });
    };
    const noop = () => { };
    return (_jsx(LoadingContext.Provider, { value: { isLoading, setLoading: setIsLoading }, children: _jsxs("div", { className: "layout-container", children: [_jsx(Sidebar, {}), _jsx("div", { className: "main-content", children: _jsxs("div", { className: "page-content", children: [_jsx(TopNav, { onOpenDrawer: handleOpenDrawer }), isLoading && (_jsx("div", { className: "page-loader", children: _jsx("div", { className: "loader-spinner" }) })), _jsx("div", { className: "page-body", style: { opacity: isLoading ? 0.3 : 1 }, children: _jsx(Outlet, {}) })] }) }), drawerState.isOpen && drawerState.type === DrawerType.LEAD && (_jsx(AddLeadDrawer, { isOpen: drawerState.isOpen, onClose: handleCloseDrawer })), drawerState.isOpen && drawerState.type === DrawerType.DEAL && (_jsx(AddDealDrawer, { isOpen: drawerState.isOpen, onClose: handleCloseDrawer, onSave: noop })), drawerState.isOpen && drawerState.type === DrawerType.TASK && (_jsx(AddDealTaskDrawer, { isOpen: drawerState.isOpen, onClose: handleCloseDrawer, onSave: noop })), drawerState.isOpen && drawerState.type === DrawerType.CAMPAIGN && (_jsx(AddCampaignDrawer, { isOpen: drawerState.isOpen, onClose: handleCloseDrawer, onSave: noop }))] }) }));
};
export default DashboardLayout;
//# sourceMappingURL=DashboardLayout.js.map