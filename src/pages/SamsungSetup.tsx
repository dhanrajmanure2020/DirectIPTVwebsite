import { motion } from 'motion/react';
import { Search, Download, ShieldCheck, Tv, Wifi, Settings, List, Smartphone, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SamsungSetup() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] -ml-40 -mt-20 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <section className="text-center mb-16 relative">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4"
          >
            Samsung Tizen Guide 2024
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase leading-[1]"
          >
            How to Install <br /> <span className="text-gradient">IPTV on Samsung</span>
          </motion.h1>

          {/* Enhanced Header Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.15)] mb-16 h-[500px] group bg-slate-950"
          >
            <img 
              src="https://images.unsplash.com/photo-1461151304267-38535e770f75?auto=format&fit=crop&q=80&w=1200" 
              alt="Samsung Smart TV Setup" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background-dark/90 via-background-dark/40 to-transparent"></div>
            
            {/* Floating UI Elements matching reference style */}
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
              <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                
                {/* Main TV Dashboard Mockup */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-[90%] md:w-[75%] aspect-video glass-card border-white/20 rounded-2xl bg-black/40 backdrop-blur-xl p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative z-20 overflow-hidden"
                >
                  <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-[8px] font-black shadow-lg shadow-blue-600/30">IPTV</div>
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-300">Smart Hub</span>
                    </div>
                    <div className="flex gap-4 text-[8px] font-black text-slate-500">
                      <span>4K STREAM</span>
                      <span>TIZEN OS</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6 h-[calc(100%-80px)]">
                    <div className="col-span-4 space-y-4">
                      <div className="h-6 w-20 bg-blue-600/20 rounded-md border border-blue-600/30"></div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-white/10 rounded"></div>
                        <div className="h-2 w-2/3 bg-white/5 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-4">
                        <div className="aspect-square bg-white/5 rounded-lg border border-white/5"></div>
                        <div className="aspect-square bg-white/5 rounded-lg border border-white/5"></div>
                      </div>
                    </div>
                    <div className="col-span-8 flex flex-col justify-center gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                        <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Portal Setup</div>
                        <div className="h-8 w-full bg-black/30 rounded border border-white/5 flex items-center px-4 text-[9px] text-slate-500 italic">Enter M3U Playlist Link...</div>
                        <div className="h-10 w-full bg-blue-600 rounded-lg flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20">Connect Device</div>
                      </div>
                    </div>
                  </div>

                  {/* MAC Address Activation Floating Badge */}
                  <div className="absolute -bottom-2 -right-2 p-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl rotate-[-2deg] hidden md:block">
                    <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-1">Activation ID</p>
                    <p className="text-xs font-mono text-white tracking-widest">MAC: 00:1A:79:B0:12:XX</p>
                  </div>
                </motion.div>

                {/* Decorative Blur Orbs */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-0 inset-x-0 p-8 border-t border-white/5 bg-black/20 backdrop-blur-md flex justify-around items-center">
               {[
                 { label: "Stability", val: "99.9% Uptime", icon: ShieldCheck },
                 { label: "Connection", val: "Wired/5GHz", icon: Wifi },
                 { label: "Resolution", val: "Native 4K HDR", icon: Tv }
               ].map((stat, i) => (
                 <div key={i} className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                     <stat.icon className="h-5 w-5 text-blue-400" />
                   </div>
                   <div className="text-left">
                     <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
                     <p className="text-xs font-bold text-white">{stat.val}</p>
                   </div>
                 </div>
               ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-10 rounded-[2.5rem] max-w-4xl mx-auto bg-white/[0.02] border-white/5 text-left space-y-6"
          >
             <p className="text-slate-300 font-medium leading-relaxed text-lg">
               On your Samsung TV, go to <span className="text-white font-bold">Settings &gt; Support &gt; About This TV</span> to confirm model year and Tizen OS, then update firmware. Open Smart Hub, search for a reputable IPTV app compatible with your region/OS, and install it.
             </p>
             <p className="text-slate-400 font-medium leading-relaxed">
               Sign in, add your M3U/EPG (HTTPS) under Playlist/Content, and enable auto-refresh. If your model is older or apps are limited, use a streaming stick via HDMI. For stability, prefer Ethernet, clear app cache, and test speeds. Next, you’ll optimize setup and fix common issues.
             </p>
          </motion.div>
        </section>

        {/* Setup Steps */}
        <div className="grid grid-cols-1 gap-12 mb-20 text-left">
          
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-10 items-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0 text-3xl font-black italic text-blue-400">01</div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Tv className="h-6 w-6 text-blue-500" />
                <h3 className="text-2xl font-black uppercase tracking-tight">Open the Samsung Smart Hub</h3>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                Turn on your Samsung Smart TV and press the <span className="text-white">Home button</span> on the remote. Select <span className="text-white">Apps</span> from the menu to open the Smart Hub — this is Samsung’s official app store where IPTV players are available. If you haven’t logged into your Samsung account yet, sign in to enable app downloads.
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-10 items-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0 text-3xl font-black italic text-blue-400">02</div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Search className="h-6 w-6 text-blue-500" />
                <h3 className="text-2xl font-black uppercase tracking-tight">Search for a Compatible IPTV App</h3>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                Use the search bar and type <span className="text-white">“Smart IPTV,” “SS IPTV,” or “SmartOne IPTV.”</span> These are among the most popular IPTV apps officially supported by Samsung TVs.
              </p>
              <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10 flex items-start gap-4">
                <Info className="h-5 w-5 text-orange-500 mt-1 shrink-0" />
                <p className="text-xs font-bold text-slate-400">Pro Tip: For models 2016 or older, consider using an external streaming stick like Fire Stick if native apps are missing.</p>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-10 items-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0 text-3xl font-black italic text-blue-400">03</div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Download className="h-6 w-6 text-blue-500" />
                <h3 className="text-2xl font-black uppercase tracking-tight">Install and Launch</h3>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                Select your preferred app and click <span className="text-white">Install</span>. Once installed, open the app from the Home &gt; Apps menu. When you first launch it, you’ll see a <span className="text-blue-400 font-bold">MAC address</span> or activation code on screen — <span className="text-white">note this down</span>, as you’ll need it to activate your subscription.
              </p>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-10 items-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0 text-3xl font-black italic text-blue-400">04</div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <List className="h-6 w-6 text-blue-500" />
                <h3 className="text-2xl font-black uppercase tracking-tight">Add Subscription or Playlist</h3>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed mb-4">
                On your phone or computer, visit the official website of your chosen IPTV app. Enter your TV’s MAC address and upload the M3U link provided by DirectIPTV.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                   <Smartphone className="h-5 w-5 text-blue-400" />
                   <span className="text-xs font-bold uppercase tracking-widest">Connect via Mobile</span>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                   <ShieldCheck className="h-5 w-5 text-emerald-400" />
                   <span className="text-xs font-bold uppercase tracking-widest">Secure M3U Upload</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 italic mt-4">After uploading, restart the app on your TV to see your channel lineup.</p>
            </div>
          </motion.div>

          {/* Step 5 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-[3.5rem] border border-white/5 bg-blue-600/[0.02] flex flex-col gap-8"
          >
            <div className="flex items-center gap-4">
              <Settings className="h-8 w-8 text-blue-400" />
              <h3 className="text-3xl font-black uppercase tracking-tight">Optimize and Enjoy</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                 <p className="text-slate-300 font-medium leading-relaxed">
                   Once the playlist loads, browse through your channels, VOD, or EPG. For the best experience, use a wired <span className="text-white">Ethernet connection</span> or 5 GHz Wi-Fi to reduce buffering.
                 </p>
                 <ul className="space-y-3">
                   <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Prefer Wired Ethernet
                   </li>
                   <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 5GHz Wi-Fi Support
                   </li>
                   <li className="flex items-center gap-3 text-sm font-bold text-slate-400">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Regular Firmware Updates
                   </li>
                 </ul>
               </div>
               <div className="space-y-6">
                 <h4 className="text-xl font-bold uppercase tracking-tight">Visual Optimization:</h4>
                 <p className="text-sm text-slate-500 leading-relaxed">
                    You can adjust video settings (resolution, aspect ratio) inside the IPTV app for smoother playback. Always ensure your IPTV provider is licensed and reliable to avoid interruptions.
                 </p>
                 <Link 
                   to="/checkout"
                   className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-white text-background-dark font-black uppercase tracking-widest shadow-2xl transition-transform active:scale-95"
                 >
                   Try Our Premium Plan
                 </Link>
               </div>
            </div>
          </motion.div>

        </div>




      </div>
    </main>
  );
}
