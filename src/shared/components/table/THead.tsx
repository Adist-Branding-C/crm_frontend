import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface THeadProps extends ComponentPropsWithoutRef<'thead'> {
  children?: ReactNode;
}

const THead = forwardRef<HTMLTableSectionElement, THeadProps>(
  ({ children, ...props }, ref) => (
    <thead ref={ref} {...props}>
      {children}
    </thead>
  ),
);

THead.displayName = 'THead';

export default THead;
