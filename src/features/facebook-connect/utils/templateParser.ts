export type TemplateSegment = { type: 'text'; value: string } | { type: 'variable'; key: string };

const TOKEN_PATTERN = /\$([a-zA-Z0-9_]+)/g;

// Mirrors crm_backend/src/facebook/util/facebook-template.util.ts - a template
// string is plain text with $<facebookQuestionKey> tokens embedded. The editor
// never lets an admin type a token directly (only insert one via a picker), so
// this parser only needs to round-trip what this UI itself produced.
export function parseTemplate(template: string): TemplateSegment[] {
  const segments: TemplateSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_PATTERN.lastIndex = 0;

  while ((match = TOKEN_PATTERN.exec(template))) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: template.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'variable', key: match[1] ?? '' });
    lastIndex = match.index + match[0].length;
  }

  const lastSegment = segments[segments.length - 1];
  if (lastIndex < template.length || segments.length === 0 || lastSegment?.type === 'variable') {
    segments.push({ type: 'text', value: template.slice(lastIndex) });
  }

  return segments;
}

export function serializeTemplate(segments: TemplateSegment[]): string {
  return segments.map((segment) => (segment.type === 'text' ? segment.value : `$${segment.key}`)).join('');
}
