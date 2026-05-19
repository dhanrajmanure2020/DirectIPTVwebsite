import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function GoogleAnalytics({ gaId }: { gaId?: string }) {
  const location = useLocation();
  const id = gaId || import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!id) return;

    // Only inject if it doesn't already exist to prevent duplicates in strict mode
    if (!document.getElementById('google-analytics')) {
      // Create the first script tag
      const script1 = document.createElement('script');
      script1.id = 'google-analytics';
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script1);

      // Create the second script tag for initialization
      const script2 = document.createElement('script');
      script2.id = 'google-analytics-init';
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${id}', { send_page_view: false });
      `;
      document.head.appendChild(script2);
    }
  }, [id]);

  useEffect(() => {
    if (!id || !window.gtag) return;
    
    // Track page view on route change
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
    });
  }, [location, id]);

  return null;
}
