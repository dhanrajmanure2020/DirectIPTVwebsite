import { motion } from 'motion/react';
import { Play, Wifi, Smartphone, Tv, ShieldCheck, Download, Settings, Heart, Info, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BeginnersGuide() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] -ml-40 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] -mr-40 -mb-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header/Hero Section */}
        <section className="text-center mb-20 relative">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4"
          >
            Essential Guide
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase leading-[1]"
          >
            How to Set Up <br /> <span className="text-gradient">IPTV for Beginners</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl mb-12 group h-[400px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=1200" 
              alt="IPTV Beginners Guide" 
              className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Getting Started</p>
                <p className="text-sm font-bold">4 Easy Steps to Streaming</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-10 rounded-[2.5rem] max-w-4xl mx-auto bg-white/[0.02] border-white/5 text-left"
          >
            <p className="text-slate-300 font-medium leading-relaxed text-lg mb-6">
              To set up IPTV, you'll need a compatible device (smart TV, Fire Stick, Android box), a stable internet connection (25 Mbps), and a subscription from a reputable provider. Connect your device, download the IPTV app, and input the M3U URL during installation for channel access.
            </p>
            <p className="text-slate-400 font-medium leading-relaxed italic">
              Explore the app's interface to customize options and integrate external video players for improved playback. If you encounter issues, troubleshoot by checking your internet connection and device compatibility. Regularly update the app for optimal performance.
            </p>
          </motion.div>
        </section>

        {/* Section 1: Understanding Basics */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Tv className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight">Understanding IPTV Basics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-3xl border border-white/5 bg-white/[0.01]">
                <p className="text-slate-300 leading-relaxed font-medium">
                  IPTV, the revolutionary technology that's transforming how we watch television, operates by delivering content via an internet connection rather than traditional cable or satellite methods.
                </p>
              </div>
              <div className="glass-card p-6 rounded-3xl border border-white/5 bg-white/[0.01]">
                <p className="text-slate-300 leading-relaxed font-medium">
                  This Internet Protocol Television offers access to a wide range of programming, including the ability to watch live TV, on-demand shows, and time-shifted content.
                </p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 bg-primary/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Wifi className="h-32 w-32" />
               </div>
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <Wifi className="h-5 w-5 text-primary" />
                 Connection Requirements
               </h3>
               <ul className="space-y-4">
                 <li className="flex items-start gap-3">
                   <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                     <CheckCircle2 className="h-3 w-3 text-primary" />
                   </div>
                   <span className="text-slate-300 font-medium">Minimum of 25 Mbps download speed</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                     <CheckCircle2 className="h-3 w-3 text-primary" />
                   </div>
                   <span className="text-slate-300 font-medium">Stable internet connection (Ethernet preferred)</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                     <CheckCircle2 className="h-3 w-3 text-primary" />
                   </div>
                   <span className="text-slate-300 font-medium">Compatibility with Smart TVs, Fire Sticks, and Boxes</span>
                 </li>
               </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Choosing Provider */}
        <section className="mb-24">
          <div className="glass-card p-12 rounded-[3.5rem] border border-white/5 bg-white/[0.01] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <ShieldCheck className="h-8 w-8 text-emerald-500" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Choosing The Right Provider</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Reputation", text: "Look for solid reputations and positive user reviews to ensure quality.", icon: ShieldCheck },
                  { title: "Lineup", text: "Verify a diverse range of local, national, and international channels.", icon: Tv },
                  { title: "Devices", text: "Ensure the service supports all your home devices for seamless access.", icon: Smartphone }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-colors">
                    <item.icon className="h-8 w-8 text-primary mb-6" />
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold text-sm">
                  Check for Free Trials
                </div>
                <div className="px-6 py-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 font-bold text-sm">
                  Verify Licensing & Compliance
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Preparing Device */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Settings className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Preparing Your Device</h2>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed mb-10">
                Before set up IPTV, you’ll need to ensure your streaming device is ready for the task. Check your device specifications to confirm compatibility with IPTV services. Smart TVs, Fire Sticks, and Android boxes are popular choices.
              </p>
              
              <div className="space-y-6">
                {[
                  { step: "01", title: "Internet Stability", text: "Minimum download speed of 25 Mbps is essential for 4K quality." },
                  { step: "02", title: "Unknown Sources", text: "Enable 'Apps from Unknown Sources' in your device settings for sideloading." },
                  { step: "03", title: "Familiarize UI", text: "Learn your specific app's interface to optimize channel organization." }
                ].map((step) => (
                  <div key={step.step} className="flex gap-6 group">
                    <div className="text-3xl font-black italic text-white/10 group-hover:text-primary/40 transition-colors">{step.step}</div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{step.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative glass-card rounded-[3rem] overflow-hidden border border-white/10 p-4">
                <img 
                  src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800" 
                  alt="Device Prep" 
                  className="rounded-[2.5rem] w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Installing & Configuring */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Installing & Configuring Apps</h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto">Follow these steps carefully to ensure your app is configured correctly for the best streaming experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 grayscale opacity-20 group-hover:grayscale-0 transition-grayscale">
                  <Download className="h-20 w-20 text-blue-500" />
               </div>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 text-left">Step One</p>
               <h3 className="text-2xl font-black mb-6 text-left">Download From Reliable Sources</h3>
               <p className="text-slate-400 font-medium leading-relaxed text-left">
                 Always download the IPTV app from a reliable source like the official App Store, Google Play Store, or verified apk mirrors if sideloading.
               </p>
            </div>
            
            <div className="md:col-span-2 glass-card p-10 rounded-[3rem] border border-white/5 bg-white/[0.01] flex flex-col justify-center">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 text-left">Step Two</p>
               <h3 className="text-2xl font-black mb-6 text-left">Input M3U URL</h3>
               <p className="text-slate-400 font-medium leading-relaxed text-left">
                 During installation, input the provided M3U URL from your provider to configure channels and content access automatically.
               </p>
               <div className="mt-8 p-6 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                   <Info className="h-5 w-5 text-orange-500" />
                 </div>
                 <p className="text-xs font-bold text-slate-300 italic">Double check every character in your URL!</p>
               </div>
            </div>
          </div>
        </section>

        {/* Section 5: Experience & Troubleshooting */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-12 rounded-[3rem] border border-white/5 bg-emerald-500/[0.02]">
              <div className="flex items-center gap-4 mb-10">
                <Heart className="h-7 w-7 text-emerald-500" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Enjoy Your Experience</h2>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Customization</h5>
                    <p className="text-sm text-slate-400 font-medium">Add live channels to favorites for quick navigation and ease of use.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">External Players</h5>
                    <p className="text-sm text-slate-400 font-medium">Integrate VLC or MX Player to improve playback quality and compatibility.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-12 rounded-[3rem] border border-white/5 bg-red-500/[0.02]">
              <div className="flex items-center gap-4 mb-10">
                <AlertCircle className="h-7 w-7 text-red-500" />
                <h2 className="text-2xl font-black uppercase tracking-tight">Troubleshooting Tips</h2>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <h5 className="font-bold text-white mb-2">Buffering or Loading?</h5>
                  <p className="text-sm text-slate-400 font-medium">Check your internet speed and reset your router. Ensure no heavy downloads are active.</p>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <h5 className="font-bold text-white mb-2">Service Downtime?</h5>
                  <p className="text-sm text-slate-400 font-medium">Consult your provider's support resources or community forums for targeted solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        </div>
    </main>
  );
}
