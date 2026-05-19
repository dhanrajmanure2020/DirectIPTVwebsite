import { PricingSection } from '../components/PricingSection'; // hmr
import { Helmet } from 'react-helmet-async';

export default function Pricing() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "DirectIPTV Premium Subscription",
    "description": "Experience premium IPTV streaming with over 20,000+ live channels and 100,000+ VODs in 4K.",
    "brand": {
      "@type": "Brand",
      "name": "DirectIPTV"
    },
    "category": "Streaming Service",
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": 3,
      "lowPrice": "14.99",
      "highPrice": "49.99",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="pt-32 bg-background-darker min-h-screen">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 text-center tracking-tighter">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500">Perfect Plan</span>
        </h1>
        <p className="text-slate-400 text-base max-w-4xl mx-auto text-center leading-relaxed font-medium">
          <span className="text-white font-bold block mb-2 text-lg">Direct IPTV – Multi-Device Compatibility</span>
          Direct IPTV enables you to watch your favorite channels, movies, and series on any device you possess. Whether you are at home or on the move, our service is fully optimized for Smart TVs, mobile phones, tablets, computers, and even gaming consoles. Experience smooth, fast, and dependable streaming wherever you are, at any time.
        </p>
      </div>

      <PricingSection hideHeader />
    </div>
  );
}
