import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, ChevronDown, CheckCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formData.phone.replace(/\D/g, '').length < 6) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject.';
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4">
                Contact <span className="text-gradient">Us</span>
              </h1>
              <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-md">
                Experience premium support tailored for high-fidelity entertainment. Our team is here to ensure your cinematic journey remains uninterrupted.
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl border border-blue-500/30 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
              <p className="text-slate-300 font-medium leading-relaxed">
                Our dedicated support team is available around the clock to ensure your cinematic journey remains uninterrupted. Reach out to us via email or use the form below for any inquiries.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-purple-500/30 flex items-center gap-5 relative group overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="text-purple-400 h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-100 uppercase tracking-widest">Email Support</p>
                <p className="text-slate-400 font-medium">support@directiptv.com</p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=1000" 
                alt="Support Team" 
                className="w-full h-auto object-cover opacity-80"
              />
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 md:p-12 rounded-[2rem] border border-white/5 bg-white/[0.02]"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-extrabold tracking-tight mb-4 text-white">Message Sent!</h3>
                  <p className="text-slate-400 font-medium mb-8">
                    We've received your inquiry and will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 rounded-full border border-white/10 text-slate-300 font-bold hover:bg-white/5 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8" 
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-1">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      type="text" 
                      placeholder="John Doe"
                      className={`w-full bg-black/40 border ${errors.fullName ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-slate-200 placeholder:text-slate-700`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs font-semibold">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-1">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email" 
                      placeholder="john@example.com"
                      className={`w-full bg-black/40 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-slate-200 placeholder:text-slate-700`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs font-semibold">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-3 relative z-50 overflow-visible">
                    <label className="text-sm font-medium text-zinc-300">Phone Number <span className="text-red-500">*</span></label>
                    <div className="relative overflow-visible z-50 phone-input-dark">
                      <style dangerouslySetInnerHTML={{__html: `
                        .phone-input-dark .react-tel-input .form-control {
                          width: 100%;
                          background: rgba(0, 0, 0, 0.4);
                          border: 1px solid rgba(255, 255, 255, 0.1);
                          color: rgb(226, 232, 240);
                          border-radius: 0.75rem;
                          padding-top: 1rem;
                          padding-bottom: 1rem;
                          height: auto;
                          transition: all 0.2s;
                        }
                        .phone-input-dark .react-tel-input .form-control:focus {
                          border-color: #3b82f6;
                          box-shadow: none;
                          outline: none;
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
                      <PhoneInput
                        country={'us'}
                        preferredCountries={['us', 'ca', 'gb']}
                        value={formData.phone}
                        onChange={(value) => {
                          setFormData(prev => ({ ...prev, phone: value }));
                          if (errors.phone) {
                            setErrors(prev => {
                              const newErrors = { ...prev };
                              delete newErrors.phone;
                              return newErrors;
                            });
                          }
                        }}
                        enableSearch={true}
                        disableSearchIcon={true}
                        inputClass={`${errors.phone ? '!border-red-500/50' : ''}`}
                        buttonClass={`${errors.phone ? '!border-red-500/50' : ''}`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs font-semibold">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-1">
                      Subject <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full bg-black/40 border ${errors.subject ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-slate-200 appearance-none`}
                      >
                        <option value="" disabled className="bg-background-dark">Select a subject</option>
                        <option value="Technical Support" className="bg-background-dark">Technical Support</option>
                        <option value="Billing Inquiry" className="bg-background-dark">Billing Inquiry</option>
                        <option value="Channel Request" className="bg-background-dark">Channel Request</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
                    </div>
                    {errors.subject && (
                      <p className="text-red-500 text-xs font-semibold">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-1">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="How can we help you today?"
                      className={`w-full bg-black/40 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-slate-200 placeholder:text-slate-700 resize-none`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-xs font-semibold">{errors.message}</p>
                    )}
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 rounded-2xl text-lg font-bold text-white btn-gradient flex items-center justify-center gap-3 active:scale-[0.98] transition-transform disabled:opacity-70 disabled:scale-100"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className={`h-5 w-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Live Status Indicator */}
        <div className="mt-20 flex justify-end">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 border border-white/5 backdrop-blur-md">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Live Status: Optimal Performance</span>
          </div>
        </div>
      </div>
    </main>
  );
}

