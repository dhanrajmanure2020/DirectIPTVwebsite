import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Ticket, LogOut, CreditCard, Tv, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn("Session check returned error in AdminLayout:", error);
          if (error.message?.includes('Refresh Token') || error.message?.includes('invalid_grant')) {
            localStorage.removeItem('directiptv_admin_logged_in');
            await supabase.auth.signOut({ scope: 'local' }).catch(() => {});
            navigate('/admin/login');
            return;
          }
        }
        
        // Fallback to local storage if Supabase isn't completely set up, 
        // but if we are fully on Supabase we could rely purely on it.
        if (!session && !localStorage.getItem('directiptv_admin_logged_in')) {
          navigate('/admin/login');
        } else {
          setLoading(false);
        }
      } catch (e: any) {
        console.error("Exception in checkSession in AdminLayout:", e);
        if (e?.message?.includes('Refresh Token') || e?.message?.includes('invalid_grant')) {
          localStorage.removeItem('directiptv_admin_logged_in');
          await supabase.auth.signOut({ scope: 'local' }).catch(() => {});
          navigate('/admin/login');
        } else {
          setLoading(false);
        }
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('directiptv_admin_logged_in');
    navigate('/');
  };

  const navLinks = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Customers' },
    { path: '/admin/admin-users', icon: ShieldAlert, label: 'Admin Users' },
    { path: '/admin/promo-codes', icon: Ticket, label: 'Promo Codes' },
    { path: '/admin/subscription-plans', icon: CreditCard, label: 'Subscription Plans' },
    { path: '/admin/free-trials', icon: Tv, label: 'Free Trials' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark pt-20 flex flex-col md:flex-row pb-20 md:pb-0">
      {/* Sidebar */}
      <aside className="fixed bottom-0 left-0 right-0 md:relative md:w-64 bg-[#0a0a0a] md:bg-white/[0.02] border-t md:border-t-0 md:border-b-0 md:border-r border-white/10 p-2 md:p-4 flex flex-row md:flex-col md:h-[calc(100vh-80px)] md:sticky md:top-20 z-50 overflow-x-auto">
        <div className="mb-8 hidden md:block">
          <h2 className="text-xl font-black tracking-tight text-white px-4">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 flex flex-row md:flex-col justify-around md:justify-start gap-1 md:space-y-2 md:overflow-visible">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all whitespace-nowrap relative ${
                  isActive 
                    ? 'bg-primary/20 text-primary border border-primary/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="font-bold text-[10px] md:hidden">{link.label.split(' ')[0]}</span>
                <span className="font-bold hidden md:inline-block text-sm">{link.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="admin-nav-indicator"
                    className="absolute top-0 md:left-0 md:top-auto w-8 md:w-1 bg-primary rounded-b-full md:rounded-r-full md:block h-1 md:h-8" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-0 md:mt-auto pt-0 md:pt-4 border-l md:border-l-0 md:border-t border-white/5 pl-2 md:pl-0 whitespace-nowrap flex items-center md:items-stretch">
          <button 
            onClick={handleLogout} 
            className="flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all w-full text-center md:text-left font-bold text-[10px] md:text-sm border border-transparent hover:border-red-500/20 md:justify-start justify-center"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="md:inline-block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
