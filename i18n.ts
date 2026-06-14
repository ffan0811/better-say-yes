import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ko'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // Get locale from requestLocale (provided by next-intl based on URL or headers)
  // requestLocale might be a Promise or a string
  let locale: string | undefined;
  
  if (requestLocale) {
    locale = typeof requestLocale === 'string' 
      ? requestLocale 
      : await requestLocale;
  }
  
  // Fall back to default locale if not provided
  if (!locale) {
    locale = 'en';
  }
  
  // Validate that the incoming `locale` parameter is valid
  // If invalid, default to 'en' instead of calling notFound()
  const validLocale = locales.includes(locale as Locale) 
    ? (locale as Locale) 
    : 'en';

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});

