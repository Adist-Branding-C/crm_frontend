import type { CheckoutNoteItem } from '../types/checkoutNote.types';

export function useCheckoutNoteFilters(checkoutNoteList: CheckoutNoteItem[]) {
  return {
    filteredData: checkoutNoteList,
  };
}
