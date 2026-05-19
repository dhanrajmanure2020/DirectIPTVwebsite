import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { CHANNEL_CATEGORIES } from '../constants';

export default function Channels() {
  const [openCategory, setOpenCategory] = useState<string | null>('north_america');

  return (
    <main className="flex-grow max-w-5xl mx-auto px-6 py-24 mt-20">
      <section className="mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4"
        >
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500">Channel Discovery</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium"
        >
          Over 30,000 channels from across the globe, organized for your convenience.<br />
          Experience the ultimate entertainment library.<br /><br />
          Customize your Viewing list by selecting which countries you want and do not want
        </motion.p>
      </section>

      <div className="space-y-4">
        {CHANNEL_CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            className={`glass-card rounded-xl overflow-hidden border transition-all ${
              cat.special ? 'border-primary/20' : 'border-white/5'
            } ${cat.locked ? 'opacity-40 hover:opacity-100' : ''}`}
          >
            <button 
              onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
              className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${cat.color}`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold tracking-tight inline-block align-middle mr-3 ${cat.special ? 'text-primary' : ''}`}>
                    {cat.name}
                  </h3>
                  <span className={`text-[10px] uppercase font-bold tracking-[0.2em] hidden sm:inline-block ${
                    cat.special ? 'text-primary/70' : 'text-slate-400'
                  }`}>
                    {cat.sub}
                  </span>
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openCategory === cat.id ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {openCategory === cat.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 pt-0 border-t border-white/5 bg-white/[0.01]">
                    {cat.locked ? (
                      <div className="p-8 border border-dashed border-white/10 rounded-xl text-center">
                        <p className="text-slate-400 text-sm mb-4">Adult content is discreetly organized and protected by default.</p>
                        <button className="text-primary text-xs font-bold border border-primary/30 px-6 py-2 rounded-full hover:bg-primary/10 transition-colors uppercase tracking-widest">
                          Show Categories
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {cat.channels.map((chan) => (
                          <div 
                            key={chan.name}
                            className={`glass-card p-3 px-4 rounded-lg flex items-center gap-4 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(158,202,255,0.1)] transition-all cursor-pointer group ${
                              cat.special ? 'border-primary/20 scale-[1.02]' : ''
                            }`}
                          >
                            <div className="w-[22px] h-[17px] rounded overflow-hidden flex items-center justify-center bg-white/10 text-[12px] font-bold leading-none">
                              {(() => {
                                const flagOrIcon = 'flag' in chan ? chan.flag : chan.icon;
                                if (!flagOrIcon) return null;
                                // Basic regional indicator check
                                if (typeof flagOrIcon === 'string') {
                                  const chars = [...flagOrIcon];
                                  if (chars.length === 2) {
                                    const c1 = chars[0].codePointAt(0);
                                    const c2 = chars[1].codePointAt(0);
                                    if (c1 && c2 && c1 >= 127462 && c1 <= 127487 && c2 >= 127462 && c2 <= 127487) {
                                      const code = (String.fromCharCode(c1 - 127397) + String.fromCharCode(c2 - 127397));
                                      return <ReactCountryFlag countryCode={code.toUpperCase()} svg style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
                                    }
                                  }
                                }
                                return <span style={{ fontSize: '12px' }}>{flagOrIcon}</span>;
                              })()}
                            </div>
                            <span className="font-bold text-[10px] uppercase tracking-widest">{chan.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </main>
  );
}
