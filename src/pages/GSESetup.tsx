import { motion } from 'motion/react';
import { Download, List, Settings, Smartphone, Apple, PlaySquare, ShieldCheck, Cpu, Wifi, Globe } from 'lucide-react';

export default function GSESetup() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-indigo-600/5 rounded-full blur-[150px] -mr-40 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[150px] -ml-40 -mb-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <section className="text-center mb-20 relative">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-4"
          >
            Universal App Guide
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase leading-[1]"
          >
            How to Install <br /> <span className="text-gradient">GSE Smart IPTV</span>
          </motion.h1>
          
          {/* Enhanced Graphic Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-8 relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(79,70,229,0.1)] group bg-slate-900"
            >
              <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" 
                alt="GSE Smart IPTV Setup" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background-dark/80 via-transparent to-transparent"></div>
              
              {/* Simulated UI Overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-[85%] aspect-video glass-card border-white/20 rounded-2xl bg-black/40 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <PlaySquare className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-300">GSE Smart IPTV</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center"><Settings className="h-3 w-3 text-white/50" /></div>
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center"><List className="h-3 w-3 text-white/50" /></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                       <Globe className="h-5 w-5 text-indigo-400" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase">M3U Playlist</span>
                    </div>
                    <div className="p-4 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex flex-col items-center gap-2">
                       <Smartphone className="h-5 w-5 text-indigo-200" />
                       <span className="text-[10px] font-bold text-white uppercase tracking-tight">Xtream API</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                       <Download className="h-5 w-5 text-indigo-400" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">EPG Setup</span>
                    </div>
                  </div>

                  <div className="h-10 w-full bg-indigo-600 rounded-lg flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-600/20">
                    Add Remote Playlist
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-4 space-y-6"
            >
              {[
                { title: "APK Installation", text: "Firestick Ready", icon: Download, color: "text-indigo-400" },
                { title: "Buffer Optimization", text: "Stutter-Free Flow", icon: PlaySquare, color: "text-emerald-400" },
                { title: "Hardware Decoding", text: "Max Performance", icon: Cpu, color: "text-purple-400" },
                { title: "EPG Sync", text: "Live Schedules", icon: List, color: "text-amber-400" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 ${feature.color}`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <div className="text-left">
                    <p className="text-base font-black uppercase tracking-tight leading-none mb-1 group-hover:text-indigo-500 transition-colors">{feature.title}</p>
                    <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">{feature.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-10 rounded-[2.5rem] max-w-4xl mx-auto bg-white/[0.02] border-white/5 text-left space-y-6"
          >
            <p className="text-slate-300 font-medium leading-relaxed text-lg">
              To install IPTV on GSE Smart IPTV, you’ll first download the application from your device’s app store and grant necessary permissions. Next, configure remote playlists by inputting your provider’s M3U URL or Xtream Codes API credentials through the playlist management interface.
            </p>
            <p className="text-slate-400 font-medium leading-relaxed">
              For DirectIPTV services, set EPG synchronization protocols to 24-hour intervals and adjust decoder parameters for optimal streaming performance. Proper configuration of authentication tokens and buffer allocation ensures stable connectivity throughout your streaming sessions.
            </p>
          </motion.div>
        </section>

        {/* 1. Download and Install */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900">
               {/* Visual for App Stores */}
               <div className="absolute inset-0 flex items-center justify-center gap-8 p-12">
                  <div className="w-1/2 aspect-[9/16] bg-black/60 rounded-3xl border border-white/20 p-4 relative overflow-hidden group">
                    <div className="text-[8px] font-black text-slate-500 mb-2 tracking-widest uppercase text-center italic">App Store</div>
                    <div className="w-full h-24 rounded-xl bg-white/5 flex items-center justify-center mb-4"><Apple className="h-10 w-10 text-white/20" /></div>
                    <div className="h-6 w-full bg-indigo-600 rounded-lg flex items-center justify-center text-[8px] font-black uppercase">Get App</div>
                  </div>
                  <div className="w-1/2 aspect-[9/16] bg-black/60 rounded-3xl border border-white/20 p-4 relative overflow-hidden group">
                    <div className="text-[8px] font-black text-slate-500 mb-2 tracking-widest uppercase text-center italic">Play Store</div>
                    <div className="w-full h-24 rounded-xl bg-white/5 flex items-center justify-center mb-4"><Smartphone className="h-10 w-10 text-white/20" /></div>
                    <div className="h-6 w-full bg-emerald-600 rounded-lg flex items-center justify-center text-[8px] font-black uppercase">Install</div>
                  </div>
               </div>
               <div className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black">1</div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Download className="h-8 w-8 text-indigo-500" />
                <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Download and Install <br /> GSE Smart IPTV App</h2>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                Open the App Store (iOS) or Google Play Store (Android) on your device. Search for “GSE Smart IPTV” and locate the official app by droidvision. Tap Install/Get and wait for completion.
              </p>
              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem]">
                <p className="text-sm font-bold text-indigo-400 mb-2 uppercase italic tracking-widest">For Firestick Users:</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Use the Downloader app to install the APK file from a trusted source. Once installed, open GSE Smart IPTV from your home screen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Obtain Credentials */}
        <section className="mb-24">
          <div className="glass-card p-12 rounded-[3.5rem] border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <div className="w-32 h-32 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8 mx-auto md:mx-0">
                <ShieldCheck className="h-16 w-16 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-center md:text-left">Obtain Provider Credentials</h2>
            </div>
            <div className="md:w-2/3 space-y-4">
              <p className="text-slate-400 leading-relaxed font-medium">
                Gather the necessary information from your IPTV service provider. You’ll need either an M3U playlist URL, Xtream Codes API credentials (server URL, username, and password), or an EPG URL for program guide data.
              </p>
              <div className="flex items-center gap-3 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                <Globe className="h-5 w-5 text-indigo-400" />
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest italic">Check your welcome email for activation details.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Add Playlist */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <List className="h-8 w-8 text-indigo-500" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Add Your IPTV Playlist</h2>
              </div>
              <div className="space-y-6">
                <p className="text-slate-400 leading-relaxed font-medium">
                  Launch the app and tap the “+” icon or “Add Playlist” button. 
                </p>
                <div className="space-y-4">
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-xs font-black text-indigo-400 uppercase mb-2 italic">Option A: M3U URL</p>
                    <p className="text-sm text-slate-300">Paste your complete playlist link in the URL field.</p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-xs font-black text-indigo-400 uppercase mb-2 italic">Option B: Xtream API</p>
                    <p className="text-sm text-slate-300">Enter server address (without http://), username, and password.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full" />
              <div className="relative glass-card p-10 rounded-[3rem] border border-white/10 bg-white/[0.01]">
                <div className="w-full aspect-square rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                  <List className="h-24 w-24 text-white opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Load & Configure EPG */}
        <section className="mb-24">
          <div className="glass-card p-12 rounded-[3.5rem] border border-white/5 bg-white/[0.01] relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <Settings className="h-8 w-8 text-emerald-500" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Load Channels and Configure EPG</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <p className="text-slate-400 leading-relaxed font-medium">
                    The app will connect to your provider’s server and begin downloading your channel list (15-45 seconds). Once loaded, channels will appear organized in the main interface.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold">EPG Activation:</h4>
                  <p className="text-sm text-slate-500 font-medium">
                    Tap Settings &gt; EPG, and enter your EPG URL. The guide will sync automatically, displaying program schedules for each channel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Optimize Player */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mx-auto mb-6">
              <Sliders className="h-8 w-8 text-indigo-500" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Optimize Player Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Decoding", text: "Enable hardware acceleration to improve performance and reduce buffering.", icon: Cpu },
              { title: "Stability", text: "Adjust buffer length to 3-5 seconds for optimal streaming stability.", icon: Wifi },
              { title: "Visuals", text: "Choose different themes and layouts to personalize your interface.", icon: PlaySquare }
            ].map((item, i) => (
              <div key={i} className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                <item.icon className="h-10 w-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">{item.title}</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>


      </div>
    </main>
  );
}

function Sliders({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="2" y1="14" x2="6" y2="14" />
      <line x1="10" y1="8" x2="14" y2="8" />
      <line x1="18" y1="16" x2="22" y2="16" />
    </svg>
  );
}
