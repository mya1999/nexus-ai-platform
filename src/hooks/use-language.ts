/**
 * Custom hook for managing language state across the application
 */

'use client';

import type { Language } from '@/config/translations';
import { useEffect, useState } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en');
  const mounted = true; // Always mounted for faster rendering

  useEffect(() => {
    // Only run on client side
    if (globalThis.window !== undefined) {
      const saved = localStorage.getItem('language') as Language;
      if (saved && saved !== language) {
        setLanguage(saved);
        document.documentElement.lang = saved;
        document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
      } else {
        // Set default if no saved language
        document.documentElement.lang = language;
        document.documentElement.dir = 'ltr';
      }
    }
  }, [language]);

  const toggleLanguage = () => {
    const newLang: Language = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    globalThis.location.reload();
  };

  return { language, mounted, toggleLanguage };
}
