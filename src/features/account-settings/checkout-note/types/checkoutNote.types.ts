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
  data: {
    items: CheckoutNoteItem[]
    total?: number
  }
}

export interface CheckoutNoteResponseData {
  id?: number
}

export interface CheckoutNoteResponse {
  status: boolean
  message: string
  data: CheckoutNoteResponseData | undefined
}

export interface DeleteCheckoutNoteResponse {
  status: boolean
  message: string
}
