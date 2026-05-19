import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SEO } from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import { PricingProvider } from './context/PricingContext';

const queryClient = new QueryClient();

// Lazy loading pages for better performance and smaller initial bundle size
const Home = React.lazy(() => import('./pages/Home'));
const Channels = React.lazy(() => import('./pages/Channels'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Tutorials = React.lazy(() => import('./pages/Tutorials'));
const Help = React.lazy(() => import('./pages/Help'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const FreeTrial = React.lazy(() => import('./pages/FreeTrial'));
const Invoice = React.lazy(() => import('./pages/Invoice'));
const AppleTVSetup = React.lazy(() => import('./pages/AppleTVSetup'));
const FireStickSetup = React.lazy(() => import('./pages/FireStickSetup'));
const AndroidTVSetup = React.lazy(() => import('./pages/AndroidTVSetup'));
const FormulerSetup = React.lazy(() => import('./pages/FormulerSetup'));
const GSESetup = React.lazy(() => import('./pages/GSESetup'));
const SamsungSetup = React.lazy(() => import('./pages/SamsungSetup'));
const IPTVStreamPlayerSetup = React.lazy(() => import('./pages/IPTVStreamPlayerSetup'));
const XCIPTVSetup = React.lazy(() => import('./pages/XCIPTVSetup'));
const STBEmuSetup = React.lazy(() => import('./pages/STBEmuSetup'));
const BeginnersGuide = React.lazy(() => import('./pages/BeginnersGuide'));
const About = React.lazy(() => import('./pages/About'));
const AdminPromoCode = React.lazy(() => import('./AdminPages/AdminPromoCode'));
const Login = React.lazy(() => import('./AdminPages/Login'));
const Dashboard = React.lazy(() => import('./AdminPages/Dashboard'));
const Users = React.lazy(() => import('./AdminPages/Users'));
const SubscriptionPlans = React.lazy(() => import('./AdminPages/SubscriptionPlans'));
const AdminLayout = React.lazy(() => import('./AdminPages/AdminLayout'));
const AdminFreeTrials = React.lazy(() => import('./AdminPages/AdminFreeTrials'));
const ForgotPassword = React.lazy(() => import('./AdminPages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./AdminPages/ResetPassword'));
const RegisterAdmin = React.lazy(() => import('./AdminPages/RegisterAdmin'));
const AdminUsers = React.lazy(() => import('./AdminPages/AdminUsers'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background-dark">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function MainLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-background-dark font-sans selection:bg-primary selection:text-background-dark">
      <ToastContainer theme="dark" position="bottom-right" aria-label="Notifications" />
      <Preloader />
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/help" element={<Help />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/free-trial" element={<FreeTrial />} />
            <Route path="/invoice" element={<Invoice />} />
            
            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            <Route path="/admin/register" element={<RegisterAdmin />} />
            
            {/* Admin Authenticated Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/login" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="admin-users" element={<AdminUsers />} />
              <Route path="promo-codes" element={<AdminPromoCode />} />
              <Route path="subscription-plans" element={<SubscriptionPlans />} />
              <Route path="free-trials" element={<AdminFreeTrials />} />
            </Route>

            {/* Tutorials Routes */}
            <Route path="/tutorials/apple-tv" element={<AppleTVSetup />} />
            <Route path="/tutorials/fire-stick" element={<FireStickSetup />} />
            <Route path="/tutorials/android-tv" element={<AndroidTVSetup />} />
            <Route path="/tutorials/formuler" element={<FormulerSetup />} />
            <Route path="/tutorials/gse-smart-iptv" element={<GSESetup />} />
            <Route path="/tutorials/samsung" element={<SamsungSetup />} />
            <Route path="/tutorials/iptv-stream-player" element={<IPTVStreamPlayerSetup />} />
            <Route path="/tutorials/xciptv" element={<XCIPTVSetup />} />
            <Route path="/tutorials/stb-emu" element={<STBEmuSetup />} />
            <Route path="/tutorials/beginners" element={<BeginnersGuide />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <PricingProvider>
          <Router>
          <ScrollToTop />
          <SEO />
          <GoogleAnalytics />
          <MainLayout />
          </Router>
        </PricingProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
