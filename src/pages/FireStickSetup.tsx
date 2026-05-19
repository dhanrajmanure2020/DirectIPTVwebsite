import { motion } from 'motion/react';
import { Play, Settings, ShieldAlert, Download, MonitorPlay, Info } from 'lucide-react';

export default function FireStickSetup() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <section className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4"
          >
            Ultimate Installation Guide
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase leading-[0.9]"
          >
            IPTV Fire Stick <br /> <span className="text-gradient">Professional Setup</span>
          </motion.h1>
          
          {/* Main Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(33,150,243,0.1)] mb-12 group"
          >
            <img 
              src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=1200" 
              alt="Fire Stick Setup" 
              className="w-full h-auto object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <MonitorPlay className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Live Status</p>
                <p className="text-sm font-bold">Fire OS 8.0+ Ready</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-8 rounded-3xl max-w-3xl mx-auto bg-white/[0.02] border-white/5"
          >
            <p className="text-slate-400 font-medium leading-relaxed">
              You'll install IPTV Fire Stick by first enabling Developer Options in Settings &gt; My Fire TV, then turning on "Apps from Unknown Sources" and "ADB Debugging". Next, download the Downloader app from Amazon's store, open it, and use its browser to download your preferred IPTV player's APK file. After installation, launch the IPTV app and enter your M3U playlist URL or Xtream Codes in the settings.
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
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-extrabold tracking-tight">Prepare & Set Up</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Turn on your Fire Stick and make sure it's connected to your TV and Wi-Fi. Go to <span className="text-white font-bold">Settings → Network</span> and confirm you have a stable internet connection. This ensures your IPTV app will download properly and stream without interruption.
                </p>
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
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-orange-500" />
                  <h3 className="text-2xl font-extrabold tracking-tight">Enable Unknown Sources</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Go to <span className="text-white font-bold">Settings → My Fire TV → Developer Options</span>. Activate <span className="text-white font-bold">ADB Debugging</span> and <span className="text-white font-bold">Apps from Unknown Sources</span>. Amazon blocks third-party apps by default, so this step is required for IPTV players.
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
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-blue-500" />
                  <h3 className="text-2xl font-extrabold tracking-tight">Install Downloader App</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Return to the home screen and select the search icon. Type <span className="text-white font-bold">Downloader</span>, open the official orange app, and install it. Downloader is what you'll use to retrieve the IPTV APK file securely from a URL.
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
                <div className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  <h3 className="text-2xl font-extrabold tracking-tight">Download IPTV Player</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Open Downloader and allow permissions. In the URL field, type the download link provided by your IPTV provider. Press <span className="text-white font-bold">Go</span> to download the APK. Once finished, choose <span className="text-white font-bold">Install</span>, then <span className="text-white font-bold">Open</span>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 5 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] col-span-1 md:col-span-2"
          >
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-lg font-black italic">5</div>
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-2">
                  <MonitorPlay className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-2xl font-extrabold tracking-tight">Configure Your Service</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Launch the IPTV app. Enter the credentials provided by your IPTV provider, which typically include one of the following:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Option A</p>
                    <p className="text-sm font-bold">M3U Playlist URL</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Option B</p>
                    <p className="text-sm font-bold">Xtream Codes API</p>
                    <p className="text-[10px] text-slate-500 mt-1">(Username, Password, Server URL)</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Option C</p>
                    <p className="text-sm font-bold">Stalker Portal</p>
                    <p className="text-[10px] text-slate-500 mt-1">(MAC Address Activation)</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Once entered, let the app load channels, movies, and EPG. After data is refreshed, you're ready to start streaming your favorite content!
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Info Box */}
        <div className="mb-20 glass-card p-6 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-4">
          <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
             If you're using DirectIPTV services, make sure your credentials are correct and up to date. The complete setup process also includes troubleshooting tips for common issues.
          </p>
        </div>


      </div>
    </main>
  );
}
