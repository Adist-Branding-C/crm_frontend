export interface UseBranchDeleteConfirmParams {
  handleDeleteBranch: (id: number) => Promise<boolean>;
}
