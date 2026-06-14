import { locales, type Locale } from '@/i18n';

/**
 * Adds locale prefix to a path if needed
 * For default locale (en) with 'as-needed', no prefix is added
 * For other locales, the prefix is added
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Remove leading slash for processing
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If it's the default locale, return path without prefix
  if (locale === 'en') {
    return `/${cleanPath}`;
  }
  
  // For other locales, add the prefix
  return `/${locale}/${cleanPath}`;
}

/**
 * Gets the current locale from a pathname
 */
export function getLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  
  return null;
}

