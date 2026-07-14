import React from 'react';
import { Route } from 'react-router-dom';
import DealTypesPage from '../features/deal-types/pages/DealTypesPage';
import DealStagesPage from '../features/deal-stages/pages/DealStagesPage';
import DealAdditionalFieldsPage from '../features/deal-additional-fields/pages/DealAdditionalFieldsPage';
import DealPage from '../features/deal/pages/DealPage';

export default (
  <>
    <Route path="user/deals" element={<DealPage/>} />
    <Route path="user/deal-types" element={<DealTypesPage />} />
    <Route path="user/deal-stages" element={<DealStagesPage />} />
    <Route path="user/additional-fields-deal" element={<DealAdditionalFieldsPage />} />
  </>
);
