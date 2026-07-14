import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LocaleCode, DICTIONARY } from '../lib/i18n';

interface LanguageCurrencyContextType {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
}

const LanguageCurrencyContext = createContext<LanguageCurrencyContextType | undefined>(undefined);

export function LanguageCurrencyProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LocaleCode>('en-US');

  useEffect(() => {
    const saved = localStorage.getItem('vidfluencer_locale') as LocaleCode;
    if (saved) {
      setLocale(saved);
    }
  }, []);

  const handleSetLocale = (newLocale: LocaleCode) => {
    setLocale(newLocale);
    localStorage.setItem('vidfluencer_locale', newLocale);
  };

  return (
    <LanguageCurrencyContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LanguageCurrencyContext.Provider>
  );
}

export function useLanguageCurrency() {
  const context = useContext(LanguageCurrencyContext);
  if (!context) throw new Error('useLanguageCurrency must be used within LanguageCurrencyProvider');
  return context;
}

export function useTranslate() {
  const { locale } = useLanguageCurrency();
  
  const t = (key: keyof typeof DICTIONARY['en'], params?: Record<string, string | number>) => {
    const lang = locale.startsWith('es') ? 'es' : locale.startsWith('it') ? 'it' : locale.startsWith('fr') ? 'fr' : 'en';
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let text = (DICTIONARY as any)[lang]?.[key] || DICTIONARY['en'][key];
    
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };
  
  return { t, locale };
}
