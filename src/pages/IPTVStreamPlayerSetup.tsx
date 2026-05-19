import { motion } from 'motion/react';
import { Download, List, Settings, PlaySquare, Smartphone, Globe, Layers, CheckCircle2 } from 'lucide-react';

export default function IPTVStreamPlayerSetup() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-600/5 rounded-full blur-[150px] -mr-40 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] -ml-40 -mb-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <section className="text-center mb-16 relative">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4"
          >
            Universal Media Player Guide
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase leading-[0.9]"
          >
            How to Install <br /> <span className="text-gradient">IPTV Stream Player</span>
          </motion.h1>

          {/* Enhanced Graphic Header */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.1)] mb-12 h-[480px] group bg-slate-900"
          >
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" 
              alt="IPTV Stream Player Hub" 
              className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
            
            {/* Visual Setup Dashboard */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-3xl aspect-video glass-card border-white/20 rounded-2xl bg-black/40 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <PlaySquare className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-300">STREAM PLAYER v4.0</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                  </div>
                </div>

                <div className="flex-grow flex items-center gap-8 px-4">
                  <div className="w-1/2 space-y-4">
                    <h4 className="text-xl font-bold uppercase tracking-tight">Setup Portal</h4>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                      <div className="h-3 w-3/4 bg-white/10 rounded"></div>
                      <div className="h-3 w-1/2 bg-white/5 rounded"></div>
                    </div>
                  </div>
                  <div className="w-1/2 space-y-3">
                    <div className="p-4 bg-emerald-500 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-widest text-emerald-950">
                      Add M3U Playlist
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xs font-bold uppercase tracking-widest text-slate-400">
                      Xtream Codes API
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-[8px] font-black text-slate-500 tracking-widest uppercase">
                  <span>Decoder: HW+ Enabled</span>
                  <span>Buffer: 25.0MB / Optimal</span>
                </div>
              </div>
            </div>

            {/* Floating Platform Icons */}
            <div className="absolute bottom-10 right-10 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-slate-400" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-md border border-black/20 flex items-center justify-center">
                <Globe className="h-6 w-6 text-slate-400" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-10 rounded-[2.5rem] max-w-4xl mx-auto bg-white/[0.02] border-white/5 text-left space-y-6 shadow-2xl"
          >
             <p className="text-slate-300 font-medium leading-relaxed text-lg italic">
               Installing IPTV on the IPTV Stream Player app is quick and simple. Just ensure your device is connected to a stable internet connection. Start by downloading the app from the Google Play Store (Android) or the App Store (iOS). Once installed, open the app, go to Settings, and enter your IPTV M3U playlist URL or Xtream Codes.
             </p>
             <p className="text-slate-400 font-medium leading-relaxed">
               If you’re subscribed to DirectIPTV or another top IPTV provider, be sure to input your subscription details—username, password, and server URL—accurately. Save the settings and refresh the playlist to load your channels. This ensures a smooth streaming experience with minimal buffering.
             </p>
          </motion.div>
        </section>

        {/* 1. Download and Install */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-slate-950 group">
                <img 
                   src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600" 
                   alt="App Installation" 
                   className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
                   referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Download className="h-8 w-8 text-emerald-500" />
                  </div>
                </div>
                <div className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black">1</div>
             </div>
             <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <Download className="h-8 w-8 text-emerald-500" />
                 <h2 className="text-3xl font-black uppercase tracking-tight leading-none">Download and <br /> Install App</h2>
               </div>
               <div className="space-y-6">
                 <div className="flex items-start gap-5 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 transition-colors hover:bg-white/[0.04]">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                     <Smartphone className="h-6 w-6 text-emerald-500" />
                   </div>
                   <div>
                     <h4 className="text-lg font-bold">Android Users</h4>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">Open Google Play Store, search for <span className="text-white">“IPTV Stream Player”</span>, and install.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-5 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 transition-colors hover:bg-white/[0.04]">
                   <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                     <Smartphone className="h-6 w-6 text-blue-500" />
                   </div>
                   <div>
                     <h4 className="text-lg font-bold">iOS Users</h4>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">Go to App Store, search <span className="text-white">“IPTV Stream Player”</span>, and download the application.</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* 2. Add Your Playlist */}
        <section className="mb-24">
          <div className="glass-card p-12 rounded-[3.5rem] border border-white/5 bg-white/[0.01] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 grayscale group-hover:grayscale-0 transition-all">
               <Layers className="h-40 w-40 text-emerald-500" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <List className="h-6 w-6 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Add Your IPTV Playlist</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4">
                   <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-black italic">A</div>
                   <h4 className="text-xl font-bold uppercase tracking-tight">Via M3U Playlist URL</h4>
                   <ul className="space-y-3">
                     <li className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                       <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Click on “Add Playlist”
                     </li>
                     <li className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                       <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Paste your DirectIPTV M3U URL
                     </li>
                     <li className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                       <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Click “Add” to confirm
                     </li>
                   </ul>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4">
                   <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-black italic">B</div>
                   <h4 className="text-xl font-bold uppercase tracking-tight">Via Local M3U File</h4>
                   <ul className="space-y-3">
                     <li className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                       <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Tap “Add Playlist”
                     </li>
                     <li className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                       <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Browse and select saved file
                     </li>
                     <li className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                       <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Automatic channel import
                     </li>
                   </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Optional Settings & Watching */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] group">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Settings className="h-7 w-7 text-emerald-500" />
            </div>
            <h4 className="text-2xl font-black uppercase tracking-tight mb-4">Customize Settings</h4>
            <p className="text-slate-400 font-medium leading-relaxed underline-offset-4 decoration-emerald-500/30 decoration-2">
              Navigate to Settings to adjust language, video quality, subtitles, and playback preferences. Tailor the app to match your streaming needs for an optimal experience.
            </p>
          </div>
          <div className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] group">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PlaySquare className="h-7 w-7 text-blue-500" />
            </div>
            <h4 className="text-2xl font-black uppercase tracking-tight mb-4">Start Watching</h4>
            <p className="text-slate-400 font-medium leading-relaxed underline-offset-4 decoration-blue-500/30 decoration-2">
              Once your playlist is loaded, you’ll see all available channels. Click on any channel to start streaming instantly with high-fidelity output.
            </p>
          </div>
        </div>




      </div>
    </main>
  );
}
