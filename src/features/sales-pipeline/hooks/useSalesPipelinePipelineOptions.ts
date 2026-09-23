import { useState, useEffect } from 'react';
import { dealPipelineService } from '../../deal-pipeline-builder/services/dealPipeline.service';
import { leadPipelineService } from '../../lead-pipeline-builder/services/leadPipeline.service';
import type { ActiveView } from '../types';

interface PipelineOption {
  id: string;
  name: string;
}

/**
 * Fetches the pipeline list for the board's active view and owns which one
 * is selected. Deals and Leads each have their own separate set of
 * pipelines (different id spaces, different backend endpoints) - this
 * switches which service it calls based on `activeView`, and resets the
 * selection whenever the view changes so a Deal pipeline id is never
 * mistakenly sent as a Lead pipeline id or vice versa. Tasks have no
 * pipeline concept, so the options list is empty for that view.
 *
 * The fetched list's own default pipeline (isDefault) is auto-selected by
 * its real id, rather than leaving selection on an empty-string "use the
 * default" placeholder - a placeholder literally labelled "Default
 * pipeline" would otherwise sit right next to a real pipeline whose *name*
 * also happens to be "Default Pipeline", showing what looks like the same
 * option twice.
 *
 * Used by:
 * - SalesPipelinePage
 */
export function useSalesPipelinePipelineOptions(activeView: ActiveView) {
  const [pipelineOptions, setPipelineOptions] = useState<PipelineOption[]>([]);
  const [selectedPipelineId, setSelectedPipelineId] = useState('');

  useEffect(() => {
    setSelectedPipelineId('');
    if (activeView === 'tasks') {
      setPipelineOptions([]);
      return;
    }
    let cancelled = false;
    const service = activeView === 'deals' ? dealPipelineService : leadPipelineService;
    service
      .getAllPipelines()
      .then((pipelines) => {
        if (cancelled) return;
        setPipelineOptions(pipelines.map((p) => ({ id: p.id, name: p.name })));
        const defaultPipeline = pipelines.find((p) => p.isDefault) ?? pipelines[0];
        if (defaultPipeline) setSelectedPipelineId(defaultPipeline.id);
      })
      .catch(() => {
        if (!cancelled) setPipelineOptions([]);
      });
    return () => {
      cancelled = true;
    };
  }, [activeView]);

  return { pipelineOptions, selectedPipelineId, setSelectedPipelineId };
}
