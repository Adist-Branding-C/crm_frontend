import React from 'react';
import { Route } from 'react-router-dom';
import DealTypePage from '../features/deal-settings/type/pages/DealTypePage';
import DealStatusPage from '../features/deal-settings/status/pages/DealStatusPage';
import DealAdditionalFieldPage from '../features/deal-settings/additional-fields/pages/DealAdditionalFieldPage';
import DealPage from '../features/deal/pages/DealPage';

export default (
  <>
    <Route path="user/deals" element={<DealPage />} />
    <Route path="user/deal-types" element={<DealTypePage />} />
    <Route path="user/deal-stages" element={<DealStatusPage />} />
    <Route path="user/additional-fields-deal" element={<DealAdditionalFieldPage />} />
  </>
);
