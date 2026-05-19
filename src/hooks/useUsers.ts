import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/api';
import { toast } from 'react-toastify';

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

  useEffect(() => {
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
        toast.error(`Database Error: ${e.response?.data?.error || e.message}`);
      }
    };

    // Check auth
    const checkAuth = async () => {
      const { data: { session } } = await import('../lib/supabase').then(m => m.supabase.auth.getSession());
      const isLoggedIn = localStorage.getItem('directiptv_admin_logged_in');
      if (!session && !isLoggedIn) {
        navigate('/admin/login');
        return;
      }
      fetchPurchases();
    };

    checkAuth();
  }, [navigate]);

  return { purchases, navigate };
}
