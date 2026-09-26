// Deal Report filter DTOs validate with class-validator, whose messages are
// written for API consumers, not end users - e.g. "inStageDays must not be
// greater than 3650". This rewrites exactly that shape (a known filter field
// name, followed by a known class-validator phrase) into something a user
// can act on, e.g. "\"In Current Stage For (Days)\" can't be more than
// 3650." Anything that doesn't match a known field + phrase is left
// completely untouched, so unrelated/unexpected backend messages are never
// silently mangled.

const FIELD_LABELS: Record<string, string> = {
  noActivityDays: 'No Activity For (Days)',
  inStageDays: 'In Current Stage For (Days)',
  closeDateExceeded: 'Expected Close Date Exceeded',
  pipelineId: 'Pipeline',
  agentId: 'Agent',
  stageId: 'Stage',
  sourceIds: 'Source',
  currency: 'Currency',
  period: 'Period',
  from: 'Start Date',
  to: 'End Date',
  search: 'Search',
  limit: 'Rows Per Page',
  skip: 'Page',
  pageNumber: 'Page',
};

const PHRASE_REPLACEMENTS: [RegExp, string][] = [
  [/must not be greater than/i, "can't be more than"],
  [/must not be less than/i, "can't be less than"],
  [/must be an integer number/i, 'must be a whole number'],
  [/must be an integer/i, 'must be a whole number'],
  [/should not be empty/i, 'is required'],
  [/must be a valid ISO 8601 date string/i, 'must be a valid date'],
  [/must be a boolean value/i, 'must be Yes or No'],
  [/must be a number conforming to the specified constraints/i, 'must be a valid number'],
];

function humanizeLine(line: string): string {
  const trimmed = line.trim();
  if (!trimmed) return trimmed;

  const fieldMatch = trimmed.match(/^([a-zA-Z][a-zA-Z0-9_]*)\s/);
  const fieldToken = fieldMatch?.[1];
  const label = fieldToken ? FIELD_LABELS[fieldToken] : undefined;

  // Only rewrite when we recognize both the field and at least one phrase -
  // otherwise this is some other kind of backend message and must pass
  // through unchanged.
  if (!label) return trimmed;

  let rewritten = trimmed;
  let matchedPhrase = false;
  for (const [pattern, replacement] of PHRASE_REPLACEMENTS) {
    if (pattern.test(rewritten)) {
      matchedPhrase = true;
      rewritten = rewritten.replace(pattern, replacement);
    }
  }
  if (!matchedPhrase) return trimmed;

  rewritten = rewritten.replace(new RegExp(`^${fieldToken}\\b`), `"${label}"`);
  return rewritten.endsWith('.') ? rewritten : `${rewritten}.`;
}

export function humanizeReportError(message: string): string {
  return message
    .split('\n')
    .map(humanizeLine)
    .filter(Boolean)
    .join('\n');
}
