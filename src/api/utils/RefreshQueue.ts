import type { InternalAxiosRequestConfig } from "axios";
import { Logger } from "./Logger";

export interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface QueueEntry {
  config: RetryableRequestConfig;
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}

/**
 * Holds requests that failed while a refresh call is already in flight,
 * then resolves or rejects them all once that refresh finishes.
 */
export class RefreshQueue {
  private queue: QueueEntry[] = [];
  private refreshing = false;

  get isRefreshing(): boolean {
    return this.refreshing;
  }

  start(): void {
    this.refreshing = true;
  }

  stop(): void {
    this.refreshing = false;
  }

  wait(config: RetryableRequestConfig): Promise<unknown> {
    Logger.log("RefreshQueue: Refresh in progress — queueing request", config.url);
    return new Promise((resolve, reject) => {
      this.queue.push({ config, resolve, reject });
    });
  }

  resolveAll(token: string, retry: (config: RetryableRequestConfig) => Promise<unknown>): void {
    this.queue.forEach(({ config, resolve }) => {
      config.headers.Authorization = `Bearer ${token}`;
      resolve(retry(config));
    });
    this.queue = [];
  }

  rejectAll(error: unknown): void {
    this.queue.forEach(({ reject }) => reject(error));
    this.queue = [];
  }
}

