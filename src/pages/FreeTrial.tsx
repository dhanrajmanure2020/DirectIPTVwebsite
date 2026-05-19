import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Check, ShieldCheck, Mail, User, Tv, Film, XCircle, Smartphone, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  package: 'full' | 'english';
  macAddress: string;
  orderNotes: string;
};

const features = [
  {
    text: '24-hour IPTV free trial — no credit card required',
    icon: <Check className="w-6 h-6 text-green-400" />,
    color: 'from-green-500/20 to-emerald-500/5'
  },
  {
    text: 'Stream 30,000+ live TV channels in HD & 4K',
    icon: <Tv className="w-6 h-6 text-blue-400" />,
    color: 'from-blue-500/20 to-cyan-500/5'
  },
  {
    text: 'Watch 165,000+ VOD with full EPG',
    icon: <Film className="w-6 h-6 text-purple-400" />,
    color: 'from-purple-500/20 to-fuchsia-500/5'
  },
  {
    text: 'No Contracts. Test it for free, cancel anytime.',
    icon: <XCircle className="w-6 h-6 text-orange-400" />,
    color: 'from-orange-500/20 to-red-500/5'
  },
  {
    text: 'Works on FireStick, mobile, Smart TV, and more',
    icon: <Smartphone className="w-6 h-6 text-pink-400" />,
    color: 'from-pink-500/20 to-rose-500/5'
  }
];

export default function FreeTrial() {
  const { register, handleSubmit, control, watch, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      package: 'full'
    }
  });

  const navigate = useNavigate();
  const [submittedData, setSubmittedData] = useState<(FormData & { submittedAt: Date }) | null>(null);
  const [countdown, setCountdown] = useState(10);
  const selectedPackage = watch('package');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && submittedData) {
        handleCloseModal();
      }
    };
    if (submittedData) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    if (submittedData && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else if (submittedData && countdown === 0) {
      handleCloseModal();
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [submittedData, countdown]);

  const handleCloseModal = () => {
    setSubmittedData(null);
    navigate('/');
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      // Save to localStorage mimicking 'freeTrials' persistence
      try {
        await axios.post('/api/free-trials', {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          country: '',
          device: '-',
          status: 'New Trial',
          macAddress: data.macAddress
        });
      } catch (err: any) {
        console.error('Failed saving to API:', err);
        toast.error(`Error saving request: ${err.response?.data?.error || err.message}`);
      }

      setSubmittedData({ ...data, submittedAt: new Date() });
      setCountdown(10);
      
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        macAddress: '',
        orderNotes: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background-dark text-white relative flex flex-col">
      <SEO 
        title="Start Your 24Hr Free Trial | DirectIPTV" 
        description="Get a 24-hour IPTV free trial with no credit card required. Stream 30,000+ live channels and 165,000+ VODs in HD & 4K." 
      />

      {/* Success Modal */}
      <AnimatePresence>
        {submittedData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleCloseModal}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[102] w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {/* Header with Success Icon */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/5 border-b border-white/10 p-8 text-center flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.3)] border border-green-400/30"
                >
                  <Check className="w-10 h-10 text-green-400 stroke-[3]" />
                </motion.div>
                <h2 id="modal-headline" className="text-2xl md:text-3xl font-bold mb-2">Thank You for Your Free Trial Request!</h2>
                <p className="text-zinc-400">Your 24Hr IPTV Free Trial request has been successfully submitted.</p>
              </div>

              {/* Content Details */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Full Name</span>
                    <p className="font-medium text-white">{submittedData.firstName} {submittedData.lastName}</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Email Address</span>
                    <p className="font-medium text-white">{submittedData.email}</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Phone Number</span>
                    <p className="font-medium text-white">+{submittedData.phone}</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Channel Package</span>
                    <p className="font-medium text-white capitalize">{submittedData.package} Channels</p>
                  </div>
                  {submittedData.macAddress && (
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
                      <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">MAC Address</span>
                      <p className="font-medium text-white uppercase">{submittedData.macAddress}</p>
                    </div>
                  )}
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Submission Date & Time</span>
                    <p className="font-medium text-white">{submittedData.submittedAt.toLocaleString()}</p>
                  </div>
                  {submittedData.orderNotes && (
                    <div className="md:col-span-2 bg-black/30 p-4 rounded-xl border border-white/5 space-y-1 mt-2">
                      <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Order Notes</span>
                      <p className="font-medium text-zinc-300 whitespace-pre-wrap">{submittedData.orderNotes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Area */}
              <div className="border-t border-white/10 p-6 bg-zinc-900/80 flex flex-col sm:flex-row items-center gap-4 justify-between mt-auto">
                <p className="text-sm text-zinc-500 animate-pulse">Redirecting to Home in {countdown} seconds...</p>
                <div className="flex w-full sm:w-auto gap-3">
                   <button
                      type="button"
                      autoFocus
                      onClick={handleCloseModal}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-white/10 bg-black/50 hover:bg-black text-white font-medium transition-all focus:ring-2 focus:ring-zinc-500 focus:outline-none"
                   >
                      Close
                   </button>
                   <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition-all shadow-lg shadow-blue-500/25 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                   >
                      Back to Home
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6 lg:px-12 flex-grow">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Instant Setup
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Start Your IPTV Free Trial <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">(24Hours)</span><br className="hidden md:block"/> <span className="text-[0.5em] text-zinc-300 font-medium">– No Credit Card Needed</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto"
          >
            Experience premium streaming across all your devices. Get instant access to our complete channel list and VOD library.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-20">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className={`p-6 rounded-2xl bg-zinc-900 border border-white/5 bg-gradient-to-b hover:border-white/20 transition-all cursor-pointer group shadow-lg shadow-black/50 ${feature.color}`}
            >
              <div className="mb-4 p-3 rounded-full bg-black/30 inline-block group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <p className="font-medium leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-4 rounded-xl relative overflow-hidden bg-gradient-to-r from-red-900/40 via-red-800/20 to-zinc-900/40 border border-red-500/20 flex flex-col md:flex-row items-center justify-center text-center gap-3 shadow-lg shadow-red-900/20"
        >
          <div className="absolute inset-0 bg-red-500/10 blur-2xl"></div>
          <AlertCircle className="w-6 h-6 text-red-400 relative z-10 hidden md:block" />
          <p className="text-red-100/90 font-medium md:text-lg relative z-10 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 md:hidden" />
            One free trial per user/email or IP address
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Main Form Area */}
          <div className="flex-1 space-y-8 relative z-50">
            
            <form id="free-trial-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-50">
              
              {/* Contact Information */}
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 relative z-50 overflow-visible">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-blue-400" />
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">First Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-zinc-500" />
                      </div>
                      <input 
                        {...register('firstName', { required: 'First name is required' })}
                        className={`w-full bg-black/50 border ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500'} rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:ring-1 focus:outline-none transition-all`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Last Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-zinc-500" />
                      </div>
                      <input 
                        {...register('lastName', { required: 'Last name is required' })}
                        className={`w-full bg-black/50 border ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500'} rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:ring-1 focus:outline-none transition-all`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-zinc-300">Email Address <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-zinc-500" />
                      </div>
                      <input 
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                        })}
                        className={`w-full bg-black/50 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500'} rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:ring-1 focus:outline-none transition-all`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-2 relative z-50 overflow-visible">
                    <label className="text-sm font-medium text-zinc-300">Phone Number <span className="text-red-500">*</span></label>
                    <div className="relative overflow-visible z-50 phone-input-dark">
                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: 'Phone number is required' }}
                        render={() => (
                           <style dangerouslySetInnerHTML={{__html: `
                            .phone-input-dark .react-tel-input .form-control {
                              width: 100%;
                              background: rgba(0, 0, 0, 0.5);
                              border: 1px solid rgba(255, 255, 255, 0.1);
                              color: white;
                              border-radius: 0.75rem;
                              padding-top: 0.75rem;
                              padding-bottom: 0.75rem;
                              height: auto;
                            }
                            .phone-input-dark .react-tel-input .form-control:focus {
                              border-color: #3b82f6;
                              box-shadow: 0 0 0 1px #3b82f6;
                            }
                            .phone-input-dark .react-tel-input .flag-dropdown {
                              background: transparent;
                              border: 1px solid rgba(255, 255, 255, 0.1);
                              border-right: none;
                              border-radius: 0.75rem 0 0 0.75rem;
                            }
                            .phone-input-dark .react-tel-input .flag-dropdown:hover {
                              background: rgba(255,255,255,0.05);
                            }
                            .phone-input-dark .react-tel-input .selected-flag {
                              background: transparent;
                              border-radius: 0.75rem 0 0 0.75rem;
                            }
                            .phone-input-dark .react-tel-input .selected-flag:hover {
                              background: rgba(255,255,255,0.05);
                            }
                            .phone-input-dark .react-tel-input .country-list {
                              background: #18181b;
                              border: 1px solid rgba(255,255,255,0.1);
                              color: white;
                              border-radius: 0.75rem;
                              z-index: 9999;
                            }
                            .phone-input-dark .react-tel-input .country-list .country:hover,
                            .phone-input-dark .react-tel-input .country-list .country.highlight {
                              background: #27272a;
                            }
                          `}} />
                        )}
                      />
                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: 'Phone number is required', minLength: { value: 6, message: 'Invalid phone number' } }}
                        render={({ field }) => (
                          <PhoneInput
                            country={'us'}
                            preferredCountries={['us', 'ca', 'gb']}
                            value={field.value}
                            onChange={field.onChange}
                            enableSearch={true}
                            disableSearchIcon={true}
                            inputClass={`${errors.phone ? '!border-red-500' : ''}`}
                            buttonClass={`${errors.phone ? '!border-red-500' : ''}`}
                          />
                        )}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>

              {/* Channel Packages */}
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 relative z-0">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Tv className="w-6 h-6 text-purple-400" />
                  Channel Packages
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-base font-semibold text-white block mb-4">Choose your package</label>
                    <div className="space-y-3">
                      
                      <label className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPackage === 'full' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-black/30 hover:bg-black/50'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPackage === 'full' ? 'border-blue-500' : 'border-zinc-500'}`}>
                            {selectedPackage === 'full' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                          </div>
                          <div>
                            <p className="font-semibold text-white">Full Channels</p>
                            <p className="text-sm text-zinc-400">All global channels + VOD</p>
                          </div>
                        </div>
                        <Check className={`w-5 h-5 ${selectedPackage === 'full' ? 'text-blue-500' : 'opacity-0'}`} />
                        <input
                          type="radio"
                          value="full"
                          {...register('package')}
                          className="sr-only"
                        />
                      </label>

                      <label className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPackage === 'english' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-black/30 hover:bg-black/50'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPackage === 'english' ? 'border-blue-500' : 'border-zinc-500'}`}>
                            {selectedPackage === 'english' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                          </div>
                          <div>
                            <p className="font-semibold text-white">English Channels Only</p>
                            <p className="text-sm text-zinc-400">US, UK, CA, AU channels + VOD</p>
                          </div>
                        </div>
                        <Check className={`w-5 h-5 ${selectedPackage === 'english' ? 'text-blue-500' : 'opacity-0'}`} />
                        <input
                          type="radio"
                          value="english"
                          {...register('package')}
                          className="sr-only"
                        />
                      </label>

                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">MAC Address <span className="text-zinc-500">(Enter if required e.g., STB, MAG)</span></label>
                      <input 
                        {...register('macAddress')}
                        className="w-full bg-black/50 border border-white/10 focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3 px-4 text-white placeholder-zinc-500 focus:ring-1 focus:outline-none transition-all uppercase"
                        placeholder="00:1A:2B:3C:4D:5E"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">Order Notes <span className="text-zinc-500">(Optional)</span></label>
                      <textarea 
                        {...register('orderNotes')}
                        className="w-full bg-black/50 border border-white/10 focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3 px-4 text-white placeholder-zinc-500 focus:ring-1 focus:outline-none transition-all min-h-[100px] resize-y"
                        placeholder="Any specific requests or app choices?"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* Sticky Payment Summary */}
          <div className="lg:w-[400px] xl:w-[450px]">
            <div className="sticky top-24 bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-zinc-400">Selected Plan</span>
                  <span className="font-semibold text-white">24Hr Free Trial</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-zinc-400">Package Type</span>
                  <span className="font-semibold text-white capitalize">{selectedPackage} Channels</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-zinc-400">Setup Fee</span>
                  <span className="font-semibold text-green-400">Free</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-xl font-bold text-white">Total</span>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">$0.00</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                <ShieldCheck className="w-6 h-6 flex-shrink-0" />
                <p className="text-sm font-medium">100% No Credit Card Required. Start streaming immediately after setup.</p>
              </div>

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="group relative w-full flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Place order $0.00
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
