/**
 * Currency options for deal amounts. The deal entity stores an ISO 4217 code
 * (`currency` column); the UI picks from this list and renders the matching
 * symbol next to the amount. INR is the default for new deals.
 *
 * Used by:
 * - DealForm (currency picker before the Amount field)
 * - DealDetailContent / DealRow / DealCard (amount display)
 * - DealBoardStatsBar (summary currency toggle)
 */
export interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
}

export const DEFAULT_CURRENCY = 'INR';

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'INR', symbol: '₹', label: 'INR - Indian Rupee' },
  { code: 'USD', symbol: '$', label: 'USD - US Dollar' },
  { code: 'EUR', symbol: '€', label: 'EUR - Euro' },
  { code: 'GBP', symbol: '£', label: 'GBP - British Pound' },
  { code: 'AED', symbol: 'د.إ', label: 'AED - UAE Dirham' },
  { code: 'SAR', symbol: '﷼', label: 'SAR - Saudi Riyal' },
  { code: 'SGD', symbol: 'S$', label: 'SGD - Singapore Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'AUD - Australian Dollar' },
  { code: 'CAD', symbol: 'C$', label: 'CAD - Canadian Dollar' },
  { code: 'JPY', symbol: '¥', label: 'JPY - Japanese Yen' },
];

const SYMBOL_BY_CODE: Record<string, string> = CURRENCY_OPTIONS.reduce(
  (acc, c) => {
    acc[c.code] = c.symbol;
    return acc;
  },
  {} as Record<string, string>,
);

/** Symbol for a currency code, falling back to the code itself (then INR's ₹). */
export function currencySymbol(code?: string | null): string {
  if (!code) return SYMBOL_BY_CODE[DEFAULT_CURRENCY] ?? '₹';
  return SYMBOL_BY_CODE[code] ?? code;
}

/** `₹12,000` style formatting for a numeric-or-string amount. */
export function formatAmountWithCurrency(
  amount: number | string | null | undefined,
  code?: string | null,
): string {
  const n = Number(amount ?? 0);
  const safe = Number.isFinite(n) ? n : 0;
  return `${currencySymbol(code)}${safe.toLocaleString()}`;
}
