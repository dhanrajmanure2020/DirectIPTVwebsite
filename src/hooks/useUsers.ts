import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/api';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../lib/utils/errorUtils';


export interface UserPurchase {
  id?: number;
  fullName: string;
  email: string;
  country: string;
  phone: string;
  date: string;
  deviceType: string;
  macAddress?: string;
  planName: string;
  devices: number;
  total: number;
  paymentMethod: string;
  [key: string]: any;
}

export function useAdminAuthAndPurchases() {
  const [purchases, setPurchases] = useState<UserPurchase[]>([]);
  const navigate = useNavigate();

  // Load purchases from API
  const fetchPurchases = async () => {
    try {
      const response = await axios.get('/api/purchases');
      if (response.data && Array.isArray(response.data)) {
        // Map DB snake_case columns back to camelCase for the frontend if necessary
        const mapped = response.data.map((p: any) => ({
          id: p.id,
          fullName: p.full_name,
          email: p.email,
          country: p.country,
          phone: p.phone,
          date: p.date,
          deviceType: p.device_type,
          macAddress: p.mac_address,
          planName: p.plan_name,
          devices: p.devices,
          total: p.total,
          paymentMethod: p.payment_method
        }));
        setPurchases(mapped);
      }
    } catch (e: any) {
      console.error('Error fetching purchases:', e);
      toast.error(`Database Error: ${getErrorMessage(e)}`);
    }
  };

  useEffect(() => {
    // Check auth
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await import('../lib/supabase').then(m => m.supabase.auth.getSession());
        if (error) {
          console.warn("useUsers auth check returned error:", error);
          if (error.message?.includes('Refresh Token') || error.message?.includes('invalid_grant')) {
            localStorage.removeItem('directiptv_admin_logged_in');
            const sup = await import('../lib/supabase').then(m => m.supabase);
            await sup.auth.signOut({ scope: 'local' }).catch(() => {});
            navigate('/admin/login');
            return;
          }
        }
        
        const isLoggedIn = localStorage.getItem('directiptv_admin_logged_in');
        if (!session && !isLoggedIn) {
          navigate('/admin/login');
          return;
        }
        fetchPurchases();
      } catch (err: any) {
        console.error("Exception in checkAuth in useUsers:", err);
        if (err?.message?.includes('Refresh Token') || err?.message?.includes('invalid_grant')) {
          localStorage.removeItem('directiptv_admin_logged_in');
          const sup = await import('../lib/supabase').then(m => m.supabase).catch(() => null);
          if (sup) {
            await sup.auth.signOut({ scope: 'local' }).catch(() => {});
          }
          navigate('/admin/login');
        } else {
          // If it's a non-fatal error, try to fetch purchases if local flag says logged in
          const isLoggedIn = localStorage.getItem('directiptv_admin_logged_in');
          if (isLoggedIn) {
            fetchPurchases();
          } else {
            navigate('/admin/login');
          }
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return { purchases, setPurchases, fetchPurchases, navigate };
}
