import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SeoSettings {
  path: string;
  title: string;
  description: string;
  keywords: string;
  noindex: boolean;
  ogImage: string;
}

const DEFAULT_SEO: SeoSettings = {
  path: '/',
  title: 'DirectIPTV | Premium Streaming Solutions',
  description: 'Experience premium IPTV streaming with over 20,000+ live channels and 100,000+ VODs. Start watching today on any device.',
  keywords: 'iptv, streaming, live tv, vod, sports, movies, online tv',
  noindex: false,
  ogImage: '/apple-touch-icon.png'
};

export function SEO() {
  const { pathname } = useLocation();
  const [seo, setSeo] = useState<SeoSettings | null>(null);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('seoSettings') || '[]');
      const pageSeo = Array.isArray(data) ? data.find(s => s.path === pathname || s.path === pathname.replace(/\/$/, '')) : undefined;
      
      if (pageSeo) {
        setSeo({
          ...pageSeo,
          noindex: Boolean(pageSeo.noindex)
        });
      } else {
        // Generate a basic dynamic title if none found in DB
        const titleMap: Record<string, string> = {
          '/': 'Home',
          '/pricing': 'Plans & Pricing',
          '/about': 'About Us',
          '/contact': 'Contact Support',
          '/checkout': 'Secure Checkout',
          '/tutorials': 'Setup Tutorials',
          '/admin': 'Admin Dashboard'
        };
        const baseName = titleMap[pathname] || pathname.replace('/', '').charAt(0).toUpperCase() + pathname.slice(2);
        setSeo({
          ...DEFAULT_SEO,
          title: baseName ? `${baseName} | DirectIPTV` : DEFAULT_SEO.title,
          noindex: pathname.startsWith('/admin') || pathname.startsWith('/invoice')
        });
      }
    } catch (err) {
      console.error("SEO Fetch error:", err);
      setSeo(DEFAULT_SEO);
    }
  }, [pathname]);

  if (!seo) return null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      {seo.noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical Link */}
      <link rel="canonical" href={`https://www.directiptv.com${pathname}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://www.directiptv.com${pathname}`} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}

      {/* International SEO / Geo */}
      <link rel="alternate" href={`https://www.directiptv.com${pathname}`} hrefLang="en-US" />
      <link rel="alternate" href={`https://www.directiptv.com${pathname}`} hrefLang="en-GB" />
      <link rel="alternate" href={`https://www.directiptv.com${pathname}`} hrefLang="en-CA" />
      <link rel="alternate" href={`https://www.directiptv.com${pathname}`} hrefLang="x-default" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://www.directiptv.com${pathname}`} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      {seo.ogImage && <meta property="twitter:image" content={seo.ogImage} />}

      {/* Schema.org Organization structured data */}
      <script type="application/ld+json">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DirectIPTV",
            "url": "https://www.directiptv.com",
            "logo": "https://www.directiptv.com/apple-touch-icon.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "support@directiptv.com",
              "contactType": "customer service"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.directiptv.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.directiptv.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ])}
      </script>
    </Helmet>
  );
}
