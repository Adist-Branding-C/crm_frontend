import { useState, useEffect } from 'react';
import { draftService, DraftType, Draft } from '../services/draftService';

export function useDrafts(type?: DraftType) {
  const [drafts, setDrafts] = useState<Draft[]>(() => draftService.getDrafts(type));

  useEffect(() => {
    const handleDraftsUpdated = () => {
      setDrafts(draftService.getDrafts(type));
    };

    window.addEventListener('drafts_updated', handleDraftsUpdated);
    return () => {
      window.removeEventListener('drafts_updated', handleDraftsUpdated);
    };
  }, [type]);

  return drafts;
}
