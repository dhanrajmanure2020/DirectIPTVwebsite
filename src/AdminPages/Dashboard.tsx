import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, CheckCircle2 } from 'lucide-react';
import { useAdminAuthAndPurchases } from '../hooks/useUsers';

export default function Dashboard() {
  const { purchases } = useAdminAuthAndPurchases();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-2">Admin Dashboard</h1>
          <p className="text-slate-400 font-medium">Recent Checkouts and User Registrations</p>
        </motion.div>
      </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2rem] border border-white/5 bg-white/[0.02] overflow-hidden"
        >
          <div className="p-6 md:p-8 bg-white/5 border-b border-white/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Recent Purchases</h2>
                <p className="text-sm text-slate-400">Latest completed checkouts</p>
              </div>
            </div>
            <Link 
              to="/admin/users" 
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold transition-colors text-white"
            >
              View Full Directory
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 bg-black/20">
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Date</th>
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Customer</th>
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Plan</th>
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Payment</th>
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Amount</th>
                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 px-6 text-center text-slate-500">
                      No purchases found yet. Complete a checkout to see records here.
                    </td>
                  </tr>
                ) : (
                  purchases.slice(0, 5).map((purchase, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-300">
                        {purchase.date || 'N/A'}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-white leading-tight">{purchase.fullName}</p>
                        <p className="text-xs text-slate-400">{purchase.email}</p>
                        {purchase.deviceType && (
                          <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">Device: {purchase.deviceType}</p>
                        )}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-slate-200">
                        {purchase.planName}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="px-3 py-1 bg-white/10 text-white rounded-md text-xs font-bold uppercase tracking-wider">
                          {purchase.paymentMethod}
                        </span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap font-bold text-primary">
                        ${Number(purchase.total || 0).toFixed(2)}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-green-400">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-widest">Paid</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
    </div>
  );
}
