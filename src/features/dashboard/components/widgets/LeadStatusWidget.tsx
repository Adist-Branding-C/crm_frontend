import { useMemo } from 'react';
import { CHART_PALETTE, CHART_PALETTE_DEFAULT } from '../../../../shared/constants/chartPalette';
import { getColorForIndex } from '../../../../shared/utils/chartUtils';
import BarListWidget from './BarListWidget';
import type { LeadStatusCountItem } from '../../types';

interface LeadStatusWidgetProps {
  items?: LeadStatusCountItem[] | undefined;
  isLoading?: boolean | undefined;
  isError?: boolean | undefined;
}

const LeadStatusWidget = ({ items = [], isLoading, isError }: LeadStatusWidgetProps) => {
  const barItems = useMemo(
    () =>
      items.map((item, index) => ({
        id: item.statusId,
        label: item.status,
        value: item.count,
        color: getColorForIndex(index, CHART_PALETTE, CHART_PALETTE_DEFAULT),
      })),
    [items],
  );

  return (
    <BarListWidget
      title="Lead status"
      items={barItems}
      isLoading={isLoading}
      isError={isError}
      errorText="Failed to load lead status statistics"
      emptyText="No leads in this period"
      skeletonRows={5}
    />
  );
};

export default LeadStatusWidget;
