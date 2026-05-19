import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Gift } from 'lucide-react';
import logoUrl from '../png-logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Channels', path: '/channels' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Tutorials', path: '/tutorials' },
    { name: 'Help', path: '/help' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed w-full z-50 bg-[#080808]/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Links */}
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center active:scale-95 transition-transform">
              <img 
                src={logoUrl} 
                alt="DirectIPTV" 
                className="w-[100px] h-auto" 
              />
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-all hover:scale-105 ${
                    location.pathname === link.path 
                      ? 'text-white font-bold border-b-2 border-blue-500 pb-1' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden lg:block relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <Link 
                to="/free-trial" 
                className="relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                <Gift className="w-5 h-5 text-white relative z-10 group-hover:animate-bounce" />
                <span className="text-white font-bold relative z-10 tracking-wide text-sm whitespace-nowrap">24Hr Free Trial</span>
              </Link>
            </motion.div>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-zinc-400 hover:text-white transition-colors p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background-dark/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-10 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block py-3 text-lg font-bold transition-colors ${
                    location.pathname === link.path 
                      ? 'text-white' 
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <motion.div whileTap={{ scale: 0.95 }} className="mt-4 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl blur flex opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                <Link
                  to="/free-trial"
                  className="relative flex justify-center items-center gap-2 py-3 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] overflow-hidden"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                  <Gift className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">24Hr Free Trial</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
