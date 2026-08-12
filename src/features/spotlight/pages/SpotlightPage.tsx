import React from 'react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import SpotlightPanel from '../components/SpotlightPanel';

const SpotlightPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Spotlight"
        description="High-priority leads that need immediate attention."
      />
      <SpotlightPanel />
    </PageContainer>
  );
};

export default SpotlightPage;
