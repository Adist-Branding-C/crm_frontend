import { memo } from 'react';
import { tint } from '../../../../shared/utils/color';
import TruncatedText from '../../../../shared/components/TruncatedText';

interface BarListRowProps {
  label: string;
  value: number;
  color: string;
  widthPercent: number;
}

const BarListRow = memo(({ label, value, color, widthPercent }: BarListRowProps) => (
  <li className="bar-list__row">
    <span className="bar-list__main">
      <span className="bar-list__fill" aria-hidden="true" style={{ width: `${widthPercent}%`, backgroundColor: tint(color, 22) }} />
      <span className="bar-list__dot" aria-hidden="true" style={{ backgroundColor: color }} />
      <TruncatedText className="bar-list__label" text={label} />
    </span>
    <span className="bar-list__value">{value.toLocaleString()}</span>
  </li>
));

BarListRow.displayName = 'BarListRow';

export default BarListRow;
