import React, { useState, createContext, useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import AddLeadDrawer from '../drawers/AddLeadDrawer';
import AddDealDrawer from '../drawers/AddDealDrawer';
import AddDealTaskDrawer from '../drawers/AddDealTaskDrawer';
import AddCampaignDrawer from '../drawers/AddCampaignDrawer';
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
  const [drawerState, setDrawerState] = useState<{ type: string | null; isOpen: boolean }>({ type: null, isOpen: false });
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleOpenDrawer = (type: string) => {
    setDrawerState({ type, isOpen: true });
  };

  const handleCloseDrawer = () => {
    setDrawerState({ type: null, isOpen: false });
  };

  const noop = () => {};

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      <div className="layout-container">
        <Sidebar />
        <div className="main-content">
          <div className="page-content">
            <TopNav onOpenDrawer={handleOpenDrawer} />
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
        {drawerState.isOpen && drawerState.type === 'lead' && (
          <AddLeadDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} />
        )}
        {drawerState.isOpen && drawerState.type === 'deal' && (
          <AddDealDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} onSave={noop} />
        )}
        {drawerState.isOpen && drawerState.type === 'task' && (
          <AddDealTaskDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} onSave={noop} />
        )}
        {drawerState.isOpen && drawerState.type === 'campaign' && (
          <AddCampaignDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} onSave={noop} />
        )}
      </div>
    </LoadingContext.Provider>
  );
};

export default DashboardLayout;