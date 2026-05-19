import { motion } from 'motion/react';
import { Layers, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRICING } from '../constants';
import { usePricing } from '../context/PricingContext';

export function PricingSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const navigate = useNavigate();
  const { devices, setDevices, getPlanPrice, getPlanSub, setSelectedPlanName, currency } = usePricing();

  return (
    <section id="pricing" className={`bg-background-darker ${hideHeader ? 'py-12' : 'py-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${hideHeader ? 'mb-10' : 'mb-16'}`}>
          {!hideHeader && (
            <>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter">Choose Your IPTV Plan</h2>
              <p className="text-slate-400 font-medium mb-10">Transparent pricing, no hidden fees. Non-recurring payment.<br />Customize your viewing experience</p>
            </>
          )}
          
          {/* Advanced Device Selector */}
          <div className="relative flex sm:inline-flex p-1 bg-white/5 border border-white/10 rounded-[2rem] mb-12 sm:min-w-0 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto shrink-0 select-none">
            <motion.div 
              className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[1.8rem] shadow-xl shadow-blue-600/20"
              initial={false}
              animate={{ 
                left: `${(devices - 1) * 33.33}%`,
                width: '33.33%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setDevices(num)}
                className={`relative flex-1 sm:flex-none z-10 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-2 sm:px-8 py-3 sm:py-4 rounded-[1.8rem] text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-[0.2em] transition-colors duration-300 ${
                  devices === num ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Layers className={`h-4 w-4 sm:h-4 sm:w-4 ${devices === num ? 'animate-pulse' : 'opacity-40'} shrink-0`} />
                <span className="whitespace-nowrap">{num} {num === 1 ? 'Device' : 'Devices'}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {PRICING.map((plan, idx) => {
            const currentPrice = getPlanPrice(plan.name);
            const currentSub = getPlanSub(plan.name);
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`glass-card rounded-2xl p-6 flex flex-col border border-white/5 hover:border-primary/50 transition-all ${
                  plan.popular ? 'border-2 border-purple-500 shadow-2xl z-10 relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full flex items-center justify-center whitespace-nowrap shadow-lg">
                    Best Value
                  </div>
                )}
                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                <div className="mb-1">
                  <motion.span 
                    key={currentPrice}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-2xl font-extrabold ${plan.popular ? 'text-purple-400' : 'text-white'}`}
                  >
                    {currency}{currentPrice.toFixed(2)}
                  </motion.span>
                  <span className="text-slate-400 text-sm"> {plan.period}</span>
                </div>
                {currentSub && (
                  <motion.div 
                    key={currentSub}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-[10px] font-bold mb-6 uppercase tracking-wider ${plan.accent.replace('500', '400')} min-h-[15px]`}
                  >
                    {currentSub}
                  </motion.div>
                )}
                {!currentSub && <div className="min-h-[15px] mb-6"></div>}
                
                <ul className="space-y-2 mb-8 flex-grow">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start">
                      <CheckCircle className={`h-[13px] w-[13px] ${plan.accent} mr-2 shrink-0 mt-[2px]`} />
                      <span className="text-[12px] font-medium text-slate-300 leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => {
                    setSelectedPlanName(plan.name);
                    navigate('/checkout');
                  }}
                  className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center ${
                    plan.popular 
                      ? 'btn-gradient text-white' 
                      : 'border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  Select Plan
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
