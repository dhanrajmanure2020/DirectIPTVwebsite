import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../png-logo.png';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3800); // 3.8 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background-darker backdrop-blur-3xl"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-[80px] z-0" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.8
            }}
            className="relative z-10 flex flex-col items-center"
          >
             {/* Logo */}
             <motion.img 
               src={logo} 
               alt="Direct IPTV" 
               className="w-32 h-auto drop-shadow-2xl"
               animate={{ 
                 y: [0, -8, 0],
               }}
               transition={{
                 duration: 2,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             />
             
             {/* Loading Bar */}
             <div className="mt-10 relative w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.2, ease: "easeInOut" }}
                />
             </div>

             {/* Preloader Text */}
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
               className="mt-6 text-center px-4"
             >
               <motion.p 
                 className="text-sm md:text-base font-medium text-slate-300 tracking-wide"
                 animate={{ opacity: [0.7, 1, 0.7] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               >
                 Please hold on while we load and present you with amazing plans.
               </motion.p>
             </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
