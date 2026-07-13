import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import PageContainer from '../../../../shared/components/layout/PageContainer';
import { useCompany } from '../../hooks/useCompany';
import { useCompanySubscription } from '../hooks/useCompanySubscription';
import { useSubscriptionHistory } from '../hooks/useSubscriptionHistory';
import { useRenewalQueue } from '../hooks/useRenewalQueue';
import { useSubscriptionActions } from '../hooks/useSubscriptionActions';
import SubscriptionOverviewCard from '../components/SubscriptionOverviewCard';
import AssignSubscriptionForm from '../components/AssignSubscriptionForm';
import RenewalQueueSection from '../components/RenewalQueueSection';
import SubscriptionHistoryTable from '../components/SubscriptionHistoryTable';
import './CompanySubscriptionPage.css';

const CompanySubscriptionPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const { company, error: companyError } = useCompany(companyId);

  const subscriptionState = useCompanySubscription(companyId);
  const historyState = useSubscriptionHistory(companyId);
  const queueState = useRenewalQueue(companyId);
  const actions = useSubscriptionActions(subscriptionState, historyState, queueState);

  if (!companyId) return null;

  return (
    <PageContainer>
      <PageHeader
        title={company ? `${company.name} — Subscription` : 'Subscription'}
        description="Manage this company's billing subscription, renewal schedule, and history."
      />

      <Link to="/companies" className="subscription-back-link"><ArrowLeft size={16} /> Back to Companies</Link>

      {companyError && <div className="alert alert-danger">{companyError}</div>}

      {subscriptionState.isLoading ? (
        <div className="table-loading">Loading...</div>
      ) : subscriptionState.error ? (
        <div className="alert alert-danger">{subscriptionState.error}</div>
      ) : subscriptionState.notFound ? (
        <AssignSubscriptionForm
          companyId={companyId}
          isSaving={subscriptionState.isSaving}
          error={subscriptionState.saveError}
          onClearError={() => subscriptionState.setSaveError('')}
          onSubmit={actions.createSubscription}
        />
      ) : subscriptionState.subscription ? (
        <>
          <SubscriptionOverviewCard
            subscription={subscriptionState.subscription}
            isSaving={subscriptionState.isSaving}
            error={subscriptionState.saveError}
            onClearError={() => subscriptionState.setSaveError('')}
            onUpdateStaffCount={actions.updateStaffCount}
            onUpdateStatus={actions.updateStatus}
            onCancelSubscription={actions.cancelSubscription}
          />

          <RenewalQueueSection
            companyId={companyId}
            queue={queueState.queue}
            isLoading={queueState.isLoading}
            isSaving={queueState.isSaving}
            error={queueState.saveError}
            onClearError={() => queueState.setSaveError('')}
            onCreate={actions.createQueue}
            onUpdate={queueState.updateQueue}
            onDelete={queueState.deleteQueue}
            onApplyNow={actions.applyQueueNow}
          />

          <SubscriptionHistoryTable history={historyState.history} isLoading={historyState.isLoading} />
        </>
      ) : null}
    </PageContainer>
  );
};

export default CompanySubscriptionPage;
