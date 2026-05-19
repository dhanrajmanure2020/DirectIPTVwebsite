import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, PlayCircle, Tv } from 'lucide-react';
import { STATS, PLATFORMS, SUBSCRIPTION_FEATURES } from '../constants';
import bgImage from '../pgbg.png';
import { PricingSection } from '../components/PricingSection';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
        {/* Background Layering */}
        <div className="absolute inset-0 z-0 bg-background-dark">
          {/* Main uploaded image with adjusted opacity for more brightness */}
          <img 
            alt="Cinematic Background" 
            className="w-full h-full object-cover opacity-50" 
            src={bgImage} 
            referrerPolicy="no-referrer"
          />
          {/* Semi-transparent overlay blending */}
          <div className="absolute inset-0 bg-background-dark/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <Star className="text-primary h-4 w-4 fill-primary" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-300">Premium Streaming Redefined</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
              delay: 0.1 
            }}
            style={{ perspective: 1000 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
          >
            Direct IPTV<br />
            <motion.span 
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              className="text-[20px] sm:text-[24px] md:text-[32px] block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-[length:200%_auto]"
            >
              Premium IPTV Service & 4K Streaming<br />
              Simple Plans, No Hidden Fees, you choose your viewing channels
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-[521px] mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed"
          >
            Every plan includes 30,000+ Live channels, 160,000+ Movies and Series, 4K Quality and 24/7 support
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-full text-base font-bold text-white btn-gradient"
            >
              <PlayCircle className="mr-2 h-6 w-6" />
              CHOOSE YOUR PLAN
            </button>
            <Link to="/channels" className="inline-flex items-center justify-center px-8 py-4 border border-white/20 rounded-full text-base font-bold text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
              View Channels
              <Tv className="ml-2 h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="-mt-12 relative z-20 pb-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 bg-background-dark/60 backdrop-blur-xl text-center group hover:bg-white/[0.03] transition-all shadow-2xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-background-dark border-y border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1035] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center"
          >
            {[...PLATFORMS, ...PLATFORMS].map((platform, i) => (
              <div key={i} className="flex items-center gap-3 grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  {platform.icon}
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em]">{platform.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Features Section */}
      <section className="py-24 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter">Everything in one subscription</h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">Premium features designed for the ultimate global viewing experience without limits.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUBSCRIPTION_FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card rounded-3xl p-8 relative group overflow-hidden border border-white/5 hover:bg-white/[0.03] transition-all`}
              >
                <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
