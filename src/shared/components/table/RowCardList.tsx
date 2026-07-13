import type { ReactNode } from 'react';
import './RowCard.css';

const RowCardList = ({ children }: { children: ReactNode }) => (
  <div className="row-card-list">{children}</div>
);

export default RowCardList;
