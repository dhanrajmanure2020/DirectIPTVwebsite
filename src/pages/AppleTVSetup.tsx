import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function AppleTVSetup() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <section className="text-center mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4"
          >
            Installation Instructions
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4"
          >
            How to Set Up <span className="text-primary">IPTV</span> on Apple TV?
          </motion.h1>
          
          {/* Main Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl mb-12 group"
          >
            <img 
              src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=1200" 
              alt="Apple TV Setup" 
              className="w-full h-auto object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8 rounded-3xl max-w-3xl mx-auto bg-white/[0.02] border-white/5"
          >
            <p className="text-slate-400 font-medium leading-relaxed">
              To set up IPTV on your Apple TV, you'll need a compatible device, stable internet, and a reputable IPTV provider. Install a compatible app from the App Store, configure it, and enter your IPTV subscription details accurately to access live TV channels and on-demand content.
            </p>
          </motion.div>
        </section>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] relative overflow-hidden"
          >
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-lg font-black italic">1</div>
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold tracking-tight">Install an IPTV App</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Open the App Store on your Apple TV. Search for an app like <span className="text-white font-bold">IPTV Smarters Player Lite</span> or <span className="text-white font-bold">GSE Smart IPTV</span>. Download and install your preferred app.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-500 border border-white/5">App Store</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-500 border border-white/5">tvOS Compatible</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] relative overflow-hidden"
          >
             <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-lg font-black italic">2</div>
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold tracking-tight">Add Your IPTV Subscription</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Launch the app once it's installed. Look for the option to add a new playlist or subscription. Enter your <span className="text-white font-bold">M3U URL</span> or <span className="text-white font-bold">Xtream Codes API</span> details provided by your IPTV provider.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] relative overflow-hidden"
          >
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-lg font-black italic">3</div>
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold tracking-tight">Log In to Your IPTV Service</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  If prompted, enter your username and password. Some apps will only require the playlist link. Use the login info provided by your IPTV service.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] relative overflow-hidden"
          >
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-lg font-black italic">4</div>
              <div className="space-y-4">
                <h3 className="text-2xl font-extrabold tracking-tight">Start Watching</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                   Once your playlist loads, browse through the channel list. Start streaming your favourite TV shows, sports, or movies instantly.
                </p>
                <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all">
                  <Play className="h-4 w-4 fill-primary" />
                  Launch Player
                </button>
              </div>
            </div>
          </motion.div>

        </div>



      </div>
    </main>
  );
}
