import { motion } from 'motion/react';
import { Play, Settings, MonitorPlay, List, Sliders, ShieldCheck, Cpu, Wifi } from 'lucide-react';

export default function FormulerSetup() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] -ml-40 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[120px] -mr-40 -mb-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <section className="mb-20 relative">
          <div className="text-center mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4"
            >
              Formuler Box Specialist Guide
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase leading-[1]"
            >
              How to Configure IPTV on <br /> <span className="text-gradient">Formuler IPTV Box</span>
            </motion.h1>
          </div>

          {/* Enhanced Graphic Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-8 relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(37,99,235,0.1)] group bg-slate-900"
            >
              <img 
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1200" 
                alt="Formuler Box Setup" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background-dark/80 via-transparent to-transparent"></div>
              
              {/* Simulated UI Overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-[80%] aspect-video glass-card border-white/20 rounded-2xl bg-black/40 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary">MTO</div>
                      <span className="text-xs font-bold tracking-widest uppercase text-slate-300">MyTVOnline 3</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold">HELP | SETTINGS</div>
                  </div>
                  
                  <div className="max-w-[300px] mx-auto space-y-4">
                    <div className="h-10 w-full bg-white/5 border border-white/10 rounded-lg flex items-center px-4 text-xs text-slate-400">Portal URL: http://mag.directiptv.me</div>
                    <div className="h-12 w-full bg-primary flex items-center justify-center rounded-lg text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-primary/20">Connect Device</div>
                  </div>

                  <div className="absolute bottom-8 right-8 text-right">
                    <p className="text-[10px] font-bold text-primary uppercase mb-1">MAC Address Status</p>
                    <p className="text-sm font-mono text-white/50">00:1A:79:XX:XX:XX</p>
                  </div>
                </div>
              </div>

              {/* Physical Box Decoration */}
              <div className="absolute -bottom-6 -left-6 w-48 h-12 bg-slate-800 rounded-xl border border-white/10 shadow-2xl skew-x-[-15deg] hidden md:block">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                </div>
              </div>
            </motion.div>

            {/* Side Features - Matching the image style */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-4 space-y-6"
            >
              {[
                { title: "Ethernet/Wi-Fi Setup", text: "Physical configuration", icon: Wifi, color: "text-blue-400" },
                { title: "DNS Settings", text: "(8.8.8.8 / 1.1.1.1)", icon: Settings, color: "text-emerald-400" },
                { title: "Buffering Optimization", text: "Advanced flow control", icon: Play, color: "text-amber-400" },
                { title: "Hardware Acceleration", text: "4K Video Processing", icon: Cpu, color: "text-purple-400" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/5 ${feature.color}`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <div className="text-left">
                    <p className="text-base font-black uppercase tracking-tight leading-none mb-1 group-hover:text-primary transition-colors">{feature.title}</p>
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
              To set up IPTV on Formuler IPTV Box, you’ll configure the device by establishing network connectivity through Ethernet or Wi-Fi settings, then launching MyTVOnline app to input your DirectIPTV provider’s credentials via Xtream Codes API or M3U URL.
            </p>
            <p className="text-slate-400 font-medium leading-relaxed">
              You’ll need to verify MAC address registration, configure portal URLs with correct protocols, optimize buffer sizes to 25MB, and enable HW+ hardware acceleration for smooth streaming. Proper DNS configuration using 8.8.8.8 or 1.1.1.1 ensures reliable connectivity, while systematic troubleshooting protocols resolve authentication failures and buffering issues efficiently.
            </p>
          </motion.div>
        </section>

        {/* 1. Unbox and Connect */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/5">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600" alt="Connection" className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black">1</div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Wifi className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Unbox and Connect</h2>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium">
                Unpack your Formuler box (Z8 Pro, Z10 Pro, or Z11 Pro Max) and connect it to your TV using an HDMI cable. Plug the power adapter into an electrical outlet and turn on the device. For optimal performance, connect an Ethernet cable directly from your router to the Formuler box, though Wi-Fi is also available. Complete the initial setup wizard by selecting your language and network.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Access MTO */}
        <section className="mb-24">
          <div className="glass-card p-12 rounded-[3.5rem] border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <div className="w-32 h-32 rounded-[2rem] bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-8 mx-auto md:mx-0">
                <MonitorPlay className="h-16 w-16 text-secondary" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-center md:text-left">Access MyTVOnline (MTO)</h2>
            </div>
            <div className="md:w-2/3 space-y-4">
              <p className="text-slate-400 leading-relaxed font-medium">
                Formuler boxes come with MyTVOnline (MTO) pre-installed, which is the dedicated IPTV application. From the home screen, locate and open the MyTVOnline app—it’s usually prominently displayed. If you’re setting up the device for the first time, MTO will launch automatically after initial configuration.
              </p>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <p className="text-xs font-bold text-slate-300">Formuler boxes use a dedicated, hardware-optimized app for the best IPTV performance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Add Credentials */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Add Your IPTV Credentials</h2>
              </div>
              <div className="space-y-6">
                <p className="text-slate-400 leading-relaxed font-medium">
                  In MyTVOnline, select “Add Portal” or the “+” icon to begin adding your IPTV service. You’ll need your provider’s information, which typically includes:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-[10px] font-black text-primary uppercase mb-1">Server URL</p>
                    <p className="text-sm font-bold">Portal URL</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-[10px] font-black text-primary uppercase mb-1">Passcode</p>
                    <p className="text-sm font-bold">Account Pass</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 italic">
                  If your provider uses MAC address authentication, note your Formuler box’s MAC address (found in Settings &gt; About) and provide it to your IPTV provider for activation.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all" />
              <div className="relative glass-card p-10 rounded-[3rem] border border-white/10 bg-white/[0.01]">
                <div className="w-full aspect-square rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                  <Settings className="h-24 w-24 text-white opacity-20 animate-spin-slow" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Load Channel List and EPG */}
        <section className="mb-24">
          <div className="glass-card p-12 rounded-[3.5rem] border border-white/5 bg-white/[0.01] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 grayscale group-hover:grayscale-0 transition-all">
               <List className="h-40 w-40 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <List className="h-8 w-8 text-emerald-500" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Load Your Channel List and EPG</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Once the portal is added, MyTVOnline will connect to your provider’s server and download your complete channel list, VOD library, and series collection. This typically takes 30-90 seconds.
                  </p>
                  <div className="p-6 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/10">
                    <p className="text-sm font-bold text-emerald-500 mb-2 uppercase tracking-widest">Automatic Sync</p>
                    <p className="text-xs text-slate-400">The EPG (Electronic Program Guide) will automatically sync if your provider supports it.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold">Organized Content:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["Live TV", "Movies", "Series", "Catch-up"].map(cat => (
                      <div key={cat} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-bold uppercase">{cat}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Optimize Settings */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mx-auto mb-6">
              <Sliders className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Optimize Your Experience</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Performance", text: "Enable HW+ hardware acceleration for the smoothest 4K video playback.", icon: Cpu },
              { title: "Buffering", text: "Adjust settings to 3-5 seconds (or 25MB) for maximum streaming stability.", icon: Sliders },
              { title: "Favorites", text: "Add your most-watched content to favorites for faster navigation.", icon: ShieldCheck }
            ].map((item, i) => (
              <div key={i} className="glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                <item.icon className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">{item.title}</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 glass-card rounded-[2.5rem] border border-white/5 bg-white/[0.01]">
            <p className="text-slate-300 font-medium leading-relaxed text-center italic">
              "Press the Settings icon in MyTVOnline to access configuration. Customize the interface theme and channel list layout. Make sure to update the EPG refresh interval for the most up-to-date guide info."
            </p>
          </div>
        </section>




      </div>
    </main>
  );
}
