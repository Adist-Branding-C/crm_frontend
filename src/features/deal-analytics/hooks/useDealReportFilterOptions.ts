import { useMemo } from 'react';
import { useDealPipelineList } from '../../deal-pipeline-builder/hooks/useDealPipelineList';
import { useStaffList } from '../../deal/hooks/useStaffList';

export interface DealReportSelectOption {
  label: string;
  value: number;
}

export interface DealReportStringSelectOption {
  label: string;
  value: string;
}


export function useDealReportFilterOptions() {
  const { pipelines, isLoading: pipelinesLoading } = useDealPipelineList();
  const { staff, isLoading: staffLoading } = useStaffList();

  const pipelineOptions = useMemo<DealReportSelectOption[]>(
    () => pipelines.map((p) => ({ label: p.name, value: Number(p.id) })),
    [pipelines],
  );

  const staffOptions = useMemo<DealReportSelectOption[]>(
    () => staff.map((s) => ({ label: s.label, value: Number(s.value) })),
    [staff],
  );


  const deletedByOptions = useMemo<DealReportStringSelectOption[]>(
    () => staff.filter((s) => s.staffId).map((s) => ({ label: s.label, value: s.staffId as string })),
    [staff],
  );

  return {
    pipelineOptions,
    staffOptions,
    deletedByOptions,
    isLoading: pipelinesLoading || staffLoading,
  };
}
