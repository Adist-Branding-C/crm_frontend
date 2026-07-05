import type { CheckoutNoteItem } from '../types';

export function useCheckoutNoteFilters(checkoutNoteList: CheckoutNoteItem[]) {
  return {
    filteredData: checkoutNoteList,
  };
}
