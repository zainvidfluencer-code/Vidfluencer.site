import { Link } from "wouter";
import { WaitlistForm } from "@/components/waitlist-form";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, ShieldCheck, Users, PlaySquare, ArrowRight, Star } from "lucide-react";
import { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { useTranslate } from "@/contexts/language-currency-context";
import { formatCurrency } from "@/lib/i18n";
import { SiDiscord } from "react-icons/si";

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { t, locale } = useTranslate();
  const formattedRate = formatCurrency(10, locale);

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col font-sans overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-70 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <FadeIn>
              <div className="inline-flex flex-col md:flex-row items-center md:items-start gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-semibold">
                  <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
                  <span>{t('hero.badge')}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>{t('hero.rate', { rate: formattedRate })}</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
                {t('hero.title1')}<span className="text-primary relative inline-block">
                  {t('hero.title2')}
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                {t('hero.desc')}
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div id="waitlist" className="bg-white p-2 rounded-3xl shadow-2xl shadow-primary/10 border border-gray-100 max-w-md mx-auto md:mx-0 relative z-20">
                <div className="bg-gray-50/50 rounded-2xl p-6 md:p-8">
                  <WaitlistForm />
                </div>
              </div>
            </FadeIn>
          </div>
          
          <div className="flex-1 w-full max-w-lg hidden md:block">
            <FadeIn delay={0.3}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-600 rounded-3xl transform rotate-3 scale-105 opacity-10 blur-xl"></div>
                <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden relative">
                  <div className="border-b border-gray-100 p-4 bg-gray-50/50 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                        </div>
                        <div className="h-8 w-24 bg-primary/10 rounded-full"></div>
                      </div>
                      <div className="h-48 bg-gray-100 rounded-xl w-full flex items-center justify-center">
                        <PlaySquare className="w-12 h-12 text-gray-300" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-full"></div>
                        <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -right-6 -bottom-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{t('deal.closed')}</p>
                    <p className="font-bold text-gray-900">{formatCurrency(2500, locale)}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="how-it-works" className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-semibold text-gray-400 mb-8 tracking-widest uppercase">{t('brands.trusted')}</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-80">
            {/* Real brands */}
            <div className="font-black text-2xl tracking-tighter text-gray-900">REVIZELY.AI</div>
            <div className="font-extrabold text-2xl tracking-widest text-gray-800">ASPIRA</div>
            
            {/* Blurred placeholders */}
            <div className="font-bold text-xl text-gray-400 blur-[4px] select-none pointer-events-none">NEXUS</div>
            <div className="font-bold text-xl text-gray-400 blur-[4px] select-none pointer-events-none">LUMINA</div>
            <div className="font-bold text-xl text-gray-400 blur-[4px] select-none pointer-events-none">HORIZON</div>
            
            <div className="text-xs font-semibold text-gray-500 bg-gray-200/60 px-3 py-1.5 rounded-full border border-gray-200">
              {t('brands.manyMore')}
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop: Brands */}
      <section id="brands" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{t('brands.title')}</h2>
              <p className="text-lg text-gray-600">{t('brands.desc')}</p>
            </FadeIn>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100 hover:border-primary/20 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('brands.card1.title')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('brands.card1.desc')}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100 hover:border-primary/20 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('brands.card2.title')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('brands.card2.desc')}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100 hover:border-primary/20 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('brands.card3.title')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('brands.card3.desc')}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Value Prop: Creators */}
      <section id="creators" className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjYyNyAzLjM3M2E2IDYgMCAwMS04LjQ4NSAwbC00LTI0M2E2IDYgMCAwMS04LjQ4NSAwbC00LjI0My00LjI0M2E2IDYgMCAwMTAtOC40ODVsNC4yNDMtNC4yNDNhNiA2IDAgMDExOC40ODUgMGw0LjI0MyA0LjI0M2E2IDYgMCAwMTAgOC40ODVsLTQuMjQzIDQuMjQzeiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 order-2 md:order-1">
              <FadeIn>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full"></div>
                  <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-8 relative">
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="font-bold text-white">B{i}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{t('deal.inbound')}</h4>
                            <p className="text-sm text-white/60">{t('deal.tech')}</p>
                          </div>
                          <div className="font-bold text-green-400">
                            {formatCurrency(i * 1500, locale)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className="flex-1 order-1 md:order-2">
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">{t('creators.title')}</h2>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">{t('creators.desc')}</p>
                <ul className="space-y-4">
                  {[
                    t('creators.bullet1'),
                    t('creators.bullet2'),
                    t('creators.bullet3'),
                    t('creators.bullet4'),
                    t('creators.bullet5')
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90">
                      {i === 4 ? (
                        <Star className="w-5 h-5 text-amber-400 flex-shrink-0 fill-amber-400" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      )}
                      <span className={i === 4 ? "font-medium text-white" : ""}>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">{t('cta.title')}</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">{t('cta.desc')}</p>
            <div className="max-w-md mx-auto">
              <WaitlistForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Discord CTA Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-gray-900 opacity-80" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <div className="w-16 h-16 bg-[#5865F2]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <SiDiscord className="w-8 h-8 text-[#5865F2]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('cta.discord')}</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">{t('discord.desc')}</p>
            <a 
              href="https://discord.gg/B7q6fe5BHH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5865F2] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#4752C4] transition-all shadow-lg hover:shadow-[#5865F2]/25"
            >
              <SiDiscord className="w-5 h-5" />
              {t('cta.discord')}
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
