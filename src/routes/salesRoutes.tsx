import React from 'react';
import { Route } from 'react-router-dom';
import DealsPage from '../features/deal/pages/DealPage';
import DealStagesPage from '../features/deal-stages/pages/DealStagesPage';
import DealAdditionalFieldsPage from '../features/deal-additional-fields/pages/DealAdditionalFieldsPage';

export default (
  <>
    <Route path="user/deals" element={<DealsPage />} />
    {/* <Route path="user/deal-types" element={<DealTypesPage />} /> */}
    <Route path="user/deal-stages" element={<DealStagesPage />} />
    <Route path="user/additional-fields-deal" element={<DealAdditionalFieldsPage />} />
  </>
);
