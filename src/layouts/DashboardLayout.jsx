import React, { useState, createContext, useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNav from '../shared/components/layout/TopNav';
import AddLeadDrawer from '../components/AddLeadDrawer';
import AddDealDrawer from '../components/AddDealDrawer';
import AddDealTaskDrawer from '../components/AddDealTaskDrawer';
import AddCampaignDrawer from '../components/AddCampaignDrawer';
import './DashboardLayout.css';

const LoadingContext = createContext({
  isLoading: false,
  setLoading: () => {}
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
          <AddDealDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} />
        )}
        {drawerState.isOpen && drawerState.type === 'task' && (
          <AddDealTaskDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} />
        )}
        {drawerState.isOpen && drawerState.type === 'campaign' && (
          <AddCampaignDrawer isOpen={drawerState.isOpen} onClose={handleCloseDrawer} />
        )}
      </div>
    </LoadingContext.Provider>
  );
};

export default DashboardLayout;