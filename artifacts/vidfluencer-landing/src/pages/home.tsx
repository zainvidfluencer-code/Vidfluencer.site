import { Link } from "wouter";
import { WaitlistForm } from "@/components/waitlist-form";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, ShieldCheck, Users, PlaySquare, ArrowRight, Star } from "lucide-react";
import { ReactNode } from "react";

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
  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col font-sans overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <PlaySquare className="w-4 h-4 fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">Vidfluencer.AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#brands" className="hover:text-primary transition-colors">For Brands</a>
            <a href="#creators" className="hover:text-primary transition-colors">For Creators</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          </div>
          <div>
            <a href="#waitlist" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow">
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-70 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-semibold mb-6">
                <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
                <span>The #1 Creator Marketplace</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
                Where great brands meet <span className="text-primary relative inline-block">
                  top creators
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                Discover talent, execute campaigns, and manage payments—all in one trusted hub. Join the waitlist to get early access to the future of the creator economy.
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
                    <p className="text-xs text-gray-500 font-medium">Deal Closed</p>
                    <p className="font-bold text-gray-900">$2,500</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-semibold text-gray-400 mb-8 tracking-widest uppercase">Trusted by forward-thinking teams</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Abstract geometric logos representing brands */}
            <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-current rounded-sm transform rotate-45"></div>Acme Corp</div>
            <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 border-4 border-current rounded-full"></div>Lumina</div>
            <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 bg-current rounded-tl-xl rounded-br-xl"></div>Nebula</div>
            <div className="flex items-center gap-2 font-bold text-xl"><div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-current"></div>Apex</div>
          </div>
        </div>
      </section>

      {/* Value Prop: Brands */}
      <section id="brands" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Find the perfect voice for your brand.</h2>
              <p className="text-lg text-gray-600">Stop scrolling endlessly. Our marketplace gives you access to vetted creators with verified audience metrics, making campaign execution seamless and predictable.</p>
            </FadeIn>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100 hover:border-primary/20 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Creators</h3>
                <p className="text-gray-600 leading-relaxed">Access real engagement data and demographic breakdowns. No fake followers, just real influence.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100 hover:border-primary/20 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Seamless Contracts</h3>
                <p className="text-gray-600 leading-relaxed">Standardized agreements and licensing terms built right into the platform. Legal compliance made easy.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-100 hover:border-primary/20 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">ROI Tracking</h3>
                <p className="text-gray-600 leading-relaxed">Track campaign performance in real-time. Measure views, clicks, and conversions from one dashboard.</p>
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
                            <h4 className="font-semibold">Inbound Brand Deal</h4>
                            <p className="text-sm text-white/60">Tech Category • Video</p>
                          </div>
                          <div className="font-bold text-green-400">
                            ${i * 1500}
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
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Monetize your audience on your terms.</h2>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">Receive inbound offers from brands that align with your content. Keep your creative freedom and get paid securely and on time.</p>
                <ul className="space-y-4">
                  {[
                    "Guaranteed payments held in escrow",
                    "Direct messaging with brand partners",
                    "Keep 100% of your creative control",
                    "Set your own rates and availability"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span>{item}</span>
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
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">Ready to shape the <br className="hidden md:block"/>creator economy?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Join the waitlist today. We're launching soon, and early members will receive exclusive platform perks.</p>
            <div className="max-w-md mx-auto">
              <WaitlistForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <PlaySquare className="w-5 h-5 text-primary" />
              <span className="font-bold text-gray-900 tracking-tight">Vidfluencer.AI</span>
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Vidfluencer.AI. All rights reserved.</p>
            <div className="flex gap-6 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
