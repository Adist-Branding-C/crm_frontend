import React, { useState, createContext, useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import MobileSidebar from './MobileSidebar';
import AddLeadDrawer from '../drawers/AddLeadDrawer';
import AddDealDrawer from '../drawers/AddDealDrawer';
import AddDealTaskDrawer from '../drawers/AddDealTaskDrawer';
import AddCampaignDrawer from '../drawers/AddCampaignDrawer';
import { DrawerType } from '../../constants/enums';
import './DashboardLayout.css';

const LoadingContext = createContext<{
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoading: false,
  setLoading: () => {}
});

export const useLoading = () => useContext(LoadingContext);

const DashboardLayout = () => {
  const [drawerState, setDrawerState] = useState<{ type: DrawerType | null; isOpen: boolean }>({ type: null, isOpen: false });
  const [isLoading, setIsLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleOpenDrawer = (type: string) => {
    setDrawerState({ type: type as DrawerType, isOpen: true });
  };

  const handleCloseDrawer = () => {
    setDrawerState({ type: null, isOpen: false });
  };

  const noop = () => {};

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      <div className="layout-container">
        <Sidebar />
        <MobileSidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
        <div className="main-content">
          <div className="page-content">
            <TopNav onOpenDrawer={handleOpenDrawer} onToggleMobileSidebar={() => setMobileSidebarOpen(prev => !prev)} />
            {isLoading && (
              <div className="page-loader">
                <div className="loader-spinner"></div>
              </div>
            )}
            <div className="page-body" style={{ opacity: isLoading ? 0.3 : 1 }}>
              <Outlet />
            </div>
          </div>
        </div>
        {drawerState.isOpen && drawerState.type === DrawerType.LEAD && (
          <AddLeadDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} />
        )}
        {drawerState.isOpen && drawerState.type === DrawerType.DEAL && (
          <AddDealDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} onSave={noop} />
        )}
        {drawerState.isOpen && drawerState.type === DrawerType.TASK && (
          <AddDealTaskDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} onSave={noop} />
        )}
        {drawerState.isOpen && drawerState.type === DrawerType.CAMPAIGN && (
          <AddCampaignDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} onSave={noop} />
        )}
      </div>
    </LoadingContext.Provider>
  );
};

export default DashboardLayout;