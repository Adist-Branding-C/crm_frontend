import React from 'react';
import { Route } from 'react-router-dom';
import DealStatusPage from '../features/deal-settings/status/pages/DealStatusPage';
import DealAdditionalFieldPage from '../features/deal-settings/additional-fields/pages/DealAdditionalFieldPage';
import DealBoardPage from '../features/deal-board/pages/DealBoardPage';
import DealAnalyticsPage from '../features/deal-analytics/pages/DealAnalyticsPage';

export default (
  <>
    <Route path="user/deals" element={<DealBoardPage />} />
    <Route path="user/deal-analytics" element={<DealAnalyticsPage />} />
    <Route path="user/deal-stages" element={<DealStatusPage />} />
    <Route path="user/additional-fields-deal" element={<DealAdditionalFieldPage />} />
  </>
);
