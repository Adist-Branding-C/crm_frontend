const isDev = Boolean(import.meta.env?.DEV);

export class Logger {
  static log(...args: unknown[]): void {
    if (isDev) console.log(...args);
  }

  static error(...args: unknown[]): void {
    if (isDev) console.error(...args);
  }
}