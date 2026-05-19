import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tv, Search, Trash2, Mail, Phone, Calendar, Monitor, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from '../lib/api';

interface FreeTrialRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  selectedDevice: string;
  selectedPackage: string;
  macAddress: string;
  notes: string;
  status: string;
  createdAt: string;
}

export default function AdminFreeTrials() {
  const [trials, setTrials] = useState<FreeTrialRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [trialToDelete, setTrialToDelete] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadTrials();
  }, []);

  const loadTrials = async () => {
    try {
      const response = await axios.get('/api/free-trials');
      setTrials((Array.isArray(response.data) ? response.data : []).map((t: any) => ({
        id: t.id,
        fullName: t.name,
        email: t.email,
        phone: t.phone,
        country: t.country,
        selectedDevice: t.device,
        selectedPackage: '-',
        macAddress: t.mac_address,
        notes: '',
        status: t.status,
        createdAt: t.date,
      })));
    } catch (e: any) {
      console.error('Failed to load free trials:', e);
      toast.error(`Error loading trials: ${e.response?.data?.error || e.message}`);
    }
  };

  const handleDeleteTrial = (id: string) => {
    setTrialToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!trialToDelete) return;
    
    try {
      await axios.delete(`/api/free-trials/${trialToDelete}`);
      setTrials((trials || []).filter(t => t.id !== trialToDelete));
      toast.success('Record deleted successfully');
    } catch (e) {
      console.error('Failed to delete free trial:', e);
      toast.error('Failed to delete record');
    } finally {
      setDeleteModalOpen(false);
      setTrialToDelete(null);
    }
  };

  // Filter based on search (fullName, email, phone)
  const filteredTrials = (trials || []).filter((t) => 
    (t.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.phone || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTrials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTrials = filteredTrials.slice(startIndex, startIndex + itemsPerPage);

  const StatusBadge = ({ status }: { status: string }) => {
    let color = 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    if (status?.toLowerCase() === 'active' || status?.toLowerCase() === 'sent') color = 'bg-green-500/10 border-green-500/20 text-green-400';
    if (status?.toLowerCase() === 'expired') color = 'bg-red-500/10 border-red-500/20 text-red-400';
    
    return (
      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border ${color}`}>
        {status || 'New Trial'}
      </span>
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/5 pb-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-2 text-white">Free Trial Requests</h1>
          <p className="text-slate-400 font-medium">Manage and view 24-hour IPTV free trial submissions</p>
        </motion.div>
          
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative w-full md:w-80"
        >
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page on query change
            }}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-10 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm text-slate-200 shadow-inner"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-[2rem] border border-white/5 bg-white/[0.02] overflow-hidden shadow-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="border-b border-white/5 bg-black/40">
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Sr No. / ID</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Customer Info</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Contact Details</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Plan & Device</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Date & Status</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-24 px-6 text-center text-slate-500 bg-black/10">
                    <Tv className="h-14 w-14 mx-auto text-slate-600 mb-5 opacity-50 stroke-[1.5]" />
                    <p className="text-xl font-bold text-slate-300">
                      {searchTerm ? 'No trial requests match your search.' : 'No Free Trial Requests Found'}
                    </p>
                    <p className="text-sm font-medium mt-2 text-slate-500">
                      When users submit free trials, they will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedTrials.map((trial, idx) => (
                  <tr key={trial.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-5 px-6 align-top">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-slate-300 font-bold">#{startIndex + idx + 1}</span>
                        <span className="text-[10px] text-slate-500 font-mono tracking-wider">{trial.id}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 align-top">
                      <p className="font-bold text-white text-base leading-tight mb-1">{trial.fullName}</p>
                      {trial.notes && (
                        <div className="mt-2 flex items-start gap-1.5 text-slate-400 bg-white/5 p-2 rounded-lg border border-white/5">
                          <FileText className="w-3 h-3 mt-0.5 shrink-0" />
                          <p className="text-[11px] leading-snug line-clamp-2" title={trial.notes}>{trial.notes}</p>
                        </div>
                      )}
                    </td>
                    <td className="py-5 px-6 align-top">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          {trial.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-300 font-medium font-mono">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          +{trial.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 align-top">
                      <div className="flex items-center gap-2 mb-2">
                        <Monitor className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-bold text-white capitalize">{trial.selectedPackage} Channels</span>
                      </div>
                      {trial.macAddress && (
                        <p className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-1.5 rounded-md inline-block border border-white/5 tracking-wider">
                          MAC: {trial.macAddress}
                        </p>
                      )}
                    </td>
                    <td className="py-5 px-6 align-top">
                      <div className="flex flex-col gap-2 items-start">
                        <StatusBadge status={trial.status} />
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {trial.createdAt}
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDeleteTrial(trial.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                          title="Delete Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="border-t border-white/5 bg-black/20 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Showing <span className="text-white font-medium">{startIndex + 1}</span> to <span className="text-white font-medium">{Math.min(startIndex + itemsPerPage, filteredTrials.length)}</span> of <span className="text-white font-medium">{filteredTrials.length}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 text-sm hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Previous
              </button>
              <div className="text-sm font-medium text-slate-400 mx-2">
                Page <span className="text-white">{currentPage}</span> of {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 text-sm hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleteModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[101] w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold text-white mb-2">Delete Free Trial Request?</h3>
              <p className="text-slate-400 mb-6 text-sm">
                Are you sure you want to delete this free trial request? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end mt-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all shadow-lg shadow-red-500/25"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
