import React, { useState, useEffect } from 'react';
import { usePricing } from '../context/PricingContext';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Loader2, CheckCircle2, Plus, Trash2, Edit2, X } from 'lucide-react';
import api from '../lib/api';

type Plan = {
  id?: number;
  devices: number;
  duration: string;
  price: number;
  sub_text: string;
};

export default function SubscriptionPlans() {
  const { currency, updateCurrency, refetchPlans } = usePricing();
  
  const [plans, setPlans] = useState<Plan[]>([]);
  const [localCurrency, setLocalCurrency] = useState(currency);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // For the create/edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const [formData, setFormData] = useState({
    devices: 1,
    duration: '1 Month',
    price: '',
    sub_text: ''
  });

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/api/subscription-plans');
      setPlans(res.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSaveCurrency = () => {
    updateCurrency(localCurrency);
  };

  const openAddModal = () => {
    setEditingPlan(null);
    setFormData({ devices: 1, duration: '1 Month', price: '', sub_text: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      devices: plan.devices,
      duration: plan.duration,
      price: plan.price.toString(),
      sub_text: plan.sub_text || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;
    try {
      await api.delete(`/api/subscription-plans/${id}`);
      await fetchPlans();
      await refetchPlans();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingPlan ? `/api/subscription-plans/${editingPlan.id}` : '/api/subscription-plans';
      const method = editingPlan ? 'PUT' : 'POST';
      
      const payload = {
        devices: Number(formData.devices),
        duration: formData.duration,
        price: Number(formData.price),
        sub_text: formData.sub_text
      };

      if (editingPlan) {
        await api.put(`/api/subscription-plans/${editingPlan.id}`, payload);
      } else {
        await api.post('/api/subscription-plans', payload);
      }
      
      setIsModalOpen(false);
      await fetchPlans();
      await refetchPlans();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Group plans by device count for nicer display
  const groupedPlans = plans.reduce((acc, plan) => {
    if (!acc[plan.devices]) acc[plan.devices] = [];
    acc[plan.devices].push(plan);
    return acc;
  }, {} as Record<number, Plan[]>);

  const uniqueDevices = Object.keys(groupedPlans).map(Number).sort((a, b) => a - b);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">Subscription Plans</h1>
          <p className="text-slate-400 text-sm">Manage dynamic pricing directly from the database.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-4 py-2">
            <span className="text-sm font-semibold text-slate-300">Currency</span>
            <select
              value={localCurrency}
              onChange={(e) => {
                setLocalCurrency(e.target.value);
                updateCurrency(e.target.value);
              }}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="$">$ (USD)</option>
              <option value="€">€ (EUR)</option>
              <option value="£">£ (GBP)</option>
              <option value="₹">₹ (INR)</option>
            </select>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            <Plus className="w-5 h-5" />
            <span>Add Plan</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
          {error}
        </div>
      ) : uniqueDevices.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-12 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-white mb-2">No Plans Found</h3>
          <p className="text-slate-400 mb-6">Create your first subscription plan to get started.</p>
          <button onClick={openAddModal} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark">
            Add Plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {uniqueDevices.map(device => (
            <motion.div
              key={device}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl">
                  {device}
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">{device} Device{device > 1 ? 's' : ''}</h2>
              </div>
              
              <div className="space-y-4">
                {groupedPlans[device].map(plan => (
                  <div key={plan.id} className="bg-black/20 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="font-bold text-slate-200 block text-lg">{plan.duration}</span>
                        {plan.sub_text && <span className="text-xs text-slate-400">{plan.sub_text}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                         <button onClick={() => openEditModal(plan)} className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                           <Edit2 className="w-4 h-4" />
                         </button>
                         <button onClick={() => plan.id && handleDelete(plan.id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                           <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                    <div className="text-2xl font-black text-white">
                      {currency}{Number(plan.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h2 className="text-xl font-bold text-white tracking-tight">{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Devices</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.devices}
                    onChange={e => setFormData({ ...formData, devices: Number(e.target.value) })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Duration (e.g. "1 Month")</label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="1 Month"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{localCurrency}</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Sub-text (Optional)</label>
                  <input
                    type="text"
                    value={formData.sub_text}
                    onChange={e => setFormData({ ...formData, sub_text: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. Save 20%"
                  />
                </div>
                
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    <span>{editingPlan ? 'Save Changes' : 'Create Plan'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
