import { Link, useLocation } from "wouter";
import { ChevronDown } from "lucide-react";
import logoSrc from "@/assets/logo.png";
import { LOCALES, LocaleCode } from "@/lib/i18n";
import { useLanguageCurrency, useTranslate } from "@/contexts/language-currency-context";

export function Nav() {
  const { locale, setLocale } = useLanguageCurrency();
  const { t } = useTranslate();
  const [location] = useLocation();
  const isHome = location === "/";

  const getHref = (hash: string) => isHome ? hash : `/${hash}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logoSrc} alt="Vidfluencer.AI" className="h-8 md:h-10 w-auto object-contain" />
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href={getHref('#brands')} className="hover:text-primary transition-colors">{t('nav.forBrands')}</a>
          <a href={getHref('#creators')} className="hover:text-primary transition-colors">{t('nav.forCreators')}</a>
          <a href={getHref('#how-it-works')} className="hover:text-primary transition-colors">{t('nav.howItWorks')}</a>
          <Link href="/faq" className="hover:text-primary transition-colors">{t('nav.faq')}</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as LocaleCode)}
              className="appearance-none bg-transparent pl-3 pr-8 py-1 text-sm font-medium text-gray-600 hover:text-primary outline-none cursor-pointer focus:ring-2 focus:ring-primary/20 rounded-md"
            >
              {LOCALES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          <a href={getHref('#waitlist')} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow whitespace-nowrap">
            {t('nav.getEarlyAccess')}
          </a>
        </div>
      </div>
      {/* Mobile locale selector */}
      <div className="sm:hidden border-t border-gray-100 bg-gray-50 flex justify-center py-2">
         <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as LocaleCode)}
            className="appearance-none bg-transparent px-4 py-1 text-xs font-medium text-gray-600 outline-none cursor-pointer text-center"
          >
            {LOCALES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
      </div>
    </nav>
  );
}
