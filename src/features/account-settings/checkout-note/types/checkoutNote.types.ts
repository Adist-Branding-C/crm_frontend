export interface CheckoutNoteItem {
  id: number
  title?: string
  note?: string
  status?: string
}

export interface CheckoutNoteFormData {
  title: string
  note: string
  status: string
}

export interface CheckoutNoteRequest {
  title: string
  note: string
  status: string
}

export interface GetAllCheckoutNotesParams {
  search?: string
  page?: number
  limit?: number
}

export interface GetAllCheckoutNotesResponse {
  status: boolean
  message: string
  // Optional to match ServiceResponseUtil.normalize()'s shape, which only sets `data` when the API actually returned it.
  data?: {
    items: CheckoutNoteItem[]
    total?: number
    pagination?: {
      total: number
    }
  }
}

export interface CheckoutNoteResponseData {
  id?: number
}

export interface CheckoutNoteResponse {
  status: boolean
  message: string
  // Optional (not `| undefined`) to match ServiceResponseUtil.normalize()'s shape, which only sets `data` when the API actually returned it.
  data?: CheckoutNoteResponseData
  errors?: Record<string, string[]>;
  field?: string;
}

export interface DeleteCheckoutNoteResponse {
  status: boolean
  message: string
}
