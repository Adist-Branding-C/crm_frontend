import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TCellVariant = 'th' | 'td';

interface TCellProps extends ComponentPropsWithoutRef<'td'> {
  variant?: TCellVariant;
  scope?: string;
  children?: ReactNode;
}

const TCell = forwardRef<HTMLTableCellElement, TCellProps>(
  ({ variant = 'td', scope, children, ...props }, ref) => {
    if (variant === 'th') {
      return (
        <th ref={ref} scope={scope} {...props}>
          {children}
        </th>
      );
    }
    return (
      <td ref={ref} {...props}>
        {children}
      </td>
    );
  },
);

TCell.displayName = 'TCell';

export default TCell;
