import React from 'react';
import { Route } from 'react-router-dom';
import DealsPage from '../features/deals/pages/DealsPage';
import DealTypePage from '../features/deal-settings/type/pages/DealTypePage';
import DealStatusPage from '../features/deal-settings/status/pages/DealStatusPage';
import DealAdditionalFieldPage from '../features/deal-settings/additional-fields/pages/DealAdditionalFieldPage';

export default (
  <>
    <Route path="user/deals" element={<DealsPage />} />
    <Route path="user/deal-types" element={<DealTypePage />} />
    <Route path="user/deal-stages" element={<DealStatusPage />} />
    <Route path="user/additional-fields-deal" element={<DealAdditionalFieldPage />} />
  </>
);
