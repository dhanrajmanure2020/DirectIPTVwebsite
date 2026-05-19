import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const TUTORIALS = [
  {
    title: 'How to Set Up IPTV for Beginners',
    desc: 'New to IPTV? This essential guide covers all the basics to get you started.',
    category: 'Basics',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=600',
    color: 'bg-orange-500',
    link: '/tutorials/beginners'
  },
  {
    title: 'How to Set Up IPTV on Apple TV',
    desc: 'Comprehensive setup guide for Apple TV users using popular player applications.',
    category: 'Apple TV',
    image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=600',
    color: 'bg-blue-500',
    link: '/tutorials/apple-tv'
  },
  {
    title: 'How to Install IPTV Fire Stick',
    desc: 'Fast and easy installation process for all Amazon Fire TV devices.',
    category: 'Firestick',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600',
    color: 'bg-purple-500',
    link: '/tutorials/fire-stick'
  },
  {
    title: 'Setting Up IPTV on Android TV',
    desc: 'Optimization and configuration for Sony, Philips, and other Android-based TVs.',
    category: 'Android TV',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
    color: 'bg-blue-600',
    link: '/tutorials/android-tv'
  },
  {
    title: 'How to Configure IPTV on Formuler IPTV Box',
    desc: 'Maximize the potential of your Formuler hardware with MyTVOnline2 settings.',
    category: 'Hardware',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=600',
    color: 'bg-red-500',
    link: '/tutorials/formuler'
  },
  {
    title: 'How to Install IPTV on GSE Smart IPTV?',
    desc: 'Cross-platform guide for one of the most versatile IPTV players available.',
    category: 'App Setup',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600',
    color: 'bg-indigo-500',
    link: '/tutorials/gse-smart-iptv'
  },
  {
    title: 'How to Install IPTV on Samsung?',
    desc: 'Tizen OS setup instructions for the latest Samsung Smart TV models.',
    category: 'Samsung',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600',
    color: 'bg-blue-400',
    link: '/tutorials/samsung'
  },
  {
    title: 'How to Install IPTV on IPTV Stream Player app?',
    desc: 'Step-by-step credentials entry and playlist management in Stream Player.',
    category: 'Player App',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
    color: 'bg-purple-400',
    link: '/tutorials/iptv-stream-player'
  },
  {
    title: 'How to Configure IPTV With XCIPTV Player?',
    desc: 'Customizing the interface and loading your EPG data in XCIPTV.',
    category: 'XCIPTV',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
    color: 'bg-pink-500',
    link: '/tutorials/xciptv'
  },
  {
    title: 'How To Install and Setup STB Emu on Android',
    desc: 'Transform your Android device into a professional IPTV set-top box with STB Emu.',
    category: 'STB EMU',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=600',
    color: 'bg-emerald-600',
    link: '/tutorials/stb-emu'
  }
];

export default function Tutorials() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <section className="mb-16 relative">
          <div className="absolute -top-40 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 text-center"
          >
            Master your <span className="text-gradient">experience.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl font-medium leading-relaxed"
          >
            Professional setup guides and optimization tricks for every device. Your journey to perfect streaming starts here.
          </motion.p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TUTORIALS.map((tutorial, idx) => (
            <Link
              key={tutorial.title}
              to={tutorial.link}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-white/5 shadow-xl">
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                
                <div className="space-y-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${tutorial.color}`}>
                    {tutorial.category}
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight group-hover:text-primary transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                    {tutorial.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
