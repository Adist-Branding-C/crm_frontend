import Drawer from './Drawer';
import DealDetailContent from '../../../features/deal/components/DealDetailContent';
import type { DealDetailDrawerProps } from '../../types/drawers';
import type { DealItem } from '../../../features/deal/types/interface';
import './LeadDetailDrawer.css';

interface DealDetailDrawerFullProps extends DealDetailDrawerProps {
  onEditDeal: (deal: DealItem) => void;
}

const DealDetailDrawer = ({ deal, isOpen, onClose, onDealUpdated = () => {}, onEditDeal, onDeleteDeal }: DealDetailDrawerFullProps) => {
  if (!deal) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      animated
      exitDuration={350}
      closeOnEsc
      overlayClassName="leaddrawer-overlay"
      panelClassName="leaddrawer-panel"
    >
      <DealDetailContent deal={deal} onClose={onClose} onDealUpdated={onDealUpdated} onEditDeal={onEditDeal} onDeleteDeal={onDeleteDeal} />
    </Drawer>
  );
};

export default DealDetailDrawer;
