import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface TRowProps extends ComponentPropsWithoutRef<'tr'> {
  children?: ReactNode;
}

const TRow = forwardRef<HTMLTableRowElement, TRowProps>(
  ({ children, ...props }, ref) => (
    <tr ref={ref} {...props}>
      {children}
    </tr>
  ),
);

TRow.displayName = 'TRow';

export default TRow;
