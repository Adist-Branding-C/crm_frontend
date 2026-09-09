// Mirrors the backend's fixed DealLostReason enum exactly
// (src/deals/types/deal-lost-reason.enum.ts) - kept as a small closed set
// rather than an admin-managed list, same scope call already made for
// Deal Type.
export const DEAL_LOST_REASON_OPTIONS = [
  'Price too high',
  'Chose competitor',
  'No budget',
  'Went cold / No response',
  'Not a good fit',
  'Other',
] as const;
