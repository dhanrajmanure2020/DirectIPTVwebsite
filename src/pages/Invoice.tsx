import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Printer, Download, CheckCircle2, ArrowLeft, Tv, Mail, Globe, ShieldCheck, CreditCard } from 'lucide-react';
import logoUrl from '../png-logo.png';
import { usePricing } from '../context/PricingContext';

export default function Invoice() {
  const location = useLocation();
  const orderData = location.state;
  const { currency } = usePricing();

  // If no data is present, redirect to checkout or home
  if (!orderData) {
    return <Navigate to="/checkout" replace />;
  }

  const {
    fullName,
    email,
    deviceType,
    macId,
    streetAddress,
    city,
    state,
    postalCode,
    country,
    selectedCountries = [],
    selectedVods = [],
    phone,
    planName = '6 Months Plan',
    total = 62.50,
    paymentMethod = 'card',
    devices = 1,
    appliedPromo,
    discountAmount = 0,
    cardHolderName,
    cardNumber,
    cardType,
    orderId = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  } = orderData;

  const handlePrint = () => {
    window.print();
  };

  const planPrice = typeof total === 'number' ? total + discountAmount : 60;

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark print:pt-0 print:pb-0 print:bg-white text-slate-200 print:text-black">
      <div className="max-w-4xl mx-auto">
        {/* Navigation / Actions (Hidden during print) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 print:hidden">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-xs"
            >
              <Printer size={18} />
              Print Invoice
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary/20 border border-primary/30 text-primary rounded-xl hover:bg-primary/30 transition-all font-bold uppercase tracking-widest text-xs">
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Success Banner (Hidden during print) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 glass-card p-8 rounded-3xl border border-green-500/20 bg-green-500/5 flex flex-col md:flex-row items-center gap-6 print:hidden"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">Thank you for your order, {fullName}!</h1>
            <p className="text-slate-400">Your subscription is now active. Check your email for login credentials and setup instructions.</p>
          </div>
        </motion.div>

        {/* Actual Invoice Body */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-[2.5rem] border border-white/5 bg-white/[0.02] overflow-hidden shadow-2xl relative print:border-none print:bg-transparent print:shadow-none"
        >
          {/* Header Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 print:hidden" />
          
          {/* Invoice Header */}
          <div className="p-10 md:p-16 border-b border-white/5 print:border-slate-200 flex flex-col md:flex-row justify-between gap-12 relative z-10">
            <div className="space-y-6">
              <div className="flex items-center">
                <img 
                  src={logoUrl} 
                  alt="DirectIPTV" 
                  className="w-[120px] h-auto" 
                />
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 flex items-center gap-2 text-sm print:text-slate-600">
                  <Globe size={14} className="text-primary" />
                  www.directiptv.com
                </p>
                <p className="text-slate-400 flex items-center gap-2 text-sm print:text-slate-600">
                  <Mail size={14} className="text-primary" />
                  support@directiptv.com
                </p>
                <p className="text-slate-400 flex items-center gap-2 text-sm print:text-slate-600">
                  <CheckCircle2 size={14} className="text-primary" />
                  DirectIPTV Premium Service
                </p>
              </div>
            </div>
            
            <div className="md:text-right space-y-2">
              <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-500 print:text-slate-400">INVOICE</h2>
              <div className="space-y-1">
                <p className="text-slate-400 text-sm print:text-slate-600">Order ID: <span className="text-white font-bold print:text-black">{orderId}</span></p>
                <p className="text-slate-400 text-sm print:text-slate-600">Date: <span className="text-white font-bold print:text-black">{date}</span></p>
                <p className="text-slate-400 text-sm print:text-slate-600">Status: <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20 print:border-green-500/50">Paid</span></p>
              </div>
            </div>
          </div>

          {/* Billing Info Grid */}
          <div className="p-10 md:p-16 border-b border-white/5 print:border-slate-200 relative z-10 space-y-10">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Bill To</h3>
              <div className="space-y-1 text-slate-300 print:text-black">
                <p className="text-lg font-bold text-white print:text-black">{fullName}</p>
                <p className="text-sm">{email}</p>
                <p className="text-sm">{phone}</p>
                <div className="pt-2 text-sm text-slate-400 print:text-slate-600">
                  <p>{streetAddress}</p>
                  <p>{city}, {state} {postalCode}</p>
                  <p>{country}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Service Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl print:bg-slate-50 print:border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Tv size={18} className="text-primary" />
                    <span className="text-sm font-bold uppercase tracking-widest">Setup Information</span>
                  </div>
                  <div className="flex items-center justify-between gap-x-4 gap-y-2 text-[10px] sm:text-xs flex-wrap">
                    <div className="flex items-center gap-2 text-[80%] font-normal">
                      <span className="text-slate-500 uppercase tracking-widest font-normal">Devices:</span>
                      <span className="text-white print:text-black font-normal">{devices}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[80%] font-normal">
                      <span className="text-slate-500 uppercase tracking-widest font-normal">Device Type:</span>
                      <span className="text-white print:text-black font-normal">{deviceType || 'Not Specified'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[80%] font-normal">
                      <span className="text-slate-500 uppercase tracking-widest font-normal">MAC ID:</span>
                      <span className="text-white font-mono print:text-black font-normal">{macId || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'card' ? (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl print:bg-slate-50 print:border-slate-200 h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard size={18} className="text-green-500" />
                      <span className="text-sm font-bold uppercase tracking-widest">Payment Security</span>
                    </div>
                    <div className="flex items-center justify-between gap-x-4 gap-y-2 text-[10px] sm:text-xs flex-wrap">
                      <div className="flex items-center gap-2 text-[80%] font-normal">
                         <span className="text-slate-500 uppercase tracking-widest shrink-0 font-normal">Cardholder:</span>
                         <span className="text-white print:text-black font-normal truncate overflow-hidden">{cardHolderName || fullName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[80%] font-normal">
                         <span className="text-slate-500 uppercase tracking-widest shrink-0 font-normal">Card Details:</span>
                         <span className="text-white font-mono print:text-black font-normal">
                           {cardType || 'Card'} **** {cardNumber?.toString().slice(-4) || '****'}
                         </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl print:bg-slate-50 print:border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck size={18} className="text-green-500" />
                      <span className="text-sm font-bold uppercase tracking-widest">Payment Security</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
                      Transaction processed via {paymentMethod.toUpperCase()} with 256-bit encryption. Payment ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}
                    </p>
                  </div>
                )}

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl print:bg-slate-50 print:border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe size={18} className="text-blue-500" />
                    <span className="text-sm font-bold uppercase tracking-widest">Selected Countries</span>
                  </div>
                  <div className="text-[80%] font-normal text-white print:text-black leading-relaxed text-left">
                    {selectedCountries && selectedCountries.length > 0 ? selectedCountries.join(', ') : 'Global Access'}
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl print:bg-slate-50 print:border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Tv size={18} className="text-purple-500" />
                    <span className="text-sm font-bold uppercase tracking-widest">VOD & Series Packages</span>
                  </div>
                  <div className="text-[80%] font-normal text-white print:text-black leading-relaxed text-left">
                    {selectedVods && selectedVods.length > 0 ? selectedVods.join(', ') : 'No additional VOD selected'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="px-6 md:px-16 relative z-10 overflow-x-auto pb-4">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="border-b border-white/10 print:border-slate-200">
                  <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Service Description</th>
                  <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Duration</th>
                  <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 print:border-slate-100">
                  <td className="py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 print:bg-slate-100">
                        <Tv size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white print:text-black">DirectIPTV Premium Global Subscription</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">{planName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-8 text-center">
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest print:bg-slate-50">Active Now</span>
                  </td>
                  <td className="py-8 text-right font-bold text-white print:text-black">
                    {currency}{planPrice.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="p-10 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
            <div className="md:max-w-xs">
              <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-black mb-4">Important Note</p>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest">
                This invoice serves as a valid receipt of your payment. Activation instructions have been sent to your registered email. For any support, please contact help@directiptv.com with your Order ID.
              </p>
            </div>
            
            <div className="w-full md:w-64 space-y-4">
              <div className="flex justify-between items-center text-sm print:text-slate-600">
                <span className="text-slate-500 font-bold uppercase tracking-widest">Subtotal</span>
                <span className="font-bold">{currency}{planPrice.toFixed(2)}</span>
              </div>
              
              {appliedPromo && discountAmount > 0 && (
                <div className="flex justify-between items-center text-sm text-green-400">
                  <span className="font-medium italic">Promo: {appliedPromo.code}</span>
                  <span className="font-bold">-{currency}{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 print:border-slate-200 flex justify-between items-center">
                <span className="text-lg font-black uppercase tracking-tighter text-primary">Total Paid</span>
                <span className="text-3xl font-black text-white print:text-black">{currency}{Number(total || 60).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="h-2 bg-linear-to-r from-primary via-secondary to-primary" />
        </motion.div>

        {/* Post-Checkout Links (Hidden during print) */}
        <div className="mt-12 text-center print:hidden">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">Need help setting up?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tutorials" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest">Setup Tutorials</Link>
            <Link to="/help" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest">Support Center</Link>
            <Link to="/contact" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest">Contact Us</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
