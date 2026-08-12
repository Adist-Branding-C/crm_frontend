// Reads the filename from a `Content-Disposition` header (`filename="..."` or the
// RFC 5987 `filename*=UTF-8''...` form), falling back to a default name when the
// header is missing or unparsable.
export function extractFilenameFromContentDisposition(contentDisposition: string | undefined, fallback: string): string {
  if (!contentDisposition) return fallback;

  const utf8Match = /filename\*=UTF-8''([^;]+)/i.exec(contentDisposition);
  if (utf8Match?.[1]) return decodeURIComponent(utf8Match[1]);

  const match = /filename="?([^"; ]+)"?/i.exec(contentDisposition);
  return match?.[1] || fallback;
}

export function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
