import { useMemo } from 'react';
import type { DashboardPeriod } from '../../types';
import { useDealPipeline } from '../../hooks/useDealPipeline';
import BarListWidget from './BarListWidget';

interface DealPipelineWidgetProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

const DealPipelineWidget = ({ period, from, to }: DealPipelineWidgetProps) => {
  const { data, isLoading, isError } = useDealPipeline(period, from, to);

  const barItems = useMemo(
    () => data.map((stage) => ({ id: stage.name, label: stage.name, value: stage.value, color: stage.color })),
    [data],
  );

  return (
    <BarListWidget
      title="Deal pipeline"
      items={barItems}
      isLoading={isLoading}
      isError={isError}
      errorText="Failed to load deal pipeline"
      emptyText="No deal statuses found"
      skeletonRows={5}
    />
  );
};

export default DealPipelineWidget;
