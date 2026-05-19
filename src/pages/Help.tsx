import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const FAQS = [
  {
    q: 'What is an IPTV service?',
    a: 'Internet Protocol Television (IPTV) is a system that delivers television services over internet protocol (IP) networks instead of traditional terrestrial, satellite, or cable formats. It allows users to stream live TV, video-on-demand (VOD), and more on smart TVs, computers, and smartphones, often featuring 4K quality. DirectIPTV service gives you access to 30,000+ live channels, 100,000+ movies & series, and sports packages – all streamed in 4K quality to any device.'
  },
  {
    q: 'How do I get an IPTV subscription?',
    a: 'Simply choose a plan from our pricing section, complete the secure payment, and you will receive your login credentials and setup instructions via email within minutes.'
  },
  {
    q: 'What devices does your IPTV service support?',
    a: 'We support almost all devices: Smart TVs (Samsung, LG, Sony), Android boxes (Nvidia Shield, Formuler), Firestick, Apple TV, smartphones (iOS & Android), and PC/MAG boxes.'
  },
  {
    q: 'What channels are in an IPTV subscription?',
    a: 'Our library includes channels from the USA, UK, Canada, Europe, Africa, Asia, and more. Including premium movie networks, sports channels (ESPN, Sky Sports), and kids content.'
  },
  {
    q: 'Can I upgrade my IPTV subscription later?',
    a: 'Yes, you can upgrade your plan at any time through our portal or by contacting our support team.'
  },
  {
    q: 'What sports are available with your IPTV service?',
    a: 'We cover all major sports events: NFL, NBA, MLB, NHL, Premier League, Champions League, Formula 1, UFC, and more in dedicated sports categories.'
  },
  {
    q: 'Do I need a VPN for IPTV streaming?',
    a: 'Our service is designed to work without a VPN. However, if your ISP throttles streaming content, a VPN can help maintain high speeds and bypass blocks.'
  },
  {
    q: 'What do I need to look for for TV?',
    a: 'For the best experience, we recommend a Smart TV or a dedicated Android box like the Formuler Z11 or Nvidia Shield Pro.'
  },
  {
    q: 'How do I check my internet speed & quality?',
    a: 'We recommend a minimum of 25 Mbps for 4K streaming. You can check your speed at speedtest.net.'
  },
  {
    q: 'Can I use the IPTV as I live in an apartment?',
    a: 'Absolutely. As long as you have a stable internet connection, you can use our service anywhere in the world.'
  }
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] -ml-40 -mb-40 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <section className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4"
          >
            Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500">Asked Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 font-medium"
          >
            Everything you need to know about our premium streaming service.
          </motion.p>
        </section>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl border border-white/5 overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold tracking-tight">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <section className="mt-20 glass-card p-12 rounded-[2.5rem] text-center bg-white/[0.02] border border-white/5">
          <h2 className="text-3xl font-extrabold mb-4">Still have questions?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto font-medium">
            Our support team is available 24/7 to assist with any technical or billing inquiries.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full accent-gradient text-white font-bold transition-transform active:scale-95 shadow-xl shadow-blue-500/10"
          >
            <MessageSquare className="h-5 w-5" />
            Contact Support
          </Link>
        </section>
      </div>
    </main>
  );
}
