import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { useTranslate } from "@/contexts/language-currency-context";
import { formatCurrency } from "@/lib/i18n";

export default function FAQ() {
  const { locale } = useTranslate();
  const formattedRate = formatCurrency(10, locale);

  const faqs = [
    {
      question: "What is Vidfluencer.io?",
      answer: "Vidfluencer.io is a premier User-Generated Content (UGC) and affiliate marketing marketplace. We connect forward-thinking brands with vetted creators to produce authentic, high-converting video content."
    },
    {
      question: "How does the UGC and affiliate marketplace work?",
      answer: "Brands post campaign briefs or send direct inbound offers to creators whose audiences align with their products. Creators maintain full creative control while executing campaigns, and our platform handles the contracts, escrow payments, and real-time ROI tracking."
    },
    {
      question: "How much can creators earn?",
      answer: `Creators can set their own rates, but through our optimized affiliate campaigns, you can earn up to ${formattedRate} per 1,000 views. Your earning potential scales directly with the engagement and conversions your content drives.`
    },
    {
      question: "How does the custom viral coaching work?",
      answer: "Every creator on our platform gets access to custom coaching. We analyze platform algorithms, current trends, and your unique style to provide actionable, tailored advice designed to help your videos go viral consistently."
    },
    {
      question: "How do brands find and vet creators?",
      answer: "Brands have access to our verified creator database, which includes real engagement data, demographic breakdowns, and past performance metrics. We ensure there are no fake followers—just real influence."
    },
    {
      question: "When does the platform launch, and what do waitlist members get?",
      answer: "We are launching soon! By joining the waitlist, you secure early access to the platform before the general public. Early members will receive exclusive platform perks, priority onboarding, and first dibs on top brand deals."
    },
    {
      question: "Is it free to join?",
      answer: "Yes, joining the waitlist and setting up a creator profile is completely free. We take a small, transparent platform fee only when a brand deal is successfully completed and paid out."
    },
    {
      question: "How do payments work?",
      answer: "We use an escrow system to guarantee payments. Once a deal is agreed upon, the brand deposits the funds into escrow. The funds are released to the creator securely and on time as soon as the deliverables are met."
    },
    {
      question: "How can I get involved in the Discord community?",
      answer: "We'd love to have you! You can click the Discord link in the footer or on the homepage to join our server. It's the best place to get exclusive updates, network with other creators, and chat with our team."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col font-sans">
      <Nav />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600">
              Everything you need to know about the Vidfluencer.io platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 group-hover:text-primary outline-none text-left">
                  {faq.question}
                  <span className="transition-transform group-open:rotate-180 text-gray-400 flex-shrink-0 ml-4">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-gray-600 leading-relaxed pt-4 mt-2 border-t border-gray-100">
                  {faq.answer}
                </div>
              </details>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
