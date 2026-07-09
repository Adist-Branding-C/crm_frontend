import type { Column } from '../../../../shared/types/crud';
import type { CheckoutNoteItem } from '../types/checkoutNote.types';

// Static column config for CheckoutNotePage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const CHECKOUT_NOTE_TABLE_COLUMNS: Column<CheckoutNoteItem>[] = [
  { key: 'title', label: 'Title', render: (item) => item.title || '-' },
  { key: 'note', label: 'Note', render: (item) => item.note || '-' },
];
