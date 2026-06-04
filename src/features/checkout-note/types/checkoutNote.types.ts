export interface CheckoutNoteItem {
  id: number;
  note: string;
  description?: string;
  status?: string;
}

export interface CheckoutNoteFormData {
  note: string;
}

export interface CheckoutNoteResponse {
  status: boolean;
  message: string;
  data?: CheckoutNoteItem | CheckoutNoteItem[] | { items: CheckoutNoteItem[]; pagination?: unknown };
}
