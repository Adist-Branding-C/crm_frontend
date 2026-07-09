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
  pageNumber?: number
  limit?: number
}

export interface BranchListData {
  items: BranchItem[]
  total?: number
}

export interface GetAllBranchesResponse {
  status: boolean
  message: string
  data?: BranchListData
}

export interface BranchResponseData {
  id?: number
  branch?: BranchItem
}

export interface BranchResponse {
  status: boolean
  message: string
  data?: BranchResponseData
  errors?: Record<string, string[]>;
  field?: string;
}

export interface DeleteBranchResponse {
  status: boolean
  message: string
}
