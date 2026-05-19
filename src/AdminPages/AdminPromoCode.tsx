import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Ticket, Plus, Save, TrendingUp, X, Activity, Trash2, Edit } from 'lucide-react';
import axios from '../lib/api';
import { toast } from 'react-toastify';

interface PromoCode {
  id: string;
  code: string;
  discountPercentage: number;
  active: boolean;
}

export default function AdminPromoCode() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);

  const fetchPromos = async () => {
    try {
      const response = await axios.get('/api/promos');
      setPromoCodes((Array.isArray(response.data) ? response.data : []).map((p: any) => ({
        id: p.id,
        code: p.code,
        discountPercentage: p.discount_percentage,
        active: p.active,
      })));
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Error fetching promo codes");
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<PromoCode | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    discountPercentage: '',
    active: true,
  });

  const handleOpenModal = (code: PromoCode | null = null) => {
    if (code) {
      setEditingCode(code);
      setFormData({
        code: code.code,
        discountPercentage: code.discountPercentage.toString(),
        active: code.active,
      });
    } else {
      setEditingCode(null);
      setFormData({
        code: '',
        discountPercentage: '',
        active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCode(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      code: formData.code,
      discountPercentage: Number(formData.discountPercentage),
      active: formData.active,
    };

    try {
      if (editingCode) {
        await axios.put(`/api/promos/${editingCode.id}`, payload);
      } else {
        await axios.post('/api/promos', payload);
      }
      fetchPromos();
      handleCloseModal();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "An error occurred while saving the promo code.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/promos/${id}`);
      fetchPromos();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Error deleting promo");
    }
  };

  const toggleStatus = async (id: string) => {
    const promo = promoCodes.find(p => p.id === id);
    if (!promo) return;
    try {
      await axios.put(`/api/promos/${id}`, {
        code: promo.code,
        discountPercentage: promo.discountPercentage,
        active: !promo.active
      });
      fetchPromos();
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Error toggling promo status");
    }
  };


  return (
    <>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              Promo <span className="text-primary">Codes</span>
            </h1>
            <p className="text-slate-400 mt-2 text-sm max-w-xl leading-relaxed">
              Manage promotional codes, set discounts, restrictions, and track usage frequency and generated sales.
            </p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-colors whitespace-nowrap"
          >
            <Plus size={16} />
            Create Promo Code
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Ticket className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Active Promos</p>
              <h3 className="text-2xl font-black">{(promoCodes || []).filter(p => p.active).length}</h3>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Sales Generated</p>
              <h3 className="text-2xl font-black">$0</h3>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Activity className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Redemptions</p>
              <h3 className="text-2xl font-black">0</h3>
            </div>
          </div>
        </div>

        {/* Promo Codes Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-slate-400">
                  <th className="p-4 font-bold">Code</th>
                  <th className="p-4 font-bold">Discount</th>
                  <th className="p-4 font-bold">Validity</th>
                  <th className="p-4 font-bold">Usage</th>
                  <th className="p-4 font-bold">Sales Generated</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {promoCodes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">No promo codes found</td>
                  </tr>
                ) : (
                  promoCodes.map((promo) => (
                    <motion.tr key={promo.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="space-y-1">
                          <span className="inline-block px-3 py-1 bg-white/10 font-mono text-sm font-bold tracking-wider rounded-lg border border-white/10">{promo.code}</span>
                        </div>
                      </td>
                      <td className="p-4 font-bold">
                        {promo.discountPercentage}% OFF
                      </td>
                      <td className="p-4 text-xs text-slate-300">
                         Forever
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-mono">0</span>
                      </td>
                      <td className="p-4 font-mono font-bold text-green-400">
                        $0
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => toggleStatus(promo.id)}
                          className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border transition-colors ${
                            promo.active 
                            ? 'bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30'
                          }`}
                        >
                          {promo.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleOpenModal(promo)} className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(promo.id)} className="p-2 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#111] z-10">
              <h2 className="text-xl font-bold">{editingCode ? 'Edit Promo Code' : 'Create Promo Code'}</h2>
              <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:text-white rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="promoForm" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Code Configuration */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-white/5 pb-2 mb-4">Code Configuration</h3>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">Promo Code</label>
                    <input 
                      type="text" 
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                      placeholder="e.g. SUMMER20"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary font-mono uppercase transition-colors"
                    />
                  </div>
                </div>

                {/* Discount Configuration */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-b border-white/5 pb-2 mb-4 mt-8">Discount Configuration (Percentage)</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">Value</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                          %
                        </span>
                        <input 
                          type="number" 
                          required
                          min="0"
                          step="1"
                          value={formData.discountPercentage}
                          onChange={(e) => setFormData({...formData, discountPercentage: e.target.value})}
                          placeholder="0"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.active}
                      onChange={(e) => setFormData({...formData, active: e.target.checked})}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors relative ${formData.active ? 'bg-primary' : 'bg-white/10'}`}>
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.active ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-sm font-bold">Active Status</span>
                  </label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-[#111] sticky bottom-0">
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="px-6 py-3 font-bold text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="promoForm"
                className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                <Save size={18} />
                {editingCode ? 'Save Changes' : 'Create Promo Code'}
              </button>
            </div>
            
          </motion.div>
        </div>
      )}
    </>
  );
}
