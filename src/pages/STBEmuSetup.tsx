import { motion } from 'motion/react';
import { Tablet, Download, Settings, PlaySquare, ShieldCheck, Cpu, Smartphone, Globe, List, CheckCircle2, ChevronRight, AlertCircle, LogOut } from 'lucide-react';

export default function STBEmuSetup() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-emerald-600/5 rounded-full blur-[150px] -mr-40 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] -ml-40 -mb-20 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <section className="text-center mb-16 relative">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4"
          >
            Android & MAG Emulation Guide
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase leading-[0.9]"
          >
            How To Install <br /> <span className="text-gradient">STB Emu on Android</span>
          </motion.h1>

          {/* Enhanced Graphic Header */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.1)] mb-12 h-[480px] group bg-slate-900"
          >
            <img 
              src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=1200" 
              alt="STB Emu Interface Hub" 
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
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-300">STB EMU PORTAL</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                  </div>
                </div>

                <div className="flex-grow flex items-center gap-8 px-4">
                  <div className="w-1/2 space-y-4">
                    <h4 className="text-xl font-bold uppercase tracking-tight text-white">MAG 254 Emulator</h4>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                      <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                      <div className="h-2 w-1/2 bg-white/5 rounded"></div>
                    </div>
                  </div>
                  <div className="w-1/2 space-y-3">
                    <div className="p-4 bg-emerald-500 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-widest text-emerald-950">
                      Load Portal
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xs font-bold uppercase tracking-widest text-slate-400">
                      System Settings
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-[8px] font-black text-slate-500 tracking-widest uppercase">
                  <span>Model: MAG 254</span>
                  <span>MAC: 00:1A:79:XX:XX:XX</span>
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
            className="glass-card p-10 rounded-[2.5rem] max-w-4xl mx-auto bg-white/[0.02] border-white/5 text-left space-y-6 shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Tablet className="h-32 w-32 text-emerald-500" />
             </div>
             <p className="text-slate-300 font-medium leading-relaxed text-lg relative z-10">
               Having a good IPTV is a nice thing to have to watch your favorite TV shows, movies, and sports. From sports to TV shows an IPTV provider can stream straight to your device the things you want to watch. 
             </p>
             <p className="text-slate-400 font-medium leading-relaxed relative z-10">
               In the past, special hardware called <span className="text-white font-bold uppercase tracking-wider text-sm">MAG boxes</span> (250, 254, 256) were required. These days, this can be emulated in software with a <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm">MAG emulator</span> like STB EMU, saving you money and working seamlessly on any Android TV box or smartphone.
             </p>
          </motion.div>
        </section>

        {/* Requirements Checklist */}
        <section className="mb-24">
           <div className="glass-card p-12 rounded-[3.5rem] bg-emerald-600/[0.03] border border-emerald-500/10">
              <div className="flex items-center gap-4 mb-8">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Things You Need</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "IPTV Package", desc: "A valid DirectIPTV subscription plan.", icon: ShieldCheck },
                  { title: "Portal URL", desc: "The link provided by your IPTV service provider.", icon: Globe },
                  { title: "MAC Address", desc: "Necessary for activation (unique to the emulator).", icon: Cpu }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-4">
                    <item.icon className="h-10 w-10 text-emerald-500" />
                    <h4 className="text-lg font-black uppercase tracking-tight">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* Installation Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
               <div className="flex items-center gap-4">
                 <Download className="h-8 w-8 text-emerald-500" />
                 <h2 className="text-3xl font-black uppercase tracking-tight leading-none text-white">How To Install <br /> STB Emu</h2>
               </div>
               <p className="text-slate-400 font-medium leading-relaxed">
                 Installing STB Emu is easy. Go to the <span className="text-white">Google Play Store</span>, do a quick search for “STB Emu”, and click Install.
               </p>
               <div className="p-6 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 space-y-3">
                  <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400">Pro vs Free Version</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We recommend the <span className="text-white font-bold">Pro version</span> (less than $6) to remove commercials that appear at the bottom of the screen. However, you can setup the free version first to ensure compatibility.
                  </p>
               </div>
             </div>
             <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full" />
                <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center p-12">
                   <div className="w-full h-full bg-black/40 rounded-3xl border border-white/20 p-8 flex flex-col items-center justify-center space-y-6 shadow-2xl">
                      <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                         <Download className="h-10 w-10 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-2 italic">Official Source</p>
                        <p className="text-lg font-black uppercase tracking-tight">STB EMU FREE/PRO</p>
                      </div>
                      <div className="w-full h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-600/20">
                         Install via Play Store
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Configuration Steps */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mx-auto mb-6">
              <Settings className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Technical Setup Guide</h2>
          </div>

          <div className="space-y-6">
            {[
              { id: "01", title: "Configure Application", text: "The first time it starts, a box will come up. Click on Configure Application.", icon: Settings },
              { id: "02", title: "Profiles Menu", text: "The Settings page will come up. Go to Profiles. If you miss the initial screen, click the top right of the screen to find Settings.", icon: List },
              { id: "03", title: "Profile Management", text: "Go to Profile Name and change it to the name of your IPTV provider (e.g., DirectIPTV).", icon: List },
              { id: "04", title: "Portal Settings", text: "Next, navigate to Portal Settings and click on Portal URL.", icon: Globe, highlight: true },
              { id: "05", title: "Enter Unique Portal URL", text: "Enter the unique Portal URL provided by your IPTV service accurately.", icon: Globe },
              { id: "06", title: "STB Configuration", text: "Go to STB Configuration and select the STB Model. We recommend MAG 254 for wide compatibility.", icon: Cpu },
              { id: "07", title: "Screen Resolution", text: "Set the screen resolution to Auto unless you are sure about your TV's specific resolution.", icon: PlaySquare },
              { id: "08", title: "MAC Address Capture", text: "Select MAC address. Copy this address exactly.", icon: Cpu, cta: "GIVE THIS MAC TO DirectIPTV", color: "text-emerald-400" },
              { id: "09", title: "Serial Number (Optional)", text: "We suggest erasing the serial number so the IPTV is not tied to the box and can be used on another device.", icon: ShieldCheck },
              { id: "10", title: "Exit & Reboot", text: "Exit the application completely. Reopen STB EMU and wait a few minutes for new settings to load.", icon: LogOut }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`glass-card p-10 rounded-[3rem] border border-white/5 flex flex-col md:flex-row gap-8 items-center ${step.highlight ? 'bg-emerald-500/[0.03] border-emerald-500/20' : 'bg-white/[0.01]'}`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-xl font-black italic border ${step.highlight ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                  {step.id}
                </div>
                <div className="flex-grow space-y-4">
                   <div className="flex items-center gap-3">
                     <step.icon className={`h-5 w-5 ${step.color || 'text-emerald-500'}`} />
                     <h3 className="text-xl font-black uppercase tracking-tight">{step.title}</h3>
                   </div>
                   <p className="text-slate-400 font-medium leading-relaxed">
                     {step.text}
                   </p>
                   {step.cta && (
                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                       <AlertCircle className="h-3 w-3" />
                       {step.cta}
                     </div>
                   )}
                </div>
                <div className="hidden md:block">
                   <ChevronRight className="h-6 w-6 text-white/10" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>




      </div>
    </main>
  );
}
