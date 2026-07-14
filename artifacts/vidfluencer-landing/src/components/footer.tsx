import { Link } from "wouter";
import logoSrc from "@/assets/logo.png";
import { useTranslate } from "@/contexts/language-currency-context";
import { SiDiscord } from "react-icons/si";

export function Footer() {
  const { t } = useTranslate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={logoSrc} alt="Vidfluencer.io" className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
            </div>
          </Link>
          <p className="text-sm text-gray-500">{t('footer.rights', { year })}</p>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <Link href="/faq" className="hover:text-primary transition-colors">{t('footer.faq')}</Link>
            <a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
            <a 
              href="https://discord.gg/B7q6fe5BHH" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#5865F2] transition-colors flex items-center gap-1.5" 
              title={t('cta.discord')}
            >
              <SiDiscord className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
