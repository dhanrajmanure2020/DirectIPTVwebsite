import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users as UsersIcon, Search, Monitor, Trash2 } from 'lucide-react';
import { useAdminAuthAndPurchases, UserPurchase } from '../hooks/useUsers';
import { toast } from 'react-toastify';
import axios from '../lib/api';

export default function Users() {
  const { purchases: users, fetchPurchases } = useAdminAuthAndPurchases();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserPurchase | null>(null);

  const handleDeleteClick = (user: UserPurchase) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`/api/purchases/${userToDelete.id}`);
      toast.success('Record deleted successfully');
      await fetchPurchases();
    } catch (err) {
      console.error('Failed to delete user record:', err);
      toast.error('Failed to delete record');
    } finally {
      setDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const filteredUsers = (users || []).filter((u: UserPurchase) => 
    (u.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.country || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/5 pb-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-2">Users Directory</h1>
          <p className="text-slate-400 font-medium">Detailed view of all registered customers</p>
        </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full md:w-72"
          >
            <input 
              type="text" 
              placeholder="Search by name, email, or country..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-10 py-3.5 focus:outline-none focus:border-primary transition-all text-sm text-slate-200 shadow-inner"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2rem] border border-white/5 bg-white/[0.02] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 bg-black/20">
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Customer Details</th>
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Contact & Location</th>
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Device Setup</th>
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Plan & Billing</th>
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 px-6 text-center text-slate-500">
                      <UsersIcon className="h-12 w-12 mx-auto text-slate-600 mb-4 opacity-50" />
                      <p className="text-lg font-bold text-slate-400">
                        {searchTerm ? 'No users matching your search.' : 'No users found.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-5 px-6">
                        <p className="font-bold text-white text-base">{user.fullName}</p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded text-[10px] uppercase font-bold tracking-wider">
                          Registered: {user.date || 'New'}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <p className="text-sm text-slate-300 font-medium">{user.email}</p>
                        <p className="text-xs text-slate-400 mt-1 font-mono">{user.phone || 'No phone provided'}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{user.country || 'Unknown Location'}</p>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 mb-1">
                          <Monitor className="h-4 w-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-200">{user.deviceType || 'Any Device'}</span>
                        </div>
                        {user.macAddress && (
                          <p className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-1.5 rounded-md inline-block mt-1.5 border border-white/5 tracking-wider">
                            MAC: {user.macAddress}
                          </p>
                        )}
                      </td>
                      <td className="py-5 px-6">
                        <p className="text-sm font-bold text-white">{user.planName}</p>
                        <p className="text-xs text-slate-400 mt-1 font-medium">{user.devices || 1} Connection(s)</p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <p className="text-xs font-bold text-green-400">${Number(user.total || 0).toFixed(2)}</p>
                          <span className="text-slate-600 text-[10px]">via</span>
                          <span className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-bold uppercase tracking-wider text-slate-300">
                            {user.paymentMethod}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all text-xs font-bold shadow-lg shadow-red-500/25"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
              <h3 className="text-xl font-bold text-white mb-2">Delete Record?</h3>
              <p className="text-slate-400 mb-6 text-sm">
                Are you sure you want to delete this record? This action cannot be undone.
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
