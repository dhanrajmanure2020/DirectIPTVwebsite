import { motion } from 'motion/react';
import { Download, List, Settings, PlayCircle, Smartphone, Globe, Layout, CheckCircle2, LogIn, Tv, Film, Monitor, Star, Radio, Users, Bell, Video, Activity, Mail, RefreshCw } from 'lucide-react';

export default function XCIPTVSetup() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] -ml-40 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-indigo-600/5 rounded-full blur-[150px] -mr-40 -mb-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <section className="text-center mb-16 relative">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4"
          >
            Professional Player Guide
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase leading-[0.9]"
          >
            How to Configure <br /> <span className="text-gradient">XCIPTV Player</span>
          </motion.h1>

          {/* Enhanced Graphic Header */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(37,99,235,0.1)] mb-12 h-[480px] group bg-slate-900"
          >
            <img 
              src="https://images.unsplash.com/photo-1593784991095-a227369919f9?auto=format&fit=crop&q=80&w=1200" 
              alt="XCIPTV Player Interface" 
              className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent"></div>
            
            {/* Visual Setup Dashboard */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-3xl aspect-video glass-card border-white/20 rounded-2xl bg-black/50 backdrop-blur-2xl p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-8 left-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <PlayCircle className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/80">XCIPTV PLAYER</span>
                </div>
                
                <div className="space-y-6 max-w-md mx-auto w-full">
                  <h3 className="text-xl font-black uppercase tracking-tight text-center mb-8">Login to your account</h3>
                  <div className="space-y-3">
                    <div className="h-12 w-full bg-white/5 border border-white/10 rounded-xl px-4 flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">Username</div>
                    <div className="h-12 w-full bg-white/5 border border-white/10 rounded-xl px-4 flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">Password</div>
                    <div className="h-12 w-full bg-blue-600 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-blue-600/20 active:scale-95 transition-transform">Sign In</div>
                  </div>
                </div>

                <div className="absolute bottom-10 inset-x-10 flex justify-between items-center text-[8px] font-black text-slate-500 tracking-widest uppercase">
                  <div className="flex gap-4">
                    <span>M3U URL</span>
                    <span>XTREAM API</span>
                  </div>
                  <span>v6.2.0 PREMIUM</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-10 rounded-[2.5rem] max-w-4xl mx-auto bg-white/[0.02] border-white/5 text-left space-y-6 shadow-2xl"
          >
             <p className="text-slate-300 font-medium leading-relaxed text-lg">
               To configure IPTV with XCIPTV Player, first download the app from the Google Play Store or your device’s app platform. Open the app and at the login screen, choose between <span className="text-blue-400 font-bold font-mono uppercase text-sm">M3U Playlist URL</span> or <span className="text-blue-400 font-bold font-mono uppercase text-sm">Xtream Codes API</span>.
             </p>
             <p className="text-slate-400 font-medium leading-relaxed">
               Enter your IPTV Subscription credentials such as username, password, and M3U URL. Click “Sign In” to access channels and EPG. Make sure you’ve got a stable internet connection for seamless streaming. Unlock additional insights by exploring further.
             </p>
          </motion.div>
        </section>

        {/* 1. Download and Install */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/5 bg-slate-950 group">
                <img 
                   src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600" 
                   alt="XCIPTV Installation" 
                   className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-all duration-1000"
                   referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-600/30">
                     <Download className="h-8 w-8 text-blue-500" />
                   </div>
                </div>
                <div className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black">1</div>
             </div>
             <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <Download className="h-8 w-8 text-blue-500" />
                 <h2 className="text-3xl font-black uppercase tracking-tight leading-none text-white">Download and <br /> Install XCIPTV</h2>
               </div>
               <p className="text-slate-400 font-medium leading-relaxed">
                 Go to your device’s app store (<span className="text-white">Google Play Store, Apple App Store, or Amazon Store</span>). Search for “XCIPTV Player” and install the app to your streaming device or mobile phone.
               </p>
             </div>
          </div>
        </section>

        {/* 2. Add New Playlist */}
        <section className="mb-24">
          <div className="glass-card p-12 rounded-[3.5rem] border border-white/5 bg-white/[0.01] relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                  <List className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Add a New Playlist</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <p className="text-slate-400 font-medium leading-relaxed">
                  Launch the app after installation. Tap the <span className="text-white">“Add Playlist”</span> button, and choose your preferred login method based on your IPTV provider's credentials.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-3 text-center">
                    <Smartphone className="h-6 w-6 text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Xtream Codes</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-3 text-center">
                    <Globe className="h-6 w-6 text-indigo-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-tight">M3U URL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Enter Credentials */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <LogIn className="h-8 w-8 text-blue-500" />
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Enter IPTV Credentials</h2>
              </div>
              
              <div className="space-y-6">
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4">
                   <h4 className="text-xl font-bold uppercase tracking-tight text-blue-400">Xtream Codes API</h4>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">
                     Enter your <span className="text-white">Username, Password, and Server URL</span> provided by your DirectIPTV service.
                   </p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4">
                   <h4 className="text-xl font-bold uppercase tracking-tight text-indigo-400">M3U Playlist URL</h4>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">
                     Paste the <span className="text-white">M3U playlist link</span> directly into the input field and tap “Add” or “Save” to load.
                   </p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600/10 blur-[80px] rounded-full" />
              <div className="relative glass-card p-12 rounded-[3.5rem] border border-white/10 bg-white/[0.01] flex items-center justify-center">
                 <Settings className="h-24 w-24 text-white opacity-10 animate-spin-slow" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-blue-500" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Browse and Enjoy */}
        <section className="mb-24">
          <div className="glass-card p-12 md:p-20 rounded-[4rem] border border-white/5 bg-blue-600/[0.02] relative overflow-hidden group">
            {/* Background enhancement */}
             <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/5 opacity-50 pointer-events-none" />
             
             <div className="relative z-10 space-y-16">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mx-auto mb-6">
                    <Layout className="h-8 w-8 text-blue-500" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Browse and Enjoy</h2>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Navigate through categories like Live TV, VOD, and Series. Select any channel or content to start streaming instantly.
                  </p>
                </div>

                {/* Enhanced UI Dashboard Representation */}
                <div className="relative mx-auto max-w-4xl aspect-[16/9] rounded-[2.5rem] border border-white/10 bg-slate-950 shadow-[0_40px_100px_-20px_rgba(37,99,235,0.2)] overflow-hidden group/dash">
                  <img 
                    src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200" 
                    alt="XCIPTV Dashboard" 
                    className="w-full h-full object-cover opacity-60 group-hover/dash:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay for icons/UI representation */}
                  <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between">
                    {/* Dashboard Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-2 border-blue-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-blue-500/10">
                          <PlayCircle className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="h-4 w-32 bg-white/20 rounded-full blur-[1px]" />
                      </div>
                      {/* Top Right Mini Icons */}
                      <div className="flex gap-4">
                         {[Bell, Video, Activity, Mail, RefreshCw].map((Icon, idx) => (
                           <div key={idx} className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center">
                             <Icon className="h-4 w-4 text-white" />
                           </div>
                         ))}
                      </div>
                    </div>

                    {/* Main Grid: Live TV, EPG, VOD, Series */}
                    <div className="grid grid-cols-4 gap-6">
                       {[
                         { label: "LIVE TV", icon: Tv, color: "text-blue-500", bg: "bg-blue-500/20" },
                         { label: "EPG", icon: List, color: "text-emerald-500", bg: "bg-emerald-500/20" },
                         { label: "VOD", icon: Film, color: "text-purple-500", bg: "bg-purple-500/20" },
                         { label: "SERIES", icon: Monitor, color: "text-orange-500", bg: "bg-orange-500/20" }
                       ].map((item, idx) => (
                         <div key={idx} className="aspect-square rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center gap-4 group/card hover:bg-white/10 transition-all">
                            <div className={`p-4 rounded-xl ${item.bg} border border-white/10`}>
                              <item.icon className={`h-10 w-10 ${item.color}`} />
                            </div>
                            <span className="text-sm font-black tracking-widest text-white uppercase">{item.label}</span>
                         </div>
                       ))}
                    </div>

                    {/* Bottom Toolbars */}
                    <div className="flex justify-between items-end">
                       {/* Bottom Left */}
                       <div className="flex gap-4">
                         {[Users, Smartphone, RefreshCw].map((Icon, idx) => (
                           <div key={idx} className="flex flex-col items-center gap-1">
                             <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center">
                               <Icon className="h-4 w-4 text-white" />
                             </div>
                             <span className="text-[6px] font-bold text-white uppercase tracking-widest">
                               {["Account", "Multi", "Catch Up"][idx]}
                             </span>
                           </div>
                         ))}
                       </div>
                       {/* Bottom Right */}
                       <div className="flex gap-4">
                         {[Star, Radio, Settings].map((Icon, idx) => (
                           <div key={idx} className="flex flex-col items-center gap-1">
                             <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center">
                               <Icon className="h-4 w-4 text-white" />
                             </div>
                             <span className="text-[6px] font-bold text-white uppercase tracking-widest">
                               {["Favorite", "Radio", "Settings"][idx]}
                             </span>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-12">
                   {["Smart Features", "Multi-Screen", "Parental Control", "Favorite Lists"].map(feature => (
                     <span key={feature} className="px-6 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:bg-blue-600/20 transition-colors cursor-default">
                        {feature}
                     </span>
                   ))}
                </div>
             </div>
          </div>
        </section>




      </div>
    </main>
  );
}
