import { Link } from 'react-router-dom';
import { CreditCard, Bitcoin, Wallet, Facebook, Instagram, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import logoUrl from '../png-logo.png';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="relative bg-[#050505] pt-16 pb-12 border-t border-white/5 mt-auto overflow-hidden">
      {/* Decorative top blur glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent blur-sm"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 max-w-xl h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
      
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-items-center md:justify-items-stretch text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Left: Logo & Copyright */}
          <motion.div className="flex flex-col items-center md:items-start space-y-4" variants={itemVariants}>
            <Link to="/" className="inline-block active:scale-95 transition-transform">
              <img 
                src={logoUrl} 
                alt="DirectIPTV" 
                className="w-[110px] h-auto drop-shadow-xl hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-500" 
              />
            </Link>
            <div className="text-[11px] text-zinc-500/80 font-medium tracking-wide">
              © 2026 Direct IPTV. All Rights Reserved.
            </div>
            <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">
              <Link to="/admin/login" className="hover:text-zinc-300 transition-colors">Admin Login</Link>
            </div>
          </motion.div>
          
          {/* Center: Social Media Icons */}
          <motion.div className="flex justify-center items-center gap-5 md:mx-auto" variants={itemVariants}>
            <a
              href="https://www.facebook.com/Direct.IPTVs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/50 border border-white/5 hover:bg-[#1877F2]/10 hover:border-[#1877F2]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] backdrop-blur-md"
            >
              <Facebook className="w-5 h-5 text-zinc-400 group-hover:text-[#1877F2] transition-colors" />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/50 border border-white/5 hover:bg-[#E1306C]/10 hover:border-[#E1306C]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(225,48,108,0.4)] backdrop-blur-md"
            >
              <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-[#E1306C] transition-colors duration-300" />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900/50 border border-white/5 hover:bg-[#FF0000]/10 hover:border-[#FF0000]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] backdrop-blur-md"
            >
              <Youtube className="w-5 h-5 text-zinc-400 group-hover:text-[#FF0000] transition-colors" />
            </a>
          </motion.div>

          {/* Right: Payment Icons */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-end justify-self-center md:justify-self-end space-y-3">
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold flex flex-col md:items-end">Secure Checkout</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-14 h-9 rounded-lg bg-gradient-to-b from-white/10 to-transparent border border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(96,165,250,0.2)] hover:-translate-y-0.5 transition-all duration-300 cursor-help group backdrop-blur-sm" title="Visa">
                <CreditCard size={20} className="text-zinc-400 group-hover:text-blue-400 drop-shadow-md transition-colors" />
              </div>
              <div className="flex items-center justify-center w-14 h-9 rounded-lg bg-gradient-to-b from-white/10 to-transparent border border-white/10 hover:border-orange-400/50 hover:shadow-[0_0_15px_rgba(251,146,60,0.2)] hover:-translate-y-0.5 transition-all duration-300 cursor-help group backdrop-blur-sm" title="Mastercard">
                <CreditCard size={20} strokeWidth={1.5} className="text-zinc-400 group-hover:text-orange-400 drop-shadow-md transition-colors" />
              </div>
              <div className="flex items-center justify-center w-14 h-9 rounded-lg bg-gradient-to-b from-white/10 to-transparent border border-white/10 hover:border-[#F7931A]/50 hover:shadow-[0_0_15px_rgba(247,147,26,0.2)] hover:-translate-y-0.5 transition-all duration-300 cursor-help group backdrop-blur-sm" title="Bitcoin">
                <Bitcoin size={20} className="text-zinc-400 group-hover:text-[#F7931A] drop-shadow-md transition-colors" />
              </div>
              <div className="flex items-center justify-center w-14 h-9 rounded-lg bg-gradient-to-b from-white/10 to-transparent border border-white/10 hover:border-[#00457C]/50 hover:shadow-[0_0_15px_rgba(0,69,124,0.3)] hover:-translate-y-0.5 transition-all duration-300 cursor-help group backdrop-blur-sm" title="PayPal">
                <Wallet size={20} className="text-zinc-400 group-hover:text-blue-500 drop-shadow-md transition-colors" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
