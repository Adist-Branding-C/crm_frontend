import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import FollowupPanel from '../components/FollowupPanel';
import './FollowupRequiredPage.css';

const FollowupRequiredPage = () => {
  return (
    <PageContainer>
      <PageHeader
        title="Followup Required"
        description="Leads whose next follow-up date is due today or overdue."
      />

      <FollowupPanel />
    </PageContainer>
  );
};

export default FollowupRequiredPage;
