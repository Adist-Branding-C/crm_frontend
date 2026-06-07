export interface BranchItem {
  id: number
  name?: string
  branchName?: string
  description?: string
  status?: string
}

export interface BranchFormData {
  name: string
  description: string
  status: string
}

export interface BranchRequest {
  name: string
  description?: string
  status: string
}

export interface GetAllBranchesParams {
  search?: string
  page?: number
  limit?: number
}

export interface GetAllBranchesResponse {
  status: boolean
  message: string
  data: {
    items: BranchItem[]
    total?: number
  }
}

export interface BranchResponseData {
  id?: number
  branch?: BranchItem
}

export interface BranchResponse {
  status: boolean
  message: string
  data: BranchResponseData | undefined
}

export interface DeleteBranchResponse {
  status: boolean
  message: string
}
