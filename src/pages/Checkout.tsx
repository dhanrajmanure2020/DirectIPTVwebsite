import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Wallet, Bitcoin, ChevronDown, ShieldCheck, Lock, Info, ArrowRight, CheckCircle2, Tv } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CountryMultiSelect } from '../components/CountryMultiSelect';
import { VODMultiSelect } from '../components/VODMultiSelect';
import { usePricing } from '../context/PricingContext';

type PaymentMethod = 'card' | 'paypal' | 'crypto';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const navigate = useNavigate();
  const { selectedPlanName, devices, getPlanPrice, currency } = usePricing();

  const [formData, setFormData] = useState({
    selectedCountries: [] as string[],
    selectedVods: [] as string[],
    fullName: '',
    email: '',
    deviceType: '',
    macId: '',
    cardHolderName: '',
    cardType: 'Visa',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    streetAddress: '',
    country: 'United States',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    paypalEmail: '',
    cryptoToken: 'Bitcoin (BTC)',
    cryptoNetwork: 'Mainnet',
    walletAddress: '',
    promoCode: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState('');

  const planName = selectedPlanName || '6 Months';
  const planPrice = getPlanPrice(planName, devices);
  
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discountAmount = planPrice * (appliedPromo.discountValue / 100);
    } else if (appliedPromo.discountType === 'fixed') {
      discountAmount = appliedPromo.discountValue;
    }
  }
  discountAmount = Math.min(discountAmount, planPrice);

  const total = planPrice - discountAmount;

  const handleApplyPromoCode = async () => {
    setPromoError('');
    if (!formData.promoCode.trim()) {
      setAppliedPromo(null);
      return;
    }

    try {
      const response = await axios.get('/api/promos');
      const promos = response.data;
      
      const found = promos.find((p: any) => p.code === formData.promoCode.toUpperCase() && p.active);
      
      if (found) {
        // Assume promo is active as per active field, no start/endDate for simplified schema unless added
        setAppliedPromo({
          code: found.code,
          discountType: 'percentage',
          discountValue: found.discount_percentage
        });
      } else {
        setPromoError('Invalid or inactive promo code');
        setAppliedPromo(null);
      }
    } catch (err) {
      setPromoError('Failed to validate promo code');
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Basic Info
    if (formData.selectedCountries.length === 0) newErrors.selectedCountries = 'Please select at least one country';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Payment Specifics
    if (paymentMethod === 'card') {
      if (!formData.cardHolderName.trim()) newErrors.cardHolderName = 'Card holder name is required';
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be exactly 16 digits';
      }

      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!expiryRegex.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry (MM/YY, 01-12 month)';
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else {
        const isAmex = formData.cardType === 'American Express';
        const expectedLength = isAmex ? 4 : 3;
        const cvvRegex = isAmex ? /^\d{4}$/ : /^\d{3}$/;
        if (!cvvRegex.test(formData.cvv)) {
          newErrors.cvv = `Must be ${expectedLength} digits`;
        }
      }

      // Billing
      if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
      
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (digitsOnly.length < 10) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    } else if (paymentMethod === 'paypal') {
      if (!formData.paypalEmail.trim()) {
        newErrors.paypalEmail = 'PayPal email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.paypalEmail)) {
        newErrors.paypalEmail = 'Invalid email format';
      }
    } else if (paymentMethod === 'crypto') {
      if (!formData.walletAddress.trim()) newErrors.walletAddress = 'Wallet address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 16
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    // Add space after every 4 digits
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.cardNumber;
        return next;
      });
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    let value = e.target.value.replace(/\D/g, '');
    
    // Auto-insert / after 2 digits
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    // Limit to 5 characters (MM/YY)
    value = value.slice(0, 5);
    
    setFormData(prev => ({ ...prev, expiryDate: value }));
    if (errors.expiryDate) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.expiryDate;
        return next;
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d+()\s-]/g, '');
    
    setFormData(prev => ({ ...prev, phone: value }));
    if (errors.phone) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isAmex = formData.cardType === 'American Express';
    const maxLength = isAmex ? 4 : 3;
    const value = e.target.value.replace(/\D/g, '').slice(0, maxLength);
    setFormData(prev => ({ ...prev, cvv: value }));
    if (errors.cvv) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.cvv;
        return next;
      });
    }
  };

  const handleVodMultiSelectChange = React.useCallback((selected: string[]) => {
    setFormData(prev => ({ ...prev, selectedVods: selected }));
    if (errors.selectedVods) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.selectedVods;
        return next;
      });
    }
  }, [errors.selectedVods]);

  const handleCountryMultiSelectChange = React.useCallback((selected: string[]) => {
    setFormData(prev => ({ ...prev, selectedCountries: selected }));
    if (errors.selectedCountries) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.selectedCountries;
        return next;
      });
    }
  }, [errors.selectedCountries]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: value };
      if (name === 'cardType') {
        const isAmex = value === 'American Express';
        const maxLength = isAmex ? 4 : 3;
        if (next.cvv.length > maxLength) {
          next.cvv = next.cvv.slice(0, maxLength);
        }
      }
      return next;
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      const purchaseData = {
        ...formData,
        planName,
        total,
        paymentMethod,
        devices,
        appliedPromo,
        discountAmount,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      };

      try {
        const response = await axios.post('/api/purchases', {
          fullName: purchaseData.fullName,
          email: purchaseData.email,
          country: purchaseData.country,
          phone: purchaseData.phone,
          deviceType: purchaseData.deviceType,
          macAddress: purchaseData.macId,
          planName: purchaseData.planName,
          devices: purchaseData.devices,
          total: purchaseData.total,
          paymentMethod: purchaseData.paymentMethod
        });

        const newPurchase = {
          ...purchaseData,
          id: response.data.id || 'ord_' + Math.random().toString(36).substr(2, 9)
        };
        
        navigate('/invoice', { 
          state: { 
            ...newPurchase, 
            orderId: newPurchase.id,
          } 
        });
      } catch (err: any) {
        console.error("Error submitting purchase processing", err);
        toast.warning(`Purchase saved locally (DB error: ${err.response?.data?.error || err.message})`);
        // Proceed anyway for the preview
        const newPurchase = {
          ...purchaseData,
          id: 'ord_' + Math.random().toString(36).substr(2, 9)
        };
        navigate('/invoice', { 
          state: { ...newPurchase, orderId: newPurchase.id } 
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Scroll to the top of the form if there are validation errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4"
          >
            Secure <span className="text-gradient">Checkout</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 font-medium leading-relaxed"
          >
            Step into the future of cinematic streaming entertainment.
          </motion.p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Customization */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Order Customization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300">Choose countries to include channels</label>
                  <CountryMultiSelect 
                    selected={formData.selectedCountries} 
                    onChange={handleCountryMultiSelectChange}
                    error={errors.selectedCountries}
                  />
                  {errors.selectedCountries && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.selectedCountries}</p>}
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300">Video on Demand & Series</label>
                  <VODMultiSelect 
                    selected={formData.selectedVods} 
                    onChange={handleVodMultiSelectChange}
                    error={errors.selectedVods}
                  />
                  {errors.selectedVods && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.selectedVods}</p>}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 placeholder:text-slate-700 ${
                      errors.fullName ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.fullName}</p>}
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 placeholder:text-slate-700 ${
                      errors.email ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* IPTV Devices */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">IPTV Devices</h2>
              <div className="glass-card p-8 rounded-2xl space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-300">Select Your IPTV Device Or Application</label>
                  <div className="relative">
                    <select 
                      name="deviceType"
                      value={formData.deviceType}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-slate-200 appearance-none"
                    >
                      <option value="">Choose your device...</option>
                      <option>Firestick / Fire TV</option>
                      <option>Android TV / Box</option>
                      <option>Apple TV</option>
                      <option>Smart TV (Samsung/LG)</option>
                      <option>MAG Box</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-widest text-[10px]">Enter MAC ID For Boxes Like MAG/FORMULER/DREAMLINK/BUZZTV/STB-EMULATOR Devices</label>
                    <Info className="h-4 w-4 text-slate-500" />
                  </div>
                  <input 
                    type="text" 
                    name="macId"
                    value={formData.macId}
                    onChange={handleInputChange}
                    placeholder="00:1A:79:XX:XX:XX"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-slate-200 placeholder:text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Select Payment Method</h2>
              
              <div className="grid grid-cols-3 gap-4">
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 transition-all cursor-pointer ${
                    paymentMethod === 'card' ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(33,150,243,0.1)]' : 'border-white/5 hover:border-primary/30'
                  }`}
                >
                  <CreditCard className={`h-6 w-6 ${paymentMethod === 'card' ? 'text-primary' : 'text-slate-500'}`} />
                  <span className={`text-xs font-black uppercase tracking-widest ${paymentMethod === 'card' ? 'text-white' : 'text-slate-500'}`}>Card</span>
                </div>
                <div 
                  onClick={() => setPaymentMethod('paypal')}
                  className={`glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 transition-all cursor-pointer ${
                    paymentMethod === 'paypal' ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(33,150,243,0.1)]' : 'border-white/5 hover:border-primary/30'
                  }`}
                >
                  <Wallet className={`h-6 w-6 ${paymentMethod === 'paypal' ? 'text-primary' : 'text-slate-500'}`} />
                  <span className={`text-xs font-black uppercase tracking-widest ${paymentMethod === 'paypal' ? 'text-white' : 'text-slate-500'}`}>PayPal</span>
                </div>
                <div 
                  onClick={() => setPaymentMethod('crypto')}
                  className={`glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 transition-all cursor-pointer ${
                    paymentMethod === 'crypto' ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(33,150,243,0.1)]' : 'border-white/5 hover:border-primary/30'
                  }`}
                >
                  <Bitcoin className={`h-6 w-6 ${paymentMethod === 'crypto' ? 'text-primary' : 'text-slate-500'}`} />
                  <span className={`text-xs font-black uppercase tracking-widest ${paymentMethod === 'crypto' ? 'text-white' : 'text-slate-500'}`}>Crypto</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {paymentMethod === 'card' && (
                  <motion.div 
                    key="card-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="glass-card p-8 rounded-2xl space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-4 w-4 text-blue-500" />
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Credit Card Details</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-slate-300">Card Holder Name</label>
                          <input 
                            type="text" 
                            name="cardHolderName"
                            value={formData.cardHolderName}
                            onChange={handleInputChange}
                            placeholder="John Doe" 
                            className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 ${
                              errors.cardHolderName ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                            }`}
                          />
                          {errors.cardHolderName && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.cardHolderName}</p>}
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-slate-300">Card Type</label>
                          <div className="relative">
                            <select 
                              name="cardType"
                              value={formData.cardType}
                              onChange={handleInputChange}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-slate-200 appearance-none"
                            >
                              <option>Visa</option>
                              <option>Mastercard</option>
                              <option>American Express</option>
                              <option>Discover</option>
                              <option>Diners Club</option>
                              <option>JCB</option>
                              <option>UnionPay</option>
                              <option>Maestro</option>
                              <option>RuPay</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-slate-300">Card Number</label>
                          <div className="relative">
                            <input 
                              type="tel" 
                              inputMode="numeric"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="0000 0000 0000 0000" 
                              className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 ${
                                errors.cardNumber ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                              }`}
                            />
                            <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600" />
                          </div>
                          {errors.cardNumber && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-slate-300">Expiry Date</label>
                            <input 
                              type="text" 
                              inputMode="numeric"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleExpiryDateChange}
                              placeholder="MM/YY" 
                              className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 ${
                                errors.expiryDate ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                              }`}
                            />
                            {errors.expiryDate && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.expiryDate}</p>}
                          </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-slate-300">CVV</label>
                          <input 
                            type="password" 
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleCvvChange}
                            placeholder={formData.cardType === 'American Express' ? '0000' : '000'} 
                            maxLength={formData.cardType === 'American Express' ? 4 : 3}
                            inputMode="numeric"
                            className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 ${
                              errors.cvv ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                            }`}
                          />
                          {errors.cvv && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold tracking-tight">Billing Address</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-slate-300">Street Address</label>
                          <input 
                            type="text" 
                            name="streetAddress"
                            value={formData.streetAddress}
                            onChange={handleInputChange}
                            placeholder="123 Cinema St" 
                            className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 ${
                              errors.streetAddress ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                            }`}
                          />
                          {errors.streetAddress && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.streetAddress}</p>}
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-slate-300">Country</label>
                          <div className="relative">
                            <select 
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-slate-200 appearance-none"
                            >
                              <option>United States</option>
                              <option>United Kingdom</option>
                              <option>Canada</option>
                              <option>Australia</option>
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-slate-300">City</label>
                          <input 
                            type="text" 
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Los Angeles" 
                            className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 ${
                              errors.city ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                            }`}
                          />
                          {errors.city && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.city}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-slate-300">State / Province</label>
                            <input 
                              type="text" 
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              placeholder="California" 
                              className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 ${
                                errors.state ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                              }`}
                            />
                            {errors.state && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.state}</p>}
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-slate-300">Postal Code</label>
                            <input 
                              type="text" 
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              placeholder="90001" 
                              className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 ${
                                errors.postalCode ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                              }`}
                            />
                            {errors.postalCode && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.postalCode}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-300">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="+1 (555) 000-0000" 
                          className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 ${
                            errors.phone ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                          }`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'paypal' && (
                  <motion.div 
                    key="paypal-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-card p-8 rounded-2xl space-y-6"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">PayPal Account Email</span>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-300">PayPal Email Address</label>
                      <input 
                        type="email" 
                        name="paypalEmail"
                        value={formData.paypalEmail}
                        onChange={handleInputChange}
                        placeholder="your-paypal@example.com" 
                        className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 placeholder:text-slate-700 ${
                          errors.paypalEmail ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                        }`}
                      />
                      {errors.paypalEmail && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.paypalEmail}</p>}
                    </div>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                      <p className="text-sm text-slate-400 leading-relaxed">
                        You will be redirected to PayPal's secure portal to complete the transaction after clicking the button below.
                      </p>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'crypto' && (
                  <motion.div 
                    key="crypto-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-card p-8 rounded-2xl space-y-6"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Bitcoin className="h-4 w-4 text-orange-500" />
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Crypto Payment Details</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-300">Select Token</label>
                        <div className="relative">
                          <select 
                            name="cryptoToken"
                            value={formData.cryptoToken}
                            onChange={handleInputChange}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-slate-200 appearance-none"
                          >
                            <option>Bitcoin (BTC)</option>
                            <option>Ethereum (ETH)</option>
                            <option>USDT (Tether)</option>
                            <option>SOL (Solana)</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-300">Network</label>
                        <div className="relative">
                          <select 
                            name="cryptoNetwork"
                            value={formData.cryptoNetwork}
                            onChange={handleInputChange}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all text-slate-200 appearance-none"
                          >
                            <option>Mainnet</option>
                            <option>ERC-20</option>
                            <option>TRC-20</option>
                            <option>BEP-20</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-300">Your Wallet Address (For Verification)</label>
                      <input 
                        type="text" 
                        name="walletAddress"
                        value={formData.walletAddress}
                        onChange={handleInputChange}
                        placeholder="Paste your wallet address" 
                        className={`w-full bg-black/40 border rounded-xl px-5 py-4 focus:outline-none transition-all text-slate-200 ${
                          errors.walletAddress ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-blue-500'
                        }`}
                      />
                      {errors.walletAddress && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{errors.walletAddress}</p>}
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-green-500/5 rounded-xl border border-green-500/20">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      <p className="text-xs font-bold text-green-500/80 uppercase tracking-widest">15% Discount Applied for Crypto Payment</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

              <div className="flex items-center justify-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mt-6 border-t border-white/5 pt-8">
                <div className="flex items-center gap-2 group cursor-default">
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/40 transition-colors">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span>Secure SSL</span>
                </div>
                <div className="flex items-center gap-2 group cursor-default">
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/40 transition-colors">
                    <Lock className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span>PCI Encrypted</span>
                </div>
              </div>
            </div>

          {/* Sidebar: Order Summary */}
          <div className="space-y-8 lg:sticky lg:top-32 pb-4">
            <div className="glass-card p-6 md:p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <h2 className="text-2xl font-bold tracking-tight mb-8">Order Summary</h2>
              
              <div className="glass-card p-4 rounded-2xl bg-black/40 border border-white/5 mb-8 flex items-center gap-4 relative z-10">
                <div className="w-20 h-20 rounded-xl shrink-0 border border-white/10 shadow-lg bg-linear-to-br from-primary/20 to-secondary/10 flex items-center justify-center relative group">
                  <Tv className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">DirectIPTV Global</p>
                  <p className="text-base font-black leading-tight mb-1">{planName}</p>
                  <p className="text-xs font-medium text-slate-300 mb-2">{devices} {devices === 1 ? 'Device' : 'Devices'}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active 4K Optimized</p>
                  </div>
                </div>
              </div>

              {formData.selectedVods.length > 0 && (
                <div className="mb-6 space-y-2 relative z-10">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Included VOD & Series:</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedVods.map(vod => (
                      <span key={vod} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-medium text-slate-300">
                        {vod}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Subtotal</span>
                  <span className="font-bold">{currency}{planPrice.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between items-center text-sm text-green-400">
                    <span className="font-medium italic">Promo: {appliedPromo.code}</span>
                    <span className="font-bold">-{currency}{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[13.5px] font-bold">Total</span>
                  <span className="text-[22.5px] font-black text-primary">{currency}{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Discount / Promo Code</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    name="promoCode"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                    placeholder="Enter code" 
                    className={`flex-grow bg-black/40 border rounded-xl px-4 py-3 text-xs focus:outline-none transition-all ${
                      promoError ? 'border-red-500/50' : 'border-white/10 focus:border-primary'
                    }`}
                  />
                  <button 
                    type="button"
                    onClick={handleApplyPromoCode}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{promoError}</p>}
                {appliedPromo && <p className="text-green-500 text-[10px] font-bold uppercase tracking-widest">Code {appliedPromo.code} applied!</p>}
              </div>

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl text-lg font-bold text-white btn-gradient flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-2xl shadow-primary/20 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Complete Purchase'}
                {!isSubmitting && <ArrowRight className="h-5 w-5" />}
              </button>

              <p className="mt-8 text-[10px] text-center text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy. Cancellation is available at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
