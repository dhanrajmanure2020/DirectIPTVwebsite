import axios from 'axios';
import { supabase } from './supabase';

const api = axios.create({
  baseURL: ''
});

api.interceptors.request.use(async (config) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      config.headers['Authorization'] = `Bearer ${session.access_token}`;
    } else {
      const localFlag = localStorage.getItem('directiptv_admin_logged_in');
      if (localFlag) {
        config.headers['Authorization'] = `Bearer mock-token`;
      }
    }
  } catch (e) {
    console.error('Error fetching session', e);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('directiptv_admin_logged_in');
    if (window.location.pathname.startsWith('/admin')) {
      window.location.href = '/admin/login';
    }
  }
  return Promise.reject(error);
});

export default api;
