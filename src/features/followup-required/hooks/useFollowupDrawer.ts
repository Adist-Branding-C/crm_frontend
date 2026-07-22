import { useState } from 'react';
import type { FollowupLead } from '../types';

/**
 * Owns the lead-detail-drawer open/close state for the follow-up list.
 *
 * Used by:
 * - FollowupRequiredPage (composed alongside fetch/filters/sort/pagination).
 */
export function useFollowupDrawer() {
  const [selectedLead, setSelectedLead] = useState<FollowupLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewLead = (row: FollowupLead) => {
    setSelectedLead(row);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedLead(null);
  };


  const updateSelectedLead = (patch: Partial<FollowupLead>) => {
    setSelectedLead((current) => (current ? { ...current, ...patch } : current));
  };

  return { selectedLead, isDrawerOpen, handleViewLead, handleCloseDrawer, updateSelectedLead };
}
