import { useMemo } from 'react';
import { CHART_PALETTE, CHART_PALETTE_DEFAULT } from '../../../../shared/constants/chartPalette';
import { getColorForIndex } from '../../../../shared/utils/chartUtils';
import BarListWidget from './BarListWidget';
import type { LeadSourceCountItem } from '../../types';

interface LeadSourceWidgetProps {
  items?: LeadSourceCountItem[] | undefined;
  isLoading?: boolean | undefined;
  isError?: boolean | undefined;
}

const LeadSourceWidget = ({ items = [], isLoading, isError }: LeadSourceWidgetProps) => {
  const barItems = useMemo(
    () =>
      items.map((item, index) => ({
        id: item.sourceId,
        label: item.source,
        value: item.count,
        color: getColorForIndex(index, CHART_PALETTE, CHART_PALETTE_DEFAULT),
      })),
    [items],
  );

  return (
    <BarListWidget
      title="Lead source"
      items={barItems}
      isLoading={isLoading}
      isError={isError}
      errorText="Failed to load lead source statistics"
      emptyText="No leads in this period"
      skeletonRows={5}
    />
  );
};

export default LeadSourceWidget;
