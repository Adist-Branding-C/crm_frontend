import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import PageContainer from '../../../../shared/components/layout/PageContainer';
import { companyDataService } from '../../services/companyDataService';
import { mapApiToUI } from '../../mappers/companyMapper';
import { useCompanySubscription } from '../hooks/useCompanySubscription';
import { useSubscriptionHistory } from '../hooks/useSubscriptionHistory';
import { useRenewalQueue } from '../hooks/useRenewalQueue';
import SubscriptionOverviewCard from '../components/SubscriptionOverviewCard';
import AssignSubscriptionForm from '../components/AssignSubscriptionForm';
import RenewalQueueSection from '../components/RenewalQueueSection';
import SubscriptionHistoryTable from '../components/SubscriptionHistoryTable';
import type { Company } from '../../types';
import type { CreateSubscriptionPayload, UpdateStaffCountPayload, UpdateSubscriptionStatusPayload } from '../types/request';
import './CompanySubscriptionPage.css';

const CompanySubscriptionPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [companyError, setCompanyError] = useState('');

  const subscriptionState = useCompanySubscription(companyId);
  const historyState = useSubscriptionHistory(companyId);
  const queueState = useRenewalQueue(companyId);

  useEffect(() => {
    if (!companyId) return;
    companyDataService.getCompany(companyId)
      .then((res) => {
        if (res.status && res.data) {
          setCompany(mapApiToUI(res.data));
        } else {
          setCompanyError(res.message || 'Company not found');
        }
      })
      .catch(() => setCompanyError('Failed to load company'));
  }, [companyId]);

  if (!companyId) return null;

  // Every subscription mutation appends a new history row server-side - refetch history
  // alongside the subscription itself rather than baking that coordination into either hook.
  const createSubscription = async (payload: CreateSubscriptionPayload) => {
    const success = await subscriptionState.createSubscription(payload);
    if (success) await historyState.refetch();
    return success;
  };

  const updateStaffCount = async (payload: UpdateStaffCountPayload) => {
    const success = await subscriptionState.updateStaffCount(payload);
    if (success) await historyState.refetch();
    return success;
  };

  const updateStatus = async (payload: UpdateSubscriptionStatusPayload) => {
    const success = await subscriptionState.updateStatus(payload);
    if (success) await historyState.refetch();
    return success;
  };

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
          onSubmit={createSubscription}
        />
      ) : subscriptionState.subscription ? (
        <>
          <SubscriptionOverviewCard
            subscription={subscriptionState.subscription}
            isSaving={subscriptionState.isSaving}
            error={subscriptionState.saveError}
            onClearError={() => subscriptionState.setSaveError('')}
            onUpdateStaffCount={updateStaffCount}
            onUpdateStatus={updateStatus}
          />

          <RenewalQueueSection
            companyId={companyId}
            queue={queueState.queue}
            isLoading={queueState.isLoading}
            isSaving={queueState.isSaving}
            error={queueState.saveError}
            onClearError={() => queueState.setSaveError('')}
            onCreate={async (payload) => {
              // An immediate=true queue creation renews the subscription right away on the
              // backend - refetch subscription + history too, not just the queue.
              const success = await queueState.createQueue(payload);
              if (success && payload.immediate) {
                await subscriptionState.refetchSubscription();
                await historyState.refetch();
              }
              return success;
            }}
            onUpdate={queueState.updateQueue}
            onDelete={queueState.deleteQueue}
            onApplyNow={async () => {
              const success = await queueState.applyNow();
              if (success) {
                await subscriptionState.refetchSubscription();
                await historyState.refetch();
              }
              return success;
            }}
          />

          <SubscriptionHistoryTable history={historyState.history} isLoading={historyState.isLoading} />
        </>
      ) : null}
    </PageContainer>
  );
};

export default CompanySubscriptionPage;
