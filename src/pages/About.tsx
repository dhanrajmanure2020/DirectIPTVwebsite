import { motion } from 'motion/react';
import { Trophy, Film, Newspaper, Tv, Laugh, Globe, CheckCircle2, Users, Zap, ShieldCheck, Heart } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Sports',
    icon: Trophy,
    desc: 'Top football, basketball, combat sports, motorsport and major live events worldwide. HD and 4K quality streams.',
    color: 'text-blue-500'
  },
  {
    title: 'Movies',
    icon: Film,
    desc: 'International cinema across all genres in HD and 4K. New releases and classic titles updated every day.',
    color: 'text-purple-500'
  },
  {
    title: 'News',
    icon: Newspaper,
    desc: 'International 24-hour news channels covering politics, business, sport and breaking news from around the world.',
    color: 'text-orange-500'
  },
  {
    title: 'Series & TV Shows',
    icon: Tv,
    desc: 'Popular series from the US, UK, Europe and beyond. Drama, comedy, thriller, reality and more—all on demand.',
    color: 'text-green-500'
  },
  {
    title: 'Kids',
    icon: Laugh,
    desc: "Dedicated children's channels for safe, family-friendly viewing. Cartoons, animation and educational content.",
    color: 'text-pink-500'
  },
  {
    title: 'International',
    icon: Globe,
    desc: 'Arabic, French, German, Spanish, Turkish, Hebrew and more. Local content from 50+ countries in your language.',
    color: 'text-cyan-500'
  }
];

const WHY_US = [
  'Enterprise-grade servers with CDN technology - not cheap shared hosting',
  'Real anti-freeze technology, not just a marketing claim',
  '30,000+ channels',
  'Tested and monitored daily for quality',
  'Instant activation, your account is ready within 5 minutes',
  'Works on every device: Smart TV, Firestick, Android, iOS, PC, MAG',
  'We stand behind our service 24/7 support—real humans, not bots'
];

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 text-center"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500">Direct IPTV</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/[0.02]"
          >
            <p className="text-2xl md:text-3xl text-slate-200 font-medium leading-relaxed max-w-5xl">
              We are a premium IPTV service provider committed to delivering the best streaming experience — 30,000+ live channels in HD, UHD and 4K quality, with zero buffering and 24/7 support.
            </p>
          </motion.div>
        </section>

        {/* Categories Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform ${cat.color}`}>
                <cat.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-4">{cat.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Who We Are */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-6 uppercase">Who We Are</h2>
              <div className="space-y-6 text-slate-400 text-lg font-medium leading-relaxed">
                <p>
                  Direct IPTV was born from a simple idea: everyone deserves access to great television — without expensive cable contracts, unreliable satellite dishes, or poor-quality streams.
                </p>
                <p>
                  We built Direct IPTV to be the service we always wanted — fast, reliable, affordable, and packed with content from every corner of the world. From day one, our focus has been on quality over quantity and real human support that actually responds.
                </p>
                <p>
                  Today, we serve subscribers worldwide across more than 130 countries. Our infrastructure runs on enterprise-grade servers with CDN technology to guarantee the smoothest possible streaming experience — no matter where you are or what device you use.
                </p>
                <p>
                  We are not just another IPTV provider. We are a team that cares deeply about your experience and works every day to earn your trust through quality, reliability, and honest pricing.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-2 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1000" 
                alt="Streaming Experience" 
                className="w-full h-auto rounded-[2.2rem] opacity-80"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card px-8 py-6 rounded-2xl border border-primary/30 bg-primary/10 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">Global Users</p>
                  <p className="text-2xl font-black italic">130+ Countries</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* What Makes Us Different */}
        <section className="glass-card p-12 md:p-20 rounded-[3rem] border border-white/5 bg-white/[0.01] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Heart className="w-64 h-64 text-primary" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold tracking-tight mb-8">What Makes Us Different</h2>
            <p className="text-slate-400 text-lg font-medium mb-12 max-w-2xl">
              There are hundreds of IPTV providers online. Here is why our subscribers chose Direct IPTV, and why they keep renewing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {WHY_US.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1.5 shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary group-hover:scale-125 transition-transform" />
                  </div>
                  <span className="text-slate-300 font-semibold group-hover:text-white transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <div className="inline-flex flex-wrap items-center gap-8 px-8 py-5 rounded-full glass-card border border-white/5 bg-white/[0.02]">
             <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-blue-500" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Enterprise Infrastructure</span>
             </div>
             <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-purple-500" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">130+ Countries</span>
             </div>
             <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">24/7 Human Support</span>
             </div>
          </div>
        </section>
      </div>
    </main>
  );
}
