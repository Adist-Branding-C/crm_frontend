import { useState, useEffect } from 'react';
import type { AxiosError } from 'axios';
import { leadService } from '../services/lead.service';

/**
 * Shape of `GET /leads/by-id/:id` - the sanitized Leads entity with its
 * VirtualColumn relations hydrated. Only the fields the deal drawer's Lead
 * profile tab renders are typed here.
 */
export interface DealLeadProfile {
  id: number;
  leadId?: string;
  name?: string;
  phone?: string;
  countryCode?: string | null;
  email?: string | null;
  location?: string | null;
  address?: string | null;
  notes?: string | null;
  type?: { type?: string } | null;
  status?: { status?: string; color?: string | null } | null;
  source?: { source?: string } | null;
  purpose?: { purpose?: string } | null;
  assignedStaff?: { name?: string } | null;
  createdByName?: string | null;
  nextFollowUpDate?: string | null;
  createdAt?: string;
  additionalFields?: Array<{ fieldId: string; name: string; value: string }>;
}

/**
 * Full parent-lead profile for the "Lead" tab in DealDetailContent. Fetches
 * only while the drawer is open and that tab is active (mirrors
 * useDealActivities), keyed on the deal's numeric leadId.
 *
 * Used by:
 * - DealDetailContent
 */
export function useDealLead(
  leadId: string | number | undefined,
  isOpen: boolean,
  activeTab?: string,
) {
  const [lead, setLead] = useState<DealLeadProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shouldFetch = isOpen && !!leadId && activeTab === 'lead';

  useEffect(() => {
    if (!shouldFetch) {
      if (!isOpen) {
        setLead(null);
        setError(null);
      }
      return;
    }

    let cancelled = false;

    const fetchLead = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await leadService.getLeadByPk(leadId as string | number);
        if (cancelled) return;
        if (res.status && res.data) {
          setLead(res.data as DealLeadProfile);
        } else {
          setError(res.message || 'Failed to load lead');
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
            'Failed to load lead',
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchLead();

    return () => {
      cancelled = true;
    };
  }, [leadId, shouldFetch, isOpen]);

  return { lead, isLoading, error };
}
