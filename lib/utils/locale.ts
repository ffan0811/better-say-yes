import { createClient } from '@/lib/supabase/server';
import { locales, type Locale } from '@/i18n';

export async function getUserLocale(): Promise<Locale> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user?.user_metadata?.locale) {
      const locale = user.user_metadata.locale as Locale;
      if (locales.includes(locale)) {
        return locale;
      }
    }
  } catch (error) {
    console.error('Error getting user locale:', error);
  }
  
  return 'en'; // Default to English
}

export async function setUserLocale(locale: Locale): Promise<void> {
  try {
    const supabase = createClient();
    await supabase.auth.updateUser({
      data: {
        locale,
      },
    });
  } catch (error) {
    console.error('Error setting user locale:', error);
  }
}

