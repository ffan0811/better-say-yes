export interface ErrorType {
  code?: string;
  message: string;
  data?: any;
}

export enum CookieType {
  COOKIE_CONSENT = "cookieConsent",
  ANALYTICS_CONSENT = "analyticsConsent",
}
