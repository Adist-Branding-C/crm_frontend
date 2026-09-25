import { useMemo } from 'react';
import { CHART_PALETTE, CHART_PALETTE_DEFAULT } from '../../../../shared/constants/chartPalette';
import { getColorForIndex } from '../../../../shared/utils/chartUtils';
import BarListWidget from './BarListWidget';
import type { LeadPurposeCountItem } from '../../types';

interface LeadPurposeWidgetProps {
  items?: LeadPurposeCountItem[] | undefined;
  isLoading?: boolean | undefined;
  isError?: boolean | undefined;
}

const LeadPurposeWidget = ({ items = [], isLoading, isError }: LeadPurposeWidgetProps) => {
  const barItems = useMemo(
    () =>
      items.map((item, index) => ({
        id: item.purposeId,
        label: item.purpose,
        value: item.count,
        color: getColorForIndex(index, CHART_PALETTE, CHART_PALETTE_DEFAULT),
      })),
    [items],
  );

  return (
    <BarListWidget
      title="Lead purpose"
      items={barItems}
      isLoading={isLoading}
      isError={isError}
      errorText="Failed to load lead purpose statistics"
      emptyText="No leads in this period"
      skeletonRows={5}
    />
  );
};

export default LeadPurposeWidget;
