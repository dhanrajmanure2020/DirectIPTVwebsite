import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users as UsersIcon, Search, Shield, UserPlus, Trash2, Edit, X, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../lib/api';
import { getErrorMessage } from '../lib/utils/errorUtils';


interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  created_at: string;
  last_login?: string;
}

export default function AdminUsers() {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/api/admin-users');
      setAdminUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      toast.error('Failed to load admin users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (user: AdminUser) => {
    setEditingUser({ ...user });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user: AdminUser) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await axios.put(`/api/admin-users/${editingUser.id}`, {
        full_name: editingUser.full_name,
        phone: editingUser.phone,
        role: editingUser.role,
        status: editingUser.status
      });
      toast.success('Admin user updated successfully');
      setIsModalOpen(false);
      fetchAdminUsers();
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to update user'));
    }
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await axios.delete(`/api/admin-users/${userToDelete.id}`);
      toast.success('Admin user deleted successfully');
      setIsDeleteModalOpen(false);
      fetchAdminUsers();
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to delete user'));
    }
  };

  const filteredUsers = (adminUsers || []).filter((u) => 
    (u.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/5 pb-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-2">Admin Users</h1>
          <p className="text-slate-400 font-medium">Manage platform administrators and permissions</p>
        </motion.div>
          
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
        >
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-10 py-3.5 focus:outline-none focus:border-primary transition-all text-sm text-slate-200 shadow-inner"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          </div>
          <Link 
            to="/admin/register" 
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary/10 text-primary border border-primary/20 rounded-xl hover:bg-primary/20 transition-all font-bold text-sm"
          >
            <UserPlus className="h-4 w-4" />
            Add Admin
          </Link>
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
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Admin Details</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Role</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-16 px-6 text-center text-slate-500">
                    <UsersIcon className="h-12 w-12 mx-auto text-slate-600 mb-4 opacity-50" />
                    <p className="text-lg font-bold text-slate-400">
                      {searchTerm ? 'No admins matching your search.' : 'No admins found.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-5 px-6">
                      <p className="font-bold text-white text-base">{user.full_name}</p>
                      <p className="text-sm text-slate-400">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] text-slate-500 uppercase tracking-wider">
                        Joined: {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold text-slate-200">{user.role}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        user.status.toLowerCase() === 'active' 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEditClick(user)}
                          className="p-2 text-slate-400 hover:text-blue-400 bg-white/5 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(user)}
                          className="p-2 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit Modal */}
      {isModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-dark border border-white/10 rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative"
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-white mb-6">Edit Admin User</h3>
            
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                <input 
                  type="text"
                  value={editingUser.full_name}
                  onChange={(e) => setEditingUser({...editingUser, full_name: e.target.value})}
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email (Read Only)</label>
                <input 
                  type="email"
                  value={editingUser.email}
                  disabled
                  className="w-full mt-1 bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Phone</label>
                <input 
                  type="text"
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Role</label>
                  <select 
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-slate-200"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Editor">Editor</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">Status</label>
                  <select 
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-slate-200"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-primary text-background-dark rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-dark border border-red-500/20 rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative text-center"
          >
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Delete Admin User</h3>
            <p className="text-slate-400 mb-8">
              Are you sure you want to delete <span className="font-bold text-white">{userToDelete.full_name}</span>? 
              This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 size={18} />
                Delete Admin
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
