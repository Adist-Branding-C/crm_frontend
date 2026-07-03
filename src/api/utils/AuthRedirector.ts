import { Logger } from "./Logger";
import type { TokenStorage } from "./TokenStorage";

const LOGIN_PATH = "/login";

export class AuthRedirector {
  private isRedirecting = false;

  constructor(private tokens: TokenStorage) {}

  redirectToLogin(): void {
    if (this.isRedirecting || window.location.pathname === LOGIN_PATH) return;
    this.isRedirecting = true;

    Logger.log("AuthRedirector: Redirecting to /login");
    this.tokens.clearTokens();
    window.location.href = LOGIN_PATH;
  }
}