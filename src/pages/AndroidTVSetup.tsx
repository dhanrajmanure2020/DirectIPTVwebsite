import { motion } from 'motion/react';
import { Play, List, Settings, Tv, Smartphone, Globe, ShieldCheck, Gamepad2, Download } from 'lucide-react';

export default function AndroidTVSetup() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-emerald-600/5 rounded-full blur-[150px] -mr-40 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px] -ml-40 -mb-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <section className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4"
          >
            Android TV Guide 2024
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase leading-[0.9]"
          >
            Setting Up IPTV on <br /> <span className="text-gradient">Android TV</span>
          </motion.h1>

          {/* Visual Header Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl mb-12 h-[450px] group"
          >
            <img 
              src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1200" 
              alt="Android TV Setup Visual" 
              className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
            <div className="absolute bottom-10 left-10 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#3DDC84] flex items-center justify-center shadow-lg shadow-[#3DDC84]/20">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#3DDC84]">Platform status</p>
                <p className="text-xl font-bold">Android TV & TV OS 14 Ready</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-10 rounded-[2.5rem] bg-white/[0.02] border-white/5 text-left max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Complete Installation Instructions</h2>
            <p className="text-slate-400 font-medium leading-relaxed">
              Android TV offers one of the most flexible and user-friendly platforms for streaming IPTV services. Whether you’re using an Android TV box or a smart TV with Android OS, setting up IPTV is relatively simple. In this guide, we will walk through the steps to set up IPTV on Android TV in 2024.
            </p>
          </motion.div>
        </section>

        {/* Prerequisites */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <List className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight">What You Need</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Android Device", text: "NVIDIA Shield, Xiaomi Mi Box, or any Android Smart TV.", icon: Tv },
              { title: "Stable Net", text: "A robust internet connection for seamless 4K streaming.", icon: Globe },
              { title: "Subscription", text: "Active IPTV plan with an M3U link or EPG guide.", icon: ShieldCheck }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/[0.01]">
                <item.icon className="h-8 w-8 text-primary mb-6" />
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <div className="space-y-12 mb-20">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-16">Installation <span className="text-gradient">Steps</span></h2>
          
          {[
            {
              step: "01",
              title: "Download and Install an IPTV App",
              content: (
                <div className="space-y-4">
                  <p>The first step is to install a compatible IPTV app. Top choices include:</p>
                  <div className="flex flex-wrap gap-4 py-2">
                    {["IPTV Smarters Pro", "Perfect Player", "TiviMate"].map(app => (
                      <span key={app} className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase">{app}</span>
                    ))}
                  </div>
                  <ul className="space-y-3 list-none">
                    <li className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[10px] font-bold">A</div>
                      <p className="text-sm font-medium text-slate-400">Open the <span className="text-white">Google Play Store</span> on your Android TV.</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[10px] font-bold">B</div>
                      <p className="text-sm font-medium text-slate-400">Search for your IPTV app choice and press <span className="text-white">Install</span>.</p>
                    </li>
                  </ul>
                </div>
              ),
              icon: Download
            },
            {
              step: "02",
              title: "Configure Your IPTV Account",
              content: (
                <div className="space-y-4">
                  <p>Configure the app with your account details:</p>
                  <ul className="space-y-3 list-none">
                    <li className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[10px] font-bold">A</div>
                      <p className="text-sm font-medium text-slate-400">Launch the app and login using your <span className="text-white">Username and Password</span>.</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[10px] font-bold">B</div>
                      <p className="text-sm font-medium text-slate-400">Input your <span className="text-white">IPTV playlist URL or M3U file</span>.</p>
                    </li>
                  </ul>
                </div>
              ),
              icon: Settings
            },
            {
              step: "03",
              title: "Customize the Interface",
              content: (
                <div className="space-y-4">
                  <p>Organize your channel list for a better experience:</p>
                  <ul className="space-y-3 list-none">
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-sm font-medium text-slate-400">Sort channels by categories (Sports, Movies, News).</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-sm font-medium text-slate-400">Set up favorite channels for instant access.</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-sm font-medium text-slate-400">Adjust video quality based on your current speed.</p>
                    </li>
                  </ul>
                </div>
              ),
              icon: Gamepad2
            }
          ].map((item, idx) => (
            <motion.div 
              key={item.step}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01] flex items-start gap-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-2xl font-black italic text-primary">
                {item.step}
              </div>
              <div className="space-y-4 flex-grow">
                <div className="flex items-center gap-2">
                  <item.icon className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-black tracking-tight uppercase">{item.title}</h3>
                </div>
                <div className="text-slate-400 font-medium leading-relaxed">
                  {item.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 bg-emerald-500/[0.02]">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
               <Play className="h-5 w-5 text-emerald-500" />
               Start Watching
            </h4>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Begin browsing through your channels and enjoy live TV, sports, news, and on-demand videos. Use the remote to scroll through categories and select your content.
            </p>
          </div>
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/5 bg-blue-500/[0.02]">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
               <ShieldCheck className="h-5 w-5 text-blue-500" />
               Extra Features
            </h4>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Explore catch-up TV, recording, and parental controls to make the most out of your service. Modern IPTV apps offer a truly personalized experience.
            </p>
          </div>
        </div>


      </div>
    </main>
  );
}
