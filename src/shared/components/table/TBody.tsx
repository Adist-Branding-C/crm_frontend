import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface TBodyProps extends ComponentPropsWithoutRef<'tbody'> {
  children?: ReactNode;
}

const TBody = forwardRef<HTMLTableSectionElement, TBodyProps>(
  ({ children, ...props }, ref) => (
    <tbody ref={ref} {...props}>
      {children}
    </tbody>
  ),
);

TBody.displayName = 'TBody';

export default TBody;
